document.addEventListener('DOMContentLoaded', function() {
  
  const hamburger = document.getElementById('js-hamburger');
  const nav = document.getElementById('js-nav');

  // ハンバーガーメニューの開閉
  if (hamburger && nav) {
    hamburger.addEventListener('click', function() {
      hamburger.classList.toggle('active');
      nav.classList.toggle('active');
    });

    const navLinks = nav.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        nav.classList.remove('active');
      });
    });
  }

});


// モバイル メインビジュアル

window.addEventListener('DOMContentLoaded', () => {
  const projectLinks = [
    "works/projects/motion-graphics/code-arc.html",
    "works/projects/graphic-design/kawano.html",
    "works/projects/animation/my-cm.html"
  ];

  let currentIndex = 0;

  const linkElement = document.getElementById('dynamic-link');

  if (!linkElement) {
    console.log("スライドショーリンクがないページなので、タイマーを停止しました");
    return;
  }

  function updateLink() {
    currentIndex = (currentIndex + 1) % projectLinks.length;
    linkElement.href = projectLinks[currentIndex];
    console.log("リンクを更新:", linkElement.href);
  }

  setInterval(updateLink, 7250);
});


// フェードイン

window.addEventListener('DOMContentLoaded', () => {
    const fadeElements = document.querySelectorAll('.fade-in');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, {
        threshold: 0.1
    });

    fadeElements.forEach(el => {
        observer.observe(el);
    });
});