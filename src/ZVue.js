import Observe from './observe/Observe'
import createVnode from './vnode/createVnode'
export default class ZVue {
    constructor(options) {
        const {
            props,
            data,
            render
        } = options
        // 数据初始化
        this.$props = props
        this.$data = data()
        proxyProps(this, this.$props)
        proxyData(this, this.$data)
        this.render = render

        // 鉴定data
        this.$observe = new Observe(this.$data)
        // vnode
        this.$vnode = this.render(createVnode)
    }
    $mount(el) {
        el.appendChild(this.$el)
    }
}

function proxyProps(target, source) {
    if (!source) {
        return
    }
    for (let i in source) {
        Object.defineProperty(target, i, {
            configurable: false,
            enumerable: true,
            get() {
                return source[i]
            }
        })
    }
}

function proxyData(target, source) {
    if (!source) {
        return
    }
    const props = target.$props
    for (let i in source) {
        if (props && (i in props)) {
            /* eslint-disable */
            return console.warn(`${i} 被忽略，已在props中定义过`)
        }
        Object.defineProperty(target, i, {
            configurable: false,
            enumerable: true,
            get() {
                return source[i]
            },
            set(val) {
                source[i] = val
            }
        })
    }
}
