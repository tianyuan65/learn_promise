// 
const fs=require('fs')

// 回调函数形式
// err是出现错误时会被调用的参数，data是读取到的结果
// fs.readFile('./resource/content.txt',(err,data)=>{
    // 如果出错，则抛出错误
    // if(err)  throw err;
    // 输出文件内容
    // console.log(data.toString());
// })

// Promise形式
let p=new Promise((resolve,reject)=>{
    fs.readFile('./resource/content.txt',(err,data)=>{
        // 如果出错/失败就调用reject，并把失败的结果传递进去
        if(err) reject(err)
        // 如果成功就调用resolve，并把成功的结果/数据(也就是文件里的内容)传递进去
        resolve(data)
    })
})

// 调用then，来对结果进行一些处理
p.then(value=>{
    console.log(value.toString());
},reason=>{
    console.log(reason);
})
