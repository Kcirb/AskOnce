document.addEventListener('DOMContentLoaded', function() {
    var webs = [
        {url: 'http://lib.ht.org.tw/bookSearchList.do?searchtype=simplesearch&execodeHidden=true&execode=&authoriz=1&search_field=FullText&search_input=QUERY&searchsymbol=hyLibCore.webpac.search.common_symbol&keepsitelimit=', name: '行天宮圖書館'},
        {url: 'https://nccu.primo.exlibrisgroup.com/discovery/search?query=title,contains,QUERY&tab=Everything&search_scope=MyInst_and_CI&vid=886NCCU_INST:886NCCU_INST&lang=zh-tw&offset=0', name: '政大圖書館'},
        {url: 'https://book.tpml.edu.tw/search?searchInput=QUERY&searchField=TI', name: '北市圖書館'},
        {url: 'https://www.sanmin.com.tw/search/index/?ct=n&qu=QUERY', name: '三民書局'},
        {url: 'https://search.books.com.tw/search/query/key/QUERY/cat/all', name: '博客來'},
    ]
    
    var params = new URLSearchParams(window.location.search);
    var query = params.get('query');
    if(query) {
        // query to Unicode if not english
        if(!/^[a-zA-Z0-9]*$/.test(query)) {
            query = encodeURIComponent(query);
        }
        searchWeb(query);
    }else{
        // no query, redirect to home page
        window.location.href = 'main.html';
    }
    
    function searchWeb(query) {
        for(var i = 0; i < webs.length; i++) {
            var url = webs[i].url.replace('QUERY', query);
            var name = webs[i].name;
            var iframe = document.createElement('iframe');
            iframe.className = 'search-result';
            iframe.src = url;
            iframe.title = name;
    
            var container = document.getElementById('search-results-container');
            if (container) {
                container.appendChild(iframe);
            } else {
                console.error('Element with ID "search-results-container" not found.');
            }
        }
    }
});

