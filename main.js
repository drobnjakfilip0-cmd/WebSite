const slides = document.querySelectorAll(".slides img");
let slideIndex = 0;
let intervalId = null;
const dotsContainer = document.getElementById("dotsContainer");
let dots = [];
let isAnimating = false;

document.addEventListener("DOMContentLoaded", initializeSlider);

function initializeSlider() {
    if (slides.length > 0) {
        createDots();
        updateDots();

        slides.forEach((slide, index) => {
            if(index === slideIndex) {
                gsap.set(slide, {display: "block", x: "0%"});
            } else {
                gsap.set(slide, {display: "none", x: "0%"});
            }
        });

        intervalId = setInterval(nextSlide, 5000);

        // dugmad
        const prevBtn = document.querySelector(".prev");
        const nextBtn = document.querySelector(".next");

        prevBtn.addEventListener("click", () => {
            prevSlide();
            resetInterval();
        });
        nextBtn.addEventListener("click", () => {
            nextSlide();
            resetInterval();
        });
    }
}


function resetInterval() {
    if (intervalId) {
        clearInterval(intervalId);
    }
    intervalId = setInterval(nextSlide, 7000);
}



function nextSlide() {
    if (isAnimating) return;
    isAnimating = true;

    const current = slides[slideIndex];
    const nextIndex = (slideIndex + 1) % slides.length;
    const next = slides[nextIndex];

    // animacija: uvek slajd dolazi sa desne strane
    gsap.set(next, { x: "100%", display: "block" });
    gsap.to(next, {
        x: "0%",
        duration: 0.7,
        ease: "power2.out",
        onComplete: () => {
            slides.forEach(slide => {
                if (slide !== next) slide.style.display = "none";
                slide.style.x = "0%"; // reset
            });
            slideIndex = nextIndex;
            isAnimating = false;
            updateDots();
        }
    });

    // animacija trenutnog slajda: ide levo
    gsap.to(current, {
        x: "-100%",
        duration: 0.7,
        ease: "power2.out"
    });
}

function prevSlide() {
    if (isAnimating) return;
    isAnimating = true;

    const current = slides[slideIndex];
    const prevIndex = (slideIndex - 1 + slides.length) % slides.length;
    const prev = slides[prevIndex];

    // animacija: uvek slajd dolazi sa leve strane
    gsap.set(prev, { x: "-100%", display: "block" });
    gsap.to(prev, {
        x: "0%",
        duration: 0.7,
        ease: "power2.out",
        onComplete: () => {
            slides.forEach(slide => {
                if (slide !== prev) slide.style.display = "none";
                slide.style.x = "0%"; // reset
            });
            slideIndex = prevIndex;
            isAnimating = false;
            updateDots();
        }
    });

    // animacija trenutnog slajda: ide desno
    gsap.to(current, {
        x: "100%",
        duration: 0.7,
        ease: "power2.out"
    });
}
function createDots() {
    slides.forEach((_, index) => {
        const dot = document.createElement("div");
        dot.classList.add("dot");
        if (index === slideIndex) dot.classList.add("active");

        dot.addEventListener("click", () => {
            if(isAnimating || index === slideIndex) return;
            isAnimating = true;

            const current = slides[slideIndex];
            const next = slides[index];
            const direction = index > slideIndex ? "100%" : "-100%";

            gsap.set(next, {x: direction, display: "block"});
            gsap.to(next, {
                x: "0%", 
                duration: 0.7, 
                ease: "power2.out",
                onComplete: () => {
                    slides.forEach(slide => {
                        if(slide !== next) slide.style.display = "none";
                    });
                    slideIndex = index;
                    isAnimating = false;
                    updateDots();
                }
            });
        });

        dotsContainer.appendChild(dot);
        dots.push(dot);
    });
}

