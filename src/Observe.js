import Dep from './Dep'
export default class Observe {
    constructor(obj) {
        Object.keys(obj).forEach(prop => {reactive(obj, prop, obj[prop])})
    }
}

function reactive(obj, prop, val) {
    // 闭包绑定依赖
    let dep = new Dep()
    Object.defineProperty(obj, prop, {
        configurable: true,
        enumerable: true,
        get() {
            //利用js单线程，在初次get时绑定订阅者
            if (Dep.target) {
                // 绑定订阅者
                dep.addSub(Dep.target)
            }
            return val
        },
        set(newVal) {
            // 更新时，触发订阅者更新
            dep.notify(newVal, val)
            val = newVal
        }
    })
}