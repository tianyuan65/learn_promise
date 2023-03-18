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
                * 数据库操作，如:MongoDB，Mysql(马赛ko)等数据库操作
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
                    * pending 未决定的/初始化的默认值就是它
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
    * 2.2 为什么要用Promise？
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
    * 2.3 如何使用Promise？
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
                * 说明：返回一个新的promise(其状态由数组中的promise的状态，也就是由promises来决定)，只有所有的promise否成功才成功，只要有一个失败了就直接返回失败，而且成功的结果是每一个promise对象他们成功的结果组成的数组，而失败的结果是这个数组当中失败的那一个对象的结果
                * 数组里的每一个promise对象都是成功，则返回的promise对象才是成功，但凡合格数组里有一个是失败的对象，最后也只返回失败的对象的结果
                    * ```
                        let p1=new Promise((resolve,reject)=>{
                            resolve('ok')
                        })
                        let p2=Promise.reject('歪了歪了')
                        let p3=Promise.resolve('出了出了！！！！！')

                        const result=Promise.all([p1,p2,p3])
                        console.log(result);
                      ```
                    * ![看上面的代码，返回的结果是成功](images/%E6%95%B0%E7%BB%84%E9%87%8C%E7%9A%84%E5%AF%B9%E8%B1%A1%E9%83%BD%E6%98%AF%E6%88%90%E5%8A%9F%E7%9A%84%E7%BB%93%E6%9E%9C.PNG)
                    * ```
                        let p1=new Promise((resolve,reject)=>{
                            resolve('ok')
                        })
                        let p2=Promise.reject('歪了歪了')

                        let p3=Promise.resolve('出了出了！！！！！')

                        const result=Promise.all([p1,p2,p3])
                        console.log(result);
                      ```
                    * ![看上面的代码，这回返回的是失败，且返回结果是结果为失败的对象的结果](images/%E6%95%B0%E7%BB%84%E9%87%8C%E6%9C%89%E7%BB%93%E6%9E%9C%E4%B8%BA%E5%A4%B1%E8%B4%A5%E7%9A%84%E5%AF%B9%E8%B1%A1%20%E5%85%B7%E4%BD%93%E7%9C%8BPromiseResult.PNG)
            * 7. Promie.race方法：(promise)=>{}
                * 1) promises：包含n个promise的数组
                * 说明：返回一个新的promise，第一个完成的promise的结果状态就是最终的结果状态，谁先改变状态，谁就改变race方法的返回结果
                    * ```
                        let p1=new Promise((resolve,reject)=>{
                            resolve('ok')
                        })
                        let p2=Promise.resolve('Success')
                        let p3=Promise.resolve('出了出了！！！！！')

                        // 调用race方法
                        const result=Promise.race([p1,p2,p3])
                        console.log(result);
                      ```
                    * ![谁先改变状态，谁就改变返回结果，这里返回的结果是p1](images/%E8%B0%81%E5%85%88%E6%94%B9%E5%8F%98%E7%8A%B6%E6%80%81%EF%BC%8C%E8%B0%81%E5%B0%B1%E6%94%B9%E5%8F%98%E8%BF%94%E5%9B%9E%E7%BB%93%E6%9E%9C.PNG)
                    * ```
                        let p1=new Promise((resolve,reject)=>{
                            setTimeout(()=>{
                                resolve('ok')
                            },1000)
                            })
                            let p2=Promise.resolve('Success')
                            let p3=Promise.resolve('出了出了！！！！！')

                            // 调用race方法
                            const result=Promise.race([p1,p2,p3])
                            console.log(result);
                      ```
                    * ![添加一个异步任务，一秒后才输出，此时第一个改变状态的就不是p1](images/%E6%B7%BB%E5%8A%A0%E5%BC%82%E6%AD%A5%E4%BB%BB%E5%8A%A1%E5%90%8E%E7%AC%AC%E4%B8%80%E4%B8%AA%E6%94%B9%E5%8F%98%E7%8A%B6%E6%80%81%E7%9A%84%E5%B0%B1%E4%B8%8D%E6%98%AFp1%E4%BA%86.PNG)
        * 2.3.2 promise的几个关键问题
            * 1. 如何改变promise的状态？
                * 1) resolve(value)：如果当前是pending就会变为resolved
                * 2) reject(reason)：如果当前是pending就会变为rejected
                * 3) 抛出异常：如果当前是pending就会变为rejected
            * 2. 一个promise指定多个成功/失败回调函数，都会调用吗？(翻译：如果使用then方法为一个promise对象指定多个回调，这些回调是不是都会执行？)
                * *这里的指定回调用谁指定？ then方法*
                * 当promise改变为对应状态时会调用(如果为一个promise对象指定多个回调，当它的状态改变之后，与之对应的回调函数就都会执行)
                    * ```
                        let p=new Promise((resolve,reject)=>{
                            resolve('OK')
                        })
                        
                        // 指定回调  -1
                        p.then(value=>{
                            console.log(value);
                        })

                        // 指定回调  -2
                        p.then(value=>{
                            alert(value)
                        })
                      ```
                    * ![状态改变后，对应的回调会依次执行，但若状态没有改变，对应的回调就不会执行](images/%E7%8A%B6%E6%80%81%E6%94%B9%E5%8F%98%E5%90%8E%E4%B8%8E%E4%B9%8B%E5%AF%B9%E5%BA%94%E7%9A%84%E5%9B%9E%E8%B0%83%E9%83%BD%E4%BC%9A%E6%89%A7%E8%A1%8C.PNG)
            * 3. 改变promise状态(以resolve()为例)和指定回调函数(用then()或catch()为例)谁先谁后？
                * 1) 都有可能，正常情况下是先指定回调再改变状态，但也可以先改变状态再指定回调
                * 2) 如何先改状态再指定回调？
                    * ① 当执行器函数当中的任务是同步任务的时候，在执行器中直接调用resolve()/reject()
                        * ```
                            console.log(1);
                            let p= new Promise((resolve,reject)=>{
                                console.log(2);
                                resolve('OK')
                                console.log(3);
                            })
                            console.log(4);
                            p.then(value=>{
                                console.log(5);
                                console.log(value);
                            },reason=>{

                            })
                          ```
                        * ![先该状态，再指定回调](images/%E5%85%88%E6%94%B9%E7%8A%B6%E6%80%81%EF%BC%8C%E5%90%8E%E6%8C%87%E5%AE%9A%E5%9B%9E%E8%B0%83.PNG)
                    * ② 延迟更长时间才调用then()，可以给then方法添加一个定时器
                * 3) 如何先指定回调再改变状态？(当使用promise时这种情况是居多的)
                    * 在执行器((resolve,reject)=>{})中设置一个异步任务(例如：setTimeout)，在异步任务中调用resolve()/reject()的时候就会先指定回调，后改变状态
                    * ```
                        console.log(1);
                        let p= new Promise((resolve,reject)=>{
                            console.log(2);
                            // setTimeout(()=>{
                                resolve('OK')
                                console.log(3);
                            // },1000)
                        })
                        console.log(4);
                        p.then(value=>{
                            console.log(5);
                            console.log(value);
                        },reason=>{

                        })
                      ```
                    * ![先指定回调，后盖状态](images/%E5%85%88%E6%8C%87%E5%AE%9A%E5%9B%9E%E8%B0%83%EF%BC%8C%E5%90%8E%E6%94%B9%E7%8A%B6%E6%80%81.PNG)
                * 4) 什么时候才能得到数据？(翻译：then()中的回调函数什么时候执行？)
                    * ① 如果先指定的回调，那当状态发生改变时，回调函数就会调用，得到数据
                        * 也就是当在执行器中，有一个异步任务的时候，回调的执行时机是，等异步任务中的resolve()/reject()调用完以后，再去执行回调函数，并处理成功或失败的结果
                    * ② 如果先改变的状态，那当指定回调时，回调函数就会调用，得到数据
                        * 当在执行器中，直接调用resolve()的时候(就是同步任务的时候，看文件的话就是，03执行器里没有定时器的时候)，then方法在调用的时候就会执行回调函数，来处理成功或失败的结果
            * 4. promise.then()返回的新promise的结果状态由什么决定？
                * 1) 简单表达：由then()指定的回调函数执行的结果决定
                * 2) 详细表达：
                    * ① 如果抛出异常，新promise变为rejected，reason为抛出的异常
                        * ![PromiseState:rejected,PromiseResult:写了啥就是啥](images/%E6%8A%9B%E5%87%BA%E5%BC%82%E5%B8%B8%20new%20promiseState%3Drejected.PNG)
                    * ② 如果返回的是非promise的任意值，新promise变为resolved，value为返回的值
                        * ![PromiseState:funfilled,PromiseResult:写了啥就是啥](images/%E8%BF%94%E5%9B%9E%E7%BB%93%E6%9E%9C%E6%98%AF%E9%9D%9Epromise%E7%B1%BB%E5%9E%8B%E7%9A%84%E5%AF%B9%E8%B1%A1.PNG)
                    * ③ 如果返回的是另一个新promise，此promise的结果就会成为新promise的结果
                        * ![PromiseState:fulfilled/rejected,PromiseResult:写了啥就是啥](images/%E8%BF%94%E5%9B%9E%E7%BB%93%E6%9E%9C%E6%98%AF%E6%96%B0%E7%9A%84promise.PNG)
            * 5. promise如何串联多个操作任务？
                * 1) promise的then()返回结果是一个新的promise，可以开成then()的链式调用
                * 2) 通过then的链式调用串连多个同步/异步任务
                * ```
                    let p=new Promise((resolve,reject)=>{
                        setTimeout(()=>{
                            resolve('OK')
                        },1000)
                    })

                    p.then(value=>{
                        return new Promise((resolve,reject)=>{
                            resolve('success')
                        })
                    }).then(value=>{
                        console.log(value);
                    }).then(value=>{
                        console.log(value);  //undefined
                    })
                  ```
                * *注释：为什么最后一个then方法中回调函数输出的结果是是undefined？*
                    * 看它上一个then方法中回调函数返回的结果是什么？没写，没写就是undefined，且undefined也不是一个promise类型的对象，所以上一个then方法返回结果就是一个成功的promise，成功的结果就是undefined。其原理就是then方法的返回结果是一个promise对象
            * 6. promise异常传透？
                * 1) 当使用promise的then链式调用时，可以在最后指定失败的回调
                    * ```
                        let p=new Promise((resolve,reject)=>{
                            setTimeout(()=>{
                                // resolve('OK')
                                reject('error')
                            },1000)
                        })

                        p.then(value=>{
                            console.log(111);
                        }).then(value=>{
                            console.log(222);
                        }).then(value=>{
                            console.log(333);  
                        }).catch(reason=>{
                            console.warn(reason);
                        })
                      ```
                    * 异步任务中更改的状态会在最后的catch方法中作为结果输出，中间的环节不必指定失败的回调，只需在最后指定失败的回调，即可处理失败的结果，这就叫异常穿透。
                * 2) 前面任何操作出了异常，都会传到最后失败的回调中处理
                    * ```
                        let p=new Promise((resolve,reject)=>{
                            setTimeout(()=>{
                                resolve('OK')
                                // reject('error')
                            },1000)
                        })

                        p.then(value=>{
                            // console.log(111);
                            throw '失败'
                        }).then(value=>{
                            console.log(222);
                        }).then(value=>{
                            console.log(333);  
                        }).catch(reason=>{
                            console.warn(reason);
                        })
                      ```
                    * 即便是在中间的环节(就是在某一个回调函数当中)出现错误，比如抛出错误/返回失败的promise，都不必管，只需在最后使用catch方法来实现对失败的结果的处理。 
            * 7. 中断promise链？
                * 1) 当使用promise的then链式调用时，在中间中断，不再调用后面的回调函数
                * 2) 办法：在回调函数中返回一个pending状态的promise
                * ```
                    let p=new Promise((resolve,reject)=>{
                        setTimeout(()=>{
                            resolve('OK')
                            // reject('error')
                        },1000)
                    })

                    p.then(value=>{
                        console.log(111);
                        // 有且只有一种方式
                        return new Promise(()=>{})
                    }).then(value=>{
                        console.log(222);
                    }).then(value=>{
                        console.log(333);  
                    }).catch(reason=>{
                        console.warn(reason);
                    })
                  ```
                * 上述代码执行后，输出的只有111，因为只有在回调函数中返回一个未定义状态(pending状态)的promise对象，下面then方法中的回调函数才不能对pending状态的promise对象进行调用，最终就只会输出我想要输出的结果

