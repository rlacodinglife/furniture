document.addEventListener('DOMContentLoaded', () => {
    introEffect()
})
window.addEventListener('load', () => {
    bannerEffect()
    magazineEffect()
    collectionEffect()
    designerEffect()
    sofaSlideEffect()
    banner2()
    bestSlideEffect()
    showroomEffect()
})

//designer
function designerEffect() {
    const designer = document.querySelector('#designer')
    gsap.set(designer, { background: '#000' })
    gsap.to(designer, {
        background: '#fcfcfc', scrollTrigger: {
            trigger: designer,
            start: 'top 0',
            pin: true,
            scrub: 1,
            // markers: true,
        }
    })
}


//showroom 

function showroomEffect() {
    const showroom = document.querySelector('#showroom')
    const film = document.querySelector('#film')
    const filmImg = document.querySelectorAll('#showroom_img_list>li')

    let selectedFilm = filmImg[0]
    let endY = film.offsetHeight - showroom.offsetHeight

    filmImg.forEach((item, index) => {
        item.addEventListener('click', () => {
            // alert(index)
            activateFilm(index)
            changeImg(index)
        })
    })
    gsap.to(film, {
        y: -endY,
        scrollTrigger: {
            trigger: showroom,
            start: 'top 0',
            end: '300% 0%',
            pin: true,
            scrub: 1,
        }
    })

    function changeImg(index) {

        let newImg = document.createElement('div');
        newImg.classList.add('showroom_bg')
        newImg.style.background = `url(/furniture/images/showroom_${index}.jpg)`
        showroom.prepend(newImg);

        gsap.to(showroom.children[1], {
            opacity: 0, duration: 0.5, ease: 'power1.out', onComplete: () => {
                showroom.removeChild(showroom.children[1])
            }
        })
    }

    function activateFilm(index) {
        if (selectedFilm !== null && selectedFilm != filmImg[index]) {
            selectedFilm.classList.remove('film_selected')

        }
        if (selectedFilm != filmImg[index]) {
            selectedFilm = filmImg[index]
            selectedFilm.classList.add('film_selected')
        }
    }
}


//best 슬라이드
function bestSlideEffect() {
    const nextBtn = document.querySelector('#best_next_btn')
    const prevBtn = document.querySelector('#best_prev_btn')
    const tabMenu = document.querySelectorAll('#best_tab_list>li')
    const bestItem = document.querySelector('#best_item')

    let isSlide = false;
    let selectedTabMenu = tabMenu[0]
    showItem(0)

    tabMenu.forEach((item, index) => {
        item.addEventListener('click', (e) => {
            //   alert(index)
            e.preventDefault()
            activateTabMenu(index)
            showItem(index)
        })
    })
    //탭메뉴 이펙트
    function activateTabMenu(index) {
        if (selectedTabMenu != null && selectedTabMenu != tabMenu[index]) {
            selectedTabMenu.classList.remove('selected')
        }
        if (selectedTabMenu != tabMenu[index]) {
            selectedTabMenu = tabMenu[index]
            selectedTabMenu.classList.add('selected')
        }
    }
    //패널 데이터 불러오기
    function showItem(index) {
        axios.get(`/furniture/data/bestdata${index}.html`).then((res) => {
            bestItem.innerHTML = res.data
            //로드가 된후 실행할 함수 슬라이드
            itemPanel()
        }, () => {
            bestItem.innerHTML = '네트워크 실패'
        })
    }
    function itemPanel() {
        const itemList = document.querySelector('.best_item_list')
        const itemLi = document.querySelectorAll('.best_item_list>li')

        let itemLength = itemLi.length
        let itemWidth = bestItem.clientWidth
        // let itemLiWidth=itemLi[0].clientWidth
        let currentIndex = 0
        let nextIndex = currentIndex + 1
        bestInit()
        bestSlide()

        window.addEventListener('resize', bestInit)
        function bestSlide() {
            nextBtn.addEventListener('click', nextSlide)
            prevBtn.addEventListener('click', prevSlide)
        }
        function bestInit() {
            const itemLi = document.querySelectorAll('.best_item_list>li')
            let itemWidth = bestItem.clientWidth

            gsap.set(bestItem, { width: itemWidth })//초기설정
            gsap.set(itemLi, { left: itemWidth, width: itemWidth })
            gsap.set(itemLi[0], { left: 0 })

        }
        function nextSlide() {
            nextIndex = currentIndex + 1
            if (nextIndex >= itemLength) {
                nextIndex = 0
            }
            gsap.to(itemLi[currentIndex], { left: -itemWidth })
            gsap.set(itemLi[nextIndex], { left: itemWidth })
            gsap.to(itemLi[nextIndex], { left: 0 })
            currentIndex = nextIndex
        }

        function prevSlide() {
            nextIndex = currentIndex - 1
            if (nextIndex >= itemLength) {
                nextIndex = 0
            }
            gsap.to(itemLi[currentIndex], { left: -itemWidth })
            gsap.set(itemLi[nextIndex], { left: itemWidth })
            gsap.to(itemLi[nextIndex], { left: 0 })
            currentIndex = nextIndex
        }
    }

}


