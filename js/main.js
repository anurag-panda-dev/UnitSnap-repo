// ========================================
// APPLICATION INITIALIZATION
// ========================================

/**
 * Initialize the application when DOM is ready
 */
document.addEventListener('DOMContentLoaded', () => {
    console.log('🌐 UnitSnap - Initializing...');
    
    try {
        // Initialize the UI
        initUI();
        
        console.log('✅ UnitSnap - Ready!');
        console.log(`📊 Loaded ${CONVERTERS_DATA.length} converters`);
        
        // Log available converters
        const converterTitles = CONVERTERS_DATA.map(c => c.title);
        console.log('Available converters:', converterTitles);
        
    } catch (error) {
        console.error('❌ Error initializing UnitSnap:', error);
        
        // Show error message to user
        const grid = document.getElementById('convertersGrid');
        if (grid) {
            grid.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 2rem;">
                    <h2 style="color: #ef4444;">⚠️ Initialization Error</h2>
                    <p>Failed to load converters. Please refresh the page.</p>
                    <p style="color: #6b7280; font-size: 0.875rem;">${error.message}</p>
                </div>
            `;
        }
    }
});

/**
 * Performance monitoring
 */
window.addEventListener('load', () => {
    if (window.performance) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`⚡ Page load time: ${pageLoadTime}ms`);
    }
});

/**
 * Handle errors globally
 */
window.addEventListener('error', (event) => {
    console.error('Global error:', event.error);
});

/**
 * Service worker registration (optional for future PWA support)
 */
if ('serviceWorker' in navigator) {
    // Uncomment to enable service worker
    // navigator.serviceWorker.register('/sw.js')
    //     .then(reg => console.log('Service Worker registered'))
    //     .catch(err => console.log('Service Worker registration failed'));
}
