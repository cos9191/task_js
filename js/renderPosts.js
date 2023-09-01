import { getData } from "./api.js";

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
    `
    return postElement
}

const renderPosts = (posts) => {
    const fragment = document.createDocumentFragment()
    posts.forEach((post) => {
        const postElement = renderPost(post)
        fragment.appendChild(postElement)
    })
    postsNode.appendChild(fragment)
}


const getPosts = async function () {
    try {
        await getData(postsUrl, renderPosts, alert)
    } catch (error) {
        alert(error)
    }
}

export { getPosts }