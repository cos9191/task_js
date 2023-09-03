import {
    posts,
    renderPosts
} from "./getPosts.js"
import { disableButtons } from "./helpers.js"

const prevPageButtons = document.querySelectorAll('.btn--prevPage')
const nextPageButtons = document.querySelectorAll('.btn--nextPage')
let currentPage = 1
const itemsPerPage = 10
let totalPages

const calculateTotalPages = (posts) => {
    return totalPages = Math.ceil(posts.length / itemsPerPage)
}

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
        if (currentPage < totalPages) {
            currentPage++
            renderPosts(posts, currentPage)
        }
    })
})

const renderPaginationButtons = (totalPages, page) => {
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
            })

            if (page === currentPage) {
                button.disabled = true
            }

            containers[containerIndex].appendChild(button)
        }
    })

    // Включаем кнопки пагинации вперёд и назад
    disableButtons(Array.from(prevPageButtons).concat(Array.from(nextPageButtons)), false)
    // Выключаем кнопки по условию
    disableButtons(prevPageButtons, currentPage === 1)
    disableButtons(nextPageButtons, currentPage === totalPages)
}

export {
    currentPage,
    itemsPerPage,
    totalPages,
    renderPaginationButtons,
    calculateTotalPages
}