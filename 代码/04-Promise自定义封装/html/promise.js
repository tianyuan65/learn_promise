// 创建组件
class Promise{
    // 构造函数
    constructor(executor){
        // 添加属性
        this.PromiseState='pending'
        this.PromiseResult=null
        // 声明一个名为callback的属性，用来在then方法中保存回调函数
        this.callbacks=[]
        // 保存实例对象的this的值
        const self=this;  
        // console.log(self);  //Promise 通常这定义属性名为self _this that
        // 声明resolve函数，在这里resolve是个实参，是一个独立的函数，同样可以用任意名命名，只不过在下面使用时，要写成对应的名
        function resolve(data) {
            // console.log(self);  //Promise
            // 判断状态
            if(self.PromiseState !== 'pending') return
            // 1.修改对象的状态(PromiseState)
            self.PromiseState='fulfilled'  //resolved=fulfilled
            // 2.设置对象结果值(PromiseResult)
            self.PromiseResult=data
            // 进入onResolved函数中是否存有回调函数的判断，调用成功的回调函数
            // if(self.callback.onResolved){
            //     self.callback.onResolved(data)
            // }
            // 遍历callbacks，item是一个对象，它的结构是被保存在onResolved中的回调函数
            setTimeout(() => {
                self.callbacks.forEach(item=>{
                    // 调用成功的回调
                    item.onResolved(data)
                })
            });
        }

        // 声明reject函数，在这里reject是个实参，是一个独立的函数，同样可以用任意名命名，只不过在下面使用时，要写成对应的名
        function reject(data) {
            // console.log(self);  //Promise
            // 判断状态
            if(self.PromiseState !== 'pending') return
            // 1.修改对象的状态(PromiseState)
            self.PromiseState='rejected'
            // 2.设置对象结果值(PromiseResult)
            self.PromiseResult=data
            // 进入onRejected函数中是否存有回调函数的判断，调用失败的回调函数
            // if(self.callback.onRejected){
            //     self.callback.onRejected(data)
            // }
            // 遍历callbacks，item是一个对象，它的结构是被保存在onRejected中的回调函数
            setTimeout(() => {
                self.callbacks.forEach(item=>{
                    // 调用失败的回调函数
                    item.onRejected(data)
                })   
            });
        }

        try {
            // 同步调用[执行器函数]
            executor(resolve,reject)
        } catch (error) {
            // 修改promise对象状态为[失败]
            reject(error)
        }
    }

    // then方法封装
    then(onResolved,onRejected){
        const self=this
        // 判断回调函数参数
        if(typeof onResolved !== 'function'){
            onResolved=value=>value
            // value=>{return value}
        }
        if(typeof onRejected !== 'function'){
            onRejected=reason=>{
                throw reason
            }
        }
        
        return new Promise((resolve,reject)=>{
            // console.log(self);  //Promise
            // 封装函数
            function callback(type) {
                try{
                    // 获取回调函数的执行结果
                    let result=type(self.PromiseResult)
                    // console.log(this);  //Promise {PromiseState: 'fulfilled', PromiseResult: 'OK', callbacks: Array(0)}
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
            // 调用回调函数  PromiseState
            if(this.PromiseState==='fulfilled'){
                setTimeout(()=>{
                    callback(onResolved)
                })
            }
            if(this.PromiseState==='rejected'){
                setTimeout(()=>{
                    callback(onRejected)
                })
            }
            // 判断pending状态
            if(this.PromiseState==='pending'){
                // console.log(self);  //Promise
                // 保存回调函数
                this.callbacks.push({
                    // 把成功的回调取出，保存，准备在resolve()函数中执行
                    onResolved:function(){
                        callback(onResolved)
                    },
                    onRejected:function(){
                        callback(onRejected)
                    }
                })
            }
        })
        // console.log(this);  //Promise
    }

    // catch方法封装
    catch(onRejected){
        return this.then(undefined,onRejected)
    }

    // resolve封装
    static resolve(value){
        // 返回promise对象
        return new Promise((resolve,reject)=>{
            if(value instanceof Promise){
                value.then(v=>{
                    resolve(v)
                },r=>{
                    reject(r)
                })
            }else{
                // 状态设置为成功
                resolve(value)
            }
        })
    }

    // reject封装
    static reject(reason){
        return new Promise((resolve,reject)=>{
            reject(reason)
        })
    }

    // all封装
    static all(promises){
        // 声明变量
        let count=0
        // 这是存放成功结果的数组，在这个步骤肯定是空的，在下面遍历完都成功了就有东西了
        let arr=[]
        // 返回结果为promise对象
        return new Promise((resolve,reject)=>{
            // 遍历
            for (let i = 0; i < promises.length; i++) {
                // 
                promises[i].then(v=>{
                    // 在此步骤可得知对象的状态是成功
                    // 每一个promise对象都成功，才可执行resolve()
                    count++;
                    // 将当前promise对象成功的结果存入到数组中
                    arr[i]=v
                    // 当变量数值与数组的整体长度时，就表明这几个promise对象的结果都是成功，存入到数组中
                    if(count===promises.length){
                        // 修改状态
                        resolve(arr)
                    }
                },r=>{
                    reject(r)
                })
                
            }
        })
    }

    // race封装
    static race(promises){
        return new Promise((resolve,reject)=>{
            for (let i = 0; i < promises.length; i++) {
                promises[i].then(v=>{
                    // 修改返回结果的状态为成功
                    resolve(v)
                },r=>{
                    // 修改返回结果的状态为失败
                    reject(r)
                })
            }
        })
    }
}

// console.log(this);  //Window


