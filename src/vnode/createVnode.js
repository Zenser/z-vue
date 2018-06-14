import VNode from './VNode'
export default function createVNode(tag, data, children) {
    let vnode
    if (typeof tag === 'string') {
        vnode = new VNode(tag, data, children)
    } else if (typeof tag === 'function') {
        vnode = tag(createVNode)
    } else if (tag && tag.render) {
        vnode = tag.render(createVNode)
    } else {
        // 空节点
        vnode = new VNode()
    }
    return vnode
}
