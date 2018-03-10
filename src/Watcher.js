import Dep from './Dep'
export default class Watcher {
    constructor(_z, exp, cb) {
        this._z = _z
        this.exp = exp
        this.cb = cb
        this.get()
    }
    get() {
        Dep.target = this
        this.value = this._z[this.exp]
        Dep.target = null
    }
}