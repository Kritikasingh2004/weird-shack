from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.product import router as product_router

app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(
    product_router,
    tags=["Products"]
)

@app.get("/")
def app_def():
    return{"status":"Yoooo Girl!!"}
