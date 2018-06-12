import Observe from '../src/observe/Observe'
import Watcher from '../src/observe/Watcher'
import chalk from 'chalk'
const log = console.log

describe('观察者-订阅者模式测试', function () {
    it('测试', function () {
        let data = {
            name: '帅',
            age: 24,
            skill: {
                js: 5,
                http: 5,
                css: 4
            }
        }
        new Observe(data)
        new Watcher(data, 'name', function (newVal, oldVal) {
            log(chalk.yellow('notify:  ', oldVal, '->', newVal ))
        })
        data.name = '帅比'

        // skill的变更也会触发回调
        new Watcher(data, 'skill.js', function (newVal, oldVal) {
            log(chalk.yellow('notify:  ', oldVal, '->', newVal ))
        })
        data.skill.js = 233
        data.skill.html = 666
        data.skill = 'skill change'
        data.skill = {js: 0}
        // 不会触发回调，字面量对象未订阅和监听过
        data.skill.js = 1
    })
})