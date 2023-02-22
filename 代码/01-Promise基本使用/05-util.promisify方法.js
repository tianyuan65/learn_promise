/*
 * util.promisify方法
 */
// 引入util模块
const util=require('util')
// 引入fs模块，下一行代码就是把readFile传递给promisify的操作
const fs=require('fs')
// 返回一个新的函数，这个函数在调用之后，返回的结果就是Promise的对象
let mineReadFile=util.promisify(fs.readFile)
// 读取文件并调用then，对结果进行处理
mineReadFile('./resource/content.txt').then(value=>{
console.log(value.toString());
})
// 后续想要使用promise，不需要对每一个方法进行手动封装，可以借助 util.promisify 方法，将原来的回调函数风格的方法转变成promise风格的函数
