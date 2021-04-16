# async/await

## 使用规则

凡是在前面添加了async的函数在执行后都会自动返回一个Promise对象

注意重点: **返回结果为Promise**。

```js
async function test() { 
    return 100; 
}
console.log(test())  // Promise {<resolved>: 100}
```
await必须在async函数里使用，不能单独使用

```js
async function test() {
    let result = await Promise.resolve('success')
    console.log(result)
}
test()
```

await后面需要跟Promise对象，不然就没有意义，而且await后面的Promise对象不必写then，
因为await的作用之一就是获取后面Promise对象成功状态传递出来的参数。

```js
function fn() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('success')
        })
    })
}
async function test() {
    let result = await fn() //因为fn会返回一个Promise对象
    console.log(result)     //这里会打出Promise成功后传递过来的'success'
}
test()
```

## 同步与异步

在`async`函数中使用`await`，那么`await`这里的代码就会变成同步的了，意思就是说只有等`await`后面的`Promise`执行完成得到结果才会继续下去，`await`就是等待，这样虽然避免了异步，但是它也会阻塞代码，所以使用的时候要考虑周全。

```js
function fn(name) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(`${name}成功`)
        }, 1000)
    })
}
async function test() {
    let p1 = await fn('小红')
    let p2 = await fn('小明')
    let p3 = await fn('小华')
    return [p1, p2, p3]
}
test().then(result => {
    console.log(result)
}).catch(result => {
    console.log(result)     // 错误的处理方法，前提是函数调用，否则往下看
})
```
这样写虽然是可以的，但是这里`await`会阻塞代码，每个`await`都必须等后面的`fn()`执行完成才会执行下一行代码，所以`test`函数执行需要3秒。如果不是遇到特定的场景，最好还是不要这样用。


## 优雅的错误处理方法

一般情况下`async/await`在错误处理方面，主要使用 `try/catch`，像这样

```js
const fetchData = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('fetch data is me')
        }, 1000)
    })
}

(async () => {
    try {
        const data = await fetchData()
        console.log('data is ->', data)
    } catch(err) {
        console.log('err is ->', err)
    }
})()

```

## 一个适合使用async/await的业务场景

在前端编程中，我们偶尔会遇到这样一个场景：**我们需要发送多个请求，而后面请求的发送总是需要依赖上一个请求返回的数据。**

对于这个问题，我们既可以用的`Promise`的链式调用来解决，也可以用`async/await`来解决，然而后者会更简洁些。

使用Promise链式调用来处理：

```js
function request(time) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(time)
        }, time)
    })
}
request(500).then(result => {
    console.log(result)         // 500
    return request(result + 1000)
}).then(result => { 
    console.log(result)         // 1500
    return request(result + 1000)
}).then(result => {
    console.log(result)         // 2500
}).catch(error => {
    console.log(error)
})
```

使用async/await的来处理：

```js
function request(time) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(time)
        }, time)
    })
}
async function getResult() {
    let p1 = await request(500)
    let p2 = await request(p1 + 1000)
    let p3 = await request(p2 + 1000)
    return p3
}
getResult().then(result => {
    console.log(result) // 2500
}).catch(error => {
    console.log(error)
})
```

相对于使用`then`不停地进行链式调用， 使用`async/await`会显的更加易读一些。

## 在循环中使用await

如果在是循环中使用`await`，就需要牢记一条：必须在`async`函数中使用。

```js
let times = [1000, 500, 2000]
async function test() {
    let result = []
    for (let item of times) {
        let temp = await request(item)
        result.push(temp)
    }
    return result
}
test().then(result => {
    console.log(result)
}).catch(error => {
    console.log(error)
})
```

## 测试
```js
console.log(1)
let promiseDemo = new Promise((resolve, reject) => {
    console.log(2)
    setTimeout(() => {
        let random = Math.random()
        if (random >= 0.2) {
            resolve('success')
            console.log(3)
        } else {
            reject('failed')
            console.log(3)
        }   
    }, 1000)
})
console.log(8)
async function test() {
    console.log(4)
    let result = await promiseDemo
    return result
}
setTimeout(() => {
    console.log(7)
}, 0)
test().then(result => {
    console.log(5)
}).catch((result) => {
    console.log(5)
})

console.log(6)

// 1 2 8 4 6 7 3 5
```

# try/catch

> try...catch语句标记要尝试的语句块，并指定一个同步函数出现异常时抛出的响应。

看看使用方法：

```js
try {
    throw new Error('The error')
    // .. 下面代码不会执行
    console.log(22)
} catch (err) {
    console.log(err)  // 'The error'
}
```

使用一些不存在的方法，或操作方式错误时，就会进入`catch`，也是避免某个方法出错，而造成页面奔溃

```js
try {
    JSON(2)
} catch (err) {
    console.log(err)  // JSON is not a functio
}
```

## 无法捕获

```js
try {
    setTimeout(() => {
        throw new Error('async error')  // Error
    }, 1000)
} catch(e) {
    console.log(e, 'err')
}
```

这段代码中，`setTimeout` 的回调函数抛出一个错误，并不会在 `catch` 中捕获，会导致程序直接报错崩掉。

所以说在 js 中 `try/catch` 并不是说写上一个就可以高枕无忧了。难道每个函数都要写吗，那什么情况下 `try/catch` 无法捕获 `error` 呢？

