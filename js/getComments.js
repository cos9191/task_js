import { getData } from "./api.js"
import { appendChilds, scrollOnExpand, removeClassWithDelay } from "./helpers.js"

let currentPostNode
let commentsNode
const commentsUrl = 'https://jsonplaceholder.typicode.com/comments'

const renderComment = (comment) => {
    const commentNode = document.createElement('li')
    commentNode.classList.add('post__comment', 'animation')
    commentNode.innerHTML = `<b>${comment.name}:</b> ${comment.body}`
    return commentNode
}

const renderComments = (comments, commentsNode, currentPostNode) => {
    appendChilds(comments, commentsNode, renderComment)
    scrollOnExpand(commentsNode)
    removeClassWithDelay('animation', commentsNode, 0)

    currentPostNode.removeEventListener('click', getComments)
}

const getComments = async function (postId) {
    const postIdLastDigit = (postId - 1) % 10

    currentPostNode = document.querySelectorAll('.post__item')[postIdLastDigit]
    commentsNode = currentPostNode.querySelector('.post__comments-wrapper')

    if (commentsNode.innerHTML.trim() === '') {
        try {
            const comments = await getData(`${commentsUrl}?postId=${postId}`)
            renderComments(comments, commentsNode, currentPostNode)
        } catch (error) {
            alert(error)
        }
    }
}

export { getComments }