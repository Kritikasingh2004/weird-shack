from sqlmodel import SQLModel, Field
from uuid import UUID, uuid4
from datetime import datetime, timezone
from typing import Optional

class Product(SQLModel, table=True):
    id: UUID = Field(default_factory=uuid4, primary_key=True)
    name: str
    description: Optional[str] = None
    price: int  
    quantity: int
    quantity_sold: int = 0
    image_url: Optional[str] = None
    date_created: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    date_updated: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
