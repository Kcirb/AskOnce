const vm = Vue.createApp({
    data() {
        return {
            url: '',
            name: '',
        }
    }
}).mount('#app');

function addURL() {
    // adding URL to json file
    var url = vm.url;
    var name = vm.name;
    if(url && name) {
        var webs = JSON.parse(localStorage.getItem('webs'));
        webs.push({url: url, name: name});
        localStorage.setItem('webs', JSON.stringify(webs));
        alert('新增成功');
        window.location.href = 'main.html';
    }else{
        alert('請輸入完整資料');
    }
}