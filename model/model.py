import logging

from .categoriser import Categoriser
from .product_picker import ProductPicker

from pydantic_models import Product, Prompt

class Model:
    def __init__(self):
        self.categoriser = Categoriser()
        self.product_picker = ProductPicker()
    
    def query(self, request: Prompt) -> list[Product]:
        if request.categories is not None:
            categories = request.categories
        else:
            categories = self.categoriser.identify(request.prompt)
        return self.product_picker.pick(categories, request.prompt)


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
