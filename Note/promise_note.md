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
        * 2.1.3 promise的基本流程
            * ![promise基本流程图](images/promise%E5%9F%BA%E6%9C%AC%E6%B5%81%E7%A8%8B%E5%9B%BE.PNG)
            * ![promise基本流程详细版](images/promise%E8%BF%90%E8%A1%8C%E5%9F%BA%E6%9C%AC%E6%B5%81%E7%A8%8B%E8%AF%A6%E7%BB%86%E7%89%88.PNG)
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
    * 如何使用Promise？
        * 2.3.1 API
            * 1. Promise构造函数：Promise(executor){}
                * 可以通过new Promise()来实例化对象，实例化之后需要接收一个参数，这个参数的类型：
                    * 1) executor函数：执行器 (resolve,reject)=>{}
                    * 2) resolve函数：内部定义成功时我们调用的函数 value=>{}
                    * 3) reject函数：内部定义失败时我们调用的函数 reason=>{}
                    * 说明：executor会在Promise内部立即同步调用，异步操作在执行器中执行
            * 2. Promise.prototype.then方法：(onResolved,onRejected)=>{}
                * 1) onResolved函数：成功的回调函数 (value)=>{}
                * 2) onRejected函数：失败的回调函数 (reason)=>{}
                * 说明：指定用于得到成功value的成功回调和用于得到失败reason的失败回调返回一个新的promise对象
            * 3. Promise.prototype.catch方法：(onRejected)=>{}  --专门用来指定失败的回调函数
                * 1) onRejected函数：失败的回调函数 (reason)=>{}
                * 说明：then()的语法糖，相当于：then(undefined,onRejected)
            * 4. Promise.resolve方法：(value)=>{}
                * 1) value：成功的数据或promise对象
                * 说明：
                    * 返回一个成功/失败的promise对象，它的作用就是快速得到promise对象，并且能封装一个值，还能把这个值转化为promise对象
                    * 相较于then/catch方法，resolve方法是属于Promise这个函数对象的，不属于实例对象
                    * 如果传入的参数为 非promise类型的对象，则返回的结果为成功promise对象
                        * ```
                            let p1=Promise.resolve(undefined)
                            console.log(p1);
                          ```
                        * ![写了什么就输出什么](images/%E5%86%99%E4%BA%86%E4%BB%80%E4%B9%88%E5%80%BC%E5%B0%B1%E8%BE%93%E5%87%BA%E4%BB%80%E4%B9%88.PNG)
                    * 如果传入的参数为promise对象，则参数的结果决定了resolve的结果
                        * ```
                            let p2=Promise.resolve(new Promise((resolve,reject)=>{
                                // resolve('OK')
                                reject('error')
                            }))
                            console.log(p2)
                          ```
                        * ![成功](images/%E6%A0%B9%E6%8D%AE%E5%8F%82%E6%95%B0%E4%B8%BApromise%E5%AF%B9%E8%B1%A1%E7%9A%84%E7%BB%93%E6%9E%9C%E5%86%B3%E5%AE%9Aresolve%E6%96%B9%E6%B3%95%E7%9A%84%E7%BB%93%E6%9E%9C(%E6%88%90%E5%8A%9F).PNG)
                        * ![失败](images/%E6%A0%B9%E6%8D%AE%E5%8F%82%E6%95%B0%E4%B8%BApromise%E5%AF%B9%E8%B1%A1%E7%9A%84%E7%BB%93%E6%9E%9C%E5%86%B3%E5%AE%9Aresolve%E6%96%B9%E6%B3%95%E7%9A%84%E7%BB%93%E6%9E%9C(%E5%A4%B1%E8%B4%A5).PNG)
                        * 结果为失败时，可以用catch()传入一个失败的回调，可以对失败的结果进行处理，报错就会消失
                            * ```
                                let p2=Promise.resolve(new Promise((resolve,reject)=>{
                                    // resolve('OK')
                                    reject('error')
                                }))
                                console.log(p2);
                                p2.catch(reason=>{
                                    console.log(reason);
                                })
                              ```
                            * ![上述代码失败结果处理后的输出](images/%E5%AF%B9%E4%BA%8E%E5%A4%B1%E8%B4%A5%E7%BB%93%E6%9E%9C%E7%9A%84%E5%A4%84%E7%90%86.PNG)
            * 5. Promise.reject方法：(reason)=>{}
                * 1) reason：失败的原因
                * 说明：返回一个失败的promise对象
                * reject方法和上面的resolve方法一样，属于Promise这个函数对象，不属于实例对象。作用为快速返回一个失败的promise对象，并封装一个值，把这个值转化为promise对象
                * 在这个方法里传递什么类型的值，返回的都是失败的结果(就是报错，但是会告诉你传递的值)
                    * ```
                        let p=Promise.reject(123)
                        let p2=Promise.reject('hahahahhaah')
                        let p3=Promise.reject(new Promise((resolve,reject)=>{
                            resolve(undefined,'undefined')
                        }))
                        console.log(p3);
                      ```
                    * ![无视传递的值类型，一律返回失败的结果](images/%E6%97%A0%E8%A7%86%E4%BC%A0%E5%85%A5%E7%9A%84%E5%80%BC%E7%B1%BB%E5%9E%8B%EF%BC%8C%E7%BB%9F%E7%BB%9F%E8%BF%94%E5%9B%9E%E5%A4%B1%E8%B4%A5%E7%9A%84%E7%BB%93%E6%9E%9C.PNG)
                    * 上述代码和图片中比较特殊的就是p3对象，p3对象的reject方法中传递的参数是promise对象，并且这个做参数的promise对象执行的是其成功的参数。但最后的结果并不会有所变化，依旧输出失败的结果(结果为Promise，就是做参数的那个Promise)，PromiseState依旧是rejected，
            * 6. Promise.all方法：(promises)=>{}
                * 1) promises：包含n个promise的数组
                * 说明：返回一个新的promise，只有所有的promise否成功才成功，只要有一个失败了就直接返回失败
            * 7. Promie.race方法：(promise)=>{}
                * 1) promises：包含n个promise的数据
                * 说明：返回一个新的promise，第一个完成的promise的结果状态就是最终的结果状态

## 总结
* Promise是一个构造函数，所以可以对其进行对象的实例化，所以可以```const p=new Promise()```这样使用。而Promise在实例化的时候需要接收一个参数，这个参数是函数类型的值，且这个当参数的函数还有两个形参，分别是resolve和reject
* 后续想要使用promise，不需要对每一个方法进行手动封装，可以借助 util.promisify 方法，将原来的回调函数风格的方法转变成promise风格的函数
* 
