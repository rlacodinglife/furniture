document.addEventListener('DOMContentLoaded', ()=>{
    const menuOpenBtn=document.querySelector('#menu_btn')
    const nav=document.querySelector('#item_menu')
    const menuCloseBtn=document.querySelector('#item_close_btn')
    const itemMenu=document.querySelectorAll('#item_menu_list>li')

    let selectedMenu=null

    gsap.set(nav, {opacity:0})
    // gsap.set(nav, {opacity:0})

    menuOpenBtn.addEventListener('click', menuOpen)
    menuCloseBtn.addEventListener('click', menuClose)

    function menuOpen(){
        gsap.to(nav, {display:'block', opacity:1, duration:.3})
        // nav.style.display='block'
    }
    function menuClose(){
        // nav.style.display='none'
        gsap.to(nav, {display:'none', opacity:0, duration:.3})
        if(selectedMenu!=null && selectedMenu!=this){
            selectedMenu.classList.remove('selected')
        }
    }


    for(const item of itemMenu){
        item.addEventListener('mouseenter', activateMainMenu)
    }
    function activateMainMenu(menu){
            if(selectedMenu!=null && selectedMenu!=this){
                selectedMenu.classList.remove('selected')
            }
            if(selectedMenu!=menu){
                selectedMenu=this;
                selectedMenu.classList.add('selected')
            }

    }

    // new SimpleBar(document.querySelector('body'), {
    //     autoHide: true,
    //     forceVisible: false,
    //     classNames: {
    //       resizeWrapper: 'simplebar-resize-wrapper',
    //       content: 'simplebar-content',
    //       offset: 'simplebar-offset',
    //       mask: 'simplebar-mask',
    //       wrapper: 'simplebar-wrapper',
    //       placeholder: 'simplebar-placeholder',
    //       scrollbar: 'simplebar-scrollbar',
    //       track: 'simplebar-track',
    //       heightAutoObserverWrapperEl: 'simplebar-height-auto-observer-wrapper',
    //       heightAutoObserverEl: 'simplebar-height-auto-observer',
    //       visible: 'simplebar-visible',
    //       horizontal: 'simplebar-horizontal',
    //       vertical: 'simplebar-vertical',
    //       hover: 'simplebar-hover',
    //       dragging: 'simplebar-dragging'
    //     },
    //     scrollbarMinSize: 25,
    //     scrollbarMaxSize: 0,
    //     direction: 'ltr',
    //     timeout: 1000
    // })

})