document.addEventListener('DOMContentLoaded', () => {

  // ハンバーガーメニュー
  const hamburger = document.getElementById('js-hamburger');
  const nav = document.getElementById('js-nav');

  if (hamburger && nav) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      nav.classList.toggle('active');
    });

    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        nav.classList.remove('active');
      });
    });
  }

  // メインビジュアル リンク同期
  const projectLinks = [
    "works/projects/motion-graphics/code-arc.html",
    "works/projects/graphic-design/kawano.html",
    "works/projects/animation/my-cm.html"
  ];

  const linkElements = document.querySelectorAll('.dynamic-link');
  const DURATION_PER_SLIDE = 6.00;

  const getActiveVideo = () =>
    document.querySelector(window.innerWidth < 768 ? '.mobile' : '.pc');

  let video = getActiveVideo();

  const syncLinks = () => {
    if (!video) return;
    const index = Math.min(
      Math.floor(video.currentTime / DURATION_PER_SLIDE),
      projectLinks.length - 1
    );
    linkElements.forEach(link => {
      if (link.getAttribute('data-current-index') !== String(index)) {
        link.href = projectLinks[index];
        link.setAttribute('data-current-index', index);
      }
    });
  };

  if (video) video.addEventListener('timeupdate', syncLinks);

  window.addEventListener('resize', () => {
    const newVideo = getActiveVideo();
    if (newVideo !== video) {
      video?.removeEventListener('timeupdate', syncLinks);
      video = newVideo;
      video?.addEventListener('timeupdate', syncLinks);
    }
  });

  //Worksのフィルタリング機能
  const filterBtns = document.querySelectorAll('.filter-btn');
  const items = document.querySelectorAll('.work-item');

  if (filterBtns.length > 0 && items.length > 0) {
    filterBtns.forEach(button => {
      button.addEventListener('click', () => {

        filterBtns.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        items.forEach(item => {
          const category = item.getAttribute('data-category');
          if (filterValue === 'all' || category === filterValue) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  // --- ページ遷移時の自動フィルタリング ---
  const hash = window.location.hash;

  if (hash) {
    const filterTarget = hash.replace('#', '').replace('-', ' ');
    const targetBtn = document.querySelector(`.filter-btn[data-filter="${filterTarget}"]`);

    if (targetBtn) {
      targetBtn.click();

      const worksSection = document.getElementById('Works');
      if (worksSection) {
        worksSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }


  // フェードイン
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('is-visible');
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
});

document.addEventListener('DOMContentLoaded', function() {
  const aboutBtn = document.getElementById('js-about-toggle');
  const aboutContent = document.getElementById('js-more-content');

  if (aboutBtn && aboutContent) {
    aboutBtn.addEventListener('click', function() {
      this.classList.toggle('on-click');
      aboutContent.classList.toggle('is-open');
    });
  }
});

// Luminous（ライトボックス）の初期化 - スライダーなしページ用
window.addEventListener('load', () => {
  if (typeof LuminousGallery === 'undefined') return;

  const zoomImages = document.querySelectorAll('.zoom-img');
  if (zoomImages.length) {
    new LuminousGallery(zoomImages, {}, {
      closeOnOverlayClick: true,
      closeOnScroll: false,
      closeButton: true,
    });
  }
});