## Promise
* Promise简介
    * promise是ES6引入的进行异步编程的新的解决方案，从语法上来说就是一个构造函数，可以封装异步的任务，并且可以对结果进行处理
    * 好处：可以解决回调地狱的问题，并且在指定回调和进行错误处理方面要更加灵活和方便
* **第一章：准备**

* **第二章:Promise的理解和使用**
    * 2.1 Promise是什么？
        * 2.1.1 理解
            * 1. 抽象表达：
                * 1) Promise是一门新的技术(ES6规范)
                * 2) Promise是JS中进行异步编程的*新解决方案*
                    * 备注：旧方案是单纯使用回调函数
            * 2. 具体表达：
                * 1) 从语法上来说：Promise是一个构造函数
                * 2) 从功能上来说：Promise对象用来封装一个异步操作并可以获取其成功/失败的结果值
            * 异步编程
                * fs文件操作
                    * fs是Node.js下面的一个模块，可以对计算机的磁盘进行读写操作
                    * ```
                      require('fs').readFile('./index.html',(err,data)=>{})
                      ```
                * 数据库操作，如:MongoDB，马赛ko等数据库操作
                * AJAX网络请求
                    * ```
                        $.get('/server',(data)=>{})
                      ```
                * setTimeout(定时器)
                    * ```
                        setTimeout(()=>{},2000)
                      ```
        * 2.1.2 promise的状态改变
            * PromiseState 的状态
                * 实例对象中的一个属性，叫[PromiseState]，它有三个值：
                    * rending 未决定的/初始化的默认值就是它
                    * resolved / funfilled 成功
                    * rejected 失败
                * 状态是什么？
                    * 可以通过两个参数(resolve和reject)改为成功和失败。状态是promise对象当中的一个属性，准确来说promise实例对象当中的属性，这个属性名叫PromiseState
                * 状态改变的两种情况：
                    * 1. pending变为resolved
                    * 2. pending变为rejected
                    * 说明：
                        * 只有这两种，且一个promise对象只能改变一次，也就是说状态值从pending变成resolved/rejected之后不能再变了
                        * 无论变为成功还是失败，都会有一个结果数据
                        * 成功的结果数据一般称为value,失败的结果数据一般称为reason
                        * 不能由成功直接变为失败，也不能直接从失败变为成功
            * Promise对象的值 [PromiseResult]，实例对象中的另一个属性
                * 这里存储的是promise对象异步任务*成功/失败*的结果
                * resolve/reject 这两个函数可以对实例对象中的[PromiseResult]这个值进行修改或赋值的。在这两个函数中设置完毕后，可以在后续then方法回调(value和reason回调)当中把值取出来，并进行相应的操作


    * 2.2为什么要用Promise？
        * 2.2.1 指定回调函数的方式更加灵活
            * 1. 旧的：必须在启动异步任务前指定
            * 2. promise：启动异步任务=>返回promise对象=>给promise对象绑定回调函数(甚至可以在异步任务结束后指定单/多个)
        * 2.2.2 支持链式调用，可以解决回调地狱问题
            * 1. 什么是回调地狱？
                * 回调函数嵌套使用，外部回调函数异步执行的结果是嵌套的回调执行的条件
            * 2. 回调地狱的缺点？
                * 不便于阅读
                * 不便于异常处理
            * 3. 解决方案？
                * promise链式调用

## 总结
* Promise是一个构造函数，所以可以对其进行对象的实例化，所以可以```const p=new Promise()```这样使用。而Promise在实例化的时候需要接收一个参数，这个参数是函数类型的值，且这个当参数的函数还有两个形参，分别是resolve和reject
* 后续想要使用promise，不需要对每一个方法进行手动封装，可以借助 util.promisify 方法，将原来的回调函数风格的方法转变成promise风格的函数
* 