- **宏任务的回调函数中的错误无法捕获**

```js
// 异步任务
const task = () => {
    setTimeout(() => {
        throw new Error('async error')  // Error
    }, 1000)
}
// 主任务
function main() {
    try {
        task()
    } catch(e) {
        console.log(e, 'err')
    }
}
main()
```

这种情况下是无法进入 `catch` 的，这跟浏览器的执行机制有关。
异步任务由 `eventloop` 加入任务队列，并取出入栈(js 主进程)执行，而当 `task` 取出执行的时候， `main` 的栈已经退出了，也就是上下文环境已经改变，
所以 `main` 无法捕获 `task` 的错误。

- **微任务（promise）的回调**

```JS
// 返回一个 promise 对象
const promiseFetch = () => {
    return new Promise((reslove) => {
        reslove();
    })
}
function main() {
    try {
        promiseFetch().then(() => {
            throw new Error('err')  // Error
        })
    } catch(e) {
        console.log(e, 'err');
    }
}
main()
```

`promise` 的任务，也就是 `then` 里面的回调函数，抛出错误同样也无法 `catch`。
因为微任务队列是在两个 `task` 之前清空的，所以 `then` 入栈的时候，`main` 函数也已经出栈了。

> 这是事件循环机制的问题，同步任务和异步任务。

## Promise 的异常捕获

```js
function main1() {
  try {
    new Promise(() => {
      throw new Error('promise1 error') // Error
    })
  } catch(e) {
    console.log(e.message);
  }
}

function main2() {
  try {
    Promise.reject('promise2 error')    // Error
  } catch(e) {
    console.log(e.message);
  }
}
```

以上两个 `try catch` 都不能捕获到 `error`，因为 `promise` 内部的错误不会冒泡出来，而是被 `promise` 吃掉了，
只有通过 `promise.catch` 才可以捕获，所以用 `Promise` 一定要写 `catch` 。

然后我们再来看一下使用 promise.catch 的两段代码：

```js
// reject
new Promise((reslove, reject) => {
    reject()
}).catch((e) => {
    console.log('error')    // error
})

// throw new Error
new Promise((reslove, reject) => {
    throw new Error('error')
}).catch((e) => {
    console.log('error')    // error
})
```

promise 内部的无论是 `reject` 或者 `throw new Error`，都可以通过 `catch` 回调捕获。

这里要跟我们最开始微任务的栗子区分，`promise` 的微任务指的是 `then` 的回调，而此处是 `Promise` 构造函数传入的第一个参数，
`new Promise` 是同步执行的。

**那 then 之后的错误如何捕获呢。**

```js
Promise.resolve(true).then(() => {
    try {
        throw new Error('then');
    } catch(e) {
        console.log('err')  // err
        return e
    }
}).then(e => {
    console.log(e)  // then
})
```

只能是在回调函数内部 `catch` 错误，并把错误信息返回，`error` 会传递到下一个 `then` 的回调。

## async/await 的异常捕获

依旧分两种情况，是`Promise`对象和非`Promise`对象。

第一种情况：

```js
async function main () {
    try {
        const res = await new Promise((resolve, reject) => {
            reject('fetch failure...')
        })
        console.log(res, 'res')
    } catch(e) {
        console.log(e, 'e.message')     // fetch failure... e.message
    }
}
main()

async function main () {
    try {
        const res = await Promise.reject(2)
        console.log(res, 'res')
    } catch(e) {
        console.log(e, 'e.message')     // 2 e.message
    }
}
main()
```

Promise带`catch`回调则不会进入下方的`catch`捕获，如果Promise的`catch`回调中出错，那么还是会走下方的`catch`捕获

```js
async function main () {
    try {
        const res = await new Promise((resolve, reject) => {
            reject('fetch failure...')
        }).then(res => {
            console.log(3, res)
        }).catch(res => {
            console.log(2, res)     // 2 "fetch failure..."
        })
        console.log(res, 'res')     // undefined "res"
    } catch(e) {
        console.log(e, 'e.message')
    }
}
main()

async function main () {
    try {
        const res = await new Promise((resolve, reject) => {
            resolve('fetch failure...')
        }).then(res => {
            JSON(3) // 链式catch捕获then错误
        }).catch(res => {
            JSON(3) // 下方catch捕获当前catch错误
        })
        console.log(res, 'res')
    } catch(e) {
        console.log(e, 'e.message') // JSON is not a function "e.message"
    }
}
main()
```

规则与前面的Promise基本一致的。

不带Promise：

```js
async function main () {
    try {
        const res = await new Promise((resolve, reject) => {
            resolve('fetch failure...')
        }).then(res => {
            console.log(3)
        }).catch(res => {
            JSON(3)
        })
        JSON(2)
        console.log(res, 'res')
    } catch(e) {
        console.log(e, 'e.message')     // JSON is not a function 'e.message'
    }
}
main()
```

`await`只是`Generator`的语法糖，所以同样会被`catch`捕获到，区别在于`await`语句是否为Promise，其规则也与Promise一致


// 当异步函数执行完成后 在做另一个操作 比如先异步获取token 然后 获取到token后跳转 需要then 里面回调函数添加
```js
async function token(){
    await this.login({ticket:this.ticket,server_url:`http://${window.location.host}/login`}).then(res=>{
      this.$router.push({name:'home'})
    })
  }
```