//소파 시작
function sofaSlideEffect() {
    const banner = document.querySelector('#sofa_banner')
    const bannerTitle = document.querySelector('#sofa_banner_title')
    const bannerText = document.querySelector('#sofa_banner_text')
    const nextBtn = document.querySelector('#sofa_next_btn')
    const prevBtn = document.querySelector('#sofa_prev_btn')
    const imgLi = document.querySelectorAll('#sofa_img_list>li')
    const imgList = document.querySelector('#sofa_img_list')
    const img = document.querySelectorAll('.sofa_img>img')
    let currentImg = 0
    let nextImg = currentImg + 1
    let isSlide = false
    // let vh = window.innerHeight * 0.01;
    // let imgHeight=img[0].clientHeight


    gsap.set(bannerTitle, { y: 50, opacity: 0 })
    gsap.set(bannerText, { y: 50, opacity: 0 })
    // gsap.set(imgList, { y: 50*vh-imgHeight/2})
    gsap.set(imgLi, { y: 50, opacity: 0, display: 'none' })
    gsap.set(imgLi[0], { y: 0, opacity: 1, display: 'block' })


    gsap.to(bannerTitle, {
        y: 0, opacity: 1, scrollTrigger: {
            trigger: banner,
            start: 'top 0%',
            toggleActions: 'play reverse play reverse',
        }
    })
    gsap.to(bannerText, {
        y: 0, opacity: 1, scrollTrigger: {
            trigger: banner,
            start: 'top -10%',
            toggleActions: 'play reverse play reverse',
        }
    })

    nextBtn.addEventListener('click', showNextImg)
    prevBtn.addEventListener('click', showPrevImg)

    function showNextImg() {
        if (isSlide == false) {
            isSlide = true;
            nextImg = currentImg + 1
            if (nextImg >= imgLi.length) {
                nextImg = 0
            }
            // alert('test')

            gsap.set(imgLi, { opacity: 0, y: 50, display: 'none' })
            gsap.to(imgLi[nextImg], {
                opacity: 1, y: 0, display: 'block', dration: .3, onComplete: () => {
                    isSlide = false;
                }
            })
            currentImg = nextImg
        }
    }
    function showPrevImg() {
        if (isSlide == false) {
            isSlide = true;
            nextImg = currentImg - 1
            if (nextImg < 0) {
                nextImg = imgLi.length - 1
            }

            gsap.set(imgLi, { opacity: 0, y: 50 })
            gsap.to(imgLi[nextImg], {
                opacity: 1, y: 0, dration: .3, onComplete: () => {
                    isSlide = false;
                }
            })
            currentImg = nextImg
        }
    }
}
//소파끝

