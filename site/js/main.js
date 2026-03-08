/* ===================================
   W.A.S.T.E. Journal - JavaScript
   =================================== */

// 等待 DOM 加载完成
document.addEventListener('DOMContentLoaded', function() {
  
  // ===================================
  // Sticky Bar（滚动时出现的黑色顶部栏）
  // =================================== */
  const stickyBar = document.querySelector('.sticky-bar');
  let lastScrollY = window.scrollY;
  let scrollThreshold = 400; // 滚动超过 400px 显示
  
  function updateStickyBar() {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > scrollThreshold) {
      stickyBar.classList.add('visible');
    } else {
      stickyBar.classList.remove('visible');
    }
    
    lastScrollY = currentScrollY;
  }
  
  // 监听滚动事件（使用 requestAnimationFrame 优化性能）
  let ticking = false;
  window.addEventListener('scroll', function() {
    if (!ticking) {
      window.requestAnimationFrame(function() {
        updateStickyBar();
        ticking = false;
      });
      ticking = true;
    }
  });
  
  // ===================================
  // Sidebar（侧边栏）
  // =================================== */
  const sidebarToggle = document.querySelector('.sidebar-toggle');
  const sidebar = document.querySelector('.sidebar');
  const sidebarOverlay = document.querySelector('.sidebar-overlay');
  
  function openSidebar() {
    sidebar.classList.add('active');
    sidebarOverlay.classList.add('active');
    sidebarToggle.classList.add('active');
    document.body.style.overflow = 'hidden'; // 防止背景滚动
  }
  
  function closeSidebar() {
    sidebar.classList.remove('active');
    sidebarOverlay.classList.remove('active');
    sidebarToggle.classList.remove('active');
    document.body.style.overflow = '';
  }
  
  if (sidebarToggle) {
    sidebarToggle.addEventListener('click', function(e) {
      e.stopPropagation();
      if (sidebar.classList.contains('active')) {
        closeSidebar();
      } else {
        openSidebar();
      }
    });
  }
  
  if (sidebarOverlay) {
    sidebarOverlay.addEventListener('click', closeSidebar);
  }
  
  // 点击侧边栏内的链接时关闭侧边栏
  const sidebarLinks = document.querySelectorAll('.sidebar-nav a');
  sidebarLinks.forEach(function(link) {
    link.addEventListener('click', function() {
      // 给一点延迟，让链接先跳转
      setTimeout(closeSidebar, 200);
    });
  });
  
  // 阻止点击侧边栏内容时关闭
  if (sidebar) {
    sidebar.addEventListener('click', function(e) {
      e.stopPropagation();
    });
  }
  
  // ESC 键关闭侧边栏
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && sidebar.classList.contains('active')) {
      closeSidebar();
    }
  });
  
  // ===================================
  // 当前页面导航高亮
  // =================================== */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  
  // 高亮顶部导航
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(function(item) {
    const href = item.querySelector('a').getAttribute('href');
    if (href === currentPage) {
      item.classList.add('active');
    }
  });
  
  // 高亮侧边栏导航
  const sidebarNavLinks = document.querySelectorAll('.sidebar-nav a');
  sidebarNavLinks.forEach(function(link) {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    }
  });
  
  // ===================================
  // Smooth Scroll（平滑滚动）
  // =================================== */
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
  
  // ===================================
  // 页面加载动画
  // =================================== */
  document.body.classList.add('loaded');
  
  console.log('🦀 W.A.S.T.E. Journal loaded successfully!');
  
});
