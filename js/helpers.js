const scrollOnExpand = (node) => {
    const viewportEndY = window.scrollY + window.innerHeight
    const nodeBottomY = node.getBoundingClientRect().bottom + window.scrollY
    if (nodeBottomY > viewportEndY) {
        window.scrollBy({
            top: nodeBottomY - viewportEndY + 50
        })
    }
}

const appendChilds = (arr, container, cb) => {
    const fragment = document.createDocumentFragment()
    arr.forEach((item) => {
        fragment.appendChild(cb(item))
    })
    container.appendChild(fragment)
}

const removeClassWithDelay = (className, Node, Timeout = 0) => {
    Node.querySelectorAll(`.${className}`).forEach((item) => {
        setTimeout(()=> item.classList.remove('animation'), Timeout)
    })
}

export { scrollOnExpand, appendChilds, removeClassWithDelay }