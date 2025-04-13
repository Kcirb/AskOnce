import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin

def extract_search_info(url):
    try:
        resp = requests.get(url, timeout=5)
        soup = BeautifulSoup(resp.text, 'html.parser')

        # 找第一個有輸入欄位的 <form>
        form = soup.find('form')
        if not form:
            return None

        action = form.get('action')
        method = form.get('method', 'GET').upper()
        inputs = form.find_all('input')

        # 找到搜尋欄位的 name（預設抓第一個 text 欄）
        keyword_input = next((i for i in inputs if i.get('type') in [None, 'text', 'search']), None)
        param_name = keyword_input.get('name') if keyword_input else 'q'

        # 組合完整 URL
        search_url = urljoin(url, action)
        final_url = f"{search_url}?{param_name}=QUERY"

        return {
            "search_url": final_url,
            "method": method,
            "param_name": param_name
        }

    except Exception as e:
        print("Error parsing:", e)
        return None
