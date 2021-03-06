# Promise 方法

**`Promise` 中的执行函数是同步进行的**，但是里面存在着异步操作，**在异步操作结束后会调用 `resolve` 方法**，
或者中途遇到错误调用 `reject` 方法，这两者都是作为微任务进入到 `EventLoop` 中。

Promise的状态
Promise有三种状态，分别是：Pending（进行中）， Resolved(已完成)，Rejected (已失败)。Promise从Pending状态开始，
如果成功就转到成功态，并执行resolve回调函数；如果失败就转到失败状态并执行reject回调函数。

异步函数必须返回 promise对象

```js
console.log(1)
let promiseDemo = new Promise((resolve, reject) => {
    console.log(2)
    let random = Math.random()
    if (random >= 0.2) {
        resolve('success')
        console.log(3)
    } else {
        reject('failed')
        console.log(3)
    }   
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

// 1 2 3 8 4 6 7 5
```

## then()
用于成功时的回调函数。


## catch()
用于指定发生错误时的回调函数。

一般来说，不要在`then()`方法里面定义 `Reject` 状态的回调函数（即`then`的第二个参数），总是使用`catch`方法。

```js
// bad
promise
    .then(function(data) {
        // success
    }, function(err) {
        // error
    });

// good
promise
    .then(function(data) {
        // success
    })
    .catch(function(err) {
        // error
    });
```

## finally()

`finally()`方法用于指定不管`Promise`对象最后状态如何，都会执行的操作。该方法是 ES2018 引入标准的。

`finally`方法的回调函数不接受任何参数，方法里面的操作，是与状态无关的，不依赖于`Promise`的执行结果。

```js
promise
    .then(result => {···})
    .catch(error => {···})
    .finally(() => {···});

promise
    .finally(() => {
    // 语句
    });

// 等同于
promise
    .then(
        result => {
            // 语句
            return result;
        },
        error => {
            // 语句
            throw error;
        }
    );
```
上面代码中，如果不使用`finally`方法，同样的语句需要为成功和失败两种情况各写一次。有了`finally`方法，则只需要写一次。


## all()

方法用于将多个 `Promise` 实例，包装成一个新的 `Promise` 实例。

只有`Promise1`、`Promise2`、`Promise3`的状态都变成`fulfilled`，`p`的状态才会变成`fulfilled`，此时`Promise1`、`Promise2`、`Promise3`的返回值组成一个数组，传递给`p`的回调函数。

只要`Promise1`、`Promise2`、`Promise3`之中**有一个被`rejected`**，p的状态才会变成`rejected`，此时第一个被`reject`的实例的返回值，会传递给`p`的回调函数。

```js
let Promise1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        var num = Math.ceil(Math.random()*10); //生成1-10的随机数
        if(num <= 5){
            resolve(num);
        }
        else{
            reject('数字太大了');
        }
    }, 2000)
})
let Promise2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        var num = Math.ceil(Math.random()*10); //生成1-10的随机数
        if(num <= 5){
            resolve(num);
        }
        else{
            reject('数字太大了');
        }
    }, 2000)
})
let Promise3 = new Promise((resolve, reject) => {
    setTimeout(() => {
        var num = Math.ceil(Math.random()*10); //生成1-10的随机数
        if(num <= 5){
            resolve(num);
        }
        else{
            reject('数字太大了');
        }
    }, 2000)
})

let p = Promise.all([Promise1, Promise2, Promise3])

p.then((res) => {
    // 三个都成功则成功  
    console.log('resolved', res)
}).catch((err) => {
    // 只要有失败，则失败 
    console.log('rejectd', err)
})
```

适合使用的场景，在所有异步方法都执行完毕后，再执行某一方法。

## race()

接收数组，方法返回一个`promise`，一旦迭代器中的某个`promise`解决或拒绝，返回的`promise`就会解决或拒绝。

race就是竞争的意思，数组内的Promise实例，谁执行的快，就返回谁的执行结果，不管是成功还是失败

```js
var p1 = new Promise(function(resolve, reject) { 
    setTimeout(resolve, 500, "one"); 
});
var p2 = new Promise(function(resolve, reject) { 
    setTimeout(resolve, 100, "two"); 
});

Promise.race([p1, p2]).then(function(value) {
    console.log(value); // "two"
    // 两个都完成，但 p2 更快
});

var p3 = new Promise(function(resolve, reject) { 
    setTimeout(resolve, 100, "three");
});
var p4 = new Promise(function(resolve, reject) { 
    setTimeout(reject, 500, "four"); 
});

Promise.race([p3, p4]).then(function(value) {
    // p3 更快，所以它完成了              
    console.log(value); // "three"
}, function(reason) {
    // 未被调用
});

var p5 = new Promise(function(resolve, reject) { 
    setTimeout(resolve, 500, "five"); 
});
var p6 = new Promise(function(resolve, reject) { 
    setTimeout(reject, 100, "six");
});

Promise.race([p5, p6]).then(function(value) {
    // 未被调用             
}, function(reason) {
    console.log(reason); // "six" p6 更快，所以它失败了
});
```

