from fastapi import APIRouter, HTTPException
from app.schemas.product import ProductCreate, ProductRead, ProductUpdate
from app.services import product_service
from uuid import UUID

router = APIRouter(prefix="/products", tags=["Products"])

@router.get("/", response_model=list[ProductRead])
def get_products():
    return product_service.get_products()

@router.get("/{id}", response_model=ProductRead)
def get_product(id: UUID):
    try:
        return product_service.get_product(id)
    except ValueError:
        raise HTTPException(status_code=404, detail="Product not found")

@router.post("/", response_model=ProductRead, status_code=201)
def create_product(product: ProductCreate):
    return product_service.create_product(product)

@router.delete("/{id}", status_code=204)
def delete_product(id:UUID):
    product_service.delete_product()
    return {"message":"Deleted"}


@router.patch("/{id}")
def update_product(id:UUID, product: ProductUpdate):
    return product_service.ProductUpdate(id, product)