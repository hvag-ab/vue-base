# HTTP 基础知识

HTTP 是一种 超文本传输协议(Hypertext Transfer Protocol)，HTTP 是一个在计算机世界里专门在两点之间传输文字、图片、音频、视频等超文本数据的约定和规范。

三点注意事项：

- HTTP是无连接
- HTTP是无状态
- HTTP

## 请求方法

- GET：请求资源
- HEAD：跟GET方法类似，区别就是不返回主体
- POST：提交资源
- OPTION：请求服务器告知其支持什么method
- PUT：修改资源
- DELETE：删除资源


## HTTP 报文

> HTTP 在应用层交互数据的方式，就叫报文。分为：请求报文 & 响应报文。

### 报文结构

```
请求行 + 请求头 + 请求体
```

- 请求行：方法 + 路径 + 协议版本

```js
GET / HTTP/1.1
```

- 请求头：“header（字段名）：value（值）”

1. 常见请求Header

字段 | 作用
------------- | -------------
Host  | 接受请求的服务器的ip和端口
Referer  | 请求来源
Cookie   | 向服务器传送一个令牌
Authorization | 对自身进行认证的数据
Connection    | 是否
Accept           | 媒体类型
Accept-Charset   | 字符集类型
Accept-Encoding  | 编码方式
Accept-Language  | 语言
If-Modified-Since |  协商缓存 时间戳
If-None-Match     |  协商缓存 哈希值
User-Agent | 客户端信息


通用

字段 | 作用
------------- | -------------
Cache-Control | 强缓存
Pragma        | 另一种随报文传送指示的方式，但并不专用缓存
Connection         |      允许客户端和服务器指定与请求/响应连接有关的选项
Date               |      报文创建时间
MIME-Version       |      给出了发送端使用的MIME版本
Trailer            |      如果报文采用了分块传输编码方式，就可以用这个首部列出位于报文拖挂部分的首部集合
Transfer-Encoding  |      告知接收端为了保证报文的可靠传输，对报文采用了什么编码方式
Update             |      给出了发送端可能想要“升级”使用的新版本或协议
Via                |      显示了报文经过的中间节点（代理、网关）


# HTTP 和 HTTPS

## HTTP

HTTP 是一种 超文本传输协议(Hypertext Transfer Protocol)，HTTP 是一个在计算机世界里专门在两点之间传输文字、图片、音频、视频等超文本数据的约定和规范

HTTP 协议默认是明文的，也就是说在请求的过程中，可能会被劫持和篡改数据。为了安全等问题，所以才有了 HTTPS。

## HTTPS

HTTPS 的全称是 Hypertext Transfer Protocol Secure，从名称我们可以看出 HTTPS 要比 HTTPS 多了 secure 安全性这个概念，实际上，HTTPS 并不是一个新的应用层协议，它其实就是 HTTP + TLS/SSL 协议组合而成，而安全性的保证正是 TLS/SSL 所做的工作。

**也就是说，HTTPS 就是身披了一层 SSL 的 HTTP。**

SSL 握手过程:

1. 建立安全能力 包括协议版本 会话Id 密码构件 压缩方法和初始随机数
2. 服务器发送密钥和证书请求
3. 如果有证书请求客户端发送此证书 之后客户端发送密钥交换数据 也可以发送证书验证消息
4. 变更密码构件，结束握手协议


## 两者区别


 xx         | 协议 |    端口 | 性能 | 功能 | 原理
---         | :----: | :----: | :----: | :----: | :----:
 **HTTP**  | http://  | 80  | 不安全 | 明文传输（不加密）  | 应用层
 **HTTPS** | https:// | 443 |  安全 | SSL加密、身份认证（加密）  | 传输层

- HTTP 是未经安全加密的协议，它的传输过程容易被攻击者监听、数据容易被窃取、发送方和接收方容易被伪造；
- 而 HTTPS 是安全的协议，它通过 **密钥交换算法 - 签名算法 - 对称加密算法 - 摘要算法** 能够解决上面这些问题。

## GET 和 POST 区别

HTTP 中包括许多方法，Get 和 Post 是 HTTP 中最常用的两个方法，基本上使用 HTTP 方法中有 99% 都是在使用 Get 方法和 Post 方法，所以有必要我们对这两个方法有更加深刻的认识。

安全：

- get 方法是不安全的，因为你在发送请求的过程中，你的请求参数会拼在 URL 后面，从而导致容易被攻击者窃取，对你的信息造成破坏和伪造；

```
 /test/demo_form.asp?name1=value1&name2=value2 
```