//컬렉션시작
function collectionEffect() {
    const leftImg = document.querySelectorAll('#collection_img_left>img')
    const rightImg = document.querySelectorAll('#collection_img_right>img')
    const collection = document.querySelector('#collection')

    let movingY = collection.clientHeight * 1.5

    gsap.to(leftImg, {
        y: movingY, scrollTrigger: {
            trigger: collection,
            start: 'top 00%',
            end: 'bottom 0%',
            toggleActions: 'play reverse play reverse',
            scrub: 10,//동기화시키다.모션의길이와 좌표의 길이를 동기화 true:정확히 동기화, 숫자를 주면 살짝느리게 따라오는 느낌? toggleActions이랑쓰면 의미가 없어서 같이 쓰이지 않음

        }
    })
    gsap.to(rightImg, {
        y: -movingY, scrollTrigger: {
            trigger: collection,
            start: 'top 0%',
            end: 'bottom 0%',
            toggleActions: 'play reverse play reverse',
            scrub: 10,//동기화시키다.모션의길이와 좌표의 길이를 동기화 true:정확히 동기화, 숫자를 주면 살짝느리게 따라오는 느낌? toggleActions이랑쓰면 의미가 없어서 같이 쓰이지 않음
            pin: true,//고정시키다, 대상의 스크롤 위치를 고정(위아래 움직임 없음)
            // markers:true,

        }
    })
}

function magazineEffect() {
    imgEffect()

    const banner = document.querySelector('#magazine')
    const title = document.querySelectorAll('#magazine_title>span')
    const text=document.querySelectorAll('#magazine_text>span')
    const textWrap=document.querySelector('#magazine_text')
    const titleWrap=document.querySelector('#magazine_title')
    // let index=parseInt[0]

    gsap.set(title, {
        color: '#eee',
        stagger:0.05, scrollTrigger: {
            trigger: titleWrap, //트리거를 걸 대상
            start: '0 80%',//애니메이션이 어디서 시작하느냐
            end: 'bottom 60%',//어디서 끝날건가
            // markers: true,//좌표점 표시 start , end
            scrub: true,//동기화시키다.모션의길이와 좌표의 길이를 동기화 true:정확히 동기화, 숫자를 주면 살짝느리게 따라오는 느낌? toggleActions이랑쓰면 의미가 없어서 같이 쓰이지 않음
        }
    })
    gsap.set(text, {
        color: '#eee',
        stagger: 0.05
        , scrollTrigger: {
            trigger: textWrap, //트리거를 걸 대상
            start: '0 60%',//애니메이션이 어디서 시작하느냐
            end: 'bottom 80%',//어디서 끝날건가
            // markers: true,//좌표점 표시 start , end
            scrub: true,//동기화시키다.모션의길이와 좌표의 길이를 동기화 true:정확히 동기화, 숫자를 주면 살짝느리게 따라오는 느낌? toggleActions이랑쓰면 의미가 없어서 같이 쓰이지 않음
        }
    })


    function imgEffect() {
        const img0 = document.querySelector('#magazine_img_00')
        const img1 = document.querySelector('#magazine_img_01')
        const comment = document.querySelector('#magazine_comment')

        gsap.set(img0, { y: 50, opacity: 0 })
        gsap.set(img1, { y: 50, opacity: 0 })
        gsap.set(comment, { y: 50, opacity: 0 })

        gsap.to(img0, {
            y: 0, opacity: 1, scrollTrigger: {
                trigger: img0,
                start: 'top 60%',
                toggleActions: 'play reverse play reverse',
            }
        })
        gsap.to(img1, {
            y: 0, opacity: 1, scrollTrigger: {
                trigger: img1,
                start: 'top 60%',
                toggleActions: 'play reverse play reverse',
            }
        })
        gsap.to(comment, {
            y: 0, opacity: 1, scrollTrigger: {
                trigger: comment,
                start: 'top 80%',
                toggleActions: 'play reverse play reverse',
            }
        })
    }





}

