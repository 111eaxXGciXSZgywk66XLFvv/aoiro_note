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

  // フェードイン
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('is-visible');
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
});