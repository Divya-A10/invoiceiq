from pydantic import BaseModel
from typing import List


class Invoice(BaseModel):
    id: str
    customer: str
    total: float
    confidence: float


class Product(BaseModel):
    id: str
    name: str
    price: float
    confidence: float


class Customer(BaseModel):
    id: str
    name: str
    totalSpent: float
    confidence: float


class ExtractionResult(BaseModel):
    invoices: List[Invoice]
    products: List[Product]
    customers: List[Customer]
