function load(){
    //===============Carousel==============//
    const carousel = document.querySelector(".owl-nav");
    if (carousel != undefined) {
        const h5 = document.createElement("h5");
        h5.innerText = "Featured Ads";
        carousel.appendChild(h5);
    }
}

function scrollUp() {
  if (+this.scrollY >= 200) {
    scrollup.classList.add("show-scrollup");
  } else {
    scrollup.classList.remove("show-scrollup");
  }
}
window.addEventListener("scroll", scrollUp);

$('.owl-carousel').owlCarousel({
    loop:false,
    margin:10,
    nav:true,
    rewind:true,
    dots:false,
    autoplay: true,
    autoplayTimeout: 20000,
    responsive:{
        0:{
            items:1
        },
        576:{
            items:2
        },
        768:{
            items:3
        },
        992:{
            items:4
        }
    }
})

function openClosePresents(){
    const elem = document.querySelector("#presents");
    elem.classList.toggle("opened");
}