function updateDots() {
    dots.forEach(dot => dot.classList.remove("active"));
    if (dots[slideIndex]) {
        dots[slideIndex].classList.add("active");
    }
}










  document.querySelectorAll('.ikonice').forEach(img => {
    const originalSrc = img.getAttribute('src'); // čuva crno-belu verziju
    const colorSrc = img.getAttribute('data-color'); // čuva verziju u boji

    // Kada se pređe mišem preko ikonice
    img.addEventListener('mouseenter', () => {
      img.setAttribute('src', colorSrc);
      // postavlja boju
    });

    // Kada se miš skloni sa ikonice
    img.addEventListener('mouseleave', () => {
      img.setAttribute('src', originalSrc); // vraća crno-belu
    });
  });

  function toggleMenu() {
    const navLinks = document.getElementById('nav-links');
    navLinks.classList.toggle('active');
  }
   

  const logo = document.getElementById("logo");
  const element = document.querySelector(".skrivena-pocetna");
  const closeBtn = document.getElementById("closeBtn");
  const skrivena = document.getElementById("skriven");
  let prikazano = false;
  console.log({closeBtn, element})
  closeBtn.addEventListener("click", () => { 
    element.style.display = "none";
  
    })

    

    
  

   
    
  
  logo.addEventListener("mouseover", () => {
    if(!prikazano) {
      element.style.display = "flex";
      prikazano = true;
      }
      logo.addEventListener("click", () => {
        element.style.display = "flex"
      });
      
      
      gsap.from("#skrivena", {
        y: -20,
        duration: 3,
        ease: "elastic"
      })
      gsap.to("#skrivena", {
        y: 50,
        duration: 3,
        ease: "elastic"
      })
      gsap.from("#logo2",{
    y: -80,
    scale: 0,
    rotation: 720,
    opacity: 0,
    duration: 3,
    ease: "bounce.out",
    transformOrigin: "50% 50%"
  });

  // 2. Kratko zadrži pažnju na logo
  tl.to("#logo2", {
    scale: 1,
    duration: 0.3,
    yoyo: true,
    repeat: 1,
    ease: "elastic",
    
  });



  })

document.addEventListener("DOMContentLoaded", () => {
  const tl = gsap.timeline();

  // 1. Logo: dolazi sa vrha, okreće se i skaluje uz bounce
  tl.from("#logo", {
    y: -80,
    scale: 0,
    rotation: 720,
    opacity: 0,
    duration: 3,
    ease: "bounce.out",
    transformOrigin: "50% 50%"
    
  });

  // 2. Kratko zadrži pažnju na logo
  tl.to("#logo", {
    scale: 1.2,
    duration: 0.3,
    yoyo: true,
    repeat: 1,
    ease: "elastic",
    
  });

  // 3. Tekst: slajduje s leva, sa blagim rotiranjem i fade in
  tl.from("#logo-tekst", {
    x: -100,
    skewX: 15,
    opacity: 0,
    duration: 1.2,
    ease: "elastic"
  });

  // 4. Efekat pulsiranja "svetlosti" na tekstu
  tl.to("#logo-tekst", {
    
    duration: 0.5,
    repeat: 2,
    yoyo: true,
    ease: "power2.inOut"
  });
});


gsap.registerPlugin(TextPlugin);

   gsap.to("#link-jezik1", {
    duration: 1.5,
    text: "ЋИР -",
    fontFamily: "cofo raffine",
    fontSize: "1.2rem",
    fontWeight: "bold",
    
  
    ease: "power1.inout",
    
  });

   gsap.to("#link-jezik2", {
    duration: 1.5,
    text: "LAT |",
    fontFamily: "Barlet",
    ease: "power1.inout",
    
  });
 
   gsap.to("#link-jezik3", {
    duration: 1.5,
    text: "ENG",
    fontFamily: "bungee",
  ease: "power1.inout",
    
  });

// 1. Selektujemo sve elemente koji imaju data-text
const tekstElementi = document.querySelectorAll("[data-text-cirilica]");

// 2. Selektujemo linkove za promenu jezika
const linkCir = document.getElementById("link-jezik1");
const linkLat = document.getElementById("link-jezik2");
const linkEng = document.getElementById("link-jezik3");

