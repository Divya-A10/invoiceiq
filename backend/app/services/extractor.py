import os
import json
import time
from typing import List
from io import BytesIO

import pandas as pd
from PIL import Image
import pytesseract


import google.generativeai as genai
from PyPDF2 import PdfReader
from fastapi import UploadFile
from google.api_core.exceptions import ResourceExhausted

genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

MODEL = genai.GenerativeModel("gemini-2.0-flash")

SYSTEM_PROMPT = """
You are an invoice extraction engine.

Return STRICT JSON only.

Schema:

{
  "invoices":[{"id":string,"customer":string,"total":number,"confidence":number}],
  "products":[{"id":string,"name":string,"price":number,"confidence":number}],
  "customers":[{"id":string,"name":string,"confidence":number}]
}

Rules:
- Always return arrays
- Never return markdown
- Never explain
- Never wrap in ``` 
- Prices must be numbers
- confidence between 0 and 1
"""

# -------------------------------------------------

async def extract_data(files: List[UploadFile]):
    full_text = ""
    types = set()

    # ---- read each uploaded file ----
    for f in files:
        content = await f.read()
        ct = f.content_type or ""

    # ---------- PDF ----------
    if "pdf" in ct:
        types.add("PDF")
        reader = PdfReader(BytesIO(content))
        for page in reader.pages:
            full_text += (page.extract_text() or "") + "\n"

    # ---------- IMAGE ----------
    elif "image" in ct:
        types.add("IMAGE")
        image = Image.open(BytesIO(content))
        text = pytesseract.image_to_string(image)
        full_text += text + "\n"

    # ---------- EXCEL ----------
    elif (
        "excel" in ct
        or "spreadsheet" in ct
        or f.filename.endswith(".xlsx")
    ):
        types.add("EXCEL")
        df = pd.read_excel(BytesIO(content))
        full_text += df.to_string(index=False) + "\n"


    print("TEXT PREVIEW:\n", full_text[:1500])

    prompt = SYSTEM_PROMPT + "\n\n" + full_text

    # ---- Gemini with retry ----
    for attempt in range(3):
        try:
            response = MODEL.generate_content(
                prompt,
                generation_config={"temperature": 0.1},
            )
            break
        except ResourceExhausted:
            print("Gemini rate limited — retrying...")
            time.sleep(2 * (attempt + 1))
    else:
        # hard fallback so frontend never crashes
        return {
            "invoices": [],
            "products": [],
            "customers": [],
            "fileTypes": list(types),
            "error": "Gemini quota exceeded"
        }

    raw = response.text.strip()
    print("RAW GEMINI:", raw)

    # strip markdown if Gemini adds it
    raw = raw.replace("```json", "").replace("```", "").strip()

    parsed = json.loads(raw)

    print("PARSED:", parsed)

    # attach fileTypes for frontend badges
    return {
        **parsed,
        "fileTypes": list(types),
    }
