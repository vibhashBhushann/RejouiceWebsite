function loco(){
    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

    const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);

    // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
        return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
        return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
    });

    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();
}
loco();

function cursorEffect() {
    var page1Content = document.querySelector("#page1Content");
    var cursor = document.querySelector("#cursor");

    // page1Content.addEventListener("mousemove", function(dets){
    //     cursor.style.left = dets.x+"px";
    //     cursor.style.top = dets.y+"px";
    // })

    page1Content.addEventListener("mousemove", function(dets){
        gsap.to(cursor,{
            x:dets.x,   
            y:dets.y
        })
    })
    page1Content.addEventListener("mouseenter", function(){
        gsap.to(cursor,{
            scale:1,   
            opacity:0.8
        })
    })
    page1Content.addEventListener("mouseleave", function(){
        gsap.to(cursor,{
            scale:0,   
            opacity:0
        })
    })
}
cursorEffect();

function page2Animation(){
    gsap.from(".elem h1", {
        y:120,
        stagger: 0.2,
        duration: 1,
        scrollTrigger: {
            trigger: "#page2", 
            scroller: "#main",   
            start: "top 40%",
            end: "top 37%",
            scrub: 2
        }
    })
}
page2Animation();

function sliderAnimation(){
    var swiper = new Swiper(".mySwiper", {
        slidesPerView: 4,
        spaceBetween: 15,
        freeMode: true,
        loop: true,
        speed: 8000, // Transition speed (in milliseconds)
        autoplay: {
            delay: 0, // No delay between transitions
            disableOnInteraction: false, // Continue autoplay after user interactions
        },
    });
}
sliderAnimation();

function loaderAnimation(){
    var tl = gsap.timeline();
    tl.from("#loader h3",{
        x:40,
        opacity: 0,
        duration: 1,
        stagger: 0.1
    })
    tl.to("#loader h3",{
        opacity:0,
        x:-20,
        duration: 0.8,
        stagger:0.1
    })
    tl.to("#loader", {
        opacity:0
    })
    tl.from("#page1Content h1 span", {
        y:100,
        opacity:0,
        stagger:0.07, 
        duration:0.4,
        delay: -0.5
    })
    tl.to("#loader",{
        display:"none"
    })
}
loaderAnimation();

function page4Animation(){
    gsap.from(".elem4 h1", {
        y:120,
        stagger: 0.2,
        duration: 1,
        scrollTrigger: {
            trigger: "#page4", 
            scroller: "#main",   
            start: "top 30%",
            end: "top 27%",
            scrub: 2
        }
    })
}
page4Animation();

