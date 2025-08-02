// Firebase 配置
const firebaseConfig = {
    apiKey: "AIzaSyDKpPwedegwQrMDF5MBEnVLjPsgSIhCVXk",
    authDomain: "gameshiftly-b1da6.firebaseapp.com",
    projectId: "gameshiftly-b1da6",
    storageBucket: "gameshiftly-b1da6.firebasestorage.app",
    messagingSenderId: "813446854938",
    appId: "1:813446854938:web:d7f911280733188d2c94a3"
};

// 初始化 Firebase
firebase.initializeApp(firebaseConfig);

// 获取认证实例
const auth = firebase.auth();

// 认证状态监听
auth.onAuthStateChanged((user) => {
    if (user) {
        // 用户已登录
        console.log('用户已登录:', user.email);
        updateUIForLoggedInUser(user);
    } else {
        // 用户未登录
        console.log('用户未登录');
        updateUIForLoggedOutUser();
    }
});

// 更新UI显示登录用户
function updateUIForLoggedInUser(user) {
    const loginBtn = document.querySelector('button[onclick="showLoginModal()"]');
    const registerBtn = document.querySelector('button[onclick="showRegisterModal()"]');
    
    if (loginBtn) loginBtn.style.display = 'none';
    if (registerBtn) {
        registerBtn.textContent = `Hi, ${user.displayName || user.email.split('@')[0]}`;
        registerBtn.onclick = () => showUserMenu(user);
    }
}

// 更新UI显示未登录用户
function updateUIForLoggedOutUser() {
    const loginBtn = document.querySelector('button[onclick="showLoginModal()"]');
    const registerBtn = document.querySelector('button[onclick="showRegisterModal()"]');
    
    if (loginBtn) loginBtn.style.display = 'inline-block';
    if (registerBtn) {
        registerBtn.textContent = 'Register';
        registerBtn.onclick = () => showRegisterModal();
    }
}

// 显示用户菜单
function showUserMenu(user) {
    const menu = document.createElement('div');
    menu.className = 'fixed top-16 right-4 bg-white rounded-lg shadow-xl border z-50 min-w-48';
    menu.innerHTML = `
        <div class="p-4 border-b">
            <div class="font-medium text-gray-900">${user.displayName || user.email.split('@')[0]}</div>
            <div class="text-sm text-gray-500">${user.email}</div>
        </div>
        <div class="py-2">
            <button onclick="showProfile()" class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                <i class="fas fa-user mr-2"></i>Profile
            </button>
            <button onclick="logout()" class="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                <i class="fas fa-sign-out-alt mr-2"></i>Logout
            </button>
        </div>
    `;
    
    document.body.appendChild(menu);
    
    // 点击外部关闭菜单
    setTimeout(() => {
        document.addEventListener('click', function closeMenu(e) {
            if (!menu.contains(e.target)) {
                menu.remove();
                document.removeEventListener('click', closeMenu);
            }
        });
    }, 100);
}

// 显示用户资料
function showProfile() {
    const user = auth.currentUser;
    if (user) {
        alert(`Profile: ${user.displayName || 'No name'}\nEmail: ${user.email}`);
    }
}

// 用户登出
function logout() {
    auth.signOut().then(() => {
        showToast('Successfully logged out');
    }).catch((error) => {
        showToast('Logout failed: ' + error.message);
    });
}

// 重写登录处理函数
async function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;
    
    // 基本验证
    if (!email) {
        showToast('Please enter your email address');
        return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showToast('Please enter a valid email address');
        return;
    }
    
    if (!password) {
        showToast('Please enter your password');
        return;
    }

    // 显示加载状态
    const submitBtn = event.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Logging in...';
    submitBtn.disabled = true;

    try {
        // Firebase登录
        const userCredential = await auth.signInWithEmailAndPassword(email, password);
        showToast('Login successful! Welcome back!');
        hideLoginModal();
        document.getElementById('loginForm').reset();
    } catch (error) {
        let errorMessage = 'Login failed. Please try again.';
        switch (error.code) {
            case 'auth/user-not-found':
                errorMessage = 'No account found with this email address.';
                break;
            case 'auth/wrong-password':
                errorMessage = 'Incorrect password.';
                break;
            case 'auth/invalid-email':
                errorMessage = 'Invalid email address.';
                break;
            case 'auth/user-disabled':
                errorMessage = 'This account has been disabled.';
                break;
        }
        showToast(errorMessage);
    } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
}

// 重写注册处理函数
async function handleRegister(event) {
    event.preventDefault();
    const username = document.getElementById('registerUsername').value.trim();
    const email = document.getElementById('registerEmail').value.trim();
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const termsAccepted = document.getElementById('termsCheckbox').checked;
    
    // 基本验证
    if (!username) {
        showToast('Please enter a username');
        return;
    }
    
    if (username.length < 3) {
        showToast('Username must be at least 3 characters long');
        return;
    }
    
    if (!email) {
        showToast('Please enter your email address');
        return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showToast('Please enter a valid email address');
        return;
    }
    
    if (!password) {
        showToast('Please enter a password');
        return;
    }
    
    if (password.length < 6) {
        showToast('Password must be at least 6 characters long');
        return;
    }
    
    if (!confirmPassword) {
        showToast('Please confirm your password');
        return;
    }
    
    if (password !== confirmPassword) {
        showToast('Passwords do not match');
        return;
    }
    
    if (!termsAccepted) {
        showToast('Please agree to the Terms of Service and Privacy Policy');
        return;
    }

    // 显示加载状态
    const submitBtn = event.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Creating Account...';
    submitBtn.disabled = true;

    try {
        // Firebase注册
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        
        // 更新用户显示名称
        await userCredential.user.updateProfile({
            displayName: username
        });
        
        showToast('Registration successful! Welcome to GameShiftly!');
        hideRegisterModal();
        document.getElementById('registerForm').reset();
    } catch (error) {
        let errorMessage = 'Registration failed. Please try again.';
        switch (error.code) {
            case 'auth/email-already-in-use':
                errorMessage = 'An account with this email already exists.';
                break;
            case 'auth/invalid-email':
                errorMessage = 'Invalid email address.';
                break;
            case 'auth/weak-password':
                errorMessage = 'Password is too weak. Please choose a stronger password.';
                break;
        }
        showToast(errorMessage);
    } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
} 