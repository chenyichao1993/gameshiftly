// 全局Google Analytics自动加载器 - 零配置版本
// 这个文件会自动在所有页面中加载Google Analytics，无需任何手动配置

(function() {
    'use strict';
    
    // Google Analytics 4 配置
    const GA_MEASUREMENT_ID = 'G-ZPVFP3K52R';
    
    // 检查是否已经加载过Google Analytics
    if (window.gtag || document.querySelector('script[src*="googletagmanager"]')) {
        return;
    }
    
    // 创建并加载Google Analytics脚本
    function loadGoogleAnalytics() {
        // 创建gtag脚本标签
        const gtagScript = document.createElement('script');
        gtagScript.async = true;
        gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
        gtagScript.setAttribute('data-ga-id', GA_MEASUREMENT_ID);
        
        // 创建初始化脚本
        const initScript = document.createElement('script');
        initScript.innerHTML = `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
                page_title: document.title,
                page_location: window.location.href,
                send_page_view: true
            });
            console.log('Google Analytics loaded automatically');
        `;
        
        // 添加到页面头部
        document.head.appendChild(gtagScript);
        document.head.appendChild(initScript);
        
        // 等待gtag加载完成后初始化事件追踪
        gtagScript.onload = function() {
            initializeEventTracking();
        };
    }
    
    // 初始化事件追踪
    function initializeEventTracking() {
        // 等待gtag函数可用
        const checkGtag = setInterval(() => {
            if (window.gtag) {
                clearInterval(checkGtag);
                setupAutomaticEventTracking();
            }
        }, 100);
    }
    
    // 设置自动事件追踪 - 完全无需手动配置
    function setupAutomaticEventTracking() {
        // 页面浏览追踪
        trackPageView();
        
        // 自动监听所有用户交互
        setupAutomaticClickTracking();
        setupAutomaticFormTracking();
        setupAutomaticScrollTracking();
        setupAutomaticGameTracking();
        
        // 监听页面变化
        setupPageChangeTracking();
    }
    
    // 页面浏览追踪
    function trackPageView() {
        if (window.gtag) {
            gtag('config', GA_MEASUREMENT_ID, {
                page_title: document.title,
                page_location: window.location.href
            });
        }
    }
    
    // 自动点击追踪 - 智能识别所有按钮和链接
    function setupAutomaticClickTracking() {
        document.addEventListener('click', function(e) {
            const target = e.target;
            const button = target.closest('button');
            const link = target.closest('a');
            const element = button || link || target;
            
            if (!element) return;
            
            // 获取元素信息
            const elementText = element.textContent?.trim() || '';
            const elementClass = element.className || '';
            const elementId = element.id || '';
            const elementTag = element.tagName?.toLowerCase() || '';
            const elementOnclick = element.getAttribute('onclick') || '';
            
            // 智能识别游戏相关操作
            if (isGameRelatedAction(elementText, elementClass, elementOnclick)) {
                trackGameAction(element, elementText, elementClass, elementOnclick);
            }
            
            // 智能识别分享操作
            if (isShareAction(elementText, elementClass, elementOnclick)) {
                trackShareAction(element, elementText);
            }
            
            // 智能识别搜索操作
            if (isSearchAction(elementText, elementClass, elementOnclick)) {
                trackSearchAction(element);
            }
            
            // 通用点击追踪
            trackGenericClick(element, elementText, elementClass, elementTag);
        });
    }
    
    // 自动表单追踪
    function setupAutomaticFormTracking() {
        document.addEventListener('submit', function(e) {
            const form = e.target;
            const formId = form.id || '';
            const formClass = form.className || '';
            
            trackEvent('form_submit', {
                form_id: formId,
                form_class: formClass,
                page_title: document.title,
                page_location: window.location.href
            });
        });
    }
    
    // 自动滚动追踪
    function setupAutomaticScrollTracking() {
        let scrollTimeout;
        document.addEventListener('scroll', function() {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
                if (scrollPercent > 0 && scrollPercent % 25 === 0) { // 每25%追踪一次
                    trackEvent('scroll_depth', {
                        scroll_percent: scrollPercent,
                        page_title: document.title,
                        page_location: window.location.href
                    });
                }
            }, 1000);
        });
    }
    
    // 自动游戏追踪 - 智能识别游戏相关操作
    function setupAutomaticGameTracking() {
        // 监听iframe加载
        document.addEventListener('load', function(e) {
            if (e.target.tagName === 'IFRAME') {
                const iframe = e.target;
                const gameName = getGameNameFromPage();
                
                trackEvent('game_load', {
                    game_name: gameName,
                    iframe_src: iframe.src,
                    page_title: document.title,
                    page_location: window.location.href
                });
            }
        }, true);
        
        // 监听全屏变化
        document.addEventListener('fullscreenchange', function() {
            const gameName = getGameNameFromPage();
            const action = document.fullscreenElement ? 'enter' : 'exit';
            
            trackEvent('game_fullscreen', {
                game_name: gameName,
                fullscreen_action: action,
                page_title: document.title,
                page_location: window.location.href
            });
        });
    }
    
    // 页面变化追踪
    function setupPageChangeTracking() {
        let currentUrl = window.location.href;
        const observer = new MutationObserver(function() {
            if (window.location.href !== currentUrl) {
                currentUrl = window.location.href;
                setTimeout(trackPageView, 100);
            }
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
    
    // 智能识别游戏相关操作
    function isGameRelatedAction(text, className, onclick) {
        const gameKeywords = ['game', 'play', 'start', 'pause', 'resume', 'restart', 'fullscreen', 'favorite', 'share'];
        const textLower = text.toLowerCase();
        const classLower = className.toLowerCase();
        const onclickLower = onclick.toLowerCase();
        
        return gameKeywords.some(keyword => 
            textLower.includes(keyword) || 
            classLower.includes(keyword) || 
            onclickLower.includes(keyword)
        );
    }
    
    // 智能识别分享操作
    function isShareAction(text, className, onclick) {
        const shareKeywords = ['share', 'facebook', 'twitter', 'whatsapp', 'telegram', 'copy', 'link'];
        const textLower = text.toLowerCase();
        const classLower = className.toLowerCase();
        const onclickLower = onclick.toLowerCase();
        
        return shareKeywords.some(keyword => 
            textLower.includes(keyword) || 
            classLower.includes(keyword) || 
            onclickLower.includes(keyword)
        );
    }
    
    // 智能识别搜索操作
    function isSearchAction(text, className, onclick) {
        const searchKeywords = ['search', 'find', 'lookup'];
        const textLower = text.toLowerCase();
        const classLower = className.toLowerCase();
        const onclickLower = onclick.toLowerCase();
        
        return searchKeywords.some(keyword => 
            textLower.includes(keyword) || 
            classLower.includes(keyword) || 
            onclickLower.includes(keyword)
        );
    }
    
    // 追踪游戏相关操作
    function trackGameAction(element, text, className, onclick) {
        const gameName = getGameNameFromPage();
        const action = getActionFromElement(element, text, className, onclick);
        
        trackEvent('game_action', {
            game_name: gameName,
            action: action,
            element_text: text,
            element_class: className,
            page_title: document.title,
            page_location: window.location.href
        });
    }
    
    // 追踪分享操作
    function trackShareAction(element, text) {
        const gameName = getGameNameFromPage();
        const platform = getSharePlatformFromText(text);
        
        trackEvent('game_share', {
            game_name: gameName,
            share_platform: platform,
            share_text: text,
            page_title: document.title,
            page_location: window.location.href
        });
    }
    
    // 追踪搜索操作
    function trackSearchAction(element) {
        const searchInput = document.getElementById('searchInput');
        const query = searchInput ? searchInput.value.trim() : '';
        
        trackEvent('search', {
            search_term: query,
            page_title: document.title,
            page_location: window.location.href
        });
    }
    
    // 通用点击追踪
    function trackGenericClick(element, text, className, tag) {
        trackEvent('element_click', {
            element_tag: tag,
            element_text: text,
            element_class: className,
            element_id: element.id || '',
            page_title: document.title,
            page_location: window.location.href
        });
    }
    
    // 从元素获取操作类型
    function getActionFromElement(element, text, className, onclick) {
        const textLower = text.toLowerCase();
        const classLower = className.toLowerCase();
        const onclickLower = onclick.toLowerCase();
        
        if (textLower.includes('share') || classLower.includes('share') || onclickLower.includes('share')) {
            return 'share';
        }
        if (textLower.includes('favorite') || classLower.includes('favorite') || onclickLower.includes('favorite')) {
            return 'favorite';
        }
        if (textLower.includes('fullscreen') || classLower.includes('fullscreen') || onclickLower.includes('fullscreen')) {
            return 'fullscreen';
        }
        if (textLower.includes('play') || classLower.includes('play') || onclickLower.includes('play')) {
            return 'play';
        }
        if (textLower.includes('pause') || classLower.includes('pause') || onclickLower.includes('pause')) {
            return 'pause';
        }
        if (textLower.includes('restart') || classLower.includes('restart') || onclickLower.includes('restart')) {
            return 'restart';
        }
        
        return 'click';
    }
    
    // 从文本获取分享平台
    function getSharePlatformFromText(text) {
        const textLower = text.toLowerCase();
        
        if (textLower.includes('facebook')) return 'facebook';
        if (textLower.includes('twitter')) return 'twitter';
        if (textLower.includes('whatsapp')) return 'whatsapp';
        if (textLower.includes('telegram')) return 'telegram';
        if (textLower.includes('copy') || textLower.includes('link')) return 'copy_link';
        
        return 'modal';
    }
    
    // 智能获取游戏名称
    function getGameNameFromPage() {
        // 从页面标题获取
        const title = document.title;
        if (title.includes('Pacman')) return 'Pacman';
        if (title.includes('Minesweeper')) return 'Minesweeper';
        if (title.includes('Tetris')) return 'Tetris';
        if (title.includes('Flappy Bird')) return 'Flappy Bird';
        
        // 从页面内容获取
        const h1 = document.querySelector('h1');
        if (h1) {
            const h1Text = h1.textContent.trim();
            if (h1Text && h1Text !== 'GameShiftly') return h1Text;
        }
        
        // 从URL获取
        const path = window.location.pathname;
        if (path.includes('pacman')) return 'Pacman';
        if (path.includes('minesweeper')) return 'Minesweeper';
        if (path.includes('tetris')) return 'Tetris';
        if (path.includes('flappybird')) return 'Flappy Bird';
        
        // 从iframe src获取
        const iframe = document.querySelector('iframe');
        if (iframe && iframe.src) {
            const src = iframe.src.toLowerCase();
            if (src.includes('pacman')) return 'Pacman';
            if (src.includes('minesweeper')) return 'Minesweeper';
            if (src.includes('tetris')) return 'Tetris';
            if (src.includes('flappy')) return 'Flappy Bird';
        }
        
        return 'Unknown Game';
    }
    
    // 通用事件追踪函数
    function trackEvent(eventName, parameters = {}) {
        if (window.gtag) {
            gtag('event', eventName, parameters);
            console.log('Auto-tracked event:', eventName, parameters);
        }
    }
    
    // 页面加载完成后自动加载Google Analytics
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadGoogleAnalytics);
    } else {
        loadGoogleAnalytics();
    }
    
})(); 