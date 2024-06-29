import logging

from .categoriser import Categoriser
from .product_picker import ProductPicker

from pydantic_models import Product

class Model:
    def __init__(self):
        self.categoriser = Categoriser()
        self.product_picker = ProductPicker()
    
    def query(self, prompt: str) -> list[Product]:
        categories = self.categoriser.identify(prompt)
        return self.product_picker.pick(categories, prompt)


if __name__ == '__main__':
    from dotenv import load_dotenv
    import os
    import google.generativeai as genai

    load_dotenv()
    genai.configure(api_key=os.getenv('GEMINI_API_KEY'))
    logging.basicConfig(level=logging.INFO)

    model = Model()
    products = model.query("A gift for a friend's birthday, who loves to read Harry Potter.")
    print(products)
