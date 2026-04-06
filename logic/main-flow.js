/**
 * ZGE Main Flow Controller
 * مسؤول عن تهيئة النظام العام والربط بين المحرك والواجهة
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 ZGE Engine: Zero-Gravity Initialized');
    
    // تهيئة أزرار التشغيل والمشاركة
    const btnRun = document.getElementById('btn-run');
    const btnShare = document.getElementById('btn-share');
    
    if (btnRun) {
        btnRun.addEventListener('click', () => {
            console.log('Running code...');
            updatePreview();
        });
    }
    
    if (btnShare) {
        btnShare.addEventListener('click', () => {
            const snackbar = document.getElementById('global-snackbar');
            if (snackbar) {
                snackbar.labelText = "تم نسخ رابط المشروع بنجاح! 🚀";
                snackbar.open = true;
            }
        });
    }

    // تهيئة القوائم الجانبية (Activity Bar)
    setupActivityBar();
});

function setupActivityBar() {
    // [TODO] إضافة منطق التبديل بين المستكشف والبحث وغيرها
    console.log('Activity Bar: Ready');
}

/**
 * تحديث واجهة المعاينة بالكود الحالي
 */
function updatePreview() {
    // في المرحلة الحالية، سنأخذ محتوى تجريبي لأن المحرر لم يتم ربطه بالكامل بعد
    // ولكننا سنقوم بتحديث الـ iframes
    const floatingIframe = document.getElementById('floating-preview-iframe');
    const modalIframe = document.getElementById('modal-preview-iframe');

    // محتوى افتراضي للتجربة
    const demoCode = `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; background: #f0f4f8; }
                h1 { color: #1a73e8; border-bottom: 2px solid #8ab4f8; padding-bottom: 10px; }
            </style>
        </head>
        <body>
            <div>
                <h1>ZGE: Zero-Gravity Editor</h1>
                <p>تم تحديث المعاينة بنجاح! 🚀</p>
            </div>
        </body>
        </html>
    `;

    if (floatingIframe) {
        floatingIframe.srcdoc = demoCode;
    }
    if (modalIframe) {
        modalIframe.srcdoc = demoCode;
    }
}

// تصدير دوال عالمية إذا لزم الأمر
window.ZGE = {
    version: "1.0.0-alpha",
    status: "Weightless"
};
