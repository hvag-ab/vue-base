keep-alive
有时候我们不希望组件被重新渲染影响使用体验；或者处于性能考虑，避免多次重复渲染降低性能。而是希望组件可以缓存下来,维持当前的状态。这时候就可以用到keep-alive组件。

官网解释： 包裹动态组件时，会缓存不活动的组件实例，而不是销毁它们。和 相似， 是一个抽象组件：它自身不会渲染一个 DOM 元素，也不会出现在父组件链中。 当组件在 内被切换，它的 activated 和 deactivated 这两个生命周期钩子函数将会被对应执行。 在 2.2.0 及其更高版本中，activated 和 deactivated 将会在 树内的所有嵌套组件中触发。 主要用于保留组件状态或避免重新渲染

应用场景
如果未使用keep-alive组件，则在页面回退时仍然会重新渲染页面，触发created钩子，使用体验不好。 在以下场景中使用keep-alive组件会显著提高用户体验，菜单存在多级关系，多见于列表页+详情页的场景如：

商品列表页点击商品跳转到商品详情，返回后仍显示原有信息
订单列表跳转到订单详情，返回，等等场景。
生命周期
被包含在 keep-alive 中创建的组件，会多出两个生命周期的钩子: activated 与 deactivated

activated
在 keep-alive 组件激活时调用
该钩子函数在服务器端渲染期间不被调用
deactivated
在 keep-alive 组件停用时调用
该钩子在服务器端渲染期间不被调用
使用 keep-alive 会将数据保留在内存中，如果要在每次进入页面的时候获取最新的数据，需要在 activated 阶段获取数据，承担原来 created 钩子函数中获取数据的任务。

注意： 只有组件被 keep-alive 包裹时，这两个生命周期函数才会被调用，如果作为正常组件使用，是不会被调用的，以及在 2.1.0 版本之后，使用 exclude 排除之后，就算被包裹在 keep-alive 中，这两个钩子函数依然不会被调用！另外，在服务端渲染时，此钩子函数也不会被调用。

初次进入时：created > mounted > activated；退出后触发 deactivated
再次进入：会触发 activated；事件挂载的方法等，只执行一次的放在 mounted 中；组件每次进去执行的方法放在 activated 中
props属性
include - 字符串或正则表达式。只有名称匹配的组件会被缓存
exclude - 字符串或正则表达式。任何名称匹配的组件都不会被缓存。
max - 数字。最多可以缓存多少组件实例。
项目实践

<keep-alive>包裹动态组件时，会缓存不活动的组件实例，而不是销毁它们。和 <transition> 相似，<keep-alive> 是一个抽象组件：它自身不会渲染一个 DOM 元素，也不会出现在父组件链中。

1. 使用 router.meta 属性，预先定义需要缓存的组件
<keep-alive>
    <router-view v-if="$route.meta.keepAlive"></router-view>>
</keep-alive>
<router-view v-if="!$route.meta.keepAlive"></router-view>
路由部分：

