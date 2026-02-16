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