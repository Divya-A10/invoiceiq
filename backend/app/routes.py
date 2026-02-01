from fastapi import APIRouter, UploadFile, File
from .services.extractor import extract_data

router = APIRouter()


@router.post("/upload")
async def upload(file: UploadFile = File(...)):
    contents = await file.read()
    result = extract_data(contents)
    return result