* **第三章：自定义(手写)Promise**
    * 3.1 定义整体结构
        * 1. 初始结构搭建
            * 在框架文件(html文件)中定义一个promise对象，并在js文件中声明一个名为Promise的构造函数。在构造函数中传递一个形参executor，并在函数内调用```executor(resolve,reject)```,因为需要和框架文件中的执行器函数进行同步调用，最后添加then()，以保证正常运行```Promise.prototype.then=function(onResolved,onRejected){}```
        * 2. resolve与reject结构搭建
            * 在构造函数中声明resolve函数和reject函数，值得注意的是，这两个函数都是实参，都是独立的函数，可以自由命名，**但是为了防止混淆，还是该写啥写啥(这是给自己说的，记住了！！！)**
        * 3. resolve与reject代码实现
            * 众所周知，这两个函数有两个属性，PromiseState和PromiseResult，需要给这两个函数各自设置promise对象改变状态时，需要调用其中哪一个函数，并输出相对应的状态和结果。在此处需要注意的是，使用this来添加属性的时候，要格外留意this指向的是谁，在此处this指向的是Window，所以需要保存一下实例对象的this值，```const self=this;```，这样在resolve/reject函数被调用的时候，对象的状态和结果值才不会是初始状态和初始结果值
        * 4. 抛出异常改变状态
            * 在promise对象中抛出一个错误，想要正常输出抛出错误后的promise对象的状态和结果值，就需要在Promise构造函数中调用/执行trycatch函数，将同步调用执行器函数的方法移入。在catch中需要修改promise对象的状态为失败，在此调用reject，且promise对象中抛出的数据(```throw 'Err'```中的Err)就是promise对象失败的结果值，这个结果值会被传递给参数error(就是catch的参数位置上的那个)，所以最终在设置结果的时候，把error交给reject就可以了```reject(error)```
                * ![抛出异常改变状态后输出的对象状态和对象结果值](images/%E6%8A%9B%E5%87%BA%E5%BC%82%E5%B8%B8%E6%94%B9%E5%8F%98%E7%8A%B6%E6%80%81.PNG)
            * 为了和上面的作对比，把内置的引入Promise构造函数的代码注销掉，依然会输出promise对象失败的结果状态和结果值。
                * ![注销引入的Promise构造函数](images/%E6%B3%A8%E9%94%80%E5%BC%95%E5%85%A5Promise%E6%9E%84%E9%80%A0%E5%87%BD%E6%95%B0%E5%90%8E.PNG)
                * 图里可见，PromiseState和PromiseResult被两个中括号包裹，为什么？
                    * 两个中括号表明，这个属性是这个对象内置的，是对象内部的，这些属性无法通过js代码直接对其进行操作
        * 5. 状态只能修改一次
            * 对象里就算同时调用两个方法也只会调用其中之一，也就是对象的结果状态只能由pending被修改为fulfilled或rejected也就是写前面的那个会被调用
        * 6. then方法执行回调
            * Promise.prototype.then=function(){}中的then方法，是由实例化的promise对象调用的.所以在这个函数内部的this就是指向实例对象p(就是实例化的promise对象)的。
            * 成功或失败的判断条件是，promise实例对象的结果值，就是PromiseState为fulfilled或rejected。
            * 框架文件当中调用的promise对象的then方法里的value回调函数的属性和输出的结果值是传递给了形参onResolved。同理，reason回掉函数的属性和输出的结果值传递给了形参onRejected。当onResolved和onRejected作为函数被调用的时候，里面需要传递实参。实参是什么？
                * 实参是回调函数根据promise对象的状态输出的结果值(不论成功的或失败的)，所以实参的位置上传入的就应该是promise对象成功或失败的结果值，成功的结果值被存在实例对象的PromiseResult属性中
                * ![成功](images/then%E6%96%B9%E6%B3%95%E6%89%A7%E8%A1%8C%E5%9B%9E%E8%B0%83-%E6%88%90%E5%8A%9F.PNG)
                * ![失败](images/then%E6%96%B9%E6%B3%95%E6%89%A7%E8%A1%8C%E5%9B%9E%E8%B0%83-%E5%A4%B1%E8%B4%A5.PNG)
                * ![抛出错误](images/then%E6%96%B9%E6%B3%95%E6%89%A7%E8%A1%8C%E5%9B%9E%E8%B0%83-%E6%8A%9B%E5%87%BA%E9%94%99%E8%AF%AF.PNG)
        * 7. 异步任务then方法实现
            * 当有内置的引入的Promise构造函数的代码存在的时候，实例化Promise对象的执行器函数内添加一个异步任务(也就是定时器函数)的话，会发现下面的then方法中回调函数无法调用并输出成功或失败的结果值，为啥呢？
                * 代码在从上往下执行过程中，resolve函数没有执行，因为它需要等1秒后才可以执行(因为它在异步任务里，异步任务是另一条任务线了)，同步代码不会等待它。然后就会执行then方法，promise对象在调用then方法之前它的状态一直没有改变，一直是初始化的pending状态，所以在promise对象进入then方法之中，对状态进行判断的时候，因不满足条件，无法进入任何一个判断中.
            * 所以在then方法中需要保存回调函数，以便于在构造函数中的resolve/reject函数里能够调用成功/失败的回调(因为promise的状态不确定，所以在then方法当中无法执行value/reason这样的回调)。
                * **保存回调函数。**
                    * 在then方法中调用一个回调函数，用来判断pending的状态，当promise对象的状态为pending时，在其中保存回调函数。(就是对应value和reason回调的onResolved和onRejected，并且命名为this.callback)
                * **在构造函数中的resolve/reject函数里能够调用成功/失败的回调**
                    * 在构造函数里声明一个命名为```this.callback```的属性，其属性值为一个空的对象，接着在resolve和reject函数中调用各自的回调函数，并在其中传递成功或失败的结果值，最后在控制台被呈现时，结果值会在刷新页面一秒后输出
                        * ```
                            if(self.callback.onResolved/onRejected){
                                self.callback.onResolved/onRejected(data)
                            }
                          ```
                        * ![成功](images/%E7%94%A8then%E6%96%B9%E6%B3%95%E5%AE%9E%E7%8E%B0%E5%BC%82%E6%AD%A5%E4%BB%BB%E5%8A%A1-%E6%88%90%E5%8A%9F.PNG)
                        * ![失败](images/%E7%94%A8then%E6%96%B9%E6%B3%95%E5%AE%9E%E7%8E%B0%E5%BC%82%E6%AD%A5%E4%BB%BB%E5%8A%A1-%E5%A4%B1%E8%B4%A5.PNG)
                        * ![抛出错误](images/%E7%94%A8then%E6%96%B9%E6%B3%95%E5%AE%9E%E7%8E%B0%E5%BC%82%E6%AD%A5%E4%BB%BB%E5%8A%A1-%E6%8A%9B%E5%87%BA%E9%94%99%E8%AF%AF.PNG)
        * 8. 指定多个回调
            * 当在框架文件中多次调用then方法，就会指定多个回调函数。没有内置的Promise构造函数的引入的话，就会依次调用回调函数并输出设置的结果值。但如果引入了内置的Promise构造函数的话，写在最后的回调函数会把前面执行的回掉函数的结果覆盖掉。就像我写的代码里，只会在弹框中输出，写在前面的，需要在控制台中输出的内容不会呈现。所以要解决这个问题，想要把两次调用then方法的回调都要保存起来，而不是后面的覆盖掉前面的，就需要做些不同的操作。
                * 首先，将原先用来在then方法中保存回调函数的，命名为callback的属性，改名为callbacks，并把结构改成数组的形式，```this.callbacks=[]```。其次，在then方法中保存回掉函数的方式改为 .push()，这一步的意思是，当执行第一个then方法的时候，把两个回调函数，往onResolved和onRejected中压，执行第二个then方法时亦然，不会覆盖掉前一个被保存的回调函数。(题外话：在框架文件中的最后，控制台输出p，就是promise对象，它的状态依然是pending，结果值为null，但因为设置callbacks为数组，所以展开之后会发现callbacks里有两个数组，就是两次then方法被调用后，保存的两次，共两组回调函数，成功的和失败的都有)
                * 最后，在构造函数中的resolve和reject函数内部，需要对callbacks进行遍历，item是一个对象，它的结构是被保存在onResolved/onRejected中的两个回调函数，所以两次then方法中的回调都会执行，并且将结果值以不同的方式输出
                    * ![成功](images/%E6%8C%87%E5%AE%9A%E5%A4%9A%E4%B8%AA%E5%9B%9E%E8%B0%83-%E6%88%90%E5%8A%9F%E7%BB%93%E6%9E%9C.PNG)
                    * ![失败](images/%E6%8C%87%E5%AE%9A%E5%A4%9A%E4%B8%AA%E5%9B%9E%E8%B0%83-%E5%A4%B1%E8%B4%A5%E7%BB%93%E6%9E%9C.PNG)
                * ![虽然叫异步任务回调的执行简略图，单页适用于这个部分](images/%E5%BC%82%E6%AD%A5%E4%BB%BB%E5%8A%A1%E5%9B%9E%E8%B0%83%E7%9A%84%E6%89%A7%E8%A1%8C%E7%AE%80%E7%95%A5%E5%9B%BE.PNG)
        * 9. 同步任务then方法返回结果
            * 标题是什么意思？意思是在执行器函数当中直接通过调用resolve()/reject()/throw来改变状态，此时对then方法的返回结果做实现
                * 首先，设置result为then方法中回调函数的返回结果，```const res=p.then(value=>{},reason=>{}```(复习：then方法的返回结果是由它指定的回调函数的结果决定的，根据代码的话就是，回调函数的结果决定res的结果值是什么)。因为他很方法的返回结果是由它指定的回调函数的结果决定的，那就会有以下两种情况，回调函数中返回的结果是非Promise的结果，那就是成功的；在回调函数中返回的结果是一个新的Promise对象，那么这个结果由新的Promise的结果决定
                * 目前要做到的是根据指定的回调函数的执行结果来改变promise对象的状态(就是js文件的then方法中添加的那个new Promise)。所以其次，在js文件的then方法中返回一个新的Promise之后，在对象状态是成功的判断里，调用成功的回调函数的步骤内部，获取回调函数的执行结果```let result=onResolved(this.PromiseResult)```。
                    * 随后进入执行结果是否为Promise对象的判断中，
                        * ```
                            if(result instanceof Promise){
                                // 如果是Promise类型的对象
                                result.then(v=>{
                                    resolve(v)
                                },r=>{
                                    reject(r)
                                })
                            }else{
                                // 如果不是Promise对象，则结果的对象状态为成功
                                resolve(result)
                            }
                          ```
                        * 如果res结果不是Promise对象，结果的对象状态为成功，到时res的状态就为成功；
                            * ![返回结果为非promise对象，并没有指定结果值](images/%E8%BF%94%E5%9B%9E%E7%BB%93%E6%9E%9C%E4%B8%BA%E9%9D%9Epromise%E5%AF%B9%E8%B1%A1.PNG)
                            * ![返回结果为非promise对象，指定结果值为字符串](images//%E8%BF%94%E5%9B%9E%E7%BB%93%E6%9E%9C%E6%98%AF%E9%9D%9Epromise%E7%B1%BB%E5%9E%8B%E7%9A%84%E5%AF%B9%E8%B1%A1%E4%B9%8B%E8%BF%94%E5%9B%9E%E5%AD%97%E7%AC%A6%E4%B8%B2.PNG)
                        * 如果res结果是Promise对象(那就会导致js文件里result就是Promise对象)，那result就可以调用then方法，result的状态如果是成功的那就调用v回调函数，result的状态是成功的，整体的then方法的结果也就是成功的；result失败则调用r回调函数
                            * ![返回结果为promise类型的对象，且成功](images/%E8%BF%94%E5%9B%9E%E7%BB%93%E6%9E%9C%E4%B8%BApromise%E7%B1%BB%E5%9E%8B%E7%9A%84%E5%AF%B9%E8%B1%A1%E4%B8%94%E6%88%90%E5%8A%9F.PNG)
                            * ![返回结果为promise类型的对象，且成功](images/%E8%BF%94%E5%9B%9E%E7%BB%93%E6%9E%9C%E4%B8%BApromise%E5%AF%B9%E8%B1%A1%E4%BD%86%E5%A4%B1%E8%B4%A5.PNG)
                        * **特殊情况：抛出异常**
                            * 如果是抛出异常，那就是调用失败的回调，这种情况前几课讲了就是用```try{}catch(error){}```
                                * ```
                                    return new Promise((resolve,reject)=>{
                                        // 调用回调函数  PromiseState
                                        if(this.PromiseState==='fulfilled'){
                                            try{
                                                // 获取回调函数的执行结果
                                                let result=onResolved(this.PromiseResult)
                                                // 判断执行结果是否为Promise对象
                                                if(result instanceof Promise){
                                                    // 如果是Promise类型的对象
                                                    result.then(v=>{
                                                        resolve(v)
                                                    },r=>{
                                                        reject(r)
                                                    })
                                                }else{
                                                    // 如果不是Promise对象，则结果的对象状态为成功
                                                    resolve(result)
                                                }
                                            }catch(error){
                                                reject(error)
                                            }
                                        }
                                        if(this.PromiseState==='rejected'){
                                            onRejected(this.PromiseResult)
                                        }
                                        // 判断pending状态
                                        if(this.PromiseState==='pending'){
                                            // 保存回调函数
                                            this.callbacks.push({
                                                onResolved:onResolved,
                                                onRejected:onRejected
                                            })
                                        }
                                    })
                                  ```
                                * ![抛出异常](images/%E6%8A%9B%E5%87%BA%E5%BC%82%E5%B8%B8.PNG)
        * 10. 异步任务then方法返回结果
            * 就是在执行器函数当中添加一个异步任务，并对then方法的返回结果做实现
            * 添加了异步任务，当Promise实例化对象完成之后，p对象的状态依然是pending的状态，所以这个pending状态的promise对象会进入是否是pending状态的判断中。在这个代码段中不会调用resolve或reject中的任何一个，这样输出的结果状态一定是pending，结果值一定是undefined。最终回调函数是在构造函数的resolve/reject函数中执行的，所以，在目前的情况下，不能单纯地在保存回调函数的步骤调用回调函数(就是框架里的value和reason)，需要把成功的回调取出，保存，并在后面执行成功或失败的回调。```onResolved/onRejevted:function(){}```
            * 在```onResolved/onRejevted:function(){}```这个函数里要执行成功/失败的回调函数。如何执行？因为回调函数onResolved已经在前面的步骤保存了，所以可以直接在这个函数里调用```onResolved/onRejevted()```，并且把成功/失败的结果放进去，成功/失败的结果就是当前实例对象(很显然就是上面返回的新的Promise)当中的PromiseResult的值```onResolved/onRejevted(self.PromiseResult)```，在控制台中可以看到执行回调后输出的内容。但是显而易见PromiseState一直是pending状态，想要改变状态就需要onResolved/onRejevted()这个函数的执行结果来决定。获取onResolved/onRejevted()这个函数的执行结果,```let result=onResolved(self.PromiseResult)```。随后进入获取的函数的执行结果是否为Promise实例对象的判断中，如果是Promise实例对象，那它就可以执行then方法，then方法中就会有两个它的回调函数(在此为防止混淆，两个回调函数名为v和r)，若成功```resolve(v)```(在此调用resolve的原因是要把返回的promise对象的状态设置为成功(就是需要上面return new Promise的resolve))；若失败```reject(r)```。在控制台查看，PromiseState是fulfilled，PromiseResult为undefined，若在框架文件的then方法中返回其他类型的值，PromiseResult的值就会是那个其他类型的值。前提是刷新页面一秒后，打开看，因为这是异步任务。
                * ![返回的状态值，这个是抛出错误的，成功的改一下就行](images/%E8%BF%94%E5%9B%9E%E5%80%BC.PNG)
            * 异步任务中，框架文件里，then方法中的失败的回调函数返回的PromiseResult的值是undefined，所以then方法返回的那个Promise对象(res)的状态变成了成功，也就是刚执行完then方法返回的结果状态值一定是pending，等异步任务执行完之后res的状态值才会变为成功或失败。抛出异常的情况的话，在js文件里保存好的回调函数里使用try catch的方法，此时结果值为rejected，状态值为抛出的值(意思就是我写了啥，它就是啥，不懂的话看完代码运行)。
                * ![执行失败回调略序](images/%E5%A4%B1%E8%B4%A5%E4%BA%86%E6%80%8E%E4%B9%88%E6%89%A7%E8%A1%8C.PNG)
        * 11. then方法的完善与优化
            * 到此为止会发现，js文件里，then方法中，判断Promise实例对象状态的代码重复，过于冗余，所以需要对它们进行简化封装。
            * 在then方法中封装函数，名为callback，并贴上重复的代码。需要注意的是，根据在框架文件里执行的执行器函数不同，在then方法中调用的回调函数也有所不同，所以需要传递名为type的参数，在进入Promise实例对象的状态的判断时，就可以直接调用callback函数，里面传递需要执行的回调。同步和异步呈现的效果是一样的，唯一的区别就是异步会在规定时间后呈现，在规定时间前打开Promise，其状态值必定是pending
                * 1) 同步：```callback(onResolved/onRejected)```
                * 2) 异步：
                    * ```
                        onResolved/onRejected:function(){
                            callback(onResolved/onRejected)
                        }
                      ```
                    * ![效果图：成功](images/%E6%95%88%E6%9E%9C%E5%9B%BE_resolve().PNG)
                    * ![效果图：失败](images/%E6%95%88%E6%9E%9C%E5%9B%BE_reject().PNG)
        * 12. catch方法与异常穿透
            * catch方法，用来指定失败的回调函数，针对异常穿透的问题，需要在js文件中另添加一个catch方法。形参传递的是失败的回调函数，在其中返回地then方法里是undefined和失败的回调函数
        * 13. Promise.resolve封装
            * 小复习：Promise.resolve方法，会返回一个Promise实例对象，它的状态由传入的值决定，若传入的参数是非Promise类型的数据，那它的状态就是成功，且成功的结果值为传入的参数；若传入的参数是一个Promise类型的数据，那返回的结果就由传入的Promise对象的状态和结果决定
            * 根据复习的resolve方法，Promise实例对象的状态值和结果值，由传入的参数是何类型的数据决定，参数是非Promise类型的数据，状态值为fulfilled，结果值为传入的值；参数是Promise类型的数据，则由新传入的Promise对象的状态和结果决定。
            * 若Promise.resolve方法中封装一个Promise.resolve方法，那Promise实例对象的状态值必为fulfilled，结果值为被封装的resolve方法里传入的参数。
        * 14. Promise.reject封装
            * 小复习：大致属性与作用与resolve方法相同，不同之处在与，reject方法返回的结果永远是失败的Promise
            * 由复习内容可知，reject方法内传入的参数为新的Promise类型的数据，即使新的Promise实例对象的状态为成功，但最终返回的肯定是失败的结果。
                * ```
                    const p=Promise.reject('Error')
                    const p2=Promise.reject(new Promise((resolve,reject)=>{
                        resolve('OK?')
                    }))

                    console.log(p);
                    console.log(p2);
                  ```
                * ![上面代码呈现](images/reject%E6%96%B9%E6%B3%95%E5%B0%81%E8%A3%85.PNG)
            * 13&14小结：相对于resolve方法，reject方法被添加到js文件的步骤更加简短。resolve方法中需要判断传入的参数为Promise类型的数据时，返回的是否为成功的结果。reject方法不必想太多，不管里面传入了什么类型的参数，结果肯定是失败。

            


## 总结
* Promise是一个构造函数，所以可以对其进行对象的实例化，所以可以```const p=new Promise()```这样使用。而Promise在实例化的时候需要接收一个参数，这个参数是函数类型的值，且这个当参数的函数还有两个形参，分别是resolve和reject
* 后续想要使用promise，不需要对每一个方法进行手动封装，可以借助 util.promisify 方法，将原来的回调函数风格的方法转变成promise风格的函数
* 先按照代码的顺序执行一遍，再根据异步任务里对象的状态决定调用相对应的回调函数
* 因为在reject回调函数中返回的结果值是undefined，所以then方法返回的那个promise的状态变成了成功。但是最开始进入then方法中的时候，返回的结果状态还是pending，然后等状态修改完之后，才把res对象的状态改为了成功