## allSettled()

接受一组 `Promise` 实例作为参数，包装成一个新的`Promise`实例。只有等到所有这些参数实例都返回结果，不管是`fulfilled`还是`rejected`，包装实例才会结束。该方法由 ES2020 引入。

该方法返回的新的`Promise`实例，一旦结束，状态总是`fulfilled`，不会变成`rejected`。

状态变成`fulfilled`后，`Promise`的监听函数接收到的参数是一个数组，每个成员对应一个传入`Promise.allSettled()`的`Promise`实例。

```js
const resolved = Promise.resolve(42);
const rejected = Promise.reject(-1);

const allSettledPromise = Promise.allSettled([resolved, rejected]);

allSettledPromise.then((results) => {
  console.log(results);  
});
// [{status: "fulfilled", value: 42}, {status: "rejected", reason: -1}]
```

/*
这里还需要注意一个问题，promise的执行时异步的，比如下面这样：
```js
var i

var promise = new Promise(function(resolve,reject){
    resolve("hello");
})

promise.then(data=>{
    i = 2;

})
console.log(i);

得到的结果是undefined,这不是因为promise不能改变外部的值，而是因为当执行console.log(i)时，then()方法还没执行完。
如果你将console.log(i)延迟输出就可以得到正确的结果：
setTimeout(()=>console.log(i),1000);

所以不要在promise后面执行一些依赖promise改变的代码，因为可能promise中的代码并未执行完，或者你可以将其延迟输出。

*/
```

## 链式调用 一个接一个的执行，前一个必须返回Promise对象 通过then传递给下一个执行 
## 用于前一个对象执行完了了才能执行后一个对象
```js
let readFilePromise = (file) =>{
    return new Promise((resolve, reject) => {
    let r = readfile(file)
    resolve(num);
    })
}
```

```js
let x = readFilePromise('1.json').then(data => {
    return readFilePromise('2.json')//这是返回的Promise
});
x.then(/* 内部逻辑省略 */)
```

我们会根据 `then` 中回调函数的传入值创建不同类型的Promise, 然后把返回的 Promise 穿透到外层, 以供后续的调用。
这里的 x 指的就是内部返回的 Promise，然后在 x 后面可以依次完成链式调用。

这便是`返回值穿透`的效果。

这两种技术一起作用便可以将深层的嵌套回调写成下面的形式:

```js
readFilePromise('1.json').then(data => {
    return readFilePromise('2.json');
}).then(data => {
    return readFilePromise('3.json');
}).then(data => {
    return readFilePromise('4.json');
});
```

这样就显得清爽了许多，更重要的是，它更符合人的线性思维模式，开发体验也更好。

两种技术结合产生了`链式调用`的效果。

这解决的是多层嵌套的问题，那另一个问题，即每次任务执行结束后`分别处理成功和失败`的情况怎么解决的呢？

`Promise`采用了错误冒泡的方式。其实很简单理解，我们来看看效果:

```js
readFilePromise('1.json').then(data => {
    return readFilePromise('2.json');
}).then(data => {
    return readFilePromise('3.json');
}).then(data => {
    return readFilePromise('4.json');
}).catch(err => {
  // xxx
})
```

这样前面产生的错误会一直向后传递，被`catch`接收到，就不用频繁地检查错误了。


## 解决效果

- 实现链式调用，解决多层嵌套问题
- 实现错误冒泡后一站式处理，解决每次任务中判断错误、增加代码混乱度的问题




## 参考

- [Promise不会？？看这里！！！史上最通俗易懂的Promise！！！](https://juejin.im/post/5afe6d3bf265da0b9e654c4b#heading-7?blank)
- [BAT前端经典面试问题：史上最最最详细的手写Promise教程](https://juejin.im/post/5b2f02cd5188252b937548ab#heading-2?blank)
- [从零开始写一个符合Promises/A+规范的promise](https://juejin.im/post/5b16800fe51d4506ae719bae#heading-7?blank)
- [Promise实现原理（附源码）](https://juejin.im/post/5b83cb5ae51d4538cc3ec354?blank)