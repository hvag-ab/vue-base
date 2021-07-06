/**
 * 节流
 * 
 *  使用场景：鼠标不断点击触发，mousedown(单位时间内只触发一次)

    原理：单位时间内连续触发，但是只会执行一次，比如事件在300秒内不断触发点击事件，那么只会执行一次，到下一个300s开始计时的时候，就会在下一个300s内再执行一次；也就是说600s连续触发事件但是只会执行2次。
 * 
 * @param {Function} func 要执行的回调函数 
 * @param {Number} wait 延时的时间
 * @param {Boolean} immediate 是否立即执行
 * @return null
 */
 let timer, flag;
 export function throttle(func, wait = 3000, immediate = true) {
     if (immediate) {
         if (!flag) {
             flag = true;
             // 如果是立即执行，则在wait毫秒内开始时执行
             typeof func === 'function' && func();
             timer = setTimeout(() => {
                 flag = false;
             }, wait);
         }
     } else {
         if (!flag) {
             flag = true
             // 如果是非立即执行，则在wait毫秒内的结束处执行
             timer = setTimeout(() => {
                 flag = false
                 typeof func === 'function' && func();
             }, wait);
         }
         
     }
 };

/*
eg：
<template>
    <div>
        <input style="width:160px;" placeholder="请输入内容" v-model="data">
        <button @click="setValueNull">提交</button>
    </div>
</template>
<script>
import { Debounce } from '@/utils/debounce'
import { throttle } from '@/utils/throttle'
export default {
    data(){
       return {
           data:''
       }
    },
     methods:{
        getTableListData(){
              console.log(this.data)
        },
        //监听用户输入值变化，延迟调用请求函数（getTableListData）
        setValueNull(){
            throttle(this.getTableListData)
        }
    }
}
</script>


*/
