// 声明构造函数
function Promise(executor) {
    // 添加属性
    this.PromiseState='pending'
    this.PromiseResult=null
    // 保存实例对象的this的值
    const self=this;  
    console.log(self);  //Promise 通常这定义属性名为self _this that
    // 声明resolve函数，在这里resolve是个实参，是一个独立的函数，同样可以用任意名命名，只不过在下面使用时，要写成对应的名
    function resolve(data) {
        console.log(self);  //Promise
        // 1.修改对象的状态(PromiseState)
        self.PromiseState='fulfilled'  //resolved=fulfilled
        // 2.设置对象结果值(PromiseResult)
        self.PromiseResult=data
    }

    // 声明reject函数，在这里reject是个实参，是一个独立的函数，同样可以用任意名命名，只不过在下面使用时，要写成对应的名
    function reject(data) {
        console.log(self);  //Promise
        // 1.修改对象的状态(PromiseState)
        self.PromiseState='rejected'
        // 2.设置对象结果值(PromiseResult)
        self.PromiseResult=data
    }

    try {
        // 同步调用[执行器函数]
        executor(resolve,reject)
    } catch (error) {
        // 修改promise对象状态为[失败]
        reject(error)
    }   
   
}

// 添加then()
Promise.prototype.then=function(onResolved,onRejected){

}