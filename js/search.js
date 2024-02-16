document.addEventListener('DOMContentLoaded',()=>{
    const openBtn=document.querySelector('#search_open_btn')
    const search=document.querySelector('#search')
    const closeBtn=document.querySelector('#search_close_btn')

    openBtn.addEventListener('click', openSearch)
    closeBtn.addEventListener('click', closeSearch)

    function openSearch(){
        search.style.display='block'
        gsap.set('body,html',{overflow:'hidden'})
    }
    function closeSearch(){
        search.style.display='none'
        gsap.set('body,html',{overflow:'visible'})
    }
})