function banner2() {
    const banner = document.querySelector('#banner_02')
    const bannerTitle = document.querySelector('#banner_02_title')
    const bannerText = document.querySelector('#banner_02_text')
    const bannerBrand = document.querySelector('#banner_02_brand')
    const bannerBtn = document.querySelector('#banner_02_btn')

    gsap.set(bannerBrand, { opacity: 0, y: 50 })
    gsap.set(bannerTitle, { opacity: 0, y: 50 })
    gsap.set(bannerText, { opacity: 0, y: 50 })
    gsap.set(bannerBtn, { opacity: 0, y: 20 })

    gsap.to(bannerBrand, {
        opacity: 1, y: 0, duration: 0.5, ease: 'power1.out', scrollTrigger: {
            trigger: banner,
            start: 'top 0',
            end: '80% 0%',

            toggleActions: 'play reverse play reverse',//스타트가진입할때, end좌표에서끝났을때, 다시재진입했을때, 다시나갔을때 어떻게할것인가
        }
    })
    gsap.to(bannerTitle, {
        opacity: 1, y: 0, duration: 0.5, ease: 'power1.out', scrollTrigger: {
            trigger: banner,
            start: 'top 0',
            toggleActions: 'play reverse play reverse',
        }
    })
    gsap.to(bannerText, {
        opacity: 1, y: 0, duration: 0.5, ease: 'power1.out', scrollTrigger: {
            trigger: banner,
            start: 'top 0',
            toggleActions: 'play reverse play reverse',
        }
    })
    gsap.to(bannerBtn, {
        opacity: 1, y: 0, duration: 0.3, ease: 'power1.out', scrollTrigger: {
            trigger: banner,
            start: 'top 0',
            toggleActions: 'play reverse play reverse',
        }
    })
}

function bannerEffect() {
    banner0()
    banner1()




    function banner1() {
        const banner = document.querySelector('#banner_01')
        const bannerImg = document.querySelector('#banner_01>img')

        let startX = window.innerWidth
        let endX = 0 - bannerImg.clientWidth - startX
        // let vh = window.innerHeight * 0.01;

        // window.addEventListener('resize', console.log(vh))

        gsap.set(bannerImg, { left: startX })
        // top: 50 * vh - (bannerImg.clientHeight / 2)
        gsap.to(bannerImg, {
            x: endX, scrollTrigger: {
                trigger: banner, //트리거를 걸 대상
                // markers:true,//좌표점 표시 start , end
                start: 'top 0',//애니메이션이 어디서 시작하느냐
                end: '300% 0',//어디서 끝날건가
                scrub: 5,//동기화시키다.모션의길이와 좌표의 길이를 동기화 true:정확히 동기화, 숫자를 주면 살짝느리게 따라오는 느낌? toggleActions이랑쓰면 의미가 없어서 같이 쓰이지 않음
                pin: true,//고정시키다, 대상의 스크롤 위치를 고정(위아래 움직임 없음)
                // markers:true,
            }
        })
    }



    function banner0() {
        const banner = document.querySelector('#banner_00')
        const bannerTitle = document.querySelector('#banner_00_title')
        const bannerText = document.querySelector('#banner_00_text')
        const bannerBrand = document.querySelector('#banner_00_brand')
        const bannerBtn = document.querySelector('#banner_00_btn')

        gsap.set(bannerBrand, { opacity: 0, y: 50 })
        gsap.set(bannerTitle, { opacity: 0, y: 50 })
        gsap.set(bannerText, { opacity: 0, y: 50 })
        gsap.set(bannerBtn, { opacity: 0, y: 20 })

        gsap.to(bannerBrand, {
            opacity: 1, y: 0, duration: 0.5, ease: 'power1.out', scrollTrigger: {
                trigger: banner,
                start: 'top 0',
                toggleActions: 'play reverse play reverse',//스타트가진입할때, end좌표에서끝났을때, 다시재진입했을때, 다시나갔을때 어떻게할것인가
            }
        })
        gsap.to(bannerTitle, {
            opacity: 1, y: 0, duration: 0.5, ease: 'power1.out', scrollTrigger: {
                trigger: banner,
                start: 'top 0',
                toggleActions: 'play reverse play reverse',
            }
        })
        gsap.to(bannerText, {
            opacity: 1, y: 0, duration: 0.5, ease: 'power1.out', scrollTrigger: {
                trigger: banner,
                start: 'top 0',
                toggleActions: 'play reverse play reverse',
            }
        })
        gsap.to(bannerBtn, {
            opacity: 1, y: 0, duration: 0.3, ease: 'power1.out', scrollTrigger: {
                trigger: banner,
                start: 'top 0',
                toggleActions: 'play reverse play reverse',
            }
        })
    }

}

