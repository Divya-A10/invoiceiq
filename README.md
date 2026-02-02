# InvoiceIq
InvoiceIQ – AI Powered Invoice Management System  InvoiceIQ is a React-based web application that automates the extraction, processing, and management of invoice data from uploaded files. The system uses AI-powered document parsing to extract structured information and organizes it into three synchronized sections:Invoices,Products, and Customers.
State management is handled using Redux to ensure real-time updates across all tabs.

## Features

- Upload invoices in PDF format
- Automatic extraction of invoice data using AI
- OCR support for scanned documents
- Organized dashboard with:
  - Invoices
  - Products
  - Customers
- Real-time synchronization using Redux
- Confidence scoring for extracted invoices
- Clean responsive UI

---

The application follows a modular architecture with clear separation of concerns between frontend and backend.

### Frontend Structure

- Pages are organized under `pages/` (InvoicesPage, ProductsPage, CustomersPage)
- Redux slices are maintained separately for invoices, products, and customers
- Global state is managed using Redux Toolkit to ensure consistent real-time updates across all tabs
- Components are kept lightweight and focused on rendering logic
- Business logic (such as invoice total calculation) is abstracted into helper functions

Key best practices followed:

- Functional React components with hooks (`useState`, `useSelector`, `useDispatch`)
- Redux Toolkit for predictable state management
- Separation of UI and data logic
- Reusable components
- Clean folder structure
- Meaningful variable and function naming
- Minimal inline styling with centralized CSS

This modular design allows the system to scale easily and makes individual features independently testable and maintainable.

---

##  AI Data Extraction Pipeline

The backend uses an AI-powered extraction pipeline to process uploaded invoices.

### Extraction Flow:

1. User uploads PDF files through the React frontend.
2. Files are sent to the FastAPI backend using multipart form upload.
3. Text is extracted from PDFs using:
   - PyPDF / PDFPlumber for digital PDFs
   - PyMuPDF + Pillow for image extraction
4. For scanned invoices, Tesseract OCR converts images into readable text.
5. Extracted raw text is sent to Google Generative AI for structured parsing.
6. The AI model identifies:
   - Invoice ID
   - Customer details
   - Product items
   - Prices
   - Confidence score
7. Structured JSON is returned to the frontend.
8. Redux updates Invoices, Products, and Customers in real time.

This hybrid approach ensures both digital and scanned invoices are supported.

---

##  Testing and Validation

Manual functional testing was performed to validate application behavior across all major workflows.

### Test Cases Executed:

- Invoice upload and extraction
- Multi-file upload handling
- Redux synchronization across tabs
- Invoice total calculation
- Confidence score rendering
- OCR support for scanned PDFs
- Navigation between Invoices, Products, and Customers
- Empty state handling
- UI responsiveness

Each test case was verified visually and functionally.

Screenshots and demo recordings are included in the `solution/` directory to demonstrate:

- Successful uploads
- Extracted invoice data
- Products and customers synchronization
- Confidence visualization
- Total calculation
- Overall dashboard usability

These artifacts serve as validation of correct system behavior.

---


## Tech Stack

### Frontend
- React (Vite)
- Redux Toolkit
- TypeScript
- CSS

### Backend
- FastAPI
- Python
- Google Generative AI
- PDFPlumber / PyPDF
- Tesseract OCR

## # InvoiceIQ – Local Setup Guide

This project consists of:

- **Backend**: FastAPI (Python)
- **Frontend**: React (Vite)
- **AI Extraction**: Google Gemini
- **File Support**: PDF, XLSX (Excel), Images (OCR via Tesseract)

---

## Prerequisites

Make sure you have the following installed:

- Python 3.11+
- Node.js 18+
- npm
- Git

### macOS (additional requirement for OCR)

Install Tesseract:

