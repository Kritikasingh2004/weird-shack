from app.schemas.product import ProductCreate, ProductRead, ProductUpdate
from datetime import datetime
from uuid import UUID,uuid4

products_db : list[ProductRead] = [
    {
        "id": UUID("fbfcb849-6214-4358-bb95-b52ad466252a"),
        "name": "nirma",
        "description": "Washing powder",
        "price": 40,
        "currency": "INR",
        "quantity": 4,
        "quantity_sold": 0,
        "date_created": datetime.now(),
        "date_updated": datetime.now(),
    },
    {
    "name": "china",
    "description": "happy chinese new year",
    "price": 67,
    "currency": "INR",
    "quantity":0,
    "image_url": "ni_hao.png",
    "quantity_sold": 8,
    "id": UUID("a13a2890-a775-40e2-92b6-e74a7ce8a9f5"),
    "date_created": "2026-02-16T20:05:49.024720",
    "date_updated": "2026-02-16T20:05:49.024730"
  }
]

def get_products()-> list[ProductRead]:
    return products_db

def get_product(id:UUID) -> ProductRead:
    for product in products_db:
        if product["id"]==id:
            return product
    raise ValueError("Product not Found")

def create_product(product: ProductCreate) -> ProductRead:
    new_product = product.model_dump()
    system_fields = {
        "id": uuid4(),
        "quantity_sold": 0,
        "date_created": datetime.now(),
        "date_updated": datetime.now(),
    }

    new_product.update(system_fields)
    products_db.append(new_product)
    return new_product

def update_product(id: UUID, product: ProductUpdate) -> ProductRead:
    for p in products_db:
        if p["id"] ==id:
            update_data = product.model_dump(exclude_unset=True)
            if "quantity_sold" in update_data and update_data["quantity_sold"] is not None:
                p["quantity"]= max(0, p["quantity"]-update_data["quantity_sold"])
            p.update(update_data)
            p["date_updated"] = datetime.now()
            return p
    raise ValueError("Product not found")

def delete_product(id:UUID) ->None:
    global products_db

    product_exists = any(p["id"] ==id for p in products_db)

    if not product_exists:
        raise ValueError("Product not found")
    
    products_db = [p for p in products_db if p["id"] != id]