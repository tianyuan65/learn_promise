// 声明构造函数
function Promise(executor) {
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
        // 遍历callbacks，item是一个对象，它的结构是被保存在onRejected中的两个回调函数
        self.callbacks.forEach(item=>{
            // 调用成功的回调
            item.onResolved(data)
        })
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
        // 遍历callbacks，item是一个对象，它的结构是被保存在onRejected中的两个回调函数
        self.callbacks.forEach(item=>{
            // 调用失败的回调函数
            item.onRejected(data)
        })
    }

    try {
        // 同步调用[执行器函数]
        executor(resolve,reject)
    } catch (error) {
        // 修改promise对象状态为[失败]
        reject(error)
    }   
   
}

// console.log(this);  //Window
// 添加then()
Promise.prototype.then=function(onResolved,onRejected){
    return new Promise((resolve,reject)=>{
        // 调用回调函数  PromiseState
        if(this.PromiseState==='fulfilled'){
            try{
                // 获取回调函数的执行结果
                let result=onResolved(this.PromiseResult)
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
    // console.log(this);  //Promise
    
}