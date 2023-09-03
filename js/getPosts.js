import { getData } from "./api.js"
import { getComments } from "./getComments.js"
import {appendChilds, toggleComments} from "./helpers.js"
import {
    currentPage,
    itemsPerPage,
    totalPages,
    calculateTotalPages,
    renderPaginationButtons
} from "./pagination.js"

let posts
const postsNode = document.querySelector('#posts')
const postsUrl = 'https://jsonplaceholder.typicode.com/posts'

const renderPost = (post) => {
    const postElement = document.createElement('li')
    postElement.classList.add('post__item')

    postElement.innerHTML = `
        <span>Post id: ${post.id}</span>
        <span>User: ${post.userId}</span>
        <h2>${post.title}</h2>
        <p>${post.body}</p>
        <ul class="post__comments-wrapper"></ul>
    `
    const commentsNode = postElement.querySelector('.post__comments-wrapper')
    postElement.addEventListener('click', () => {
        getComments(post.id, commentsNode)
        toggleComments(commentsNode)
    })

    return postElement
}
const renderPosts = (posts, page) => {
    const startIndex = (page - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const pagePosts = posts.slice(startIndex, endIndex)

    postsNode.innerHTML = ''
    appendChilds(pagePosts, postsNode, renderPost)
    renderPaginationButtons(totalPages, page)
}

const getPosts = async function () {
    try {
        posts = await getData(postsUrl)
        calculateTotalPages (posts)
        renderPosts(posts, currentPage)
    } catch (error) {
        alert(error)
    }
}

export {
    getPosts,
    renderPosts,
    posts
}