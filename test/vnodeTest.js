import createVnode from '../src/vnode/createVnode'

describe('vnode 测试', function vnodeTest() {
    it('vnode', function () {
        console.log('空数组', createVnode('div'))

        console.log('带子节点', createVnode('div', null, [
            createVnode('h1', null, '吃🍚了么？')
        ]))
        
        console.log('子节点为类组件对象', createVnode('div', null, [
            createVnode(new Title())
        ]))
    })
})

class Title {
    constructor (props) {
        this.text = 'ZVue是一个轮子'
        this.level = 1
    }
    render(h) {
        return h(
            `h${this.level}`,
            null,
            [h('i', null, this.text)]
        )
    }
}