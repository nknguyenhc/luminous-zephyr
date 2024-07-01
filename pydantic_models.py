from pydantic import BaseModel
from enum import Enum
from typing import Annotated
from annotated_types import Len

class Range(BaseModel):
    lower: int
    upper: int

class Category(str, Enum):
    Accessories = "Accessories"
    ArtsCrafts = "Arts & Crafts"
    Automotive = "Automotive"
    BathroomAccessories = "Bathroom Accessories"
    BabyAccessories = "Baby Accessories"
    Fashion = "Fashion"
    Electronics = "Electronics"
    PersonalEssentials = "Personal Essentials"
    FoodBeverages = "Food & Beverages"
    HouseholdItems = "Household Items"
    HealthBeauty = "Health & Beauty"
    JewelryWatches = "Jewelry & Watches"
    Kitchenware = "Kitchenware"
    OfficeSupplies = "Office Supplies"
    SportsOutdoors = "Sports & Outdoors"
    Stationery = "Stationery"
    ToysGames = "Toys & Games"

class Prompt(BaseModel):
    prompt: str
    price_range: Range | None = None
    categories: Annotated[list[Category], Len(min_length=1, max_length=3)] | None = None

class Product(BaseModel):
    id: int
    title: str
    description: str | None
    price_sgd: str | None
    number_sold: int
    category: str
    link: str
    image_url: str
