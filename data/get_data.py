from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium_stealth import stealth
import chromedriver_binary
import csv
import time

'''
Script to obtain product data

Requests are sent with 5 seconds interval in between
All data obtained are for testing and demonstration purposes
'''

options = Options()
options.add_argument('--headless=new')
options.add_experimental_option("excludeSwitches", ["enable-automation"])
options.add_experimental_option('useAutomationExtension', False)


driver = webdriver.Chrome(options=options)

stealth(driver,
        languages=["en-US", "en"],
        vendor="Google Inc.",
        platform="Win32",
        webgl_vendor="Intel Inc.",
        renderer="Intel Iris OpenGL Engine",
        fix_hairline=True)

with open('data/product_urls.txt', 'r') as u:
    urls = u.readlines()

# def get_description(s: str):
#     description = ""
#     start = s.find('desc_detail')
#     end = s.find(']\"', start)
#     if start >= end:
#         return ""
#     raw_description = s[start:end]
#     while True:
#         s = raw_description.find('\\\"text\\\":')
#         if s < 0:
#             break
#         e = raw_description.find('\\\"}')
#         description_line_start_index = s + 11
#         if description_line_start_index < e:
#             description += raw_description[description_line_start_index:e] + '\n'
#         raw_description = raw_description[e+3:]
    
#     return description

with open('data/product_data.csv', 'a', encoding='utf-8') as f:
    writer = csv.writer(f)
    # writer.writerow(["title", "description", "price_sgd", "number_sold"])
    for i in range(667, 854):
        driver.get(urls[i])
        time.sleep(5)
        try:
            title = driver.find_element(By.CSS_SELECTOR, "title").get_attribute('innerHTML')
            # render_data = unquote(driver.find_element(By.ID, "RENDER_DATA").get_attribute('innerHTML'))
            price = driver.find_element(By.CSS_SELECTOR, "div[class^='index-price']").find_element(By.TAG_NAME, "span").get_attribute('innerHTML')
            number_sold = driver.find_element(By.CSS_SELECTOR, "div[class^='index-info__sold']").get_attribute('innerHTML')

            descriptions = driver.find_elements(By.CSS_SELECTOR, "div[class^='index-text']")
            description = ""
            for text in descriptions:
                description += text.get_attribute('innerHTML') + '\n'
            
            price = price[2:]
            number_sold = number_sold.split(' ')[0]
            writer.writerow([title, description, price, number_sold])
            print(f'{i} done!')
        except Exception as e:
            print(e)
            continue