function introEffect() {
    const introTabMenu = document.querySelectorAll('#intro_tabmenu_list>li')
    const introPanel = document.querySelector('#intro_data')
    const introNextBtn = document.querySelector('#intro_next_btn')
    const introPrevBtn = document.querySelector('#intro_prev_btn')
    const slideNum = document.querySelector('#intro_current_index')

    let isSlide = false; // 현제 슬라이드를 하고있는 체크하는 상태변수 ( 초기값 false )

    let currentImg = 0
    let nextImg = currentImg + 1

    let selectedTabMenu = introTabMenu[0]
    showPanel(0)

    init()

    function init() {
        selectedTabMenu.classList.add('selected')
    }

    introTabMenu.forEach((item, index) => {
        item.addEventListener('click', (e) => {
            //   alert(index)
            e.preventDefault()
            activateTabMenu(index)
            showPanel(index)
        })
    })

    //탭메뉴 이펙트
    function activateTabMenu(index) {
        if (selectedTabMenu != null && selectedTabMenu != introTabMenu[index]) {
            selectedTabMenu.classList.remove('selected')
            currentImg = 0
            slideNum.innerHTML = `0${currentImg + 1}`
        }
        if (selectedTabMenu != introTabMenu[index]) {
            selectedTabMenu = introTabMenu[index]
            selectedTabMenu.classList.add('selected')
            currentImg = 0
        }
    }
    //패널 데이터 불러오기
    function showPanel(index) {
        axios.get(`/furniture/data/introdata${index}.html`).then((res) => {
            introPanel.innerHTML = res.data
            //로드가 된후 실행할 함수 슬라이드
            intro()
        }, () => {
            introPanel.innerHTML = '네트워크 실패'
        })
    }
    function intro(){
        const panelWrap=document.querySelector('#intro_data')

        gsap.set(panelWrap, {opacity:0, y:80})
        gsap.to(panelWrap, {opacity:1, y:0, scrollTrigger:{
            trigger:panelWrap,
            start:'top 80%',
            toggleActions: 'play reverse play reverse',
            // markers:true
        }})
        introImgInit()
        introSlide()

        function introImgInit() {
            const introImg = document.querySelectorAll('.intro_slide_list>li')
            const introTitle = document.querySelectorAll('.intro_panel_title')
            const introText = document.querySelectorAll('.intro_panel_text')
            const introBtn = document.querySelectorAll('.intro_panel_btn')
            gsap.set(introTitle, { opacity: 0, y: 80 })
            gsap.set(introText, { opacity: 0, y: 80 })
            gsap.set(introBtn, { opacity: 0, y: 80 })
            gsap.set(introImg, { opacity: 0, y: 80 })
    
            gsap.to(introTitle, { opacity: 1, y: 0, duration: 0.3 })
            gsap.to(introText, {
                opacity: 1, y: 0, duration: 0.3, onComplete: () => {
                    gsap.to(introBtn, {
                        opacity: 1, y: 0, duration: 0.2, onComplete: () => {
                            gsap.to(introImg[currentImg], { opacity: 1, y: 0, duration: .3 })
                        }
                    })
                }
            })
        }
    
        function introSlide() {
            introNextBtn.addEventListener('click', introNextImg)
            introPrevBtn.addEventListener('click', introPrevImg)
        }
        function introNextImg() {
            const introImg = document.querySelectorAll('.intro_slide_list>li')
            if (isSlide == false) {
    
                isSlide = true;
                nextImg = currentImg + 1
                if (nextImg >= introImg.length) {
                    nextImg = 0
                }
                // alert('test')
    
                gsap.set(introImg, { opacity: 0, y: 80 })
                gsap.to(introImg[nextImg], {
                    opacity: 1, y: 0, dration: .3, onComplete: () => {
                        isSlide = false;
                    }
                })
                currentImg = nextImg
                slideNum.innerHTML = `0${currentImg + 1}`
            }
        }
        function introPrevImg() {
            const introImg = document.querySelectorAll('.intro_slide_list>li')
            if (isSlide == false) {
    
                isSlide = true;
                nextImg = currentImg - 1
                if (nextImg < 0) {
                    nextImg = introImg.length - 1
                }
                gsap.set(introImg, { opacity: 0, y: 80 })
                gsap.to(introImg[nextImg], {
                    opacity: 1, y: 0, dration: .3, onComplete: () => {
                        isSlide = false;
                    }
                })
                currentImg = nextImg
                slideNum.innerHTML = `0${currentImg + 1}`
            }
        }
    }


}