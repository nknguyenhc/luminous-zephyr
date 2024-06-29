from seleniumwire import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium_stealth import stealth
import csv
import time
import json
from urllib.parse import unquote

'''
Script to obtain product data

Requests are sent with 5 seconds interval in between
All data obtained are for testing and demonstration purposes
'''

options = Options()
options.add_argument('--headless=new')
options.add_experimental_option("excludeSwitches", ["enable-automation"])
options.add_experimental_option('useAutomationExtension', False)

seleniumwire_options = {
    "enable_har": True,
    "headless": "new"
}

driver = webdriver.Chrome(options=options, seleniumwire_options=seleniumwire_options)

stealth(driver,
        languages=["en-US", "en"],
        vendor="Google Inc.",
        platform="Win32",
        webgl_vendor="Intel Inc.",
        renderer="Intel Iris OpenGL Engine",
        fix_hairline=True)


'''
Code used to obtain product_data.csv

    title = driver.find_element(By.CSS_SELECTOR, "title").get_attribute('innerHTML')
    price = driver.find_element(By.CSS_SELECTOR, "div[class^='index-price']").find_element(By.TAG_NAME, "span").get_attribute('innerHTML')
    number_sold = driver.find_element(By.CSS_SELECTOR, "div[class^='index-info__sold']").get_attribute('innerHTML')

    descriptions = driver.find_elements(By.CSS_SELECTOR, "div[class^='index-text']")
    description = ""
    for text in descriptions:
        description += text.get_attribute('innerHTML') + '\n'

    price = price[2:]
    number_sold = number_sold.split(' ')[0]
    writer.writerow([title, description, price, number_sold])

'''

with open('data/product_urls.txt', 'r') as u:
    urls = u.readlines()

with open('data/product_data_with_links.csv', 'a', encoding='utf-8', newline='\n') as f:
    writer = csv.writer(f)

    current = csv.reader(open('data/product_data_categorised.csv', encoding='utf-8', newline='\n'))
    next(current)
    for _ in range(0):
        next(current)

    for i in range(0, 844):
        share_link = urls[i]
        first_image_url = None
        product_link = None

        driver.get(share_link)
        time.sleep(5)
        try:
            first_image_url = driver.find_element(By.CLASS_NAME, 'slick-slide') \
                .find_element(By.CSS_SELECTOR, "div[class^='index-item']") \
                .find_element(By.TAG_NAME, 'img') \
                .get_attribute('src')

            del driver.requests
            driver.find_element(By.CLASS_NAME, 'tux-button').click()

            time.sleep(5)
            
            network_history = json.loads(driver.har)
            for entry in network_history['log']['entries']:
                url: str = entry['request']['url']
                if url and url.startswith('https://www.tiktokv.com/redirect'):
                    url = unquote(unquote(unquote(url)))
                    url = url[url.find('params_url='):]
                    product_link = url[len('params_url='):url.find('?')]
                    break
             
            if not (first_image_url and product_link):
                raise 'Some elements are not found'

            current_row = next(current)
            current_row.append(share_link)
            current_row.append(product_link)
            current_row.append(first_image_url)
            writer.writerow(current_row)

            print(f'{i} done!')
        except Exception as e:
            print(e)
            break