而 post 方法是把参数放在请求体 body 中的，这对用户来说不可见。

```
POST /test/demo_form.asp HTTP/1.1
Host: w3schools.com
name1=value1&name2=value2 
```

- GET 请求的 URL 有长度限制，而 POST 请求会把参数放在消息体中，长度无限制。
- GET 请求会被浏览器主动缓存下来，而 POST 默认不会。
- GET 请求会把请求报文一次性发出去；请求会把请求报文一次性发出去。
    - 对于 GET 方式的请求，浏览器会把 http header 和 data 一并发送出去；
    - 而对于 POST，浏览器先发送 header，服务器响应100(continue)，浏览器再发送data。



# TCP三次握手和四次挥手

建立TCP链接是为了保证稳定有序的收发数据，那么就要保证双方的`发送能力`和`接收能力`都是OK的。 

- FIN = finish
- ACK = acknowledge

![](./../img/http0.png)


## 三次握手

三次握手之所以三次，是保证`client`和`server`都要让 **"对方"** 知道自己`发送能力`和`接收能力`都OK的最小次数。

> `client => server` server判断出client具备发送能力
>
> `server => client` client可以判断出server具备发送和接收能力
>
> `client => server` client还需让server知道自己接收能力没问题

- 客户端：我准备好了，你准备好了么，收到请回答？ 
- 服务端：我收到了，我也准备好了，你收到了么？ 
- 客户端：我也收到了

双方均保证了自己的接收和发送能力没有问题

TCP连接建立，两次不安全，四次浪费资源，三次刚刚好。

![](./../img/http1.png)

从最开始双方都处于`CLOSED`状态。然后服务端开始监听某个端口，进入了`LISTEN`状态。

- 第一次握手

客户端主动发起连接，发送`SYN`, 发送完毕后，客户端进入`SYN-SENT`状态。

- 第二次握手

服务端接收到，返回`SYN和ACK`(对应客户端发来的SYN)，发送完毕后，服务器端进入`SYN_RCVD`状态。

- 第三次握手

客户端再发送`ACK`给服务端，发送完毕后，客户端进入`ESTABLISHED`状态；服务端收到ACK之后，也进入`ESTABLISHED`状态，TCP 握手结束。

## 四次挥手

> `client => server` client请求关闭连接，发送FIN到server
>
> `server => client` server接收关闭连接请求，发送ACK进行最后数据传输
>
> `server => client` server向client发送可以进行关闭连接的请求FIN
>
> `client => server` client接收请求，发送确认关闭ACK，等待2msl后关闭

- 学生：老师，下课了
- 老师：好了，我知道，还有一部分没讲完
- 老师：讲完了，下课
- 学生：好的

四次挥手后，client和server成功地断开了连接~

![](./../img/http2.png)

刚开始双方处于`ESTABLISHED`状态。

- 第一次挥手

客户端想要关闭连接，向服务器发送`FIN`报文，发送完毕后，客户端进入`FIN_WAIT_1`状态。

- 第二次挥手

服务端收到该`FIN`报文后，就向客户端发送`ACK`应答报文，接着服务端进入`CLOSED_WAIT`状态。

客户端接收到服务端的`ACK`应答报文后，进入`FIN_WAIT_2`状态。

- 第三次挥手

服务端处理完数据后，向客户端发送`FIN`报文，发送完毕后，服务器端进入`LAST_ACK`状态。

- 第四次挥手

客户端接收到来自服务端的`FIN`报文后，回一个`ACK`应答报文，并进入`TIME_WAIT`状态。

服务端接收到这个确认包之后，关闭连接，进入`CLOSED`状态，至此**服务端已经完成连接的关闭**。

客户端等待了`2MSL`之后，自动进入`CLOSED`状态，**至此客户端也完成连接的关闭**。

# TCP 和 UDP 区别

1. **面向连接。** 所谓的连接，指的是客户端和服务器的连接，在双方互相通信之前，TCP 需要三次握手建立连接，而 UDP 没有相应建立连接的过程。
2. **可靠性。** TCP 花了非常多的功夫保证连接的可靠，这个可靠性体现在哪些方面呢？一个是有状态，另一个是可控制。
3. **面向字节流。** UDP 的数据传输是基于数据报的，这是因为仅仅只是继承了 IP 层的特性，而 TCP 为了维护状态，将一个个 IP 包变成了字节流。


## 参考

- [谈谈你对 TCP 三次握手和四次挥手的理解](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/15)
- [【面试】图解 TCP 常见面试题！](https://mp.weixin.qq.com/s/2cQI_mfNsXElStHeuR9LmA)
