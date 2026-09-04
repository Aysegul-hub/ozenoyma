const heroContent = document.querySelector(".hero-content");

window.addEventListener("scroll", () => {
    if(window.scrollY > 50) {
        heroContent.classList.add("scrolled");
    }else {
        heroContent.classList.remove("scrolled");
    }
    }
);

const workImages = document.querySelectorAll(".work-card img");

const lightbox = document.querySelector("#lightbox");
const lightboxContent = document.querySelector(".lightbox-content");
const lightboxImage = document.querySelector("#lightboxImage");
const lightboxTitle = document.querySelector("#lightboxTitle");
const lightboxClose = document.querySelector("#lightboxClose");

let selectedImage= null;
let startRect = null;


workImages.forEach((image) => {
    image.addEventListener("click", () => {
        electedImage = image;

        startRect = image.getBoundingClientRect();


        lightboxImage.src = image.src;

        lightboxTitle.textContent = image.alt;


        lightbox.style.setProperty("--start-left", `${startRect.left}px`);
        lightbox.style.setProperty("--start-top", `${startRect.top}px`);
        lightbox.style.setProperty("--start-width", `${startRect.width}px`);
        lightbox.style.setProperty("--start-height", `${startRect.height}px`);


        const maxWidth = window.innerWidth * 0.85;
        const maxHeight = window.innerHeight * 0.78;

        const imageRatio = image.naturalWidth / image.naturalHeight;

        let endWidth = maxWidth;
        let endHeight = endWidth / imageRatio;


        if (endHeight > maxHeight) {
            endHeight = maxHeight;
            endWidth = endHeight * imageRatio;
        }


        const endLeft = (window.innerWidth - endWidth) / 2;
        const endTop = (window.innerHeight - endHeight) / 2;


        lightbox.style.setProperty("--end-left", `${endLeft}px`);
        lightbox.style.setProperty("--end-top", `${endTop}px`);
        lightbox.style.setProperty("--end-width", `${endWidth}px`);
        lightbox.style.setProperty("--end-height", `${endHeight}px`);


        lightbox.classList.add("active");

    });

});


lightboxClose.addEventListener("click", closeLightbox);


lightbox.addEventListener("click", (event) => {

    if (event.target === lightbox) {
        closeLightbox();
    }

});


function closeLightbox() {

    if (!selectedImage || !startRect) {
        lightbox.classList.remove("active");
        return;
    }


    const currentRect = selectedImage.getBoundingClientRect();


    lightbox.style.setProperty("--start-left", `${currentRect.left}px`);
    lightbox.style.setProperty("--start-top", `${currentRect.top}px`);
    lightbox.style.setProperty("--start-width", `${currentRect.width}px`);
    lightbox.style.setProperty("--start-height", `${currentRect.height}px`);


    lightbox.classList.remove("active");


    setTimeout(() => {

        lightboxImage.src = "";

        selectedImage = null;
        startRect = null;

    }, 550);

}