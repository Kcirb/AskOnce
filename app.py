from flask import Flask, request, jsonify
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin

app = Flask(__name__)

def extract_search_url(homepage_url):
    """解析首頁 HTML，找出搜尋表單的 action 以及輸入欄位"""
    try:
        response = requests.get(homepage_url, timeout=10)
        response.raise_for_status()
    except requests.RequestException as e:
        return {"error": f"無法請求網站: {str(e)}"}

    soup = BeautifulSoup(response.text, "html.parser")

    # 嘗試找出搜尋表單
    search_form = soup.find("form")
    if not search_form:
        return {"error": "找不到搜尋表單"}

    # 獲取表單的 action (即搜尋結果的 URL)
    action = search_form.get("action", "")
    search_url = urljoin(homepage_url, action)  # 組合完整 URL

    # 找出輸入欄位的 name (查詢參數名稱)
    search_input = search_form.find("input", {"type": "text"}) or search_form.find("input", {"type": "search"})
    if not search_input:
        return {"error": "找不到搜尋輸入欄位"}

    query_param = search_input.get("name", "").strip()
    if not query_param:
        return {"error": "搜尋輸入欄位無效"}

    # 最終的搜尋 URL，使用 QUERY 來標記
    final_url = f"{search_url}?{query_param}=QUERY"
    return {"search_url": final_url}

@app.route('/get_search_url', methods=['POST'])
def get_search_url():
    data = request.json
    homepage_url = data.get("homepage_url", "")

    if not homepage_url:
        return jsonify({"error": "請提供圖書館首頁網址"}), 400

    result = extract_search_url(homepage_url)
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)
