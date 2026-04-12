/**
 * Alfa Flow Main Controller
 * مسؤول عن تهيئة النظام العام والربط بين المحرك والواجهة
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Alfa Flow Engine: Master Your Intent Initialized');
    
    // تهيئة أزرار التشغيل والمشاركة
    const btnRun = document.getElementById('btn-run');
    const btnShare = document.getElementById('btn-share');
    
    if (btnRun) {
        btnRun.addEventListener('click', () => {
            console.log('Running code...');
            // سيتم الربط مع محرك التنفيذ لاحقاً
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

// تصدير دوال عالمية إذا لزم الأمر
window.FF = {
    version: "1.0.0-alpha",
    status: "Flowing"
};
