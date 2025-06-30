# 🛡️ WebGuardF12 - Ultimate Web Page Protection System

**A lightweight, powerful, and configurable JavaScript library to protect your web content from being easily copied or inspected.**

WebGuardF12 provides a comprehensive suite of tools to deter casual piracy and protect your web application by disabling developer tools, context menus, selection, and common shortcuts.

![Shield](https://img.shields.io/badge/protection-ultimate-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Version](https://img.shields.io/badge/version-1.0.0-orange)

---

## ✨ Key Features

-   **🕵️‍♂️ DevTools Detection**: Actively detects if the user opens browser developer tools (F12, Ctrl+Shift+I).
-   **⚙️ Configurable Actions**: Choose what happens when DevTools are detected:
    -   `warning`: Display a console warning.
    -   `redirect`: Redirect the user to a specified URL.
    -   `destroy`: "Destroy" the page content, making it unusable.
-   **🚫 Access Control**: Disable right-clicking, text selection, and image dragging.
-   **⌨️ Shortcut Blocking**: Block common shortcuts like `Ctrl+C` (Copy), `Ctrl+S` (Save), `Ctrl+U` (View Source), and `Ctrl+P` (Print).
-   **💧 Watermarking**: Dynamically add text or image watermarks over your content.
-   **🔒 Advanced Security**: Bind the script to specific domains to prevent unauthorized use.
-   **🌐 Multi-language Support**: Customize alert messages for different languages.
-   **🚀 High-Performance**: Lightweight and optimized to have minimal impact on your site's performance.
-   **🔧 Highly Configurable**: Easily tune every feature through a central configuration file.

## 🚀 Quick Start

Getting started with WebGuardF12 is simple. Just include the configuration and the main script in your HTML file.

1.  **Download the files**: Get `protection-config.js` and `ultimate-protection.js`.
2.  **Include the scripts**: Add the following lines to your HTML file, preferably within the `<head>` tag or at the end of the `<body>`.

```html
<!-- Load the configuration first -->
<script src="protection-config.js"></script>
<!-- Load the protection script -->
<script src="ultimate-protection.js"></script>
```

The protection will initialize automatically.

## 🔧 Configuration

All features can be easily configured in the `protection-config.js` file.

### Basic Configuration

Here's a look at the main configuration object `ProtectionConfig`:

```javascript
const ProtectionConfig = {
    // Global settings
    global: {
        enabled: true,   // Master switch
        level: 'heavy',  // Protection level: 'light', 'medium', 'heavy'
        debug: false,    // Set to true during development
    },

    // DevTools detection settings
    detection: {
        devTools: {
            enabled: true,
            // Action on detection: 'warning', 'redirect', 'destroy'
            f12Action: 'redirect',
            // URL for redirection
            redirectUrl: 'https://www.baidu.com'
        }
    },
    // ... other settings
};
```

### DevTools Detection Actions

You can control the behavior when developer tools are opened using the `f12Action` property:

-   **`warning`**: Shows a message in the console.
    ```javascript
    f12Action: 'warning'
    ```
-   **`redirect`**: Redirects the user to another page.
    ```javascript
    f12Action: 'redirect',
    redirectUrl: 'https://github.com/your-repo' // Custom URL
    ```
-   **`destroy`**: Clears the page content, effectively blocking access.
    ```javascript
    f12Action: 'destroy'
    ```

### Disabling Features

You can enable or disable specific protections globally or on a per-page basis.

```javascript
// In protection-config.js
// This will be merged with global settings
pages: {
    'contact.html': {
        disableRightClick: false, // Allow right-click on the contact page
        disableTextSelection: false // Allow text selection
    }
}
```

## Demo

Check out `demo.html` for a live demonstration of the features and an interactive configuration panel.

## 🤝 Contributing

Contributions are welcome! If you have suggestions for improvements or find any bugs, please feel free to open an issue or submit a pull request.

1.  Fork the repository.
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
