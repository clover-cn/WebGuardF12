# 🛡️ WebGuardF12 - 终极网页保护系统

**一个轻量级、强大且可配置的JavaScript库，用于保护您的网页内容免受轻易复制或检查。**

WebGuardF12提供了一套全面的工具来阻止随意盗版并保护您的Web应用程序，通过禁用开发者工具、右键菜单、选择和常见快捷键来实现保护。

![Shield](https://img.shields.io/badge/protection-ultimate-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Version](https://img.shields.io/badge/version-1.0.0-orange)

**[🇺🇸 English](README.md) | 🇨🇳 中文**

---

## ✨ 核心功能

-   **🕵️‍♂️ 开发者工具检测**: 主动检测用户是否打开了浏览器开发者工具（F12、Ctrl+Shift+I）。
-   **⚙️ 可配置操作**: 选择检测到开发者工具时的处理方式：
    -   `warning`: 在控制台显示警告。
    -   `redirect`: 将用户重定向到指定URL。
    -   `destroy`: "销毁"页面内容，使其无法使用。
-   **🚫 访问控制**: 禁用右键点击、文本选择和图像拖拽。
-   **⌨️ 快捷键阻止**: 阻止常见快捷键如`Ctrl+C`（复制）、`Ctrl+S`（保存）、`Ctrl+U`（查看源代码）和`Ctrl+P`（打印）。
-   **💧 水印功能**: 在您的内容上动态添加文本或图像水印。
-   **🔒 高级安全**: 将脚本绑定到特定域名以防止未经授权的使用。
-   **🌐 多语言支持**: 为不同语言自定义警报消息。
-   **🚀 高性能**: 轻量级且优化，对您网站性能的影响最小。
-   **🔧 高度可配置**: 通过中央配置文件轻松调整每个功能。

## 🚀 快速开始

使用WebGuardF12非常简单。只需在您的HTML文件中包含配置和主脚本即可。

1.  **下载文件**: 获取`protection-config.js`和`ultimate-protection.js`。
2.  **包含脚本**: 将以下行添加到您的HTML文件中，最好在`<head>`标签内或`<body>`的末尾。

```html
<!-- 首先加载配置 -->
<script src="protection-config.js"></script>
<!-- 加载保护脚本 -->
<script src="ultimate-protection.js"></script>
```

保护功能将自动初始化。

## 🔧 配置

所有功能都可以在`protection-config.js`文件中轻松配置。

### 基本配置

以下是主配置对象`ProtectionConfig`的概览：

```javascript
const ProtectionConfig = {
    // 全局设置
    global: {
        enabled: true,   // 主开关
        level: 'heavy',  // 保护级别: 'light', 'medium', 'heavy'
        debug: false,    // 开发期间设置为true
    },

    // 开发者工具检测设置
    detection: {
        devTools: {
            enabled: true,
            // 检测时的操作: 'warning', 'redirect', 'destroy'
            f12Action: 'redirect',
            // 重定向URL
            redirectUrl: 'https://www.baidu.com'
        }
    },
    // ... 其他设置
};
```

### 开发者工具检测操作

您可以使用`f12Action`属性控制开发者工具打开时的行为：

-   **`warning`**: 在控制台显示消息。
    ```javascript
    f12Action: 'warning'
    ```
-   **`redirect`**: 将用户重定向到另一个页面。
    ```javascript
    f12Action: 'redirect',
    redirectUrl: 'https://github.com/your-repo' // 自定义URL
    ```
-   **`destroy`**: 清除页面内容，有效阻止访问。
    ```javascript
    f12Action: 'destroy'
    ```

### 禁用功能

您可以全局或按页面启用或禁用特定保护。

```javascript
// 在protection-config.js中
// 这将与全局设置合并
pages: {
    'contact.html': {
        disableRightClick: false, // 在联系页面允许右键点击
        disableTextSelection: false // 允许文本选择
    }
}
```

## 演示

查看`demo.html`以获得功能的实时演示和交互式配置面板。

## 🤝 贡献

欢迎贡献！如果您有改进建议或发现任何错误，请随时打开issue或提交pull request。

1.  Fork仓库。
2.  创建您的功能分支（`git checkout -b feature/AmazingFeature`）。
3.  提交您的更改（`git commit -m 'Add some AmazingFeature'`）。
4.  推送到分支（`git push origin feature/AmazingFeature`）。
5.  打开Pull Request。

## 📄 许可证

该项目根据MIT许可证授权 - 有关详细信息，请参阅[LICENSE.md](LICENSE.md)文件。
