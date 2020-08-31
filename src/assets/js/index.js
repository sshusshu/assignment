
const sliderWrap = document.querySelector('.slide-container');
const sliderContainer = sliderWrap.querySelector('ul');
const sliders = sliderContainer.querySelectorAll('li')
let slideWidth = sliders[0].offsetWidth;
let downX = 0;
let moveX = 0;
let tX = 0;
let idx = 0;

let isDrag = false;
function mouseDown(e) {
    e.preventDefault()
    downX = e.clientX + moveX;
    sliderWrap.addEventListener('mousemove', mouseMove)
    tX = moveX;
}
function mouseMove(e) {
    isDrag = true;
    moveX = downX - e.clientX;
    positionX();
}
function mouseUp(e) {
    isDrag = false;
    findIdx();
    snapPosition();
    positionX();
    sliderWrap.removeEventListener('mousemove', mouseMove)
    sliderWrap.removeEventListener('mousemove', mouseMove)
}
function mouseLeave(e) {
    sliderWrap.removeEventListener('mousemove', mouseMove)
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
    if (tX>moveX){
        idx--
    }else if(tX<moveX){
        idx++
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
    snapPosition()
    positionX(true);
})



const cursor = document.querySelector('.cursor');
function mouseCursor(e) {
    cursor.style.left = `${e.clientX}px`
    cursor.style.top = `${e.clientY}px`
}
addEventListener('mousemove', mouseCursor)