```bash
brew install tesseract
```
Verify:
```bash
tesseract --version
```
1. Clone the Repository
```bash
git clone https://github.com/Divya-A10/invoiceiq.git
cd invoiceiq
```
3. Backend Setup (FastAPI)
Navigate to backend:
```bash
cd backend
Create virtual environment:
python3 -m venv venv
source venv/bin/activate
```
Upgrade pip:
```bash
python -m pip install --upgrade pip
```
Install backend dependencies:
```bash
python -m pip install fastapi uvicorn python-multipart google-generativeai PyPDF2 pandas openpyxl pillow pytesseract pdfplumber
```
Note: OpenTelemetry / google-adk are NOT required for this project.
Environment Variables
Create a .env file inside backend/:
```bash
GOOGLE_API_KEY=your_gemini_api_key_here
```
Start Backend
From backend/:
```bash
python -m uvicorn app.main:app --reload
```
Backend will run at:
http://127.0.0.1:8000

5. Frontend Setup (React)
Open a new terminal, then:
```bash
cd frontend
npm install
npm run dev
```
Frontend will run at:
http://localhost:5173

7. Using the Application

1.Open the frontend URL in your browser.
2.Upload files (PDF / XLSX / Images).
3.Extracted data appears across:
* Invoices
* Products
* Customers
4.State is synchronized across tabs using Redux.
  
# Supported File Types
- PDF (text extraction)
- XLSX (parsed via pandas/openpyxl)
- JPG / PNG (OCR via Tesseract)
All file content is converted to text and passed to Gemini for structured extraction.
# AI Fallback
If Gemini API quota is exceeded, the backend safely falls back to mock/sample data so the frontend continues to function.
# Demo
A full demo walkthrough is available:
solutions/demo.mp4
# Notes for Evaluators
* Please ensure Tesseract is installed (required for image OCR).
* Backend must be started before frontend.
* If ports are busy, adjust Vite or Uvicorn ports accordingly.
* Virtual environment (venv) and node_modules are excluded via .gitignore.
  
# 📁 Project Structure

invoiceiq/
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── routes/
│   │   └── services/
│   └── venv/
├── frontend/
│   └── src/
└── README.md│
├── solutions/                        # UI screenshots for documentation
├── demo.mp4                          # Demo recordings
└──dashboard.png


## Testing
Manual functional testing was performed covering upload, extraction, Redux synchronization, and UI rendering.
Detailed test cases are listed below.

## Manual Test Cases

### TC01 – Upload Invoice PDF

**Steps**
1. Click Choose Files
2. Select PDF invoice
3. Upload

**Expected Result**
- Invoice appears in Invoices tab
- Products populated
- Customers populated

Status: Pass

---

### TC02 – Redux Synchronization

**Steps**
1. Upload invoice
2. Switch tabs

**Expected Result**
- Same data visible across all tabs instantly

Status: Pass

---

### TC03 – Total Calculation

**Steps**
1. Upload invoice with products

**Expected Result**
- Total reflects sum of product prices

Status: Pass

---

### TC04 – Confidence Score

**Steps**
1. Upload invoice

**Expected Result**
- Confidence % displayed per invoice

Status: Pass

---

### TC05 – OCR Support

**Steps**
1. Upload scanned PDF

**Expected Result**
- Text extracted successfully

Status: Pass

---

### TC06 – Multiple Files

**Steps**
1. Upload multiple PDFs

**Expected Result**
- All invoices processed and displayed

Status: Pass

---

### TC07 – Empty State

**Steps**
1. Load app without uploads

**Expected Result**
- No crash, clean UI

Status: Pass

---

### TC08 – Navigation

**Steps**
1. Switch between Invoices / Products / Customers

**Expected Result**
- Tabs change correctly

Status: Pass

---
---
##  Extracted Output
Below is a shortened example of the structured JSON returned by the backend after uploading an invoice. This data is then synchronized across the Invoices, Products, and Customers tabs using Redux.
 TA X  I N V O I C E ORIGIN AL FOR RECIPIENT
