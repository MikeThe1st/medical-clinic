export const getCookie = (name) => {
    const cookieArray = document.cookie.split(';')
    for (let i = 0; i < cookieArray.length; i++) {
        const cookie = cookieArray[i].trim()
        if (cookie.startsWith(name + '=')) {
            return cookie.substring(name.length + 1)
        }
    }
    return null;
}