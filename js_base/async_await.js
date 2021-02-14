// 0. async基础用法测试 then 来接收 promise 数据
/*
可以看做 py中的yield
async函数返回一个 Promise 对象，可以使用then方法添加回调函数。当函数执行的时候，一旦遇到await就会先返回，等到异步操作完成，
再接着执行函数体内后面的语句。
*/

async function fun0() {
    console.log(1)
    return 1
}
// 因为返回Promise对象 所以需要then来获取返回结果
fun0().then(x => { console.log(x) })  //  输出结果 1， 1，


async function funp() {
    console.log('Promise')
    return new Promise(function (resolve, reject) {
        resolve('Promise') 
    })
}

funp().then(x => { console.log(x) })   // 输出promise  promise



//  await 关键字 只能放在 async 函数内部， await关键字的作用 就是获取 Promise中返回的内容， 获取的是Promise函数中resolve或者reject的值
// 如果await 后面并不是一个Promise的返回值，则会按照同步程序返回值处理,为undefined
const bbb = function () { return 'string' }

async function funAsy() {
    const b = await new Promise((resolve, reject) => {
        setTimeout(function () {
            resolve('time')
        }, 3000)
    })
    const c = await bbb()
    console.log(a, b, c)
}

funAsy()  //  运行结果是 3秒钟之后 ，输出 time , string,


// 1.定义一个或多个普通函数，函数必须返回Promise对象，如果返回其他类型的数据，将按照普通同步程序处理

function log(time) {
    return new Promise((resolve, reject) => {
        setTimeout(function () {
            console.log(time)
            resolve()
        }, time)
    })
}

async function fun() {
    await log(5000)
    await log(10000)
    log(1000)
    console.log(1)
}

fun()



// 3. async / await的重要应用 

const asy = function (x, time) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(x)
        }, time)
    })
}

const add = async function () {
    const a = await asy(3, 5000)
    console.log(a)
    const b = await asy(4, 10000)
    console.log(b)
    const c = await asy(5, 15000)
    console.log(a, b, c)
    const d = a + b + c
    console.log(d)
}

add();

// 5秒后输出3  又10秒后输出4 又15秒后输出5  然后立刻输出3,4,5，然后输出12


// 处理error
const test1 = async () => {
    try {
        const user = await log(3)
    } catch (err) {
        console.error('test error')
    }
}


//任何一个await语句后面的 Promise 对象变为reject状态，那么整个async函数都会中断执行。

async function f() {
  await Promise.reject('出错了');
  await Promise.resolve('hello world'); // 不会执行
}
//上面代码中，第二个await语句是不会执行的，因为第一个await语句状态变成了reject。

// promise使其返回错误统一格式
function to(promise) {
    return promise.then(res => [null, res]).catch(err => [err])
}

const test2 = async () => {
    const [err, res] = await to(log(3))
    if (err) {
        console.error('tx')
    }
}

const test3 = async () => {
    const user = await log(3).catch(err => {
        console.error('txx')
    })
}


async function logInOrder(urls) {
    // 并发读取远程URL
    const textPromises = urls.map(async url => {
      const response = await fetch(url);
      return response.text();
    });
  
    // 按次序输出
    for (const textPromise of textPromises) {
      console.log(await textPromise);
    }
  }

// 当异步函数执行完成后 在做另一个操作 比如先异步获取token 然后 获取到token后跳转 需要then 里面回调函数添加

async function token(){
    await this.login({ticket:this.ticket,server_url:`http://${window.location.host}/login`}).then(res=>{
      this.$router.push({name:'home'})
    })
  }