// 3. Funkcija koja menja jezik
function promeniJezik(jezik) {
    tekstElementi.forEach(el => {
        let noviTekst;

        // Odabir odgovarajućeg teksta po jeziku
        if(jezik === "cir") {
            noviTekst = el.dataset.textCirilica;
        } else if(jezik === "lat") {
            noviTekst = el.dataset.textLatinica;
        } else if(jezik === "eng") {
            noviTekst = el.dataset.textEnglish;
        }

        // Zamena | sa <br> za novi red
        noviTekst = noviTekst.replace(/\|/g, "<br>");

        // Postavljanje teksta u element
        el.innerHTML = noviTekst;

        // Ažuriranje klase za font po jeziku
        el.classList.remove("cirilica", "latinica", "english");
        if(jezik === "cir") el.classList.add("cirilica");
        if(jezik === "lat") el.classList.add("latinica");
        if(jezik === "eng") el.classList.add("english");
    });
      document.body.classList.remove("cirilica", "latinica", "english");
      if (jezik === "cir") document.body.classList.add("cirilica");
      if (jezik === "lat") document.body.classList.add("latinica");
      if (jezik === "eng") document.body.classList.add("english");
}
  

// 4. Dodavanje click događaja na linkove
linkCir.addEventListener("click", (e) => {
    e.preventDefault(); // sprečava reload stranice
    promeniJezik("cir");
});

linkLat.addEventListener("click", (e) => {
    e.preventDefault();
    promeniJezik("lat");
});

linkEng.addEventListener("click", (e) => {
    e.preventDefault();
    promeniJezik("eng");
});
linkCir.addEventListener("mouseenter",() => {
  linkCir.style.color = "rgba(243, 113, 108, 1)";
})
linkCir.addEventListener("mouseleave",() => {
  linkCir.style.color = "rgb(255, 77, 77)";
})
linkLat.addEventListener("mouseenter",() => {
  linkLat.style.color = "rgba(243, 113, 108, 1)";
})
linkLat.addEventListener("mouseleave",() => {
  linkLat.style.color = "rgb(255, 77, 77)";
})
linkEng.addEventListener("mouseenter",() => {
  linkEng.style.color = "rgba(243, 113, 108, 1)";
})
linkEng.addEventListener("mouseleave",() => {
  linkEng.style.color = "rgb(255, 77, 77)";
})
TweenMax.from('#tekst-slider', 2, {opacity: 0, x: -500}, 0.1);
TweenMax.from('#tekstualni', 2, {opacity: 0, x: 300}, 0.1);
TweenMax.from('.slider', 1, {opacity: 0, y: 500}, 0.1);
TweenMax.from('.dots', 1, {opacity: 0, y: 500}, 0.1);
gsap.from(".pre-header1", {
  x: -500,       // pomera se do pola
  duration: 2,    // vreme animacije     // vraća nazad u početnu tačku
  ease: "power1.inOut" // glatko kretanje
});
gsap.from("#ulica", {
  x: 500,       // pomera se do pola
  duration: 2,    // vreme animacije     // vraća nazad u početnu tačku
  ease: "power1.inOut" // glatko kretanje
});




const skoliceDiv = document.getElementById("skolice-menu-div");
const skolice = document.getElementById("skolicaa");
const navBar = document.getElementById("navbar");

skolice.addEventListener("click", () => {
  skoliceDiv.style.display = "flex";
})

navBar.addEventListener("mouseleave", () => {
  skoliceDiv.style.display = "none";
})

const bioskopDiv = document.getElementById("bioskop-menu-div");
const bioskop = document.getElementById("bioskop");

bioskop.addEventListener("click", () => {
  bioskopDiv.style.display = "flex";
})

navBar.addEventListener("mouseleave", () => {
  bioskopDiv.style.display = "none";
})







const links = document.querySelectorAll('#nav-links > li > a.meni');

links.forEach(link => {
  link.addEventListener('mouseenter', () => {
    links.forEach(l => {
      l.style.color = (l === link) ? '#ff4d4d' : '#595757ff';
    });
  });

  link.addEventListener('mouseleave', () => {
    links.forEach(l => l.style.color = 'black');
  });
});


