// Navigation Controller (Quad-Logic Tab Switching)
function switchToTab(tabIndex) {
  // 1: Editor, 2: Preview, 3: Templates, 4: Community
  const modals = ['preview-modal', 'templates-modal', 'community-modal'];
  
  // Hide all modals first
  modals.forEach(id => {
    const el = document.getElementById(id);
    if(el) el.classList.add('hidden');
  });
  
  // Remove active states from all nav links
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
    link.classList.add('text-white/60');
  });
  
  // Add active state to target link
  const activeLink = document.querySelector(`nav button:nth-child(${tabIndex})`);
  if(activeLink) {
    activeLink.classList.add('active');
    activeLink.classList.remove('text-white/60');
  }

  // Show modal if it's not the editor (tab 1)
  if(tabIndex === 2) {
    // [PLACEHOLDER] سيتم ربط زر المعاينة بإظهار الواجهة بوضع ملء الشاشة أو كلوحة عائمة
    const previewEl = document.getElementById('preview-modal');
    if(previewEl) previewEl.classList.remove('hidden');
  } else if(tabIndex === 3) {
    const templatesEl = document.getElementById('templates-modal');
    if(templatesEl) templatesEl.classList.remove('hidden');
  } else if(tabIndex === 4) {
    const communityEl = document.getElementById('community-modal');
    if(communityEl) communityEl.classList.remove('hidden');
  }
}

// Legacy function to support close buttons in modals
function closeModals() {
  switchToTab(1); // العودة إلى محرر الأكواد
}

// Snackbar Controller
function showSnackbar() {
  const container = document.getElementById('snackbar-container');
  const snack = document.createElement('div');
  snack.className = "animate-snackbar bg-surface border border-white/10 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-4 pointer-events-auto min-w-[320px]";
  snack.innerHTML = `
    <div class="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
      <span class="material-symbols-outlined text-[18px]">check_circle</span>
    </div>
    <p class="text-sm font-bold">جاري معالجة الطلب في First Flow 🚀</p>
  `;
  container.appendChild(snack);
  
  setTimeout(() => {
    snack.classList.add('opacity-0', 'transition-opacity', 'duration-500');
    setTimeout(() => snack.remove(), 500);
  }, 3000);
}

// Auto-Scroll Controller للمقترحات
let scrollInterval;
function startScrollChips(step) {
  const container = document.getElementById('chips-container');
  scrollInterval = setInterval(() => {
    container.scrollBy({ left: step }); 
  }, 15);
}

function stopScrollChips() {
  clearInterval(scrollInterval);
}
