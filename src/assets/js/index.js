
const sliderWrap = document.querySelector('.slide-container');
const sliderContainer = sliderWrap.querySelector('ul');
const sliders = sliderContainer.querySelectorAll('li')
let slideWidth = sliders[0].offsetWidth;
let downX = 0;
let moveX = 0;
let tX = 0;
let idx = 0;

let isDrag = false;


function getPosition(e){
    let x,y;

    if (e.type.includes('touch')) {
        x = e.touches[0].clientX;
        y = e.touches[0].clientY;
    } else {
        x = e.clientX;
        y = e.clientY;
    }
    return {x:x, y:y};

}


function mouseDown(e) {
    e.preventDefault();
    isDrag = true;
    downX = getPosition(e).x + moveX;
    sliderWrap.addEventListener('mousemove', mouseMove);
    sliderWrap.addEventListener('touchmove', mouseMove);
    tX = moveX;

}
function mouseMove(e) {
    isDrag = true;
    moveX = downX - getPosition(e).x;
    positionX();
}
function mouseUp(e) {
    isDrag = false;
    findIdx();
    snapPosition();
    positionX();


    sliderWrap.removeEventListener('mousemove', mouseMove);
    sliderWrap.removeEventListener('touchmove', mouseMove);
}
function mouseLeave(e) {
    sliderWrap.removeEventListener('mousemove', mouseMove);
    sliderWrap.removeEventListener('touchmove', mouseMove);
}

function positionX(isDrag){
    if (moveX < 0){
        moveX = 0
    }
    if (moveX > slideWidth * (sliders.length-1)){
        moveX = slideWidth * (sliders.length-1)
    }
    if (!isDrag){
        sliderContainer.style.transition = 'transform 0.5s ease';
    }else{
        sliderContainer.style.transition = 'transform 0.0s ease';
    }
    sliderContainer.style.transform=`translate(-${moveX}px,0px)`
}

function findIdx(){
    //드래그할 때
    if (tX>moveX){
        idx--
    }else if(tX<moveX){
        idx++
    }

    //클릭할 때
    if (prevBtn.classList.contains('active')){
        idx--
    }else if(nextBtn.classList.contains('active')){
        idx++
    }

    //최소 최대 값지정
    if (idx < 0){
        idx = 0;
    }else if(idx > sliders.length-1){
        idx = sliders.length-1;
    }
}

function snapPosition(){
    moveX = slideWidth * idx
}

sliderWrap.addEventListener('mousedown',mouseDown)
sliderWrap.addEventListener('touchstart', mouseDown)
sliderWrap.addEventListener('mouseup',mouseUp)
sliderWrap.addEventListener('touchend',mouseUp)
sliderWrap.addEventListener('mouseleave',mouseLeave)
sliderWrap.addEventListener('touchcancel',mouseLeave)



window.addEventListener('resize',function(){
    slideWidth = sliders[0].offsetWidth;
    snapPosition();
    positionX(true);
})



const cursor = document.querySelector('.cursor');
const prevBtn = cursor.querySelector('.prev');
const nextBtn = cursor.querySelector('.next');


// 따라다니는 마우스 커서
function floatingCursor(e){
    cursor.style.left = `${getPosition(e).x}px`
    cursor.style.top = `${getPosition(e).y}px`

    if (e.type.includes('touch')){
        cursor.style.opacity='0'
    }
}

// 좌우에 따라 arrow스케일 변화
function arrowClass(e){
    if (!isDrag && getPosition(e).x < slideWidth/2){
        prevBtn.classList.add('active');
        nextBtn.classList.remove('active');
    }else if(!isDrag && getPosition(e).x > slideWidth/2){
        nextBtn.classList.add('active');
        prevBtn.classList.remove('active');
    }else{
        prevBtn.classList.remove('active');
        nextBtn.classList.remove('active');
    }
}

function mouseCursor(e) {
    floatingCursor(e);
    arrowClass(e);
}

addEventListener('mousemove', mouseCursor)
//addEventListener('touchstart', arrowClass)