EInvoices
GSTIN: 29AABCT1332L000
H/No 1 59/9, M.S.R.Y Nilayam, 4th floor, 
Masjid Banda, Kondapur  , Rangareddy, H-
yderabad
Bangalore South, KARNATAKA, 560030
Mobile: +91 9999999999   
Email: Swipe@gmail.com
Consignee:
Shounak
NextSpeed Technologies Pvt Ltd
GSTIN: ABCDE1234567890
Ph: 9999999994Invoice #: 
INV-148CZSInvoice Date: 
12 Nov 2024
Place of Supply: 
29-KARNATAKA
SlDescription Rate/ItemQuantityTaxable Value GSTAmount
1GEMS CHOCLATE POUCH  4.76191,000.0004,761.90238.10 (5%)5,000.00
2TREAT BKS CASE 80PKT  535.714350.00026,785.713,214.29 
(12%)30,000.00
3NUTRI CHOICE BKS CASE  666.666725.00016,666.67833.33 (5%)17,500.00
4MILK BIKIS CLASSIC CASE 120PK  809.523820.00016,190.48809.52 (5%)17,000.00
       
       
Total Items / Qty : 4 / 1,095.000 
Making charges₹123456.00
debit card charges ₹12345.00
Shipping Charges₹60.00
Shipping Charges₹60.00
Shipping Charges₹60.00
Taxable Amount ₹2,00,385.76
CGST 2.5% ₹940.48
SGST 2.5% ₹940.48
CGST 6.0% ₹1,607.14
SGST 6.0% ₹1,607.14
Total₹2,05,481.00
Total amount (in words):  INR Two Lakh, Five Thousand, Four Hundred And Eighty-One Rupees Only .
Amount Payable: ₹2,05,481.00
Total Amount due: ₹2,05,481.00
Bank Details:
Bank:Example Bank
Account #: 1234567890
IFSC Code: IFSC0001234
Branch: Main Branch
Beneficiary Name : VishnuPay using UPI: 
 For EInvoices 
Authorized Signatory 
Notes:
THANKS Terms and Conditions:
1) The tenant has no right of any kind to have a right title interest 
RAW GEMINI:
```json
{
  "invoices": [
    {
      "id": "INV-148CZS",
      "customer": "Shounak NextSpeed Technologies Pvt Ltd",
      "total": 205481.00,
      "confidence": 0.95
    }
  ],
  "products": [
    {
      "id": "1",
      "name": "GEMS CHOCLATE POUCH",
      "price": 5000.00,
      "confidence": 0.9
    },
    {
      "id": "2",
      "name": "TREAT BKS CASE 80PKT",
      "price": 30000.00,
      "confidence": 0.9
    },
    {
      "id": "3",
      "name": "NUTRI CHOICE BKS CASE",
      "price": 17500.00,
      "confidence": 0.9
    },
    {
      "id": "4",
      "name": "MILK BIKIS CLASSIC CASE 120PK",
      "price": 17000.00,
      "confidence": 0.9
    }
  ],
  "customers": [
    {
      "id": "ABCDE1234567890",
      "name": "Shounak NextSpeed Technologies Pvt Ltd",
      "confidence": 0.95
    }
  ]
}
```
PARSED: {'invoices': [{'id': 'INV-148CZS', 'customer': 'Shounak NextSpeed Technologies Pvt Ltd', 'total': 205481.0, 'confidence': 0.95}], 'products': [{'id': '1', 'name': 'GEMS CHOCLATE POUCH', 'price': 5000.0, 'confidence': 0.9}, {'id': '2', 'name': 'TREAT BKS CASE 80PKT', 'price': 30000.0, 'confidence': 0.9}, {'id': '3', 'name': 'NUTRI CHOICE BKS CASE', 'price': 17500.0, 'confidence': 0.9}, {'id': '4', 'name': 'MILK BIKIS CLASSIC CASE 120PK', 'price': 17000.0, 'confidence': 0.9}], 'customers': [{'id': 'ABCDE1234567890', 'name': 'Shounak NextSpeed Technologies Pvt Ltd', 'confidence': 0.95}]}
Only a shortened sample is shown here for readability. Full responses are handled dynamically within the application.

---

⚠️ Note on AI API Usage & Fallback Behavior
During development and testing, the application uses Google Generative AI (Gemini) for OCR and structured data extraction from PDFs/images. Due to limited free API trial quotas, the live AI extraction may become unavailable after exceeding the allotted usage.
In such cases, the backend automatically falls back to sample/mock extracted data to ensure the frontend (Invoices, Products, Customers) and Redux synchronization continue to function correctly for demo and evaluation purposes.
This fallback allows reviewers to:
Upload files and see populated Invoices / Products / Customers tabs
Verify totals aggregation and cross-tab Redux updates
Validate overall application flow and UI behavior
When API quota is available, the same pipeline operates on real extracted data.

---
