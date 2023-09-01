import { getData } from "./api.js";

let currentPostNode
let commentsNode
const commentsUrl = 'https://jsonplaceholder.typicode.com/comments'

const renderComment = (comment) => {
    const commentNode = document.createElement('li')
    commentNode.classList.add('post__comment')
    commentNode.innerHTML = `<b>${comment.name}:</b> ${comment.body}`
    return commentNode
}

const renderComments = (comments, commentsNode, currentPostNode) => {
    const fragment = document.createDocumentFragment()
    comments.forEach((comment) => {
        fragment.appendChild(renderComment(comment))
    })
    currentPostNode.removeEventListener('click', getComments)
    console.log(commentsNode)
    commentsNode.appendChild(fragment)
}

const getComments = async function (postId) {
    currentPostNode = document.querySelectorAll('.post__item')[postId - 1]
    commentsNode = currentPostNode.querySelector('.post__comments-wrapper')
    console.log(commentsNode)
    if (commentsNode.innerHTML.trim() === '') {
        try {
            // await getData(`${commentsUrl}?postId=${postId}`, renderComments, alert)
            await getData(
                `${commentsUrl}?postId=${postId}`,
                (comments) => {
                    renderComments(comments, commentsNode, currentPostNode)
                },
                alert)
        } catch (error) {
            alert(error)
        }
    }
}

export { getComments }