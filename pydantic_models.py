from pydantic import BaseModel

class Product(BaseModel):
    id: int
    title: str
    description: str | None
    price_sgd: str | None
    number_sold: int
    category: str
