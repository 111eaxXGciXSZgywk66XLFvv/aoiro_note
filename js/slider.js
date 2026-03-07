window.addEventListener('load', () => {
  const splide = document.querySelector('.splide');
  if (!splide || typeof LuminousGallery === 'undefined') return;

  const slider = new Splide(splide, {
    type: 'loop',
    perPage: 3,
    gap: '20px',
    autoplay: true,
    interval: 3000,
    breakpoints: {
      640: { perPage: 1 },
    },
  });

  let luminousInitialized = false;

  slider.on('mounted', () => {
    if (luminousInitialized) return;

    const zoomImages = splide.querySelectorAll('.zoom-img');
    if (zoomImages.length) {
      new LuminousGallery(zoomImages, {}, {
        closeOnOverlayClick: true,
        closeOnScroll: false,
      });
      luminousInitialized = true;
    }
  });

  slider.mount();
});
