import { getData } from "./api.js"
import { getComments } from "./getComments.js"

let posts
const postsNode = document.querySelector('#posts')
const postsUrl = 'https://jsonplaceholder.typicode.com/posts'
const prevPageButtons = document.querySelectorAll('.btn--prevPage')
const nextPageButtons = document.querySelectorAll('.btn--nextPage')

let currentPage = 1
const itemsPerPage = 10

prevPageButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--
            renderPosts(posts, currentPage)
        }
    })
})

nextPageButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (currentPage < Math.ceil(posts.length / itemsPerPage)) {
            currentPage++
            renderPosts(posts, currentPage)
        }
    })
})

const toggleComments = (commentsNode) => {
    if (commentsNode.children.length) {
        commentsNode.classList.toggle("visually-hidden")
        commentsNode.classList.toggle("animation")
    }
}

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

    const fragment = document.createDocumentFragment()
    pagePosts.forEach((post) => {
        const postElement = renderPost(post)
        fragment.appendChild(postElement)
    });
    postsNode.innerHTML = ''
    postsNode.appendChild(fragment)
    renderPaginationButtons(Math.ceil(posts.length / itemsPerPage))

    prevPageButtons.forEach(function(button) {
        button.disabled = false
    })
    nextPageButtons.forEach(function (button) {
        button.disabled = false
    })

    if (page === 1) {
        prevPageButtons.forEach(function(button) {
            button.disabled = true
        })
    }

    if (page === Math.ceil(posts.length / itemsPerPage)) {
        nextPageButtons.forEach(function (button) {
            button.disabled = true
        })
    }
}

//wehaaa

const renderPaginationButtons = (totalPages) => {
    const containers = document.querySelectorAll('.pagination__vars-wrapper')

    containers.forEach((container, containerIndex) => {
        container.innerHTML = ''

        for (let page = 1; page <= totalPages; page++) {
            const button = document.createElement('button')
            button.classList.add('btn')
            button.textContent = page.toString()

            button.addEventListener('click', () => {
                currentPage = page
                renderPosts(posts, currentPage)
            });

            if (page === currentPage) {
                button.disabled = true
            }

            containers[containerIndex].appendChild(button)
        }
    })
}

const getPosts = async function () {
    try {
        posts = await getData(postsUrl)
        renderPosts(posts, currentPage)
    } catch (error) {
        alert(error)
    }
}

export { getPosts }