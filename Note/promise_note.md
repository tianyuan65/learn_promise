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
            * 3. 改变promise状态和指定回调函数(用then()或catch())谁先谁后？
                * 1) 都有可能，正常情况下是先指定回调再改变状态，但也可以先改变状态再指定回调
                * 2) 如何先改状态再指定回调？
                    * ① 在执行器中直接调用resolve()/reject()
                        * ```
                            let p= new Promise((resolve,reject)=>{
                                resolve('OK')
                            })
                            p.then(value=>{
                                console.log(value);
                            },reason=>{

                            })
                          ```
                    * ② 延迟更长时间才调用then()，可以给then方法添加一个定时器
                * 3) 如何先指定回调再改变状态？(当使用promise时这种情况是居多的)
                    * 在执行器((resolve,reject)=>{})中设置一个异步任务(例如：setTimeout)，在异步任务中调用resolve()/reject()的时候就会先指定回调，后改变状态
                    * ```
                        let p= new Promise((resolve,reject)=>{
                            setTimeout(()=>{
                                resolve('OK')
                            },1000)
                        })
                        p.then(value=>{
                            console.log(value);
                        },reason=>{

                        })
                      ```
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


## 总结
* Promise是一个构造函数，所以可以对其进行对象的实例化，所以可以```const p=new Promise()```这样使用。而Promise在实例化的时候需要接收一个参数，这个参数是函数类型的值，且这个当参数的函数还有两个形参，分别是resolve和reject
* 后续想要使用promise，不需要对每一个方法进行手动封装，可以借助 util.promisify 方法，将原来的回调函数风格的方法转变成promise风格的函数
* 
