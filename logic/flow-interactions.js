    document.addEventListener("DOMContentLoaded", () => {
      // --- 1. The Fluid Slider Logic ---
      const fluidSlider = document.getElementById('fluid-slider-toggle');
      const codeView = document.getElementById('code-mode-view');
      const flowView = document.getElementById('flow-mode-view');
      const modeTextCode = document.getElementById('mode-text-code');
      const modeTextFlow = document.getElementById('mode-text-flow');

      // --- 1. Mode Switch Logic ---
      window.switchEditorMode = function(mode) {
         const codeView = document.getElementById('code-mode-view');
         const flowView = document.getElementById('flow-mode-view');
         const previewView = document.getElementById('live-preview-mode-view');
         const templatesView = document.getElementById('templates-mode-view');
         const communityView = document.getElementById('community-mode-view');
         const learnView = document.getElementById('learn-mode-view');
         const reportView = document.getElementById('report-mode-view'); 
         
         const btnCode = document.getElementById('btn-mode-code');
         const btnPreview = document.getElementById('btn-mode-preview'); 
         const btnDual = document.getElementById('btn-mode-dual'); 
         const btnReport = document.getElementById('btn-mode-report');
         const resizer = document.getElementById('dual-resizer');

         [codeView, flowView, previewView, templatesView, communityView, learnView, reportView].forEach(view => {
             if(view) {
                 if (mode === 'dual' && (view === codeView || view === previewView)) return;
                 view.classList.replace('opacity-100', 'opacity-0');
                 view.classList.add('pointer-events-none');
             }
         });
         
         const activeClasses = ['bg-white/10', 'text-primary'];
         const inactiveClasses = ['text-white/40', 'hover:text-white/80'];
         
         [btnCode, btnPreview, btnDual, btnReport].forEach(btn => {
             if(btn) {
                 btn.classList.remove(...activeClasses);
                 btn.classList.add(...inactiveClasses);
             }
         });

         const toolbars = {
             'code': document.getElementById('contextual-toolbar-code'),
             'preview': document.getElementById('contextual-toolbar-preview'),
             'report': document.getElementById('contextual-toolbar-report')
         };
         
         for(let key in toolbars) {
             if (toolbars[key]) {
                 toolbars[key].classList.add('hidden');
                 toolbars[key].classList.remove('flex');
             }
         }
         
         const toolbarMode = mode === 'dual' ? 'preview' : mode;
         if (toolbars[toolbarMode]) {
             toolbars[toolbarMode].classList.remove('hidden');
             toolbars[toolbarMode].classList.add('flex');
         }

         if (codeView) {
             codeView.classList.add('absolute', 'inset-0', 'w-full');
             codeView.classList.remove('top-0', 'bottom-0', 'right-0', 'left-0');
             codeView.style.width = '100%';
             codeView.style.right = '';
             codeView.style.left = '';
         }
         if (previewView) {
             previewView.classList.add('absolute', 'inset-0', 'w-full');
             previewView.classList.remove('top-0', 'bottom-0', 'left-0', 'right-0');
             previewView.style.width = '100%';
             previewView.style.left = '';
             previewView.style.right = '';
         }
         if (resizer) resizer.classList.add('hidden');

         if (mode === 'code' && codeView) {
             codeView.classList.replace('opacity-0', 'opacity-100');
             codeView.classList.remove('pointer-events-none');
             if(btnCode) {
                btnCode.classList.remove(...inactiveClasses);
                btnCode.classList.add(...activeClasses);
             }
         } else if (mode === 'preview' && previewView) {
             previewView.classList.replace('opacity-0', 'opacity-100');
             previewView.classList.remove('pointer-events-none');
             if(btnPreview) {
                btnPreview.classList.remove(...inactiveClasses);
                btnPreview.classList.add(...activeClasses);
             }
         } else if (mode === 'dual' && codeView && previewView) {
             codeView.classList.replace('opacity-0', 'opacity-100');
             codeView.classList.remove('pointer-events-none');
             codeView.classList.remove('inset-0', 'w-full', 'right-0');
             codeView.classList.add('top-0', 'bottom-0', 'left-0');
             
             previewView.classList.replace('opacity-0', 'opacity-100');
             previewView.classList.remove('pointer-events-none');
             previewView.classList.remove('inset-0', 'w-full', 'left-0');
             previewView.classList.add('top-0', 'bottom-0', 'right-0');
             
             const ratio = window.dualViewRatio || 50;
             codeView.style.width = (100 - ratio) + '%';
             previewView.style.width = ratio + '%';
             
             if (resizer) {
                resizer.classList.remove('hidden');
                resizer.style.right = ratio + '%';
             }
             if(btnDual) {
                btnDual.classList.remove(...inactiveClasses);
                btnDual.classList.add(...activeClasses);
             }
         } else if (mode === 'report' && reportView) {
             reportView.classList.replace('opacity-0', 'opacity-100');
             reportView.classList.remove('pointer-events-none');
             if(btnReport) {
                btnReport.classList.remove(...inactiveClasses);
                btnReport.classList.add(...activeClasses);
             }
         } else if (mode === 'templates' && templatesView) {
             templatesView.classList.replace('opacity-0', 'opacity-100');
             templatesView.classList.remove('pointer-events-none');
         } else if (mode === 'community' && communityView) {
             communityView.classList.replace('opacity-0', 'opacity-100');
             communityView.classList.remove('pointer-events-none');
         } else if (mode === 'learn' && learnView) {
             learnView.classList.replace('opacity-0', 'opacity-100');
             learnView.classList.remove('pointer-events-none');
         }

         const btnDictionaryToggle = document.getElementById('btn-dictionary-toggle');
         if (btnDictionaryToggle) {
             if (mode === 'code' || mode === 'dual') {
                 btnDictionaryToggle.classList.remove('hidden');
                 btnDictionaryToggle.classList.add('flex');
             } else {
                 btnDictionaryToggle.classList.remove('flex');
                 btnDictionaryToggle.classList.add('hidden');
                 const dictContainer = document.getElementById('dictionary-container');
                 if (dictContainer && !dictContainer.classList.contains('hidden')) {
                     if (typeof window.toggleDictionary === 'function') {
                         window.toggleDictionary();
                     }
                 }
             }
         }
      };

      // --- Global Columns Resizer Logic ---
      function initGlobalResizer(resizerId, colId, isRightCol, minLimit = 150) {
          const resizer = document.getElementById(resizerId);
          const col = document.getElementById(colId);
          if (!resizer || !col) return;
          
          let isDraggingCol = false;
          let startX, startWidth;
          
          resizer.addEventListener('mousedown', (e) => {
              isDraggingCol = true;
              startX = e.clientX;
              startWidth = parseInt(window.getComputedStyle(col).width, 10);
              document.body.style.cursor = 'col-resize';
              col.style.transition = 'none';
              resizer.classList.replace('bg-primary/30', 'bg-primary/50');
              e.preventDefault();
          });
          
          document.addEventListener('mousemove', (e) => {
              if (!isDraggingCol) return;
              let diff = e.clientX - startX;
              let newWidth = isRightCol ? startWidth - diff : startWidth + diff;
              
              if (newWidth < minLimit) newWidth = minLimit;
              if (newWidth > 800) newWidth = 800; // max limit
              
              col.style.width = newWidth + 'px';
          });
          
          document.addEventListener('mouseup', () => {
              if (isDraggingCol) {
                  isDraggingCol = false;
                  document.body.style.cursor = '';
                  col.style.transition = '';
                  resizer.classList.replace('bg-ff-warning/40', 'bg-white/5');
              }
          });
      }
      
      initGlobalResizer('resizer-col-1', 'chat-aside', true, 260); // 290px - 30px = 260px limit
      initGlobalResizer('resizer-col-3', 'project-explorer', false, 190); // 220px - 30px = 190px limit

      // --- Dual Mode Resizer Logic ---
      const resizerEl = document.getElementById('dual-resizer');
      const editorWrapper = document.getElementById('editor-container');
      
      if (resizerEl && editorWrapper) {
          let isDragging = false;
          
          resizerEl.addEventListener('mousedown', (e) => {
              isDragging = true;
              document.body.style.cursor = 'col-resize';
              document.getElementById('code-mode-view').style.transition = 'none';
              document.getElementById('live-preview-mode-view').style.transition = 'none';
              resizerEl.style.transition = 'none';
              resizerEl.classList.replace('bg-primary/30', 'bg-primary/50');
              e.preventDefault();
          });
          
          document.addEventListener('mousemove', (e) => {
              if (!isDragging) return;
              const wrapperRect = editorWrapper.getBoundingClientRect();
              let rightPx = wrapperRect.right - e.clientX;
              let ratio = (rightPx / wrapperRect.width) * 100;
              
              if (ratio < 20) ratio = 20; 
              if (ratio > 80) ratio = 80;
              
              window.dualViewRatio = ratio;
              
              const codeView = document.getElementById('code-mode-view');
              const previewView = document.getElementById('live-preview-mode-view');
              
              if (codeView) codeView.style.width = (100 - ratio) + '%';
              if (previewView) previewView.style.width = ratio + '%';
              resizerEl.style.right = ratio + '%';
          });
          
          document.addEventListener('mouseup', () => {
              if (isDragging) {
                  isDragging = false;
                  document.body.style.cursor = '';
                  document.getElementById('code-mode-view').style.transition = '';
                  document.getElementById('live-preview-mode-view').style.transition = '';
                  resizerEl.style.transition = '';
                  resizerEl.classList.replace('bg-primary/50', 'bg-primary/30');
              }
          });
      }

      // Execute Report Action logic
      window.executeReportAction = function(btn) {
         btn.innerHTML = '<span class="material-symbols-outlined text-[12px] align-middle">check</span> تم التنفيذ';
         btn.classList.add('opacity-50', 'cursor-not-allowed');
      };

      // --- Device Size Toggle Logic ---
      let deviceSizes = [
         { maxW: '100%', icon: 'desktop_windows', label: '100%' },
         { maxW: '990px', icon: 'laptop', label: '990px' },
         { maxW: '768px', icon: 'tablet_mac', label: '768px' },
         { maxW: '480px', icon: 'phone_iphone', label: '480px' }
      ];
      let currentDeviceIdx = 0;

      window.toggleDeviceSize = function() {
          const previewContent = document.getElementById('live-preview-content');
          const icon = document.getElementById('icon-device-toggle');
          const label = document.getElementById('label-device-size');
          if (!previewContent || !icon) return;

          currentDeviceIdx = (currentDeviceIdx + 1) % deviceSizes.length;
          const config = deviceSizes[currentDeviceIdx];

          previewContent.style.maxWidth = config.maxW;
          previewContent.style.width = '100%';
          
          if (config.maxW === '100%') {
              previewContent.classList.remove('shadow-2xl', 'border-x', 'border-gray-200');
          } else {
              previewContent.classList.add('shadow-2xl', 'border-x', 'border-gray-200');
          }
          icon.innerText = config.icon;
          if (label) label.innerText = config.label;
      };

      // --- Global Navigation Link (Header Tabs) ---
      const originalSwitchToTab = window.switchToTab;
      window.switchToTab = function(tabId) {
         // Call original if exists
         if(typeof originalSwitchToTab === 'function') {
            originalSwitchToTab(tabId);
         }
         
         // Visual Header Tabs update
         const navLinks = document.querySelectorAll('.nav-link');
         navLinks.forEach((link, idx) => {
             if (idx + 1 === tabId) {
                 link.classList.remove('text-white/60', 'hover:bg-white/5', 'border-transparent');
                 link.classList.add('active', 'text-primary', 'bg-white/10', 'shadow-sm', 'border-primary/50');
             } else {
                 link.classList.remove('active', 'text-primary', 'bg-white/10', 'shadow-sm', 'border-primary/50');
                 link.classList.add('text-white/60', 'hover:bg-white/5', 'border-transparent');
             }
         });

         // Tie Tabs to Views
         const editorTopbar = document.getElementById('editor-topbar');
         if (tabId === 1) {
             if (editorTopbar) editorTopbar.style.display = 'flex';
             switchEditorMode('dual');
         } else if (tabId === 2) {
             if (editorTopbar) editorTopbar.style.display = 'none';
             switchEditorMode('preview');
         } else if (tabId === 3) {
             if (editorTopbar) editorTopbar.style.display = 'none';
             switchEditorMode('templates');
         } else if (tabId === 4) {
             if (editorTopbar) editorTopbar.style.display = 'none';
             switchEditorMode('community');
         } else if (tabId === 5) {
             if (editorTopbar) editorTopbar.style.display = 'none';
             switchEditorMode('learn');
         }
      };

      // --- Remix Project Logic ---
      window.remixProject = function() {
          // Trigger the 'switchToTab' to tab 1 (Code Editor)
          if(typeof window.switchToTab === 'function') {
              window.switchToTab(1);
          }
      };

      // --- 2. Visual Fix Logic ---
      const btnVisualFix = document.getElementById('btn-visual-fix');
      const previewContent = document.getElementById('live-preview-content');
      const fixOverlay = document.getElementById('visual-fix-overlay');
      const chatInput = document.querySelector('textarea[placeholder="اسأل عن أي شيء..."]');
      let isVisualFixMode = false;

      if (btnVisualFix && previewContent && chatInput) {
        btnVisualFix.addEventListener('click', () => {
          isVisualFixMode = !isVisualFixMode;
          toggleVisualFixState();
        });

        function toggleVisualFixState() {
          const elements = previewContent.querySelectorAll('.hover-target');
          if (isVisualFixMode) {
            btnVisualFix.classList.replace('text-white/40', 'text-primary');
            btnVisualFix.classList.add('bg-primary/20');
            fixOverlay.classList.replace('opacity-0', 'opacity-100');
            elements.forEach(el => {
              el.style.cursor = 'crosshair';
              el.classList.add('ring-2', 'ring-primary', 'ring-offset-2', 'ring-offset-white', 'cursor-crosshair');
              el.addEventListener('click', handleElementSelect);
            });
          } else {
            btnVisualFix.classList.replace('text-primary', 'text-white/40');
            btnVisualFix.classList.remove('bg-primary/20');
            fixOverlay.classList.replace('opacity-100', 'opacity-0');
            elements.forEach(el => {
              el.style.cursor = '';
              el.classList.remove('ring-2', 'ring-primary', 'ring-offset-2', 'ring-offset-white', 'cursor-crosshair');
              el.removeEventListener('click', handleElementSelect);
            });
          }
        }

        function handleElementSelect(e) {
          if (!isVisualFixMode) return;
          e.stopPropagation();
          const elName = e.currentTarget.getAttribute('data-ff-element') || e.currentTarget.tagName.toLowerCase();
          
          // Insert text and focus
          chatInput.value = `أريد تعديل هذا العنصر: [${elName}] - `;
          chatInput.focus();
          
          // Deactivate Fix Mode
          isVisualFixMode = false;
          toggleVisualFixState();
          
          // Blink effect to feedback
          e.currentTarget.classList.add('opacity-50');
          setTimeout(() => e.currentTarget.classList.remove('opacity-50'), 200);
        }
      }

      // --- 3. Human Anchor Logic ---
      window.toggleHumanAnchor = function(elem, lineNum) {
        const icon = elem.querySelector('.anchor-icon');
        const codeLine = document.getElementById(`code-line-${lineNum}`);
        
        if (icon.innerText === 'lock_open') {
          // Lock it
          icon.innerText = 'lock';
          icon.classList.replace('text-white/40', 'text-amber-400');
          icon.classList.replace('opacity-0', 'opacity-100'); // Keep visible
          elem.querySelector('span:first-child').classList.add('opacity-0'); // keeping the number hidden
          
          if(codeLine) {
            codeLine.style.backgroundImage = 'repeating-linear-gradient(45deg, rgba(255, 191, 0, 0.05) 0px, rgba(255, 191, 0, 0.05) 4px, transparent 4px, transparent 8px)';
            codeLine.style.borderColor = 'rgba(255,191,0,0.5)';
          }
        } else {
          // Unlock it
          icon.innerText = 'lock_open';
          icon.classList.replace('text-amber-400', 'text-white/40');
          icon.classList.replace('opacity-100', 'opacity-0'); // Let hover handle it again
          elem.querySelector('span:first-child').classList.remove('opacity-0');
          
          if(codeLine) {
            codeLine.style.backgroundImage = '';
            codeLine.style.borderColor = 'transparent';
          }
        }
      };

      // --- 4. Code Provenance (AI Highlights) Logic ---
      const aiHighlightBtn = document.getElementById('ai-highlights-toggle');
      if (aiHighlightBtn) {
        aiHighlightBtn.addEventListener('change', (e) => {
          const aiLines = document.querySelectorAll('.ai-generated-code');
          if (e.target.checked) {
            aiLines.forEach(line => {
              line.style.backgroundColor = 'rgba(0, 150, 255, 0.15)';
              line.style.borderColor = 'rgba(0, 150, 255, 0.5)';
            });
          } else {
            aiLines.forEach(line => {
              line.style.backgroundColor = '';
              line.style.borderColor = 'transparent';
              // Check if it's locked by anchor, restore anchor border color
              const lineId = line.id.split('-').pop();
              const lockIcon = document.querySelector(`.group\\/line[onclick*="(${lineId})"] .anchor-icon`);
              if (lockIcon && lockIcon.innerText === 'lock') {
                line.style.borderColor = 'rgba(255,191,0,0.5)';
              }
            });
          }
        });
      }
      // --- 5. Footer Clock Logic ---
      function updateFooterClock() {
        const clockElem = document.getElementById('footer-clock');
        if (clockElem) {
          const now = new Date();
          const h = String(now.getHours()).padStart(2, '0');
          const m = String(now.getMinutes()).padStart(2, '0');
          const s = String(now.getSeconds()).padStart(2, '0');
          clockElem.innerText = `${h}:${m}:${s}`;
        }
      }
      setInterval(updateFooterClock, 1000);
      updateFooterClock();
      
      // Initialize in Dual Mode
      if (typeof window.switchEditorMode === 'function') {
         window.switchEditorMode('dual');
      }

      // Hide contextual toolbars logic (when panels are opened or columns expanded)
      const editorTopbar = document.getElementById('editor-topbar');
      const toolbarsContainer = document.getElementById('contextual-toolbars');
      const chatAside = document.getElementById('chat-aside');
      const projectExplorer = document.getElementById('project-explorer');
      const componentPanel = document.getElementById('component-panel');

      function updateToolbarsVisibility() {
          if (!toolbarsContainer || !editorTopbar) return;
          let shouldHide = false;

          // الحالة الأولى: عند فتح حاوية (محتوى الشريط الجانبي أو المكونات)
          if (projectExplorer && !projectExplorer.classList.contains('hidden')) shouldHide = true;
          if (componentPanel && !componentPanel.classList.contains('opacity-0')) shouldHide = true;

          // الحالة الثانية: عند توسيع أحد أعمدة الواجهة (مساعدك الذكي أو مجلد المشروع)
          if (chatAside && chatAside.offsetWidth > 295) shouldHide = true;
          if (projectExplorer && projectExplorer.offsetWidth > 225) shouldHide = true;

          // شرط الإخفاء عند صغر الشاشة
          if (editorTopbar.offsetWidth < 500) shouldHide = true;

          if (shouldHide) {
              toolbarsContainer.style.display = 'none';
          } else {
              toolbarsContainer.style.display = 'flex';
          }
          
          if (typeof window.updateEditorSubToolbar === 'function') {
              window.updateEditorSubToolbar();
          }
      }

      if (editorTopbar && toolbarsContainer) {
          const rsObserver = new ResizeObserver(() => {
              updateToolbarsVisibility();
              
              // التزام الشيت السيادي بحدود المساعد الذكي
              const sovConsole = document.getElementById('sovereign-bottom-sheet');
              if (sovConsole && chatAside) {
                  sovConsole.style.right = chatAside.offsetWidth + 'px';
              }
          });
          rsObserver.observe(editorTopbar);
          if (chatAside) rsObserver.observe(chatAside);
          if (projectExplorer) rsObserver.observe(projectExplorer);
          
          const mutObserver = new MutationObserver(() => updateToolbarsVisibility());
          if (componentPanel) mutObserver.observe(componentPanel, { attributes: true, attributeFilter: ['class'] });
          if (projectExplorer) mutObserver.observe(projectExplorer, { attributes: true, attributeFilter: ['class'] });
          
          // التهيئة الأولى
          updateToolbarsVisibility();
      }
    });

    // --- 5. Bot Roles Logic ---
    const botRoles = {
      'generalist': '<span class="ff-tone-auto font-bold text-[11px] mb-1 block">الشامل (Generalist):</span> "العقل العام" للمشروع. يدرك سياق المهمة تلقائياً ويتقمص الدور المناسب (سواء كان بناء منطق أو شرح فكرة). هو الوضع الافتراضي الذي "يفهمك" دون توجيه.',
      'designer': '<span class="ff-tone-plan font-bold text-[11px] mb-1 block">المصمم (Designer UI/UX):</span> يرتدي قبعة مهندس الواجهات. يركز على جمالية التنسيقات، تجربة المستخدم، توزيع العناصر، وضمان السيادة البصرية للمشروع.',
      'security': '<span class="ff-tone-chat font-bold text-[11px] mb-1 block">الحارس (Security Expert):</span> يتقمص دور خبير الأمن السيبراني. يحلل الكود بحثاً عن الثغرات، يتأكد من سلامة البيانات، ويضمن أن تطبيقك محصن ضد الاختراق.',
      'debugger': '<span class="ff-tone-build font-bold text-[11px] mb-1 block">المنقح (Debugger):</span> يركز على تحليل المنطق واكتشاف الأخطاء البرمجية. يبحث عن العثرات المخفية في الكود ويقوم بإصلاحها فوراً لضمان مشروع مستقر.'
    };

    let roleNotificationTimeout;

    window.selectBotRole = function(roleKey, btnElement) {
      const buttons = document.querySelectorAll('.bot-role-btn');
      
      const roleTones = {
        'generalist': { textClasses: ['ff-tone-auto'], bgClasses: ['ff-tone-auto-bg'] },
        'designer': { textClasses: ['ff-tone-plan'], bgClasses: ['ff-tone-plan-bg'] },
        'security': { textClasses: ['ff-tone-chat'], bgClasses: ['ff-tone-chat-bg'] },
        'debugger': { textClasses: ['ff-tone-build'], bgClasses: ['ff-tone-build-bg'] }
      };

      buttons.forEach(btn => {
        btn.classList.remove('bg-white/10', 'text-primary', 'active', 'ff-tone-auto', 'ff-tone-auto-bg', 'ff-tone-plan', 'ff-tone-plan-bg', 'ff-tone-chat', 'ff-tone-chat-bg', 'ff-tone-build', 'ff-tone-build-bg');
        btn.classList.add('hover:bg-white/5', 'text-white/50');
      });
      
      btnElement.classList.remove('hover:bg-white/5', 'text-white/50');
      btnElement.classList.add('active', ...roleTones[roleKey].textClasses, ...roleTones[roleKey].bgClasses);

      const notification = document.getElementById('role-notification');
      const textElem = document.getElementById('role-notification-text');
      
      textElem.innerHTML = botRoles[roleKey];
      
      notification.classList.remove('-translate-y-full', 'opacity-0');
      notification.classList.add('translate-y-0', 'opacity-100');
      
      clearTimeout(roleNotificationTimeout);
      roleNotificationTimeout = setTimeout(() => {
        notification.classList.remove('translate-y-0', 'opacity-100');
        notification.classList.add('-translate-y-full', 'opacity-0');
      }, 6000); // 6 seconds duration for better reading
    };

    // --- 5.5 Dictionary Toggle Logic ---
    window.toggleDictionary = function() {
      const container = document.getElementById('dictionary-container');
      const btnText = document.getElementById('dictionary-btn-text');
      const btn = document.getElementById('btn-dictionary-toggle');
      
      if (container.classList.contains('hidden')) {
        container.classList.remove('hidden');
        container.classList.add('flex');
        btnText.innerText = 'إخفاء القاموس';
        btn.classList.add('bg-primary/20');
      } else {
        container.classList.add('hidden');
        container.classList.remove('flex');
        btnText.innerText = 'القاموس البرمجي';
        btn.classList.remove('bg-primary/20');
      }
    };

    // --- 5.6 Editor Sub-Toolbar Actions & Logic ---
    window.toggleEditorLock = function() {
        const btn = document.getElementById('btn-editor-lock');
        const icon = btn.querySelector('span');
        if (icon.innerText.trim() === 'lock') {
            icon.innerText = 'lock_open';
            btn.classList.replace('bg-primary/10', 'bg-emerald-500/10');
            btn.classList.replace('border-primary/20', 'border-emerald-500/20');
            btn.classList.replace('text-primary', 'text-emerald-500');
            btn.title = 'مفتوح (Unlocked)';
        } else {
            icon.innerText = 'lock';
            btn.classList.replace('bg-emerald-500/10', 'bg-primary/10');
            btn.classList.replace('border-emerald-500/20', 'border-primary/20');
            btn.classList.replace('text-emerald-500', 'text-primary');
            btn.title = 'تحرير مقفل (Active)';
        }
    };

    window.saveEditorChanges = function() {
        if(typeof window.showSnackbar === 'function') {
            window.showSnackbar('تم حفظ التعديلات بنجاح');
        }
    };

    window.updateEditorSubToolbar = function() {
        // Find if we are in dual mode
        const btnDual = document.getElementById('btn-mode-dual');
        const isDual = btnDual && btnDual.classList.contains('text-primary');
        
        const chatAside = document.getElementById('chat-aside');
        const projectExplorer = document.getElementById('project-explorer');
        
        let isSidebarsOpen = false;
        if (chatAside && !chatAside.classList.contains('w-0')) isSidebarsOpen = true;
        if (projectExplorer && !projectExplorer.classList.contains('hidden')) isSidebarsOpen = true;
        
        const hideables = document.querySelectorAll('.editor-tool-hideable');
        
        if (isDual && isSidebarsOpen) {
            hideables.forEach(el => el.classList.add('hidden'));
            hideables.forEach(el => el.classList.remove('flex'));
        } else {
            hideables.forEach(el => el.classList.remove('hidden'));
            // Some elements might need 'flex' or block, so we'll just remove hidden since we apply flex via HTML classes
            hideables.forEach(el => el.classList.add(el.tagName === 'DIV' ? 'block' : 'flex'));
        }
    };

    // --- 6. Reality Check Logic ---
    const realityStates = [
      { color: 'bg-primary', titleText: 'text-primary', title: 'Code Reliability: High', desc: 'الموثوقية تجاوزت بناءً على خلوه من الأخطاء: <span class="font-bold text-white/90">99%</span>' },
      { color: 'bg-amber-400', titleText: 'text-amber-400', title: 'Code Reliability: Medium', desc: 'يُفضل مراجعة المنطق البشري قبل الحفظ: <span class="font-bold text-white/90">تعديل مطلوب</span>' },
      { color: 'bg-red-500', titleText: 'text-red-400', title: 'Code Reliability: Low', desc: 'ثقة النظام منخفضة، احتمالية ملحوظة للـ <span class="font-bold text-white/90">Hallucination</span>' }
    ];
    let currentRealityIdx = 0;
    
    window.toggleRealityCheck = function() {
      currentRealityIdx = (currentRealityIdx + 1) % realityStates.length;
      const state = realityStates[currentRealityIdx];
      
      const dot = document.getElementById('reality-dot');
      const title = document.getElementById('reality-tooltip-title');
      const desc = document.getElementById('reality-tooltip-desc');
      
      dot.className = `w-2.5 h-2.5 rounded-full animate-pulse relative transition-colors duration-300 ${state.color}`;
      title.className = `text-[11px] font-bold mb-1 transition-colors ${state.titleText}`;
      title.innerText = state.title;
      desc.innerHTML = state.desc;
    };

    // --- 7. Component Panel Logic ---
    window.toggleComponentPanel = function() {
      const panel = document.getElementById('component-panel');
      if (panel.classList.contains('opacity-0')) {
         panel.classList.remove('opacity-0', 'pointer-events-none');
         panel.classList.replace('-translate-x-4', 'translate-x-0');
         panel.classList.add('opacity-100', 'pointer-events-auto');
      } else {
         panel.classList.remove('opacity-100', 'pointer-events-auto');
         panel.classList.replace('translate-x-0', '-translate-x-4');
         panel.classList.add('opacity-0', 'pointer-events-none');
      }
    };

    window.addComponent = function(el) {
      const btn = el.querySelector('button');
      const icon = btn.innerHTML;
      btn.innerHTML = `<span class="material-symbols-outlined text-[14px] animate-spin">sync</span>`;
      el.classList.add('ring-2', 'ring-primary', 'ring-offset-2', 'ring-offset-surface');
      setTimeout(() => {
         btn.innerHTML = `<span class="material-symbols-outlined text-[14px]">check</span>`;
         setTimeout(() => {
            btn.innerHTML = icon;
            el.classList.remove('ring-2', 'ring-primary', 'ring-offset-2', 'ring-offset-surface');
         }, 1000);
      }, 600);
    };

    // --- 8. Dialogue Negotiation Logic ---
    window.selectNegotiation = function(btn) {
       const container = document.getElementById('negotiation-container');
       const buttons = container.querySelectorAll('button');
       buttons.forEach(b => {
          b.classList.remove('ring-2', 'ring-offset-2', 'ring-offset-surface', 'ring-primary', 'ring-purple-400', 'ring-emerald-400');
          b.style.transform = 'scale(1)';
       });
       
       btn.classList.add('ring-2', 'ring-offset-2', 'ring-offset-surface');
       if(btn.classList.contains('text-primary')) btn.classList.add('ring-primary');
       
       btn.style.transform = 'scale(0.95)';
       setTimeout(() => {
          btn.style.transform = 'scale(1)';
       }, 150);
       
       const textarea = document.querySelector('textarea[placeholder="اسأل عن أي شيء..."]');
       if(textarea) {
          const intentTxt = btn.querySelector('.z-10').innerText;
          // Clear previous intent format if exists
          textarea.value = textarea.value.replace(/^\[النية: .*\] - /, '');
          textarea.value = `[النية: ${intentTxt}] - ` + textarea.value;
          textarea.focus();
       }
    };

    // --- 9. Project Explorer Toggle Logic ---
    window.toggleExplorerCollapse = function() {
      const explorer = document.getElementById('project-explorer');
      const content = document.getElementById('explorer-content-wrapper');
      const btn = document.getElementById('explorer-collapse-btn');
      const icon = btn.querySelector('span');
      const resizer = document.getElementById('resizer-col-3');
      const sideBtnExplorer = document.getElementById('side-btn-explorer');
      const sideBtnInstructions = document.getElementById('side-btn-instructions');
      
      if (explorer.classList.contains('w-0')) {
        // Expand
        explorer.classList.remove('w-0', 'border-none', 'hidden');
        explorer.classList.add('flex', 'sidebar-width');
        if(content) content.classList.remove('opacity-0', 'pointer-events-none');
        if(resizer) resizer.style.display = 'block';
        
        if (explorer.hasAttribute('data-last-width')) {
            explorer.style.width = explorer.getAttribute('data-last-width');
        } else {
            explorer.style.width = '';
        }
        
        icon.innerText = 'chevron_left';
        
        // Restore active state
        const explorerView = document.getElementById('explorer-view');
        if (explorerView && !explorerView.classList.contains('hidden')) {
            if(sideBtnExplorer) { sideBtnExplorer.classList.add('text-primary'); sideBtnExplorer.classList.remove('text-white/40'); }
        } else {
            if(sideBtnInstructions) { sideBtnInstructions.classList.add('text-primary'); sideBtnInstructions.classList.remove('text-white/40'); }
        }
      } else {
        // Collapse
        if (explorer.style.width && explorer.style.width !== '0px') {
            explorer.setAttribute('data-last-width', explorer.style.width);
        }
        explorer.style.width = '0px';
        explorer.classList.add('w-0', 'border-none');
        explorer.classList.remove('sidebar-width');
        if(content) content.classList.add('opacity-0', 'pointer-events-none');
        if(resizer) resizer.style.display = 'none';

        icon.innerText = 'chevron_right';
        
        if(sideBtnExplorer) sideBtnExplorer.classList.replace('text-primary', 'text-white/40');
        if(sideBtnInstructions) sideBtnInstructions.classList.replace('text-primary', 'text-white/40');
      }
    };

    // --- 10. Chat Panel Collapse Logic ---
    window.toggleChatCollapse = function() {
      const chatAside = document.getElementById('chat-aside');
      const restoreBtn = document.getElementById('chat-restore-btn');
      
      if (chatAside.classList.contains('w-0')) {
        // Expand
        chatAside.classList.remove('w-0', 'opacity-0', 'border-none');
        chatAside.classList.add('chat-width');
        
        if (chatAside.hasAttribute('data-last-width')) {
            chatAside.style.width = chatAside.getAttribute('data-last-width');
        } else {
            chatAside.style.width = '';
        }
        
        restoreBtn.classList.add('opacity-0', 'pointer-events-none', 'translate-x-[100%]');
        restoreBtn.classList.remove('opacity-90', 'pointer-events-auto', 'translate-x-0');
      } else {
        // Collapse
        if (chatAside.style.width && chatAside.style.width !== '0px') {
            chatAside.setAttribute('data-last-width', chatAside.style.width);
        }
        chatAside.style.width = '0px';
        
        chatAside.classList.add('w-0', 'opacity-0', 'border-none');
        chatAside.classList.remove('chat-width');
        
        restoreBtn.classList.remove('opacity-0', 'pointer-events-none', 'translate-x-[100%]');
        restoreBtn.classList.add('opacity-90', 'pointer-events-auto', 'translate-x-0');
      }
    };

    // --- Radial Switcher Logic ---
    const allRadialModes = [
      { id: 'auto', icon: 'keyboard_arrow_down', text: 'تلقائي', colorClass: 'ff-tone-auto', bgClass: 'ff-tone-auto-bg', hint: 'الوضع الذكي الشامل' },
      { id: 'chat', icon: 'forum', text: 'دردش', colorClass: 'ff-tone-chat', bgClass: 'ff-tone-chat-bg', hint: 'للفهم والشرح دون تعديل' },
      { id: 'plan', icon: 'architecture', text: 'خطط', colorClass: 'ff-tone-plan', bgClass: 'ff-tone-plan-bg', hint: 'رسم الهياكل وخطوات العمل' },
      { id: 'build', icon: 'construction', text: 'نفذ', colorClass: 'ff-tone-build', bgClass: 'ff-tone-build-bg', hint: 'كتابة الكود وحقنه مباشرة' }
    ];

    let activeRadialModeId = 'auto';
    let isRadialArcOpen = false;

    window.toggleRadialArc = function(e) {
      if(e) e.stopPropagation();
      isRadialArcOpen = !isRadialArcOpen;
      const arc = document.getElementById('radial-arc-container');
      if(isRadialArcOpen) {
         renderRadialArc();
         arc.classList.remove('opacity-0', 'scale-50', 'pointer-events-none');
         arc.classList.add('opacity-100', 'scale-100');
         
         // إغلاق قوائم الإرفاق والمودل عند فتح هذه القائمة
         ['attach-flyout', 'model-flyout'].forEach(id => {
            const f = document.getElementById(id);
            if(f && !f.classList.contains('opacity-0')) {
                f.classList.remove('opacity-100', 'pointer-events-auto', 'scale-100');
                f.classList.add('opacity-0', 'pointer-events-none', 'scale-95');
            }
         });
      } else {
         arc.classList.remove('opacity-100', 'scale-100');
         arc.classList.add('opacity-0', 'scale-50', 'pointer-events-none');
      }
    };

    window.selectRadialMode = function(modeId, e) {
      if(e) e.stopPropagation();
      activeRadialModeId = modeId;
      const mode = allRadialModes.find(m => m.id === modeId);
      
      const mainBtn = document.getElementById('radial-main-btn');
      const mainIcon = document.getElementById('radial-main-icon');
      const mainText = document.getElementById('radial-main-text');

      mainBtn.className = `flex items-center gap-0.5 px-1 py-[2px] rounded-lg transition-all relative z-50 border ${mode.colorClass} ${mode.bgClass}`;
      mainBtn.removeAttribute('style'); // Remove inline styles
      mainIcon.innerText = mode.icon;
      mainText.innerText = mode.text;
      
      toggleRadialArc(); // close
    };

    window.showRadialHint = function(hint) {
      const hintElem = document.getElementById('radial-hover-hint');
      hintElem.innerText = hint;
      hintElem.classList.remove('opacity-0');
    };

    window.hideRadialHint = function() {
      const hintElem = document.getElementById('radial-hover-hint');
      hintElem.classList.add('opacity-0');
    };

    function renderRadialArc() {
      const arcBtnsContainer = document.getElementById('radial-arc-buttons');
      const inactiveModes = allRadialModes.filter(m => m.id !== activeRadialModeId);
      
      // Positions on Semi-circle opening upwards (Compact Radius)
      const posLookup = [
         { top: 20, left: 0 },
         { top: -7, left: 48 },
         { top: 20, left: 96 }
      ];

      arcBtnsContainer.innerHTML = inactiveModes.map((mode, i) => `
        <button class="absolute flex flex-col items-center justify-center pointer-events-auto cursor-pointer group hover:scale-110 transition-transform" 
                style="top: ${posLookup[i].top}px; left: ${posLookup[i].left}px;"
                onclick="selectRadialMode('${mode.id}', event)"
                onmouseenter="showRadialHint('${mode.hint}')"
                onmouseleave="hideRadialHint()">
           <div class="w-[44px] h-[42px] rounded-[10px] flex flex-col items-center justify-center border hover:shadow-[0_0_10px_currentColor] transition-all ${mode.colorClass} ${mode.bgClass}">
              <span class="material-symbols-outlined text-[15px] leading-tight pointer-events-none" style="color: inherit;">${mode.icon}</span>
              <span class="text-[8px] font-bold mt-0.5 leading-none opacity-90 pointer-events-none">${mode.text}</span>
           </div>
        </button>
      `).join('');
    }

    window.toggleInputMenu = function(flyoutId, e) {
        if(e) e.stopPropagation();
        const flyouts = ['attach-flyout', 'model-flyout'];
        
        // إغلاق قائمة وضع الدردشة لو كانت مفتوحة
        if (isRadialArcOpen) toggleRadialArc();
        
        // إغلاق القوائم الدقيقة الأخرى
        flyouts.forEach(id => {
            if(id !== flyoutId) {
                const f = document.getElementById(id);
                if(f) {
                   f.classList.remove('opacity-100', 'pointer-events-auto', 'scale-100');
                   f.classList.add('opacity-0', 'pointer-events-none', 'scale-95');
                }
            }
        });

        // تشغيل (تبديل) القائمة الهدف
        const flyout = document.getElementById(flyoutId);
        if (flyout) {
            if (flyout.classList.contains('opacity-0')) {
               flyout.classList.remove('opacity-0', 'pointer-events-none', 'scale-95');
               flyout.classList.add('opacity-100', 'pointer-events-auto', 'scale-100');
            } else {
               flyout.classList.remove('opacity-100', 'pointer-events-auto', 'scale-100');
               flyout.classList.add('opacity-0', 'pointer-events-none', 'scale-95');
            }
        }
    };

    document.addEventListener('click', (e) => {
       const wrapper = document.getElementById('radial-switcher-wrapper');
       if(wrapper && !wrapper.contains(e.target) && isRadialArcOpen) {
          toggleRadialArc();
       }
       
       // Old bot-settings-popup handler removed

       // Handle outside clicks for input menus
       const attachContainer = document.getElementById('attach-container');
       if(attachContainer && !attachContainer.contains(e.target)) {
           const f = document.getElementById('attach-flyout');
           if(f && !f.classList.contains('opacity-0')) {
               f.classList.remove('opacity-100', 'pointer-events-auto', 'scale-100');
               f.classList.add('opacity-0', 'pointer-events-none', 'scale-95');
           }
       }
       const modelContainer = document.getElementById('model-container');
       if(modelContainer && !modelContainer.contains(e.target)) {
           const f = document.getElementById('model-flyout');
           if(f && !f.classList.contains('opacity-0')) {
               f.classList.remove('opacity-100', 'pointer-events-auto', 'scale-100');
               f.classList.add('opacity-0', 'pointer-events-none', 'scale-95');
           }
       }
    });

    window.switchSidebarTab = function(tabId, forceOpenSidebar = false) {
        const sidebar = document.getElementById('project-explorer');
        const content = document.getElementById('explorer-content-wrapper');
        const explorerView = document.getElementById('explorer-view');
        const instructionsView = document.getElementById('instructions-view');
        const btn = document.getElementById('explorer-collapse-btn');
        const icon = btn ? btn.querySelector('span') : null;
        
        const btnExplorer = document.getElementById('side-btn-explorer');
        const btnInstructions = document.getElementById('side-btn-instructions');
        
        if (!sidebar) return;

        const sidebarIsClosed = sidebar.classList.contains('hidden') || sidebar.classList.contains('w-0');

        const updateBtnStates = (activeTabId) => {
            [btnExplorer, btnInstructions].forEach(btn => {
                if(!btn) return;
                btn.classList.remove('text-primary');
                btn.classList.add('text-white/40');
            });
            
            if (activeTabId === 'explorer' && btnExplorer) {
                btnExplorer.classList.replace('text-white/40', 'text-primary');
            } else if (activeTabId === 'instructions' && btnInstructions) {
                btnInstructions.classList.replace('text-white/40', 'text-primary');
            }
        };
        
        // Toggle sidebar visibility
        if (sidebarIsClosed) {
            sidebar.classList.remove('hidden', 'w-0', 'opacity-0', 'border-none');
            sidebar.classList.add('flex', 'sidebar-width');
            if(content) content.classList.remove('opacity-0', 'pointer-events-none');
            
            if (sidebar.hasAttribute('data-last-width')) {
                sidebar.style.width = sidebar.getAttribute('data-last-width');
            } else {
                sidebar.style.width = '';
            }
            if(icon) icon.innerText = 'chevron_left';
            
            if(window.isVisualFixMode) window.isVisualFixMode = false; 
        } else {
           const currentTab = explorerView.classList.contains('flex') ? 'explorer' : 'instructions';
           if (currentTab === tabId && !forceOpenSidebar) {
               // Close sidebar 
               if (sidebar.style.width && sidebar.style.width !== '0px') {
                   sidebar.setAttribute('data-last-width', sidebar.style.width);
               }
               sidebar.style.width = '0px';
               sidebar.classList.add('w-0', 'opacity-0', 'border-none');
               sidebar.classList.remove('sidebar-width');
               if(content) content.classList.add('opacity-0', 'pointer-events-none');
               if(icon) icon.innerText = 'chevron_right';
               
               updateBtnStates(null);
               return;
           }
        }
        
        // Toggle the views
        if (tabId === 'explorer') {
            explorerView.classList.remove('hidden');
            explorerView.classList.add('flex');
            instructionsView.classList.replace('flex', 'hidden');
            updateBtnStates('explorer');
        } else if (tabId === 'instructions') {
            instructionsView.classList.remove('hidden');
            instructionsView.classList.add('flex');
            explorerView.classList.replace('flex', 'hidden');
            updateBtnStates('instructions');
        }
    };

    window.addBotSettingInput = function(containerId, maxItems) {
        const container = document.getElementById(containerId + '-container');
        if(container.children.length >= maxItems) return;
        
        const div = document.createElement('div');
        div.className = 'relative flex items-center mt-1 animate-fade-in';
        
        const focusClass = containerId === 'constraints' ? 'focus:border-rose-500/50' : 'focus:border-emerald-500/50';
        const placeholderTxt = containerId === 'constraints' ? 'إضافة قيد جديد...' : 'إضافة تعليمة جديدة...';
        
        div.innerHTML = `
           <input type="text" class="w-full bg-black/40 border border-white/10 rounded-md pl-6 pr-2 py-1.5 text-[9.5px] text-white ${focusClass} outline-none transition-all" placeholder="${placeholderTxt}">
           <button onclick="this.parentElement.remove()" class="absolute left-1 text-white/20 hover:text-red-400 rounded transition-colors w-4 h-4 flex justify-center items-center"><span class="material-symbols-outlined text-[12px]">close</span></button>
        `;
        container.appendChild(div);
        div.querySelector('input').focus();
    };

    // --- Bottom Sheet Logic ---
    window.currentBottomSheetView = null;
    
    window.toggleBottomSheet = function(viewId = null) {
        const sheetEl = document.getElementById('sovereign-bottom-sheet');
        if (!sheetEl) return;
        
        if (viewId) {
            window.switchBottomSheetView(viewId);
            if (sheetEl.classList.contains('translate-y-full')) {
                sheetEl.classList.remove('translate-y-full', 'opacity-0', 'pointer-events-none');
                sheetEl.classList.add('translate-y-0', 'opacity-100', 'pointer-events-auto');
            } else if (window.currentBottomSheetView === viewId) {
                // Toggle off if clicking the very same view header
                sheetEl.classList.add('translate-y-full', 'opacity-0', 'pointer-events-none');
                sheetEl.classList.remove('translate-y-0', 'opacity-100', 'pointer-events-auto');
            }
            window.currentBottomSheetView = sheetEl.classList.contains('translate-y-full') ? null : viewId;
        } else {
            // Close Action
            sheetEl.classList.add('translate-y-full', 'opacity-0', 'pointer-events-none');
            sheetEl.classList.remove('translate-y-0', 'opacity-100', 'pointer-events-auto');
            window.currentBottomSheetView = null;
        }
    };

    window.switchBottomSheetView = function(viewId) {
        const views = ['console', 'errors', 'warnings', 'music'];
        const titleEl = document.getElementById('bottom-sheet-title-text');
        const iconEl = document.getElementById('bottom-sheet-icon');
        const actionsEl = document.getElementById('bottom-sheet-actions');
        
        views.forEach(v => {
            const el = document.getElementById(v + '-view');
            if(el) {
                if(v === viewId) {
                    el.classList.remove('opacity-0', 'pointer-events-none', 'hidden');
                    el.classList.add('opacity-100', 'flex');
                } else {
                    el.classList.remove('opacity-100', 'flex');
                    el.classList.add('opacity-0', 'pointer-events-none', 'hidden');
                }
            }
        });

        if (viewId === 'music') {
            try { 
                if(typeof window.renderMusicLibrary === 'function') window.renderMusicLibrary(); 
            } catch(e) { console.error('Error rendering music library:', e); }
        }

        if (viewId === 'console') {
            if(titleEl) titleEl.innerText = 'The Sovereign Console';
            if(iconEl) { iconEl.innerText = 'terminal'; iconEl.style.color = '#56B6C2'; }
            if(actionsEl) {
                actionsEl.innerHTML = `
                   <md-filled-tonal-button id="btn-send-log" style="--md-filled-tonal-button-container-height: 16px; --md-label-large-size: 7.5px; --md-filled-tonal-button-container-shape: 4px; --md-sys-color-secondary-container: rgba(86,182,194,0.15); --md-sys-color-on-secondary-container: #56B6C2; padding: 0 4px;" onclick="sendConsoleLogToAssistant()">
                      إرسال السجل للمساعد
                      <md-icon slot="icon" style="--md-icon-size: 10px;">send</md-icon>
                   </md-filled-tonal-button>
                   <button class="text-white/40 hover:text-white transition-colors" title="النسخ السريع" onclick="copyConsoleLog()"><span class="material-symbols-outlined text-[13px]">content_copy</span></button>
                   <div class="w-[1px] h-3 bg-white/10 mx-1"></div>
                   <button class="text-white/40 hover:text-red-400 transition-colors" onclick="toggleBottomSheet()"><span class="material-symbols-outlined text-[16px]">keyboard_arrow_down</span></button>
                `;
            }
        } else if (viewId === 'errors') {
            if(titleEl) titleEl.innerText = 'سجل التناقضات والأخطاء (Errors & Conflicts)';
            if(iconEl) { iconEl.innerText = 'error'; iconEl.style.color = '#F87171'; }
            if(actionsEl) {
                actionsEl.innerHTML = `
                   <button class="text-white/40 hover:text-white transition-colors flex items-center justify-center p-1 rounded hover:bg-white/5" title="مسح السجل"><span class="material-symbols-outlined text-[14px]">delete_sweep</span></button>
                   <div class="w-[1px] h-3 bg-white/10 mx-1"></div>
                   <button class="text-white/40 hover:text-red-400 transition-colors" onclick="toggleBottomSheet()"><span class="material-symbols-outlined text-[16px]">keyboard_arrow_down</span></button>
                `;
            }
        } else if (viewId === 'warnings') {
            if(titleEl) titleEl.innerText = 'التحذيرات والنواقص (Warnings)';
            if(iconEl) { iconEl.innerText = 'warning'; iconEl.style.color = '#FACC15'; }
            if(actionsEl) {
                actionsEl.innerHTML = `
                   <button class="text-white/40 hover:text-white transition-colors flex items-center justify-center p-1 rounded hover:bg-white/5" title="مسح السجل"><span class="material-symbols-outlined text-[14px]">delete_sweep</span></button>
                   <div class="w-[1px] h-3 bg-white/10 mx-1"></div>
                   <button class="text-white/40 hover:text-red-400 transition-colors" onclick="toggleBottomSheet()"><span class="material-symbols-outlined text-[16px]">keyboard_arrow_down</span></button>
                `;
            }
        } else if (viewId === 'music') {
            if(titleEl) titleEl.innerText = 'الموسوعة الصوتية (Audio System)';
            if(iconEl) { iconEl.innerText = 'headphones'; iconEl.style.color = '#50C878'; }
            if(actionsEl) {
                actionsEl.innerHTML = `
                   <button class="text-white/40 hover:text-red-400 transition-colors" onclick="toggleBottomSheet()"><span class="material-symbols-outlined text-[16px]">keyboard_arrow_down</span></button>
                `;
            }
        }
    };

    window.copyConsoleLog = function() {
        const output = document.getElementById('console-output').innerText;
        navigator.clipboard.writeText(output).then(() => {
            // Blink icon
            const btn = document.querySelector('button[onclick="copyConsoleLog()"]');
            const icon = btn.querySelector('.material-symbols-outlined');
            icon.innerText = 'check';
            icon.classList.add('text-green-400');
            setTimeout(() => {
                icon.innerText = 'content_copy';
                icon.classList.remove('text-green-400');
            }, 1500);
        });
    };

    window.sendConsoleLogToAssistant = function() {
        const output = document.getElementById('console-output').innerText;
        const msgInput = document.querySelector('textarea[placeholder="اسأل عن أي شيء..."]');
        if (msgInput) {
            msgInput.value = `إليك سجل النظام (Console Log):\n\`\`\`\n${output}\n\`\`\`\nيرجى تحليله ومعالجة التحذيرات: `;
            msgInput.focus();
            
            // Open chat aside if it's minimized
            const chatAside = document.getElementById('chat-aside');
            if(chatAside && chatAside.classList.contains('w-0')) {
                window.toggleChatCollapse();
            }
            
            toggleBottomSheet(); // Close the bottom sheet
        }
    };

    // Bottom Sheet Resizing Logic
    const consoleResizer = document.getElementById('bottom-sheet-resizer');
    const sovereignConsole = document.getElementById('sovereign-bottom-sheet');
    if (consoleResizer && sovereignConsole) {
        let isResizingConsole = false;
        let startY, startHeight;
        
        consoleResizer.addEventListener('mousedown', (e) => {
            isResizingConsole = true;
            startY = e.clientY;
            startHeight = sovereignConsole.getBoundingClientRect().height;
            document.body.style.cursor = 'row-resize';
            sovereignConsole.style.transition = 'none'; // disable transition while dragging
            consoleResizer.classList.replace('bg-primary/30', 'bg-ff-warning/40');
            e.preventDefault();
        });
        
        document.addEventListener('mousemove', (e) => {
            if (!isResizingConsole) return;
            const diff = startY - e.clientY;
            let newHeight = startHeight + diff;
            
            if (newHeight < 100) newHeight = 100;
            if (newHeight > window.innerHeight * 0.8) newHeight = window.innerHeight * 0.8;
            
            sovereignConsole.style.height = newHeight + 'px';
        });
        
        document.addEventListener('mouseup', () => {
            if (isResizingConsole) {
                isResizingConsole = false;
                document.body.style.cursor = '';
                sovereignConsole.style.transition = '';
                consoleResizer.classList.replace('bg-ff-warning/40', 'bg-primary/30');
            }
        });
    }

    // --- Recommendation Logic ---
    window.deleteRecommendation = function(btn) {
        const item = btn.closest('.recommendation-item');
        if(item) {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            setTimeout(() => item.remove(), 300);
        }
    };
    
    window.editRecommendation = function(btn) {
        const container = btn.closest('.recommendation-item');
        const p = container.querySelector('.suggestion-text');
        if(!p) return;
        
        const iconSpan = btn.querySelector('span');
        if (p.querySelector('textarea')) {
            // Save Edit
            const val = p.querySelector('textarea').value;
            p.innerHTML = val;
            iconSpan.innerText = 'edit';
            btn.classList.remove('bg-amber-400/20', 'text-amber-400', 'border-amber-400', 'border-solid', 'border');
            btn.classList.add('hover:bg-white/10', 'text-white/40');
            btn.title = 'تعديل';
        } else {
            // Enter Edit Mode
            const txt = p.innerText;
            p.innerHTML = `<textarea class="w-full text-[10px] bg-black/40 border border-primary/30 p-1.5 rounded-md outline-none text-white focus:ring-1 focus:ring-primary/50 custom-scrollbar resize-none" rows="2">${txt}</textarea>`;
            const ta = p.querySelector('textarea');
            ta.focus();
            iconSpan.innerText = 'check';
            btn.classList.remove('hover:bg-white/10', 'text-white/40');
            btn.classList.add('bg-amber-400/20', 'text-amber-400', 'border-amber-400', 'border-solid', 'border');
            btn.title = 'حفظ';
        }
    };

    // --- Discussion Widget Logic ---
    window.toggleDiscussionWidget = function(show) {
        const placeholder = document.getElementById('discussion-placeholder');
        const widget = document.getElementById('discussion-chat-widget');
        
        if(show) {
            if(placeholder) {
                placeholder.classList.add('opacity-0', 'scale-95');
                setTimeout(() => placeholder.classList.add('hidden'), 300);
            }
            if(widget) {
                setTimeout(() => {
                    widget.classList.remove('hidden');
                    // Small delay to allow display block to take effect before transition
                    setTimeout(() => widget.classList.remove('opacity-0', 'scale-95', 'translate-y-4'), 50);
                }, 300);
                // Scroll wrapper down so widget is visible 
                setTimeout(() => {
                   document.getElementById('report-mode-view').scrollTo({ top: document.getElementById('report-mode-view').scrollHeight, behavior: 'smooth' });
                }, 400);
            }
        } else {
            if(widget) {
                widget.classList.add('opacity-0', 'scale-95', 'translate-y-4');
                setTimeout(() => widget.classList.add('hidden'), 300);
            }
            if(placeholder) {
                setTimeout(() => {
                    placeholder.classList.remove('hidden');
                    setTimeout(() => placeholder.classList.remove('opacity-0', 'scale-95'), 50);
                }, 300);
            }
        }
    };

    // --- Theme Toggle Logic ---
    window.toggleTheme = function() {
        const htmlBlock = document.documentElement;
        const iconSpan = document.querySelector('#theme-toggle-btn span');
        const themeBtn = document.getElementById('theme-toggle-btn');
        
        if (htmlBlock.classList.contains('dark')) {
            // Switch to Light
            htmlBlock.classList.remove('dark');
            if(iconSpan) iconSpan.innerText = 'dark_mode';
            if(themeBtn) themeBtn.classList.replace('hover:text-amber-400', 'hover:text-indigo-500');
        } else {
            // Switch to Dark
            htmlBlock.classList.add('dark');
            if(iconSpan) iconSpan.innerText = 'light_mode';
            if(themeBtn) themeBtn.classList.replace('hover:text-indigo-500', 'hover:text-amber-400');
        }
    };
