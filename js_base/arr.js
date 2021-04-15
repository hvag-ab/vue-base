// join 数组 - string
var arr = [1,2,3];
console.log(arr.join()); 　　　　// 1,2,3
console.log(arr.join("-")); 　　// 1-2-3
console.log(arr); 　　　　　　　　// [1, 2, 3]（原数组不变）

// push or pop  尾部添加or尾部删除
var arr = ["Lily","lucy","Tom"];
var count = arr.push("Jack","Sean");
console.log(count); 　　　　　　　　　　// 5
console.log(arr); 　　　　　　　　　　　// ["Lily", "lucy", "Tom", "Jack", "Sean"]
var item = arr.pop();
console.log(item); 　　　　　　　　　　 // Sean
console.log(arr); 　　　　　　　　　　  // ["Lily", "lucy", "Tom", "Jack"]


// shift or unshift 头部删除 or 头部添加
var arr = ["Lily","lucy","Tom"];
var count = arr.unshift("Jack","Sean");
console.log(count); 　　　　　　　　　　　　　　// 5
console.log(arr); 　　　　　　　　　　　　　　　//["Jack", "Sean", "Lily", "lucy", "Tom"]
var item = arr.shift();
console.log(item); 　　　　　　　　　　　　　　// Jack
console.log(arr); 　　　　　　　　　　　　　　 // ["Sean", "Lily", "lucy", "Tom"]


// sort
var array = [10, 1, 3, 4, 20, 4, 25, 8];
// 升序 a-b < 0   a将排到b的前面，按照a的大小来排序的 
// 比如被减数a是10，减数是20 10-20 < 0 被减数a(10)在减数b(20)前面   
array.sort((a, b) => a - b );
console.log(array); // [1,3,4,4,8,10,20,25];

// 降序
array.sort((a, b) => b - a );
console.log(array); // [25,20,10,8,4,4,3,1];


// slice 切片 等价于python的切片[:] 浅拷贝
var arr = [1,3,5,7,9,11];
var arrCopy = arr.slice(1);
var arrCopy2 = arr.slice(1,4);
var arrCopy3 = arr.slice(1,-2);
var arrCopy4 = arr.slice(-4,-1);
console.log(arr); 　　　　　　　　　　　　　　//[1, 3, 5, 7, 9, 11](原数组没变)
console.log(arrCopy); 　　　　　　　　　　　 //[3, 5, 7, 9, 11]
console.log(arrCopy2); 　　　　　　　　　　　//[3, 5, 7]
console.log(arrCopy3); 　　　　　　　　　　　//[3, 5, 7]
console.log(arrCopy4); 　　　　　　　　　　　//[5, 7, 9]

// indexOf or lastIndexOf 索引从0开始计算
var arr = [1,3,5,7,7,5,3,1];
console.log(arr.indexOf(5)); 　　　　　　//2
console.log(arr.lastIndexOf(5)); 　　　 //5
console.log(arr.indexOf(5,2)); 　　　　 //2
console.log(arr.lastIndexOf(5,4)); 　　//2
console.log(arr.indexOf("5")); 　　　　 //-1

// forEach
var arr = [1, 2, 3, 4, 5];
arr.forEach(function(value, index, array){
console.log(value + '|' + index + '|' + (array === arr));
});
// 输出为：
// 1|0|true
// 2|1|true
// 3|2|true
// 4|3|true
// 5|4|true

// map
var arr = [1, 2, 3, 4, 5];
var arr2 = arr.map((item)=>{
return item*item;
});
console.log(arr2); 　　　　　　　　//[1, 4, 9, 16, 25]

// filter
var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// index可以省略
var arr2 = arr.filter(function(x, index) {
return index % 3 === 0 || x >= 8;
}); 
console.log(arr2); 　　　　　　　　//[1, 4, 7, 8, 9, 10]

// every 等价于python的all
var arr = [1, 2, 3, 4, 5];
var arr2 = arr.every(function(x) {
return x < 10;
}); 
console.log(arr2); 　　　　　　　　//true
var arr3 = arr.every(function(x) {
return x < 3;
}); 
console.log(arr3); 　　　　　　　　// false

// some 等价于python的 any
var arr = [1, 2, 3, 4, 5];
var arr2 = arr.some(function(x) {
return x < 3;
}); 
console.log(arr2); 　　　　　　　　//true
var arr3 = arr.some(function(x) {
return x < 1;
}); 
console.log(arr3); 　　　　　　　　// false

//扩展运算符...
//因为ES6的语法更简洁易懂，所以现在合并数组我大部分采用...来处理，...运算符可以实现cancat的每个栗子，且更简洁和具有高度自定义数组元素位置的效果。

let a = [2, 3, 4, 5]
let b = [4, ...a, 4, 4]
console.log(a, b); //  [2, 3, 4, 5] [4,2,3,4,5,4,4]

//splice()
//定义： 向/从数组中添加/删除项目，然后返回被删除的项目

//语法： array.splice(index,howmany,item1,.....,itemX)

//参数:

//index：必需。整数，规定添加/删除项目的位置，使用负数可从数组结尾处规定位置。
//howmany：可选。要删除的项目数量。如果设置为 0，则不会删除项目。
//item1, ..., itemX： 可选。向数组添加的新项目。
//返回值: 如果有元素被删除,返回包含被删除项目的新数组。

// 删除
let a = [1, 2, 3, 4, 5, 6, 7];
let item = a.splice(0, 3); // [1,2,3]
console.log(a); // [4,5,6,7]
// 从数组下标0开始，删除3个元素
let item = a.splice(-1, 3); // [7]
// 从最后一个元素开始删除3个元素，因为最后一个元素，所以只删除了7

// 删除并添加
let a = [1, 2, 3, 4, 5, 6, 7];
let item = a.splice(0,3,'添加'); // [1,2,3]
console.log(a); // ['添加',4,5,6,7]
// 从数组下标0开始，删除3个元素，并添加元素'添加'

let b = [1, 2, 3, 4, 5, 6, 7];
let item = b.splice(-2,3,'添加1','添加2'); // [6,7]
console.log(b); // [1,2,3,4,5,'添加1','添加2']
// 从数组最后第二个元素开始，删除3个元素，并添加两个元素'添加1'、'添加2'

// 不删除只添加
let a = [1, 2, 3, 4, 5, 6, 7];
let item = a.splice(0, 0, '添加1', '添加2'); // [] 没有删除元素，返回空数组
console.log(a); // ['添加1','添加2',1,2,3,4,5,6,7]

let b = [1, 2, 3, 4, 5, 6, 7];
let item = b.splice(-1, 0, '添加1', '添加2'); // [] 没有删除元素，返回空数组
console.log(b); // [1,2,3,4,5,6,'添加1','添加2',7] 在最后一个元素的前面添加两个元素
