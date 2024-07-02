import logging
from functools import partial

from .prompter import GeminiModel

class Categoriser:
    def __init__(self):
        with open('model/prompts/categoriser.txt', 'r') as file:
            base_prompt = file.read()
        self.categories = [
            "Accessories",
            "Arts & Crafts",
            "Automotive",
            "Bathroom Accessories",
            "Baby Accessories",
            "Fashion",
            "Electronics",
            "Personal Essentials",
            "Food & Beverages",
            "Household Items",
            "Health & Beauty",
            "Jewelry & Watches",
            "Kitchenware",
            "Office Supplies",
            "Sports & Outdoors",
            "Stationery",
            "Toys & Games",
        ]
        self.model = GeminiModel(partial(base_prompt.format, categories='\n'.join(self.categories)))
        self.logger = logging.getLogger("Categoriser")
    
    def identify(self, prompt: str) -> list[str]:
        response = self.model.query(prompt=prompt)
        return self._categories_from_response(response)
    
    def _categories_from_response(self, response: str) -> list[str]:
        response_categories = response.split('\n')
        categories: list[str] = []
        for response_category in response_categories:
            response_category = response_category.strip()
            if response_category in self.categories:
                categories.append(response_category)
            else:
                self.logger.error(f"Unrecognised category: {response_category}")
            if len(categories) == 3:
                break
        self.logger.info(f"Identified categories: {categories}")
        return categories


if __name__ == '__main__':
    from dotenv import load_dotenv
    import os
    import google.generativeai as genai

    load_dotenv()
    genai.configure(api_key=os.getenv('GEMINI_API_KEY'))
    logging.basicConfig(level=logging.DEBUG)

    categoriser = Categoriser()
    categoriser.identify("A gift for a friend's birthday, who loves to read Harry Potter.")
