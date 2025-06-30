/**
 * 🛡️ 终极保护系统
 * 轻量级、高性能、不影响功能的完美保护方案
 */

class UltimateProtection {
    constructor() {
        this.config = {
            // 🔥 保护级别：zero-tolerance(零容忍) | destroy(销毁) | heavy(重度)
            level: 'zero-tolerance',
            destroyMode: true,              // 启用立即销毁模式
            instantDestroy: true,           // 检测到立即销毁，不等待
            
            // 🎯 F12检测行为配置
            f12Action: 'redirect',          // 'warning' | 'redirect' - F12检测后的行为
            redirectUrl: 'https://www.baidu.com', // 重定向目标URL
            
            // 功能开关
            disableRightClick: true,        // 禁用右键
            disableTextSelection: true,     // 禁用文本选择
            disableKeyboardShortcuts: true, // 禁用快捷键
            detectDevTools: true,           // 检测开发者工具
            obfuscateCode: false,           // 代码混淆（可选）
            
            // 性能优化
            throttleInterval: 1000,         // 检测间隔（毫秒）
            maxRetries: 3,                  // 最大重试次数
            
            // 自定义消息
            messages: {
                rightClickDisabled: '右键功能已禁用',
                devToolsDetected: '检测到开发者工具，请关闭后继续使用',
                copyDisabled: '内容受版权保护，禁止复制'
            }
        };
        
        this.isActive = false;
        this.detectionCount = 0;
    }

    /**
     * 🚀 启动保护系统
     */
    init() {
        if (this.isActive) return;
        
        console.log('🛡️ 启动网页保护系统...');
        
        // 基础保护
        if (this.config.disableRightClick) this.disableRightClick();
        if (this.config.disableTextSelection) this.disableTextSelection();
        if (this.config.disableKeyboardShortcuts) this.disableKeyboardShortcuts();
        
        // 高级保护
        if (this.config.detectDevTools) this.startDevToolsDetection();
        
        // 内容保护
        this.protectContent();
        
        this.isActive = true;
        console.log('✅ 保护系统启动完成');
    }

