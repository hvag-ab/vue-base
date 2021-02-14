for1: (array) => {
    // var array = [1,2,3,4,5,6,7]; 
    for (var i = 0; i < array.length; i++) {
        console.log(i, array[i]);
    }
}

for2: (array) => {
    // var array = [1,2,3,4,5,6,7];  
    for (let index in array) {
        console.log(index, array[index]);
    };
}

// 等价python的 for 。。 in
for3: (array) => {
    for (let v of array) {
        console.log(v);
    };
}

for4: (array) => {
    array.forEach(v => {
        console.log(v);
    });

    // array.forEach((v,key) => {
    //     console.log(v,key);
    // });
}

let a = [1,2,3,4];
let b = {
    a: 1,
    b: 2,
    c: 3,
    d: 4
}

for( let k of a.keys()){
    console.log( k )  // 0,1,2,3
}
for( let v of a.values()){
    console.log( v )  // 1,2,3,4
}
for( let [k, v] of a.entries()){
    console.log( k, v)  // [0,1],[1,2],[2,3],[3,4]
}

for(let k of Object.keys(b)){
    console.log( k )  //a,b,c,d
}
for(let v of Object.values(b)){
    console.log( v )  //1,2,3,4
}
for(let [k, v] of Object.entries(b)){
    console.log( k, v )  //[a,1],[b,2],[c,3],[d,4]
}


const obj = {
    id:1,
    name:'hvag',
    age:18}

for(let key  in obj){
    console.log(key + '---' + obj[key])
}


// vue v-for


// data:{
//     list:[1,2,3,4,5,6],
//     listObj:[
//       {id:1, name:'zs1'},
//       {id:2, name:'zs2'},
//       {id:3, name:'zs3'},
//       {id:4, name:'zs4'},
//       {id:5, name:'zs5'},
//       {id:6, name:'zs6'},
//     ]

// }

//<p v-for="(item,index) in list" >--索引值--{{index}}   --每一项--{{item}}</p>

//<p v-for="(user,i) in listObj">--id--{{user.id}}   --姓名--{{user.name}}</p>


// data:{
//     user:{
//       id:1,
//       name:'托尼.贾',
//       gender:'男'
//     }
// }
// 在html中使用 v-for 指令渲染
// <p v-for="(val,key,index) in user">--键是--{{key}}--值是--{{val}}</p>