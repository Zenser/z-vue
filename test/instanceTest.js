import ZVue from '../src/ZVue'

describe('实例测试', function () {
    it('基础实例', function () {
        const vm = new ZVue({
            data: () => ({
                name: '帅',
                age: new Date().getFullYear() - 1994
            }),
            render(h) {
                return h(
                    'div',
                    null, [
                        h('h1', null, [
                            h('b', null, `我叫${this.name}`)
                        ]),
                        h('h2', null, `我的年龄${this.age}`)
                    ]
                )
            }
        })
        recurciveLog(vm.$vnode)
    })

    it('嵌套组件测试', function () {
        const titleFn = (h) => {
            return h('h1', null, 'titleFn')
        }
        let titleObj = {
            render(h) {
                return h('h1', null, 'titleObj')
            }
        }
        const vm = new ZVue({
            data: () => ({
                name: '帅',
                age: new Date().getFullYear() - 1994
            }),
            render(h) {
                return h(
                    'div',
                    null, [
                        h(titleFn),
                        h(titleObj)
                    ]
                )
            }
        })
        recurciveLog(vm.$vnode)
    })
})

function recurciveLog(vnode, indent = 0) {
    if (!vnode) {
        return
    }
    console.log('\t'.repeat(indent), vnode.tag)
    if (!Array.isArray(vnode.children)) {
        return
    }
    vnode.children.forEach((item) => {
        recurciveLog(item, indent + 1)
    })
}