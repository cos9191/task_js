import { showLoader, hideLoader } from "./loader.js"

const getData = async (Url) => {
    try {
        showLoader()
        const response = await fetch(Url)
        if (response.ok) {
            return await response.json()
        }
        throw new Error(`${response.status} ${response.statusText}`)

    } catch (err) {
        alert(`
            ${err}
            Обновите страницу или попробуйте позже
            `)
    } finally {
        hideLoader()
    }
}

export { getData }