    /**
     * 🚫 禁用右键菜单
     */
    disableRightClick() {
        document.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            this.showMessage(this.config.messages.rightClickDisabled);
            return false;
        });
    }

    /**
     * 🚫 禁用文本选择
     */
    disableTextSelection() {
        // CSS方式（性能最好）
        const style = document.createElement('style');
        style.textContent = `
            * {
                -webkit-user-select: none !important;
                -moz-user-select: none !important;
                -ms-user-select: none !important;
                user-select: none !important;
            }
            
            /* 保持输入框可选择 */
            input, textarea, [contenteditable="true"] {
                -webkit-user-select: text !important;
                -moz-user-select: text !important;
                -ms-user-select: text !important;
                user-select: text !important;
            }
        `;
        document.head.appendChild(style);

        // JavaScript方式（备用）
        document.addEventListener('selectstart', (e) => {
            if (!this.isInputElement(e.target)) {
                e.preventDefault();
                return false;
            }
        });
    }

    /**
     * ⌨️ 禁用危险快捷键
     */
    disableKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // F12 - 开发者工具
            if (e.keyCode === 123) {
                e.preventDefault();
                this.showMessage('F12功能已禁用');
                return false;
            }
            
            // Ctrl+Shift+I - 开发者工具
            if (e.ctrlKey && e.shiftKey && e.keyCode === 73) {
                e.preventDefault();
                this.showMessage('开发者工具已禁用');
                return false;
            }
            
            // Ctrl+Shift+J - 控制台
            if (e.ctrlKey && e.shiftKey && e.keyCode === 74) {
                e.preventDefault();
                this.showMessage('控制台已禁用');
                return false;
            }
            
            // Ctrl+U - 查看源代码
            if (e.ctrlKey && e.keyCode === 85) {
                e.preventDefault();
                this.showMessage('查看源代码已禁用');
                return false;
            }
            
            // Ctrl+S - 保存页面
            if (e.ctrlKey && e.keyCode === 83) {
                e.preventDefault();
                this.showMessage('保存功能已禁用');
                return false;
            }
            
            // Ctrl+A - 全选（在非输入元素上）
            if (e.ctrlKey && e.keyCode === 65 && !this.isInputElement(e.target)) {
                e.preventDefault();
                this.showMessage(this.config.messages.copyDisabled);
                return false;
            }
            
            // Ctrl+C - 复制（在非输入元素上）
            if (e.ctrlKey && e.keyCode === 67 && !this.isInputElement(e.target)) {
                e.preventDefault();
                this.showMessage(this.config.messages.copyDisabled);
                return false;
            }
        });
    }

    /**
     * 🔍 开发者工具检测
     */
    startDevToolsDetection() {
        let devtools = { open: false, orientation: null };
        const threshold = 160;

        const detectDevTools = () => {
            if (window.outerHeight - window.innerHeight > threshold || 
                window.outerWidth - window.innerWidth > threshold) {
                if (!devtools.open) {
                    devtools.open = true;
                    this.handleDevToolsDetected();
                }
            } else {
                devtools.open = false;
            }
        };

        // 定期检测
        setInterval(detectDevTools, this.config.throttleInterval);

        // 控制台检测
        this.startConsoleDetection();
    }

    /**
     * 🎯 控制台检测
     */
    startConsoleDetection() {
        const detectConsole = () => {
            const before = performance.now();
            debugger;
            const after = performance.now();
            
            if (after - before > 100) {
                this.handleDevToolsDetected();
            }
        };

        // 随机间隔检测
        const randomDetection = () => {
            detectConsole();
            setTimeout(randomDetection, Math.random() * 3000 + 2000);
        };
        
        setTimeout(randomDetection, 1000);
    }

    /**
     * 💥 处理开发者工具检测 - 可配置行为
     */
    handleDevToolsDetected() {
        this.detectionCount++;

        console.clear();
        console.log('%c💥 检测到调试工具', 'color: #ff0000; font-size: 24px; font-weight: bold;');

        // 从配置文件中读取F12检测行为设置（如果存在）
        let f12Action = this.config.f12Action;
        let redirectUrl = this.config.redirectUrl;
        
        // 尝试从全局配置中获取设置
        if (window.ProtectionConfig && window.ProtectionConfig.detection && window.ProtectionConfig.detection.devTools) {
            const detectionConfig = window.ProtectionConfig.detection.devTools;
            f12Action = detectionConfig.f12Action || f12Action;
            redirectUrl = detectionConfig.redirectUrl || redirectUrl;
        }

        // 根据配置选择行为
        if (f12Action === 'redirect') {
            console.log('%c🔄 重定向到百度', 'color: #ff6600; font-size: 16px;');
            window.location.href = redirectUrl;
        } else if (f12Action === 'warning') {
            console.log('%c⚠️ 显示警告信息', 'color: #ff6600; font-size: 16px;');
            this.showMessage(this.config.messages.devToolsDetected);
        } else {
            // 默认行为：销毁页面（向后兼容）
            console.log('%c💥 执行页面销毁', 'color: #ff0000; font-size: 16px;');
            if (this.config.destroyMode) {
                this.destroyPageImmediately();
            } else {
                this.activateHeavyProtection();
            }
        }
    }

    /**
     * 🔒 内容保护
     */
    protectContent() {
        // 防止拖拽保存图片
        document.addEventListener('dragstart', (e) => {
            if (e.target.tagName === 'IMG') {
                e.preventDefault();
                return false;
            }
        });

        // 防止打印
        window.addEventListener('beforeprint', (e) => {
            this.showMessage('打印功能已禁用');
            e.preventDefault();
            return false;
        });
    }

    /**
     * 💬 显示提示消息
     */
    showMessage(message) {
        // 创建轻量级提示
        const toast = document.createElement('div');
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #ff4757;
            color: white;
            padding: 10px 20px;
            border-radius: 5px;
            z-index: 10000;
            font-size: 14px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.2);
            transition: all 0.3s ease;
        `;
        
        document.body.appendChild(toast);
        
        // 3秒后自动消失
        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }, 3000);
    }

    /**
     * 🔧 工具函数：检查是否为输入元素
     */
    isInputElement(element) {
        const inputTypes = ['INPUT', 'TEXTAREA', 'SELECT'];
        return inputTypes.includes(element.tagName) || 
               element.contentEditable === 'true';
    }

    /**
     * 🌫️ 模糊内容 - 第二级保护
     */
    blurContent() {
        console.log('🌫️ 激活内容模糊保护');

        // 模糊主要内容区域
        const contentSelectors = ['main', '.content', '#content', 'article', '.main-content'];
        contentSelectors.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(el => {
                el.style.filter = 'blur(3px)';
                el.style.pointerEvents = 'none';
            });
        });

        // 显示警告覆盖层
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(255, 71, 87, 0.1);
            z-index: 9999;
            pointer-events: none;
            backdrop-filter: blur(1px);
        `;
        document.body.appendChild(overlay);
    }

    /**
     * ⚡ 立即销毁页面 - 零容忍模式
     */
    destroyPageImmediately() {
        console.log('⚡ 零容忍模式：立即销毁页面');

        // 🔥 立即停止所有操作
        window.stop && window.stop();

        // 💀 尝试强制关闭开发者工具
        this.forceCloseDevTools();

        // 🔥 立即清空页面
        document.body.innerHTML = '';
        document.head.innerHTML = '<title>访问被拒绝</title>';

        // 🔥 立即显示销毁页面
        document.body.innerHTML = `
            <div style="
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                background: #000;
                color: #ff0000;
                display: flex;
                align-items: center;
                justify-content: center;
                font-family: 'Courier New', monospace;
                z-index: 999999;
                margin: 0;
                padding: 0;
            ">
                <div style="text-align: center; animation: blink 1s infinite;">
                    <div style="font-size: 80px; margin-bottom: 20px;">💥</div>
                    <h1 style="font-size: 36px; margin-bottom: 20px; color: #ff0000;">ACCESS DENIED</h1>
                    <p style="font-size: 18px; margin-bottom: 15px;">调试工具检测 - 页面已销毁</p>
                    <p style="font-size: 14px; color: #ff6666;">Developer Tools Detected - Page Destroyed</p>
                    <div style="margin-top: 30px; font-size: 12px; color: #666;">
                        窗口将在 3 秒后自动关闭...
                    </div>
                </div>
            </div>
            <style>
                @keyframes blink {
                    0%, 50% { opacity: 1; }
                    51%, 100% { opacity: 0.3; }
                }
                * { margin: 0; padding: 0; box-sizing: border-box; }
                html, body { overflow: hidden; }
            </style>
        `;

        // 🔥 禁用所有事件
        document.addEventListener('keydown', (e) => e.preventDefault(), true);
        document.addEventListener('contextmenu', (e) => e.preventDefault(), true);
        document.addEventListener('selectstart', (e) => e.preventDefault(), true);

        // 🔥 立即尝试关闭窗口
        setTimeout(() => {
            try {
                window.close();
                // 如果无法关闭，跳转到空白页
                if (!window.closed) {
                    window.location.href = 'about:blank';
                }
            } catch (e) {
                // 最后手段：跳转到空白页
                window.location.href = 'about:blank';
            }
        }, 3000);

        // 🔥 阻止任何恢复操作
        Object.defineProperty(window, 'location', {
            value: { href: 'about:blank' },
            writable: false
        });
    }

    /**
     * 💀 强制关闭开发者工具
     */
    forceCloseDevTools() {
        console.log('💀 尝试强制关闭开发者工具');

        // 方法1：尝试通过快捷键关闭
        try {
            // 模拟按F12关闭开发者工具
            const event = new KeyboardEvent('keydown', {
                key: 'F12',
                code: 'F12',
                keyCode: 123,
                which: 123,
                bubbles: true
            });
            document.dispatchEvent(event);
        } catch (e) {
            console.log('快捷键方法失败');
        }

        // 方法2：尝试通过窗口操作
        try {
            // 尝试调整窗口大小来强制关闭开发者工具
            const originalWidth = window.outerWidth;
            const originalHeight = window.outerHeight;

            window.resizeTo(100, 100);
            setTimeout(() => {
                window.resizeTo(originalWidth, originalHeight);
            }, 100);
        } catch (e) {
            console.log('窗口调整方法失败');
        }

        // 方法3：尝试通过console操作
        try {
            // 清空并锁定console
            console.clear();
            Object.defineProperty(console, 'log', { value: () => {}, writable: false });
            Object.defineProperty(console, 'warn', { value: () => {}, writable: false });
            Object.defineProperty(console, 'error', { value: () => {}, writable: false });
            Object.defineProperty(console, 'info', { value: () => {}, writable: false });
            Object.defineProperty(console, 'debug', { value: () => {}, writable: false });
        } catch (e) {
            console.log('Console锁定方法失败');
        }

        // 方法4：尝试通过focus操作
        try {
            window.focus();
            window.blur();
            window.focus();
        } catch (e) {
            console.log('Focus方法失败');
        }

        // 方法5：终极方案 - 跳转到特殊页面
        setTimeout(() => {
            try {
                // 跳转到chrome://settings/ 或其他特殊页面
                window.location.href = 'chrome://settings/';
            } catch (e) {
                try {
                    // 备用方案：跳转到data URL
                    window.location.href = 'data:text/html,<h1>Access Denied</h1>';
                } catch (e2) {
                    // 最终方案：about:blank
                    window.location.href = 'about:blank';
                }
            }
        }, 1000);
    }

    /**
     * 💥 销毁页面 - 终极保护（备用方案）
     */
    destroyPage() {
        console.log('💥 激活页面销毁保护');

        // 清空页面内容
        document.body.innerHTML = '';
        document.head.innerHTML = '<title>访问被拒绝</title>';

        // 创建警告页面
        document.body.innerHTML = `
            <div style="
                display: flex;
                align-items: center;
                justify-content: center;
                min-height: 100vh;
                background: linear-gradient(135deg, #ff4757, #ff6b6b);
                font-family: 'Microsoft YaHei', sans-serif;
                margin: 0;
                padding: 20px;
            ">
                <div style="
                    background: white;
                    padding: 40px;
                    border-radius: 15px;
                    text-align: center;
                    box-shadow: 0 20px 40px rgba(0,0,0,0.2);
                    max-width: 500px;
                    width: 100%;
                ">
                    <div style="font-size: 60px; margin-bottom: 20px;">🛡️</div>
                    <h1 style="color: #ff4757; margin-bottom: 20px; font-size: 28px;">访问被拒绝</h1>
                    <p style="color: #666; margin-bottom: 15px; line-height: 1.6;">
                        检测到多次尝试使用开发者工具访问本站内容
                    </p>
                    <p style="color: #666; margin-bottom: 30px; line-height: 1.6;">
                        本站内容受版权保护，禁止未经授权的技术分析
                    </p>
                    <div style="margin-bottom: 20px;">
                        <button onclick="window.close()" style="
                            background: #ff4757;
                            color: white;
                            border: none;
                            padding: 12px 24px;
                            border-radius: 6px;
                            cursor: pointer;
                            font-size: 16px;
                            margin-right: 10px;
                        ">关闭窗口</button>
                        <button onclick="location.href='/'" style="
                            background: #666;
                            color: white;
                            border: none;
                            padding: 12px 24px;
                            border-radius: 6px;
                            cursor: pointer;
                            font-size: 16px;
                        ">返回首页</button>
                    </div>
                    <p style="color: #999; font-size: 12px;">
                        如需正常访问，请关闭所有开发者工具后重新访问
                    </p>
                </div>
            </div>
        `;

        // 阻止所有后续操作
        window.stop && window.stop();

        // 尝试关闭窗口（如果是弹窗）
        setTimeout(() => {
            try {
                window.close();
            } catch (e) {
                // 无法关闭窗口时，跳转到警告页面
                console.log('无法关闭窗口，显示警告页面');
            }
        }, 3000);
    }

    /**
     * ⚡ 重度保护模式（传统模式）
     */
    activateHeavyProtection() {
        console.log('🔒 激活重度保护模式');

        document.body.style.filter = 'blur(5px)';

        const warning = document.createElement('div');
        warning.innerHTML = `
            <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                        background: rgba(0,0,0,0.8); z-index: 99999;
                        display: flex; align-items: center; justify-content: center;">
                <div style="background: white; padding: 30px; border-radius: 10px; text-align: center;">
                    <h2 style="color: #ff4757;">⚠️ 安全警告</h2>
                    <p>检测到多次尝试访问开发者工具</p>
                    <p>请关闭开发者工具后刷新页面</p>
                    <button onclick="location.reload()"
                            style="background: #ff4757; color: white; border: none;
                                   padding: 10px 20px; border-radius: 5px; cursor: pointer;">
                        刷新页面
                    </button>
                </div>
            </div>
        `;
        document.body.appendChild(warning);
    }

    /**
     * 🛑 停止保护系统
     */
    destroy() {
        this.isActive = false;
        console.log('🛡️ 保护系统已停止');
    }
}

// 🚀 自动启动保护系统
const protection = new UltimateProtection();

// 页面加载完成后启动
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => protection.init());
} else {
    protection.init();
}

// 导出到全局（方便调试和控制）
window.UltimateProtection = protection;
