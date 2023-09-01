const getData = async (Url, onSuccess, onError) => {
    try {
        const response = await fetch(Url)
        if (response.ok) {
            const data = await response.json()
            return onSuccess(data)
        }
        throw new Error(`${response.status} ${response.statusText}`)

    } catch (err) {
        onError(err)
    }
}

export { getData }