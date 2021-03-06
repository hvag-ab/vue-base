# Ajax


## 同步与异步


同步和异步概念： 

同步: 指的就是事情要一件一件做。等做完前一件才能做后一件任务 <br>
异步: 不受当前任务的影响，当前任务io阻塞后，切换到另一个任务执行，而不必等待当前任务执行完<br>
编程中：异步程序代码执行时不会阻塞其它程序代码执行,从而提升整体执行效率。

XMLHttpRequest可以以异步方式的请求数据处理程序,  可实现对网页的部分更新， 而不是刷新整个页面

## XMLHttpRequest对象
`Ajax`的核心是`XMLHttpRequest`对象，它是`Ajax`实现的关键，发送异步请求、接受响应以及执行回调都是通过它来完成


1. 创建XMLHttpRequest对象

```js
// 创建XMLHttpRequest对象
var xhr = new XMLHttpRequest();
``` 

2. 准备请求

```js
xhr.open(method, url, async);
```
- method：请求类型的字符串，其值可以是`GET`或者`POST`。
- url：是要作为请求发送目标的URL。
- async：参数是`true`或`false`，表示请求是以异步还是同步的模式发出。（默认为`true`，一般不建议为`false`）
- - false：同步模式发出的请求会暂停所有javascript代码的执行，知道服务器获得响应为止，如果浏览器在连接网络时或者在下载文件时出了故障，页面就会一直挂起。
- - true：异步模式发出的请求，请求对象收发数据的同时，浏览器可以继续加载页面，执行其他javascript代码



3. 发送请求
```js
xhr.send();

// GET请求
xhr.open("GET", "demo.php?name=tsrot&age=24", true);
xhr.send(null);

// POST请求
// POST请求一般需要提交数据进行请求，可以使用 setRequestHeader()来添加 HTTP 头。然后在send()方法中规定您希望发送的数据：
xhr.open("POST", "demo.php", true);
xhr.setRequestHeder("Content-Type","application/x-www-form-urlencoded;charset=UTF-8");
xhr.send(data)
```

4. 处理响应
```js
xhr.onreadystatechange = function(){
    if(xhr.readyState == 4 && xhr.status == 200){
        console.log(xhr.responseText);
    }
}
```
基本步骤，这个需要牢记，不然会被面试官打脸的：
```js
function ajax(url, success, fail){
    // 1. 创建连接
    var xhr  = new XMLHttpRequest()
    // 2. 连接服务器
    xhr.open('get', url, true)
    // 3. 发送请求
    xhr.send(null);
    // 4. 接受请求
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200){
            success(xhr.responseText);
        }else{
            fail && fail(xhr.status);
        }
    }
}
```

## Ajax封装

```js
function ajax(params) {
    params = params || {};
    params.data = params.data || {};
    var json = params.jsonp ? jsonp(params) : json(params);
    // ajax请求
    function json(params) {
        params.type = (params.type || 'GET').toUpperCase();
        params.data = formatParams(params.data);
        var xhr = null;

        // 实例化XMLHttpRequest对象
        if(window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } else {
            // IE6及其以下版本
            xhr = new ActiveXObjcet('Microsoft.XMLHTTP');
        };

        // 监听事件
        xhr.onreadystatechange = function() {
            if(xhr.readyState == 4) {
                var status = xhr.status;
                if(status >= 200 && status < 300) {
                    var response = '';
                    var type = xhr.getResponseHeader('Content-type');
                    if(type.indexOf('xml') !== -1 && xhr.responseXML) {
                        response = xhr.responseXML; //Document对象响应
                    } else if(type === 'application/json') {
                        response = JSON.parse(xhr.responseText); //JSON响应
                    } else {
                        response = xhr.responseText; //字符串响应
                    };
                    params.success && params.success(response);
                } else {
                    params.error && params.error(status);
                }
            }
        };

        // 连接和传输数据
        if(params.type == 'GET') {
            xhr.open(params.type, params.url + '?' + params.data, true);
            xhr.send(null);
        } else {
            xhr.open(params.type, params.url, true);
            //设置提交时的内容类型
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
            xhr.send(params.data);
        }
    }
}
```