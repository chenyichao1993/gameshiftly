// Common Footer Component
function createFooter() {
    const currentYear = new Date().getFullYear();
    
    return `
    <footer class="bg-gray-900 text-white py-8 lg:py-12 mt-8 lg:mt-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                <div class="col-span-1 md:col-span-2">
                    <div class="flex items-center space-x-3 mb-4">
                        <div class="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center">
                            <span class="text-white font-bold text-lg lg:text-xl">GS</span>
                        </div>
                        <h3 class="text-xl lg:text-2xl font-bold">GameShiftly</h3>
                    </div>
                    <p class="text-gray-400 mb-4 max-w-md text-sm lg:text-base">
                        GameShiftly is your ultimate destination for free online games. With over 90,000 games across all categories, 
                        we provide endless entertainment for gamers of all ages.
                    </p>
                    <div class="flex space-x-4">
                        <a href="https://facebook.com/gameshiftly" class="text-gray-400 hover:text-white transition">
                            <i class="fab fa-facebook text-lg lg:text-xl"></i>
                        </a>
                        <a href="https://twitter.com/gameshiftly" class="text-gray-400 hover:text-white transition">
                            <i class="fab fa-twitter text-lg lg:text-xl"></i>
                        </a>
                        <a href="https://instagram.com/gameshiftly" class="text-gray-400 hover:text-white transition">
                            <i class="fab fa-instagram text-lg lg:text-xl"></i>
                        </a>
                        <a href="https://youtube.com/gameshiftly" class="text-gray-400 hover:text-white transition">
                            <i class="fab fa-youtube text-lg lg:text-xl"></i>
                        </a>
                    </div>
                </div>
                
                <div class="quick-links-section">
                    <h4 class="text-base lg:text-lg font-semibold mb-4">Quick Links</h4>
                    <ul class="space-y-2">
                        <li><a href="index.html" class="text-gray-400 hover:text-white transition text-sm lg:text-base">Home</a></li>
                        <li><a href="gameshiftly-category.html" class="text-gray-400 hover:text-white transition text-sm lg:text-base">Popular Games</a></li>
                        <li><a href="gameshiftly-category.html" class="text-gray-400 hover:text-white transition text-sm lg:text-base">New Games</a></li>
                        <li><a href="gameshiftly-category.html" class="text-gray-400 hover:text-white transition text-sm lg:text-base">Categories</a></li>
                        <li><a href="#" class="text-gray-400 hover:text-white transition text-sm lg:text-base">Videos</a></li>
                    </ul>
                </div>
                
                <div class="support-section">
                    <h4 class="text-base lg:text-lg font-semibold mb-4">Support</h4>
                    <ul class="space-y-2">
                        <li><a href="#" class="text-gray-400 hover:text-white transition text-sm lg:text-base">Help Center</a></li>
                        <li><a href="#" class="text-gray-400 hover:text-white transition text-sm lg:text-base">Contact Us</a></li>
                        <li><a href="#" class="text-gray-400 hover:text-white transition text-sm lg:text-base">Privacy Policy</a></li>
                        <li><a href="#" class="text-gray-400 hover:text-white transition text-sm lg:text-base">Terms of Service</a></li>
                        <li><a href="#" class="text-gray-400 hover:text-white transition text-sm lg:text-base">Cookie Policy</a></li>
                    </ul>
                </div>
            </div>
            
            <div class="border-t border-gray-800 mt-6 lg:mt-8 pt-6 lg:pt-8 text-center">
                <p class="text-gray-400 text-sm lg:text-base">&copy; 2006 - 2025 GameShiftly. All rights reserved.</p>
            </div>
        </div>
    </footer>
    `;
}

// Function to inject footer into any page
function injectFooter() {
    const footerContainer = document.getElementById('footer-container');
    if (footerContainer) {
        footerContainer.innerHTML = createFooter();
    }
}

// Auto-inject footer when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    injectFooter();
}); 