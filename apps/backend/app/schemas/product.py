from pydantic import BaseModel, Field
from uuid import UUID
from datetime import datetime
from typing import Optional, Literal


class ProductBase(BaseModel):
    name: str = Field(min_length=1, max_length=255)
    description: Optional[str] = None
    price: int = Field(gt=0)  
    currency: Literal["INR", "USD"]
    quantity: int = Field(ge=0)
    image_url: Optional[str] = None
    quantity_sold: int =0


class ProductCreate(BaseModel):
    name: str = Field(min_length=1, max_length=255)
    description: Optional[str] = None
    price: int = Field(gt=0)
    currency: Literal["INR", "USD"]
    quantity: int = Field(ge=0)
    image_url: Optional[str] = None


class ProductUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    price: Optional[int] = Field(default=None, gt=0)
    currency: Optional[Literal["INR", "USD"]] = None 
    quantity: Optional[int] = Field(default=None, ge=0)
    image_url: Optional[str] = None
    quantity_sold: Optional[int] = None


class ProductRead(ProductBase):
    id: UUID
    quantity_sold: int
    date_created: datetime
    date_updated: datetime
    model_config = {"from_attributes": True}
