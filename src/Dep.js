
export default class Dep {
    constructor() {
        this.subs = []
    }
    addSub(sub) {
        this.subs.push(sub)
    }
    notify(newVal, oldVal) {
        this.subs.forEach(sub => {
            sub.cb && sub.cb(newVal, oldVal)
        })
    }
}