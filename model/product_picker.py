import logging
import pandas as pd

from .prompter import GeminiModel

from pydantic_models import Product

class ProductPicker:
    def __init__(self):
        with open('model/prompts/product_picker.txt', 'r') as file:
            base_prompt = file.read()
        self.model = GeminiModel(base_prompt.format)
        self.df = pd.read_csv('data/product_data_categorised.csv')
        self.df['id'] = self.df.index
        self.logger = logging.getLogger("ProductPicker")
    
    def pick(self, category: str, prompt: str) -> list[Product]:
        df, products = self._find_products(category)
        self.logger.debug(f"{len(df)} products found in category {category}")
        response = self.model.query(prompt=prompt, products=products)
        products_response = response.split('\n')

        sorted_products: list[Product] = []
        for product_id in products_response:
            if not product_id.isnumeric():
                self.logger.debug(f"Found non-numeric product ID: \"{product_id}\"")
                break

            product_id = int(product_id)
            df_row = df[df['id'] == product_id]
            if df_row.empty:
                self.logger.error(f"Product ID {product_id} not found in category {category}")
                continue
            product = self._to_product(df_row.iloc[0])
            sorted_products.append(product)

        self.logger.debug(f"Sorted products: {sorted_products}")
        self.logger.info(f"Original: {len(df)}, Sorted: {len(sorted_products)}")
        return sorted_products

    def _find_products(self, category: str) -> tuple[pd.DataFrame, str]:
        df = self.df[self.df['category'] == category]
        df_info = df[['id', 'title', 'description']]
        json_string = df_info.to_json(orient='records')
        self.logger.debug(f"Found products: {json_string}")
        return df, json_string
    
    def _to_product(self, row: pd.Series) -> Product:
        # Data cleaning before converting to Product
        description = None if pd.isna(row['description']) else row['description']
        price_sgd = None if pd.isna(row['price_sgd']) else row['price_sgd']
        number_sold = row['number_sold'] if type(row['number_sold']) == int \
            else int(row['number_sold'].replace(',', ''))
        return Product(
            id=row['id'],
            title=row['title'],
            description=description,
            price_sgd=price_sgd,
            number_sold=number_sold,
            category=row['category'],
        )


if __name__ == '__main__':
    from dotenv import load_dotenv
    import os
    import google.generativeai as genai

    load_dotenv()
    genai.configure(api_key=os.getenv('GEMINI_API_KEY'))
    logging.basicConfig(level=logging.DEBUG)
    
    picker = ProductPicker()
    picker.pick('Toys & Games', "A gift for a friend's birthday, who loves to read Harry Potter.")
