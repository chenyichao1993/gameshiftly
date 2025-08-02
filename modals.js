// Common Modals Component
function createModals() {
    return `
    <!-- 登录模态框 -->
    <div id="loginModal" class="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 hidden">
        <div class="bg-white rounded-lg shadow-xl p-8 w-full max-w-md mx-4">
            <div class="flex justify-between items-center mb-6">
                <h2 class="text-2xl font-bold text-gray-900">Log In</h2>
                <button onclick="hideLoginModal()" class="text-gray-400 hover:text-gray-600">
                    <i class="fas fa-times text-xl"></i>
                </button>
            </div>
            
            <form id="loginForm" onsubmit="handleLogin(event)" novalidate>
                <div class="mb-4">
                    <label for="loginEmail" class="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input type="email" id="loginEmail" 
                           class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500">
                </div>
                
                <div class="mb-6">
                    <label for="loginPassword" class="block text-sm font-medium text-gray-700 mb-2">Password</label>
                    <input type="password" id="loginPassword" 
                           class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500">
                </div>
                
                <div class="flex items-center justify-between mb-6">
                    <label class="flex items-center">
                        <input type="checkbox" class="rounded border-gray-300 text-red-600 focus:ring-red-500">
                        <span class="ml-2 text-sm text-gray-600">Remember me</span>
                    </label>
                    <a href="#" class="text-sm text-red-600 hover:text-red-700">Forgot password?</a>
                </div>
                
                <button type="submit" class="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition">
                    Log In
                </button>
            </form>
            
            <div class="mt-6 text-center">
                <p class="text-sm text-gray-600">
                    Don't have an account? 
                    <a href="#" onclick="hideLoginModal(); showRegisterModal();" class="text-red-600 hover:text-red-700 font-medium">
                        Sign up
                    </a>
                </p>
            </div>
        </div>
    </div>
    
    <!-- 注册模态框 -->
    <div id="registerModal" class="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 hidden">
        <div class="bg-white rounded-lg shadow-xl p-8 w-full max-w-md mx-4">
            <div class="flex justify-between items-center mb-6">
                <h2 class="text-2xl font-bold text-gray-900">Create Account</h2>
                <button onclick="hideRegisterModal()" class="text-gray-400 hover:text-gray-600">
                    <i class="fas fa-times text-xl"></i>
                </button>
            </div>
            
            <form id="registerForm" onsubmit="handleRegister(event)" novalidate>
                <div class="mb-4">
                    <label for="registerUsername" class="block text-sm font-medium text-gray-700 mb-2">Username</label>
                    <input type="text" id="registerUsername" 
                           class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500">
                </div>
                
                <div class="mb-4">
                    <label for="registerEmail" class="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input type="email" id="registerEmail" 
                           class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500">
                </div>
                
                <div class="mb-4">
                    <label for="registerPassword" class="block text-sm font-medium text-gray-700 mb-2">Password</label>
                    <input type="password" id="registerPassword" 
                           class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500">
                </div>
                
                <div class="mb-6">
                    <label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                    <input type="password" id="confirmPassword" 
                           class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500">
                </div>
                
                <div class="mb-6">
                    <label class="flex items-center">
                        <input type="checkbox" class="rounded border-gray-300 text-red-600 focus:ring-red-500">
                        <span class="ml-2 text-sm text-gray-600">I agree to the Terms of Service and Privacy Policy</span>
                    </label>
                </div>
                
                <button type="submit" class="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition">
                    Create Account
                </button>
            </form>
            
            <div class="mt-6 text-center">
                <p class="text-sm text-gray-600">
                    Already have an account? 
                    <a href="#" onclick="hideRegisterModal(); showLoginModal();" class="text-red-600 hover:text-red-700 font-medium">
                        Log in
                    </a>
                </p>
            </div>
        </div>
    </div>
    `;
}

// Function to inject modals into any page
function injectModals() {
    const modalsContainer = document.getElementById('modals-container');
    if (modalsContainer) {
        modalsContainer.innerHTML = createModals();
    }
}

// 处理登录表单提交
function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    // 这里可以添加实际的登录逻辑
    console.log('Login attempt:', { email, password });
    alert('Login functionality will be implemented soon!');
    hideLoginModal();
}

// 处理注册表单提交
function handleRegister(event) {
    event.preventDefault();
    const username = document.getElementById('registerUsername').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }
    
    // 这里可以添加实际的注册逻辑
    console.log('Register attempt:', { username, email, password });
    alert('Registration functionality will be implemented soon!');
    hideRegisterModal();
}

// Auto-inject modals when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    injectModals();
}); 