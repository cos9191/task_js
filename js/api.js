import { showLoader, hideLoader } from "./loader.js"

const getData = async (Url, onSuccess, onError) => {
    try {
        showLoader()
        const response = await fetch(Url)
        if (response.ok) {
            const data = await response.json()
            return onSuccess(data)
        }
        throw new Error(`${response.status} ${response.statusText}`)

    } catch (err) {
        onError(`
            ${err}
            Обновите страницу или попробуйте позже
            `)
    } finally {
        hideLoader()
    }
}

export { getData }