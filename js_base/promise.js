/*
Promise的状态
Promise有三种状态，分别是：Pending（进行中）， Resolved(已完成)，Rejected (已失败)。Promise从Pending状态开始，如果成功就转到成功态，并执行resolve回调函数；如果失败就转到失败状态并执行reject回调函数。下面是Promise的规范图解，图源百度图片：

异步函数必须返回 promise对象
*/

function judgeNumber(num){
    var promise1 = new Promise((resolve,reject)=>{
        num =5;
        if(num<5){
            resolve("num小于5，值为："+num);
        }else{
            reject("num不小于5，值为："+num);
        }
    });
    return promise1;
}
// then 接收 resolve里面传递的数据
judgeNumber().then(
    (message)=>{
        console.log(message);
    }
) // catch 接收 reject 里面传递的数据
.catch(error=>{
    console.log(error);
})


function judgeNumber(num){
    var promise1 = new Promise((resolve,reject)=>{
        num =5;
        if(num<5){
            resolve("num小于5，值为："+num);
        }else{
            reject("num不小于5，值为："+num);
        }
    });
    return promise1;
}
// then 可以同时接收resolve reject 两个函数
judgeNumber().then(
    res =>{
        console.log(res)
    },
    err=>{
        console.log(err)
    }   
) 

// 链式调用
new Promise((resovle,reject)=>{
    setTimeout(()=>{
        resolve('data')
    },1000)
    }).then(res=>{
        console.log(res)
        return new Promise((resovle,reject)=>{
            resolve(res+ '1')
        }).then(res=>{
            console.log(res)
    })
})


new Promise((resovle,reject)=>{
    setTimeout(()=>{
        resolve('data')
    },1000).then(res=>{
        console.log(res)
        return Promise.resolve(res+ '1')
    }).then(res=>{
            console.log(res)
            return Promise.resolve(res+ '2')
    }).then(res=>{
        console.log(res)
    })
})





//all用法
//Promise的all方法提供了并行执行异步操作的能力，在all中所有异步操作结束后才执行回调。
function p1(){
    var promise1 = new Promise(function(resolve,reject){
        console.log("p1的第一条输出语句");
        console.log("p1的第二条输出语句");
        resolve("p1完成");
    })
    return promise1;
}

function p2(){
    var promise2 = new Promise(function(resolve,reject){
        console.log("p2的第一条输出语句");
        setTimeout(()=>{console.log("p2的第二条输出语句");resolve("p2完成")},2000);

    })
    return promise2;
}

function p3(){
    var promise3 = new Promise(function(resolve,reject){
        console.log("p3的第一条输出语句");
        console.log("p3的第二条输出语句");
        resolve("p3完成")
    });
    return  promise3;
}

Promise.all([p1(),p2(),p3()]).then(function(data){
    console.log(data);
})

//race用法
//在all中的回调函数中，等到所有的Promise都执行完，再来执行回调函数，race则不同它等到第一个Promise改变状态就开始执行回调函数。将上面的all改为race,得到
Promise.race([p1(),p2(),p3()]).then(function(data){
    console.log(data);
})

/*
这里还需要注意一个问题，promise的执行时异步的，比如下面这样：
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
