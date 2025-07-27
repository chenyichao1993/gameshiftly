// Common Footer Component
function createFooter() {
    const currentYear = new Date().getFullYear();
    
    return `
    <footer class="bg-gray-800 text-white mt-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                    <div class="flex items-center space-x-2 mb-4">
                        <div class="w-8 h-8 bg-red-600 rounded flex items-center justify-center">
                            <span class="text-white font-bold text-sm">GS</span>
                        </div>
                        <span class="text-xl font-bold">GameShiftly</span>
                    </div>
                    <p class="text-gray-400">Free online gaming platform, offering thousands of exciting games.</p>
                </div>
                
                <div>
                    <h3 class="font-semibold mb-4">Game Categories</h3>
                    <ul class="space-y-2 text-gray-400">
                        <li><a href="#" class="hover:text-white">Action Games</a></li>
                        <li><a href="#" class="hover:text-white">Puzzle Games</a></li>
                        <li><a href="#" class="hover:text-white">Sports Games</a></li>
                        <li><a href="#" class="hover:text-white">Strategy Games</a></li>
                    </ul>
                </div>
                
                <div>
                    <h3 class="font-semibold mb-4">About Us</h3>
                    <ul class="space-y-2 text-gray-400">
                        <li><a href="#" class="hover:text-white">About GameShiftly</a></li>
                        <li><a href="#" class="hover:text-white">Contact Us</a></li>
                        <li><a href="#" class="hover:text-white">Privacy Policy</a></li>
                        <li><a href="#" class="hover:text-white">Terms of Service</a></li>
                    </ul>
                </div>
                
                <div>
                    <h3 class="font-semibold mb-4">Follow Us</h3>
                    <div class="flex space-x-4">
                        <a href="#" class="text-gray-400 hover:text-white">
                            <i class="fab fa-facebook text-xl"></i>
                        </a>
                        <a href="#" class="text-gray-400 hover:text-white">
                            <i class="fab fa-twitter text-xl"></i>
                        </a>
                        <a href="#" class="text-gray-400 hover:text-white">
                            <i class="fab fa-instagram text-xl"></i>
                        </a>
                        <a href="#" class="text-gray-400 hover:text-white">
                            <i class="fab fa-youtube text-xl"></i>
                        </a>
                    </div>
                </div>
            </div>
            
            <div class="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
                <p>&copy; ${currentYear} GameShiftly. All rights reserved.</p>
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