routes: [
    {
      path: '/test1',
      component: test1,
      meta: { keepAlive: true }     // 需要缓存
    },
    {
      path: '/test2',
      component: test2,
      meta: { keepAlive: false}    // 不需要缓存
    },
test1 组件会被缓存，而 test2 组件不会被缓存。

2. 动态缓存 router-view 里面的部分组件页面
如果只想 router-view 里面某个、或某些页面组件被缓存，通常有如下两种办法：

使用 include/exclude 来实现
配合 router.meta 属性来实现
1）. 使用 include/exclude 来实现，每个组件中需要加 name 来匹配
include：只有匹配的组件会被缓存（支持字符串或正则表达）
exclude：任何匹配的组件都不会被缓存（支持字符串或正则表达）
// 只缓存 name 为 index 的组件
<keep-alive include="index">
  <router-view/>
</keep-alive>

// 不缓存 name 为 index 的组件
<keep-alive exclude="index">
  <router-view/>
</keep-alive>

// 只缓存 name 为 index 或 hello 的组件
<keep-alive include="index,hello">
  <router-view/>
</keep-alive>

// 只缓存以 in 开头的组件（使用正则表达式，需使用 v-bind）
<keep-alive :include="/^in.*/">
  <router-view/>
</keep-alive>

// 也可以动态绑定需要缓存的组件（tagsList：存储组件name值的数组，数组是js动态控制的）
<keep-alive :include="tagsList">
  <router-view/>
</keep-alive>
2）. 配合 router.meta 属性来实现
主要依赖 beforeRouteLeave函数动态设置 meta.keepAlive，示例代码如下：


export default {
  name: 'hello',
  //keep-alive钩子函数：组件被激活时调用
  activated() {
    console.log('首页被激活');
  },
  //keep-alive钩子函数：组件消失，被缓存时调用
  deactivated() {
    console.log('首页被缓存');
  },
  beforeRouteLeave(to, from, next) {
    //设置下一个路由的meta（即首页）
    to.meta.keepAlive = true;  // 让首页缓存，即不刷新
    next();
  }
}
</script>



实现原理：
- [keep-alive](https://ustbhuangyi.github.io/vue-analysis/v2/extend/keep-alive.html)
- [聊聊keep-alive组件的使用及其实现原理](https://github.com/answershuto/learnVue/blob/master/docs/%E8%81%8A%E8%81%8Akeep-alive%E7%BB%84%E4%BB%B6%E7%9A%84%E4%BD%BF%E7%94%A8%E5%8F%8A%E5%85%B6%E5%AE%9E%E7%8E%B0%E5%8E%9F%E7%90%86.MarkDown)

## 组件中 data 为什么是一个函数

为什么组件中的 `data` 必须是一个函数，然后 return 一个对象，而 `new Vue` 实例里，`data` 可以直接是一个对象？

因为组件是用来复用的，且 JS 里**对象是引用关系**，如果组件中 `data` 是一个对象，那么这样作用域没有隔离，子组件中的 `data` 属性值会相互影响，如果组件中 `data` 选项是一个函数，那么每个实例可以维护一份被返回对象的独立的拷贝，组件实例之间的 `data` 属性值不会互相影响；而 `new Vue` 的实例，是不会被复用的，因此不存在引用对象的问题。

## 父子组件钩子函数执行顺序

Vue 的父组件和子组件生命周期钩子函数执行顺序可以归类为以下 4 部分：


- 加载渲染过程

父 `beforeCreate` -> 父 `created` -> 父 `beforeMount` -> 子 `beforeCreate` -> 子 `created` -> 子 `beforeMount` -> 子 `mounted` -> 父 `mounted`

- 子组件更新过程

父 `beforeUpdate` -> 子 `beforeUpdate` -> 子 `updated` -> 父 `updated`

- 父组件更新过程

父 `beforeUpdate` -> 父 `updated`

- 销毁过程

父 `beforeDestroy` -> 子 `beforeDestroy` -> 子 `destroyed` -> 父 `destroyed`

## 父组件监听子组件的生命周期

比如有父组件 `Parent` 和子组件 `Child`，如果父组件监听到子组件挂载 `mounted` 就做一些逻辑处理，可以通过以下写法实现：

```html
// Parent.vue
<Child @mounted="doSomething"/></Child>
    
// Child.vue
<script>
mounted() {
    this.$emit("mounted");
}
</script>
```

以上需要手动通过 `$emit` 触发父组件的事件，更简单的方式可以在父组件引用子组件时通过 `@hook` 来监听即可，如下所示：

```html
//  Parent.vue
<Child @hook:mounted="doSomething" ></Child>

<script>
doSomething() {
   console.log('父组件监听到 mounted 钩子函数 ...');
}
</script>

//  Child.vue
<script>
mounted(){
   console.log('子组件触发 mounted 钩子函数 ...');
},
</script>
    
// 以上输出顺序为：
// 子组件触发 mounted 钩子函数 ...
// 父组件监听到 mounted 钩子函数 ...
```

当然 `@hook` 方法不仅仅是可以监听 `mounted`，其它的生命周期事件，例如：`created`，`updated` 等都可以监听。

