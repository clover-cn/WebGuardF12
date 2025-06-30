/**
 * 🛡️ 保护系统配置文件
 * 可以根据不同页面和需求调整保护级别
 */

const ProtectionConfig = {
    // 🎯 全局配置
    global: {
        enabled: true,
        level: 'medium', // light | medium | heavy
        debug: false,    // 开发时可以设为true
    },

    // 📄 页面特定配置
    pages: {
        // 首页 - 轻量保护
        'index.html': {
            level: 'light',
            disableRightClick: true,
            disableTextSelection: false, // 允许选择，方便搜索
            disableKeyboardShortcuts: true,
            detectDevTools: false,
        },

        // 搜索页 - 轻量保护
        'search/index.html': {
            level: 'light',
            disableRightClick: true,
            disableTextSelection: false,
            disableKeyboardShortcuts: true,
            detectDevTools: false,
        },

        // 阅读页 - 重度保护
        'reader/index.html': {
            level: 'heavy',
            disableRightClick: true,
            disableTextSelection: true,
            disableKeyboardShortcuts: true,
            detectDevTools: true,
            protectContent: true,
            watermark: true,
        },

        // 详情页 - 中等保护
        'book-detail/index.html': {
            level: 'medium',
            disableRightClick: true,
            disableTextSelection: true,
            disableKeyboardShortcuts: true,
            detectDevTools: true,
        }
    },

    // 🎨 自定义样式
    styles: {
        toast: {
            background: '#ff4757',
            color: 'white',
            borderRadius: '5px',
            padding: '10px 20px',
            fontSize: '14px',
            position: 'top-right', // top-left | top-right | bottom-left | bottom-right
            duration: 3000
        },
        
        watermark: {
            text: '自定义名称 - 127.0.0.1',
            opacity: 0.1,
            fontSize: '16px',
            color: '#999',
            angle: -45,
            spacing: 200
        }
    },

    // 💬 自定义消息
    messages: {
        zh: {
            rightClickDisabled: '右键功能已禁用 🚫',
            textSelectionDisabled: '文本选择已禁用 📝',
            keyboardShortcutDisabled: '快捷键已禁用 ⌨️',
            devToolsDetected: '检测到开发者工具，请关闭后继续使用 🔍',
            copyDisabled: '内容受版权保护，禁止复制 📋',
            printDisabled: '打印功能已禁用 🖨️',
            saveDisabled: '保存功能已禁用 💾',
            dragDisabled: '拖拽功能已禁用 🖱️',
            heavyProtectionActivated: '已激活重度保护模式 🔒'
        },
        
        en: {
            rightClickDisabled: 'Right-click disabled 🚫',
            textSelectionDisabled: 'Text selection disabled 📝',
            keyboardShortcutDisabled: 'Keyboard shortcut disabled ⌨️',
            devToolsDetected: 'Developer tools detected, please close to continue 🔍',
            copyDisabled: 'Content is copyright protected 📋',
            printDisabled: 'Print function disabled 🖨️',
            saveDisabled: 'Save function disabled 💾',
            dragDisabled: 'Drag function disabled 🖱️',
            heavyProtectionActivated: 'Heavy protection mode activated 🔒'
        }
    },

    // 🔧 高级功能配置
    advanced: {
        // 代码混淆配置
        obfuscation: {
            enabled: false,
            level: 'medium',
            preserveComments: false,
            renameVariables: true,
            stringEncryption: true
        },

        // 水印配置
        watermark: {
            enabled: true,
            type: 'text', // text | image
            content: '自定义名称 - 127.0.0.1',
            opacity: 0.1,
            position: 'repeat', // fixed | repeat
            zIndex: 1000
        },

        // 性能优化
        performance: {
            throttleInterval: 1000,
            debounceDelay: 300,
            maxRetries: 3,
            enableCache: true
        },

        // 安全配置
        security: {
            domainBinding: true,
            allowedDomains: ['fq.66ds.de', 'localhost'],
            timeBasedValidation: false,
            encryptionKey: 'fanqie-novel-2024'
        }
    },

    // 🎯 智能检测配置
    detection: {
        devTools: {
            enabled: true,
            methods: ['size', 'debugger', 'console'],
            sensitivity: 'medium', // low | medium | high
            interval: 1000,
            maxWarnings: 3,
            
            // 🔧 F12检测行为配置 - warning只警告 | redirect重定向到百度 | destroy立即销毁
            f12Action: 'redirect',  // 'warning' | 'redirect' | 'destroy' - 默认重定向到百度
            redirectUrl: 'https://www.baidu.com'  // 重定向目标URL
        },

        automation: {
            detectBots: true,
            detectHeadless: true,
            detectSelenium: true,
            blockSuspiciousUA: true
        }
    },

    // 📊 统计配置
    analytics: {
        enabled: false,
        trackProtectionEvents: true,
        reportToServer: false,
        endpoint: '/api/protection-stats'
    }
};

/**
 * 🔧 获取当前页面的保护配置
 */
function getCurrentPageConfig() {
    const currentPage = window.location.pathname;
    const pageConfig = ProtectionConfig.pages[currentPage] || {};
    
    // 合并全局配置和页面特定配置
    return {
        ...ProtectionConfig.global,
        ...pageConfig,
        styles: ProtectionConfig.styles,
        messages: ProtectionConfig.messages.zh, // 默认中文
        advanced: ProtectionConfig.advanced,
        detection: ProtectionConfig.detection
    };
}

/**
 * 🎨 创建水印
 */
function createWatermark(config) {
    if (!config.watermark?.enabled) return;

    const watermark = document.createElement('div');
    watermark.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: ${config.advanced.watermark.zIndex};
        opacity: ${config.advanced.watermark.opacity};
        background-image: repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 100px,
            rgba(0,0,0,0.1) 100px,
            rgba(0,0,0,0.1) 200px
        );
        font-family: Arial, sans-serif;
        font-size: 16px;
        color: #999;
        display: flex;
        align-items: center;
        justify-content: center;
        transform: rotate(-45deg);
    `;
    
    // 创建重复的水印文本
    const watermarkText = config.advanced.watermark.content;
    const repeatedText = Array(50).fill(watermarkText).join('   ');
    watermark.textContent = repeatedText;
    
    document.body.appendChild(watermark);
}

/**
 * 🚀 智能保护系统启动器
 */
function initSmartProtection() {
    const config = getCurrentPageConfig();
    
    // 检查是否启用保护
    if (!config.enabled) {
        console.log('🛡️ 保护系统已禁用');
        return;
    }

    // 检查域名绑定
    if (config.advanced.security.domainBinding) {
        const currentDomain = window.location.hostname;
        const allowedDomains = config.advanced.security.allowedDomains;
        
        if (!allowedDomains.includes(currentDomain)) {
            console.warn('🚫 域名验证失败，保护系统未启动');
            return;
        }
    }

    // 创建水印
    createWatermark(config);

    // 启动保护系统
    if (window.UltimateProtection) {
        // 应用配置
        Object.assign(window.UltimateProtection.config, config);
        
        // 启动保护
        window.UltimateProtection.init();
        
        console.log(`🛡️ 智能保护系统已启动 - 级别: ${config.level}`);
    } else {
        console.error('❌ 保护系统核心文件未加载');
    }
}

// 🎯 导出配置和函数
window.ProtectionConfig = ProtectionConfig;
window.getCurrentPageConfig = getCurrentPageConfig;
window.initSmartProtection = initSmartProtection;

// 🚀 自动启动（如果保护系统已加载）
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSmartProtection);
} else {
    initSmartProtection();
}
