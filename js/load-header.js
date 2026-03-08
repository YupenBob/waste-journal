/* ===================================
   W.A.S.T.E. Journal - Header 加载器
   动态加载共享 header 组件到所有页面
   =================================== */

(function() {
  // 加载 header HTML
  fetch('components/header.html')
    .then(response => {
      if (!response.ok) {
        throw new Error('无法加载 header 组件');
      }
      return response.text();
    })
    .then(html => {
      // 插入到 body 开头
      document.body.insertAdjacentHTML('afterbegin', html);
      
      // 加载完成后初始化
      initHeader();
    })
    .catch(error => {
      console.error('加载 header 失败:', error);
    });
  
  // 初始化函数
  function initHeader() {
    // 高亮当前页面导航
    highlightCurrentPage();
    
    // 初始化 Sticky Bar
    initStickyBar();
    
    // 初始化 Sidebar
    initSidebar();
  }
  
  // 高亮当前页面
  function highlightCurrentPage() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // 高亮顶部导航
    document.querySelectorAll('.nav-item').forEach(item => {
      const link = item.querySelector('a');
      if (link && link.getAttribute('href') === currentPage) {
        item.classList.add('active');
      }
    });
    
    // 高亮侧边栏导航
    document.querySelectorAll('.sidebar-nav a').forEach(link => {
      if (link.getAttribute('href') === currentPage) {
        link.classList.add('active');
      }
    });
  }
  
  // Sticky Bar 滚动效果
  function initStickyBar() {
    const stickyBar = document.getElementById('stickyBar');
    if (!stickyBar) return;
    
    let ticking = false;
    window.addEventListener('scroll', function() {
      if (!ticking) {
        window.requestAnimationFrame(function() {
          if (window.scrollY > 400) {
            stickyBar.classList.add('visible');
          } else {
            stickyBar.classList.remove('visible');
          }
          ticking = false;
        });
        ticking = true;
      }
    });
  }
  
  // Sidebar 交互
  function initSidebar() {
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    
    if (!sidebarToggle || !sidebar) return;
    
    function openSidebar() {
      sidebar.classList.add('active');
      if (sidebarOverlay) sidebarOverlay.classList.add('active');
      sidebarToggle.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
    
    function closeSidebar() {
      sidebar.classList.remove('active');
      if (sidebarOverlay) sidebarOverlay.classList.remove('active');
      sidebarToggle.classList.remove('active');
      document.body.style.overflow = '';
    }
    
    // 点击按钮切换
    sidebarToggle.addEventListener('click', function(e) {
      e.stopPropagation();
      if (sidebar.classList.contains('active')) {
        closeSidebar();
      } else {
        openSidebar();
      }
    });
    
    // 点击遮罩关闭
    if (sidebarOverlay) {
      sidebarOverlay.addEventListener('click', closeSidebar);
    }
    
    // 点击侧边栏内链接关闭
    sidebar.querySelectorAll('.sidebar-nav a').forEach(link => {
      link.addEventListener('click', function() {
        setTimeout(closeSidebar, 200);
      });
    });
    
    // 阻止点击侧边栏内容时关闭
    sidebar.addEventListener('click', function(e) {
      e.stopPropagation();
    });
    
    // ESC 键关闭
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && sidebar.classList.contains('active')) {
        closeSidebar();
      }
    });
  }
  
  console.log('🦀 W.A.S.T.E. Journal header loaded!');
  
})();
