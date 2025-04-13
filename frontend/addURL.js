function addURL() {
    const input = document.querySelector('input[name="url"]');
    const url = input.value.trim();

    if (!url) {
        alert("請輸入網址！");
        return;
    }

    let urls = JSON.parse(localStorage.getItem("SearchUrls")) || [];

    if (urls.includes(url)) {
        alert("這個網址已經加入過囉！");
        input.value = "";
        return;
    }

    urls.push(url);
    localStorage.setItem("SearchUrls", JSON.stringify(urls));
    alert("網址已加入！");
    input.value = "";
}
