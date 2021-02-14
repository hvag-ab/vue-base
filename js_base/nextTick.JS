/*
nextTick官方文档说明：

在下次DOM更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的DOM。

疑问：

DOM更新循环是指什么？
下次更新循环是什么时候？
修改数据之后使用，是加快了数据更新进度吗？
在什么情况下要用到？
原理
异步说明
Vue实现响应式并不是数据发生变化之后DOM立即变化，而是按一定的策略进行DOM的更新。

在Vue的文档中，说明Vue是异步执行DOM更新的。关于异步的解析，可以查看阮一峰老师的这篇文章。截取关键部分如下：

所有同步任务都在主线程上执行，形成一个执行栈（execution context stack）。
主线程之外，还存在一个"任务队列"（task queue）。只要异步任务有了运行结果，就在"任务队列"之中放置一个事件。
一旦"执行栈"中的所有同步任务执行完毕，系统就会读取"任务队列"，看看里面有哪些事件。那些对应的异步任务，于是结束等待状态，进入执行栈，开始执行。
主线程不断重复上面的第三步。
下图就是主线程和任务队列的示意图：



事件循环说明
简单来说，Vue在修改数据后，视图不会立刻更新，而是等同一事件循环中的所有数据变化完成之后，再统一进行视图更新。
知乎上的例子：

//改变数据
vm.message = 'changed'

//想要立即使用更新后的DOM。这样不行，因为设置message后DOM还没有更新
console.log(vm.$el.textContent) // 并不会得到'changed'

//这样可以，nextTick里面的代码会在DOM更新后执行
Vue.nextTick(function(){
    console.log(vm.$el.textContent) //可以得到'changed'
})
图解：



循环详解：
第一个tick（图例中第一个步骤，即'本次更新循环'）：
1、首先修改数据，这是同步任务。同一事件循环的所有的同步任务都在主线程上执行，形成一个执行栈，此时还未涉及DOM 。
2、Vue开启一个异步队列，并缓冲在此事件循环中发生的所有数据改变。如果同一个watcher被多次触发，只会被推入到队列中一次。

第二个tick（图例中第二个步骤，即'下次更新循环'）：
同步任务执行完毕，开始执行异步watcher队列的任务，更新DOM 。Vue在内部尝试对异步队列使用原生的 Promise.then和MessageChannel方法，如果执行环境不支持，会采用setTimeout(fn, 0)代替。

第三个tick（图例中第三个步骤）：
此时就是文档所说的下次DOM更新循环结束之后。
此时通过Vue.nextTick获取到改变后的DOM 。通过setTimeout(fn, 0)也可以同样获取到。

简单总结事件循环：

同步代码执行 → 查找异步队列，推入执行栈，执行Vue.nextTick[事件循环1] → 查找异步队列，推入执行栈，执行Vue.nextTick[事件循环2]...

总之，异步是单独的一个tick，不会和同步在一个tick 里发生，也是DOM不会马上改变的原因。

应用场景
应用场景：需要在视图更新之后，基于新的视图进行操作

需要注意的是，在created和mounted阶段，如果需要操作渲染后的试图，也要使用nextTick方法。

官方文档说明：

注意mounted不会承诺所有的子组件也都一起被挂载。如果你希望等到整个视图都渲染完毕，可以用vm.$nextTick替换掉mounted。

mounted: function () {
  this.$nextTick(function () {
    // Code that will run only after the
    // entire view has been rendered
  })
}
其他应用场景
其他应用场景如下三例：

例子1： 点击按钮显示原本以 v-show = false 隐藏起来的输入框，并获取焦点
showsou(){
  this.showit = true //修改 v-show
  document.getElementById("keywords").focus()  //在第一个 tick 里，获取不到输入框，自然也获取不到焦点
}
修改为：

showsou(){
  this.showit = true
  this.$nextTick(function () {
    // DOM 更新了
    document.getElementById("keywords").focus()
  })
}
例子2：点击获取元素宽度

<div id="app">
    <p ref="myWidth" v-if="showMe">{{ message }}</p>
    <button @click="getMyWidth">获取p元素宽度</button>
</div>

getMyWidth() {
    this.showMe = true;
    //this.message = this.$refs.myWidth.offsetWidth;
    //报错 TypeError: this.$refs.myWidth is undefined
    this.$nextTick(()=>{
        //dom元素更新后执行，此时能拿到p元素的属性
        this.message = this.$refs.myWidth.offsetWidth;
  })
}

*/