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
import traceback 

def save_html(url, output_html_path):
    response = requests.get(url)
    response.raise_for_status()
    
        # Print the first 100 characters of the HTML content to verify it's correct
    print(response.text[:100])  # This prints a snippet of the HTML for verification
    
    # Use 'with' statement to open the file, write content, and then flush and close the file
    with open(output_html_path, "w", encoding='utf-8') as file:
        file.write(response.text)
        file.flush()  # Ensure all data is flushed to the file buffer
    # The 'with' block ensures the file is closed properly

    return response.text

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
        
    return meta_tags_dict

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

    return content

def take_screenshot(driver, url, output_image_path):
    driver.get(url)
    time.sleep(4)

    total_height = int(driver.execute_script("return document.body.scrollHeight"))
    viewport_height = int(driver.execute_script("return window.innerHeight"))
    scrolls = total_height // viewport_height

    for scroll in range(scrolls + 1):
        driver.execute_script(f"window.scrollTo(0, {scroll * viewport_height});")
        time.sleep(2)

    result = driver.execute_cdp_cmd("Page.captureScreenshot", {"format": "png", "fromSurface": True, "captureBeyondViewport": True})
    with open(output_image_path, "wb") as file:
        file.write(base64.b64decode(result['data']))
    driver.quit()

def scrapeTextScreenshot(url):
    output_tags_path = "../output/tags_output.txt"
    output_text_path = "../output/text_output.txt"
    output_image_path = "../output/full_screenshot.png"
    driver = setup_driver()

    output_html_path = r"C:\Coding\page-analysis\output\page.html"   # Define the path for the HTML output
    print(f'Saving HTML content to: {os.path.abspath(output_html_path)}')

    print('Saving HTML content...')
    try:
        html_content = save_html(url, output_html_path)
        print(f'HTML content snippet: {html_content[:100]}')
        print('HTML content saved.')
    except Exception as e:
        print(f'An error occurred while saving HTML content: {e}')


    metaTags = getMetaTags(url, output_tags_path)
    content = scrape_text(url, output_text_path)
    take_screenshot(driver, url, output_image_path)

    print('Scraped text and took screenshot!')

if __name__ == "__main__":
    if len(sys.argv) > 1:
        scrapeTextScreenshot(sys.argv[1])
    else:
        scrapeTextScreenshot('https://www.intigriti.com/companies')

