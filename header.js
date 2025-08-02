// Common Header Component
function createHeader() {
    return `
    <!-- 顶部导航栏 -->
    <header class="bg-white shadow-sm sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-center justify-between h-16">
                <!-- 左侧Logo和菜单 -->
                <div class="flex items-center space-x-4 lg:space-x-8">
                    <button class="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100">
                        <i class="fas fa-bars text-xl"></i>
                    </button>
                    
                    <!-- Logo -->
                    <a href="index.html" class="flex items-center space-x-2 lg:space-x-3 hover:opacity-80 transition-opacity">
                        <div class="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center">
                            <span class="text-white font-bold text-lg lg:text-xl">GS</span>
                        </div>
                        <div class="hidden sm:block">
                            <h1 class="text-lg lg:text-2xl font-bold text-red-600">GameShiftly</h1>
                            <p class="text-xs text-gray-500">Free Online Games</p>
                        </div>
                    </a>
                </div>
                
                <!-- 搜索框 -->
                <div class="flex-1 max-w-md lg:max-w-2xl mx-4 lg:mx-8 hidden md:block">
                    <div class="relative">
                        <input type="text" 
                               id="searchInput"
                               placeholder="Search our games" 
                               class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm lg:text-base">
                        <i class="fas fa-search absolute left-3 top-3 text-gray-400"></i>
                        <!-- 搜索建议下拉框 -->
                        <div id="searchSuggestions" class="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg mt-1 z-50 hidden max-h-60 overflow-y-auto">
                            <!-- 搜索建议内容将在这里动态生成 -->
                        </div>
                    </div>
                </div>
                
                <!-- 右侧按钮 -->
                <div class="flex items-center space-x-2 lg:space-x-4">
                    <button onclick="showLoginModal()" class="text-gray-600 hover:text-gray-900 px-2 lg:px-4 py-2 rounded-lg hover:bg-gray-100 text-sm lg:text-base">
                        Log in
                    </button>
                    <button onclick="showRegisterModal()" class="bg-red-600 text-white px-2 lg:px-4 py-2 rounded-lg hover:bg-red-700 transition text-sm lg:text-base">
                        Register
                    </button>
                </div>
            </div>
        </div>
    </header>
    `;
}

// Function to inject header into any page
function injectHeader() {
    const headerContainer = document.getElementById('header-container');
    if (headerContainer) {
        headerContainer.innerHTML = createHeader();
    }
}

// 游戏数据库 - 只包含网站实际存在的游戏
const gamesDatabase = [
    { name: 'Pacman', category: 'Arcade & Classic', url: 'pacman.html', tags: ['maze', 'arcade', 'retro', 'ghosts', 'pacman'] },
    { name: 'Minesweeper', category: 'Thinking', url: 'minesweeper.html', tags: ['logic', 'puzzle', 'mines', 'strategy', 'minesweeper'] }
];

// 搜索功能
function initializeSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchSuggestions = document.getElementById('searchSuggestions');
    
    if (!searchInput) return;
    
    // 搜索输入事件
    searchInput.addEventListener('input', function() {
        const query = this.value.trim().toLowerCase();
        
        if (query.length < 2) {
            searchSuggestions.classList.add('hidden');
            return;
        }
        
        // 搜索游戏
        const results = searchGames(query);
        displaySearchResults(results);
    });
    
    // 点击外部关闭搜索建议
    document.addEventListener('click', function(e) {
        if (!searchInput.contains(e.target) && !searchSuggestions.contains(e.target)) {
            searchSuggestions.classList.add('hidden');
        }
    });
    
    // 回车键搜索
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const query = this.value.trim();
            if (query) {
                performSearch(query);
            }
        }
    });
}

// 搜索游戏函数
function searchGames(query) {
    return gamesDatabase.filter(game => {
        const nameMatch = game.name.toLowerCase().includes(query);
        const categoryMatch = game.category.toLowerCase().includes(query);
        const tagMatch = game.tags.some(tag => tag.toLowerCase().includes(query));
        
        return nameMatch || categoryMatch || tagMatch;
    }).slice(0, 8); // 限制显示8个结果
}

// 显示搜索结果
function displaySearchResults(results) {
    const searchSuggestions = document.getElementById('searchSuggestions');
    
    if (results.length === 0) {
        searchSuggestions.innerHTML = `
            <div class="p-4 text-gray-500 text-center">
                <div class="text-sm">No games found for your search</div>
            </div>
        `;
    } else {
        searchSuggestions.innerHTML = results.map(game => `
            <div class="search-result-item p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0" 
                 onclick="goToGame('${game.url}')">
                <div class="flex items-center">
                    <div class="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center mr-3">
                        <i class="fas fa-gamepad text-white text-xs"></i>
                    </div>
                    <div class="flex-1">
                        <div class="font-medium text-gray-900">${game.name}</div>
                        <div class="text-sm text-gray-500">${game.category}</div>
                    </div>
                    <div class="flex items-center">
                        <span class="text-xs text-green-600 bg-green-100 px-2 py-1 rounded mr-2">Available</span>
                        <i class="fas fa-chevron-right text-gray-400 text-xs"></i>
                    </div>
                </div>
            </div>
        `).join('');
    }
    
    searchSuggestions.classList.remove('hidden');
}

// 执行搜索
function performSearch(query) {
    const results = searchGames(query);
    if (results.length > 0) {
        // 如果有结果，跳转到第一个游戏
        goToGame(results[0].url);
    } else {
        // 如果没有结果，显示提示
        alert('No games found for: ' + query);
    }
}

// 跳转到游戏页面
function goToGame(url) {
    if (url && url !== '#') {
        window.location.href = url;
    }
}

// 模态框功能
function showLoginModal() {
    const loginModal = document.getElementById('loginModal');
    if (loginModal) {
        loginModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
}

function hideLoginModal() {
    const loginModal = document.getElementById('loginModal');
    if (loginModal) {
        loginModal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
}

function showRegisterModal() {
    const registerModal = document.getElementById('registerModal');
    if (registerModal) {
        registerModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
}

function hideRegisterModal() {
    const registerModal = document.getElementById('registerModal');
    if (registerModal) {
        registerModal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
}

// 点击模态框外部关闭
document.addEventListener('click', function(e) {
    const loginModal = document.getElementById('loginModal');
    const registerModal = document.getElementById('registerModal');
    
    if (e.target === loginModal) {
        hideLoginModal();
    }
    if (e.target === registerModal) {
        hideRegisterModal();
    }
});

// Auto-inject header and initialize search when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    injectHeader();
    // 延迟初始化搜索，确保header已经注入
    setTimeout(() => {
        initializeSearch();
    }, 100);
}); 