const scrollOnExpand = (node) => {
    const viewportEndY = window.scrollY + window.innerHeight
    const nodeBottomY = node.getBoundingClientRect().bottom + window.scrollY
    if (nodeBottomY > viewportEndY) {
        window.scrollBy({
            top: nodeBottomY - viewportEndY + 100 // 100 - доп прокрутка для видимости след поста
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

const toggleComments = (node) => {
    if (node.children.length) {
        node.classList.toggle("visually-hidden")
        node.classList.toggle("animation")
    }
}

const disableButtons = (buttons, condition) => {
    buttons.forEach(button => {
        button.disabled = condition;
    })
}

export {
    scrollOnExpand,
    appendChilds,
    removeClassWithDelay,
    toggleComments,
    disableButtons
}