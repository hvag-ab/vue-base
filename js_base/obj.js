

const proxy = { 'p' : 3}
const m = {'x':4}


const obj = {
    'a' :1 ,
    'b' : 'hvag',
    ...proxy,
    ...m
}


console.log(obj)

console.log({m})

console.log(Object.assign(proxy,m))

console.log(Object.keys(obj))

console.log(Object.values(obj))

for (let k in obj){
    console.log(k)
}

// 对象解构 可以直接拿 对象的key 
const { a, b } = obj
console.log(a,b)

// 对象 如果key 和变量名相同 可以直接写一个 例如
const p = 'ab'
const q = 'cd'

const ob = {
    p,
    q
} // => ob = {p:p,q:q}

console.log(ob)