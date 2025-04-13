from flask import Flask, request, jsonify
from flask_cors import CORS
from parser import extract_search_info

app = Flask(__name__)
CORS(app)

@app.route('/parse-url', methods=['POST'])
def parse_url():
    data = request.get_json()
    homepage_url = data.get('url')

    if not homepage_url:
        return jsonify({"error": "No URL provided"}), 400

    result = extract_search_info(homepage_url)
    if result is None:
        return jsonify({"error": "Failed to parse search form"}), 500

    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)
