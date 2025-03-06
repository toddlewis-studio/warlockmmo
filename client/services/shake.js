export default el => {
    el.classList.add('shake')
    setTimeout(() => {
        el.classList.remove('shake')
    }, 900)
}