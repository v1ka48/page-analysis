import requests
import time
import json
import base64
import sys
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager

def setup_driver():
    options = Options()
    options.headless = True
    options.add_argument("--window-size=1920,1080")
    service = Service(ChromeDriverManager().install())
    return webdriver.Chrome(service=service, options=options)

def scrape_text(url, output_text_path):
    response = requests.get(url)
    response.raise_for_status()
    soup = BeautifulSoup(response.text, 'html.parser')
    content = []
    tags_of_interest = ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'a', 'meta']
    for tag in soup.find_all(tags_of_interest):
        if tag.name == 'a' and (not tag.get('href', '').strip() or not tag.get_text(strip=True)):
            continue
        if tag.name == 'a' and 'btn' in tag.get('class', []):
            content.append('CTA Button: ' + tag.get_text(strip=True))
        else:
            content.append(tag.get_text(strip=True))
    with open(output_text_path, "w", encoding='utf-8') as file:
        for item in content:
            file.write(item + '\n\n')
    return content

def take_screenshot(driver, url, output_image_path):
    driver.get(url)
    time.sleep(4)
    new_height = driver.execute_script("return document.body.scrollHeight")
    last_height = 0
    while True:
        new_height = driver.execute_script("return document.body.scrollHeight")
        if new_height == last_height:
            break
        last_height = new_height
        time.sleep(1)
    result = driver.execute_cdp_cmd("Page.captureScreenshot", {"format": "png", "fromSurface": True, "captureBeyondViewport": True})
    with open(output_image_path, "wb") as file:
        file.write(base64.b64decode(result['data']))
    driver.quit()

def scrapeTextScreenshot(url):
    output_text_path = "../output/text_output.txt"
    output_image_path = "../output/full_screenshot.png"
    driver = setup_driver()
    content = scrape_text(url, output_text_path)
    take_screenshot(driver, url, output_image_path)
    print('Scraped text and took screenshot!')

if __name__ == "__main__":
    url = sys.argv[1]
    scrapeTextScreenshot(url)