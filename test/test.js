import Observe from '../src/Observe'
import Watcher from '../src/Watcher'

describe('观察者-订阅者模式测试', function () {
    it('测试', function () {
        let data = {
            name: '张帅',
            age: 24
        }
        let observe = new Observe(data)
        new Watcher(data, 'name', function (newVal, oldVal) {
            console.info('notify:  ' + newVal + '->' +  oldVal)
        })
        data.name = '帅比'
        data.name = '帅^_^'
    })
})