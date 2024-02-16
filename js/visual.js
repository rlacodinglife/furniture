window.addEventListener('load',()=>{
    const visual=document.querySelector('#visual')
    const visualList=document.querySelector('#visual_list')
    const visualLi=document.querySelectorAll('#visual_list>li')
    const visualText=document.querySelectorAll('.visual_text')
    const visualTitle=document.querySelectorAll('.visual_title')
    const visualBtn=document.querySelectorAll('.visual_btn')
    const pageNum=document.querySelector('#visual_first_index')
    const visualBar=document.querySelector('#visual_bar>span')
    const nextBtn=document.querySelector('#visual_next_btn')
    const prevBtn=document.querySelector('#visual_prev_btn')

    let visualLength=visualLi.length
    let visualWidth=visual.offsetWidth
    let currentIndex=0//현재 이너에들어온, 보여주고있는 li의 순번
    let nextIndex=currentIndex+1//다음에 들어올 순번
    let timer=null
    
    textEffect()
    visualReset()
    autoPlay()

    gsap.set(visualLi,{x:visualWidth, opacity:0})
    gsap.set(visualLi[0],{x:0,opacity:1})
    gsap.set(visualBar,{x:30*(currentIndex)})

   window.addEventListener('resize', visualReset)
    nextBtn.addEventListener('mouseenter', stopAutoPlay)
    prevBtn.addEventListener('mouseenter', stopAutoPlay)
    nextBtn.addEventListener('mouseleave', autoPlay)
    prevBtn.addEventListener('mouseleave', autoPlay)
    nextBtn.addEventListener('click',slideNextVisual)
    prevBtn.addEventListener('click',slidePrevVisual)

    function autoPlay(){
        timer=setInterval(slideNextVisual, 4000)
    }
    function stopAutoPlay(){
        clearInterval(timer)
    }
    //비쥬얼리셋
    function visualReset(){
        visualWidth=visual.offsetWidth
        gsap.set(visualLi, {width:visualWidth})
     }
    function slideNextVisual(){
        nextIndex=currentIndex+1
        if(nextIndex>=visualLength){
          nextIndex=0
        }
       
    
        gsap.to(visualBar,{x:30*(nextIndex), duration:.2})
        gsap.to(visualLi[currentIndex], {x:-visualWidth,opacity:0, duration:0.5, ease:'power1.out'})//현재 li를 왼쪽으로 보내면서 안보이게함
        gsap.set(visualLi[nextIndex], {x:visualWidth})
        gsap.to(visualLi[nextIndex], {x:0, opacity:1, duration:0.5, ease:'power1.out', onComplete:()=>{
            textEffect()
        }})
        currentIndex=nextIndex//애니메이션이 진행되면 현재순번을 다음순번으로 변경
        pageNum.innerHTML=`${currentIndex+1}`
      }
    function slidePrevVisual(){
        nextIndex=currentIndex-1
        if(nextIndex<0){
          nextIndex=visualLength-1
        }
        // if(nextIndex==visualLength-1){
        //     gsap.to(visualBar,{x:30*(nextIndex)})
        // }
        gsap.to(visualBar,{x:30*(nextIndex), duration:.2})
        gsap.to(visualLi[currentIndex], {x:visualWidth,opacity:0, duration:0.5, ease:'power1.out'})
        gsap.set(visualLi[nextIndex], {x:-visualWidth})
        gsap.to(visualLi[nextIndex], {x:0, opacity:1, duration:0.5, ease:'power1.out', onComplete:()=>{
            textEffect()
        }})
        currentIndex=nextIndex
        pageNum.innerHTML=`${currentIndex+1}`
      }

      //텍스트이펙트
      function textEffect(){
        gsap.set(visualTitle, {opacity:0, y:50})
        gsap.set(visualText, {opacity:0, y:50})
        gsap.set(visualBtn, {opacity:0, y:20})
        gsap.to(visualTitle[currentIndex], {opacity:1, y:0, duration:0.5, ease:'power1.out'})
        gsap.to(visualText[currentIndex], {opacity:1, y:0, duration:0.5, ease:'power1.out', onComplete:()=>{
            gsap.to(visualBtn[currentIndex], {opacity:1, y:0, duration:0.3, ease:'power1.out'})
           }})
    }
    
})