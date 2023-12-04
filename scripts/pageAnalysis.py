import requests
import time
import json
import base64
import sys
from dotenv import load_dotenv
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
from openai import OpenAI

load_dotenv()

def setup_driver():
    options = Options()
    options.headless = True
    options.add_argument("--window-size=1920,1080")
    service = Service(ChromeDriverManager().install())
    return webdriver.Chrome(service=service, options=options)

def getMetaTags(url, output_tags_path):
    response = requests.get(url)
    response.raise_for_status()
    soup = BeautifulSoup(response.text, 'html.parser')
    properties_of_interest = ['og:title', 'og:description', 'title', 'description']
    meta_tags = soup.find_all('meta')
    meta_tags_dict = {}
    
    for tag in meta_tags:
        if tag.get('property', '').strip() in properties_of_interest:
            meta_tags_dict[tag.get('property', '')] = tag.get('content', '')

    with open(output_tags_path, "w", encoding='utf-8') as file:
        file.write(json.dumps(meta_tags_dict, indent=4))

def scrape_text(url, output_text_path):
    response = requests.get(url)
    response.raise_for_status()
    soup = BeautifulSoup(response.text, 'html.parser')
    content = []
    tags_of_interest = ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'a']

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

def scrape_html(url, output_html_path):
    response = requests.get(url)
    soup = BeautifulSoup(response.text, "html.parser")
    with open(output_html_path, "w", encoding='utf-8') as file:
        file.write(soup.prettify())

def take_screenshot(driver, url, output_image_path):
    driver.get(url)
    time.sleep(4)

    total_height = int(driver.execute_script("return document.body.scrollHeight"))
    viewport_height = int(driver.execute_script("return window.innerHeight"))
    scrolls = total_height // viewport_height

    for scroll in range(scrolls + 1):
        driver.execute_script(f"window.scrollTo(0, {scroll * viewport_height});")
        time.sleep(1)

    result = driver.execute_cdp_cmd("Page.captureScreenshot", {"format": "png", "fromSurface": True, "captureBeyondViewport": True})
    with open(output_image_path, "wb") as file:
        file.write(base64.b64decode(result['data']))
    driver.quit()

def scrapeUrl(url):
    output_tags_path = "../output/tags_output.txt"
    output_text_path = "../output/text_output.txt"
    output_html_path = "../output/html_output.txt"
    output_image_path = "../output/full_screenshot.png"
    driver = setup_driver()

    scrape_html(url, output_html_path)
    scrape_text(url, output_text_path)
    getMetaTags(url, output_tags_path)
    take_screenshot(driver, url, output_image_path)

def analysePage():
    with open('../output/text_output.txt', 'r') as file:
        html = file.read().replace('\n', ' ')
    with open('../output/tags_output.txt', 'r') as file:
        tags = file.read().replace('\n', ' ')
    with open('../output/text_output.txt', 'r') as file:
        text = file.read().replace('\n', ' ')
    with open('../output/prompt.txt', 'r') as file:
        prompt = file.read().replace('\n', ' ')

    openai = OpenAI()

    response = openai.chat.completions.create(
        model="gpt-4",
        n=1,
        stream=False,
        messages=[
            {"role": "system", "content": "You are a helpful, professional web page analyst. You have to: \n\n" + prompt},
            # {"role": "user", "content": 'Here is the html of the web page I want you to analyse for me: ' + html},
            {"role": "user", "content": 'Here are the text and meta tags of the web page I want you to analyse for me: ' + text + tags}
        ]
    )
    with open("../output/response.txt", "w", encoding='utf-8') as file:
        file.write(response.choices[0].message.content)


if __name__ == "__main__":
    if len(sys.argv) > 1:
        # scrapeUrl(sys.argv[1])
        # analysePage()
        with open('../output/output.txt', 'r') as file:
            output = file.read()
        print(output)
    else:
        analysePage()