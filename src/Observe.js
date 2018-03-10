import Dep from './Dep'
export default class Observe {
    constructor(obj) {
        Object.keys(obj).forEach(prop => {reactive(obj, prop, obj[prop])})
    }
}

function reactive(obj, prop, val) {
    let dep = new Dep()
    Object.defineProperty(obj, prop, {
        configurable: true,
        enumerable: true,
        get() {
            if (Dep.target) {
                dep.addSub(Dep.target)
            }
            return val
        },
        set(newVal) {
            dep.notify(newVal, val)
            val = newVal
        }
    })
}