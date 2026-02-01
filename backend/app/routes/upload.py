from fastapi import APIRouter, UploadFile, File
from typing import List
from app.services.extractor import extract_data

router = APIRouter()

@router.post("/upload")
async def upload(files: List[UploadFile] = File(...)):
    return await extract_data(files)
