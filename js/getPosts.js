import { getData } from "./api.js"
import { getComments } from "./getComments.js"

const postsNode = document.querySelector('#posts')
const postsUrl = 'https://jsonplaceholder.typicode.com/posts'

// const toggleComments = (commentsNode) => {
//     if (commentsNode.children.length) {
//         commentsNode.classList.toggle("visually-hidden")
//         commentsNode.classList.toggle("animation")
//     }
// }
//
// const renderPost = (post) => {
//     const postElement = document.createElement('li')
//     postElement.classList.add('post__item')
//     postElement.innerHTML = `
//         <span>Post id: ${post.id}</span>
//         <span>User: ${post.userId}</span>
//         <h2>${post.title}</h2>
//         <p>${post.body}</p>
//         <ul class="post__comments-wrapper"></ul>
//     `
//     const commentsNode = postElement.querySelector('.post__comments-wrapper')
//
//     postElement.addEventListener('click', () => {
//         getComments(post.id, commentsNode)
//         toggleComments(commentsNode)
//     })
//     return postElement
// }
//
// const renderPosts = (posts) => {
//     const fragment = document.createDocumentFragment()
//     posts.forEach((post) => {
//         const postElement = renderPost(post)
//         fragment.appendChild(postElement)
//     })
//     postsNode.appendChild(fragment)
// }
//
//
// const getPosts = async function () {
//     try {
//         await getData(postsUrl, renderPosts, alert)
//     } catch (error) {
//         alert(error)
//     }
// }
//
// export { getPosts }