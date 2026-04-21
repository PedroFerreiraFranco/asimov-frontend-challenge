document.addEventListener('DOMContentLoaded', () => {
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const desktopNav = document.querySelector('.desktop-nav');

  if (mobileMenuBtn && desktopNav) {
    mobileMenuBtn.addEventListener('click', () => {
      // Very basic mobile menu toggle for demonstration
      if (desktopNav.style.display === 'block') {
        desktopNav.style.display = 'none';
      } else {
        desktopNav.style.display = 'block';
        desktopNav.style.position = 'absolute';
        desktopNav.style.top = '100px';
        desktopNav.style.left = '0';
        desktopNav.style.width = '100%';
        desktopNav.style.backgroundColor = '#ffffff';
        desktopNav.style.padding = '20px';
        desktopNav.style.borderBottom = '1px solid #191A23';
        desktopNav.style.zIndex = '10';
        
        const ul = desktopNav.querySelector('ul');
        if (ul) {
          ul.style.flexDirection = 'column';
          ul.style.alignItems = 'center';
          ul.style.gap = '20px';
        }
      }
    });

    // Reset styles on window resize
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 1024) {
        desktopNav.style.display = 'block';
        desktopNav.style.position = 'static';
        desktopNav.style.width = 'auto';
        desktopNav.style.padding = '0';
        desktopNav.style.borderBottom = 'none';
        
        const ul = desktopNav.querySelector('ul');
        if (ul) {
          ul.style.flexDirection = 'row';
          ul.style.alignItems = 'center';
          ul.style.gap = '20px';
        }
      } else {
        desktopNav.style.display = 'none';
      }
    });
  }
});
