window.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const query = params.get("query");
    const container = document.getElementById("search-results-container");

    if (!query) {
        container.innerHTML = "<p>請輸入查詢關鍵字</p>";
        return;
    }

    // 從 localStorage 讀取使用者儲存的網址清單
    const baseUrls = JSON.parse(localStorage.getItem("SearchUrls")) || [];

    if (baseUrls.length === 0) {
        container.innerHTML = "<p>請先在首頁加入至少一個圖書館網址</p>";
        return;
    }

    baseUrls.forEach(url => {
        fetch("http://localhost:5000/parse-url", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url })
        })
        .then(res => res.json())
        .then(data => {
            if (!data.search_url) {
                console.warn("解析失敗：", data);
                return;
            }

            // 替換 QUERY 成使用者輸入的查詢字詞
            const searchUrl = data.search_url.replace("QUERY", encodeURIComponent(query));

            // 建立並插入 iframe 元素
            const iframe = document.createElement("iframe");
            iframe.className = "search-result";
            iframe.src = searchUrl;

            container.appendChild(iframe);
        })
        .catch(error => {
            console.error("發送請求失敗：", error);
        });
    });
});
