# GameShiftly - Break Free with Online Games

## 项目背景

GameShiftly 是一个以"Break Free"为主题的现代在线游戏平台，旨在为用户提供无缝、响应式且引人入胜的 HTML5 游戏体验。该平台注重 Google SEO 友好、响应式设计、苹果风格配色和地道的英文内容。项目开发过程中，我们集成了多种经典 HTML5 游戏，并着重解决了域名访问、游戏嵌入和分析代码集成等问题。

## 项目架构

- **前端**：使用 HTML5 和 Tailwind CSS 构建，提供响应式和视觉吸引力的设计。
- **游戏**：主要采用本地托管开源 HTML5 游戏的方式，确保快速加载时间和无外部依赖。部分初期尝试的第三方 iframe 嵌入（如来自 `crazygames.com` 和 `y8.com` 的游戏）由于防盗链/限制问题未能成功，因此转为本地部署。
- **部署**：利用 GitHub 进行版本控制和代码托管，通过 Cloudflare Pages 实现自动化部署和网站托管。
- **域名管理**：域名通过 Spaceship 注册，并由 Cloudflare 管理 DNS 和提供网站加速、安全服务。

## 功能

- **响应式设计**：完全响应式布局，可在桌面、平板和移动设备上无缝工作，确保最佳浏览体验。
- **SEO 优化**：内置 SEO 最佳实践，包括语义化的 H1/H2 结构、规范 URL (canonical tags) 和优化的元标签 (title, description, keywords)，以提高搜索引擎可见性。
- **本地游戏集成**：精选并本地部署经典 HTML5 游戏（如 2048, Snake, Tetris, Minesweeper, Flappy Bird 和 Pacman），确保游戏运行流畅且无外部加载问题。支持通过 Python 脚本自动化下载和解压游戏源码。
- **现代 UI**：干净、简约的界面设计，灵感来源于苹果的美学，具有流畅的动画和过渡效果。
- **易于导航**：直观的导航系统，首页以网格卡片形式展示游戏，点击可进入独立的游戏页面，实现了首页到独立游戏页的跳转。
- **LOGO 本地化与优化**：所有游戏 LOGO 均已本地化并同步到 `img` 文件夹，并进行显示比例和样式优化，保证美观统一。
- **游戏区体验优化**：所有游戏区均实现无滚动条、完整自适应展示，并直接居中显示在页面上，提供最佳游戏视觉体验。
- **网站分析**：集成 Google Analytics (gtag.js) 以追踪网站访问数据和用户行为。

## 包含的游戏

- **2048**：一款流行的数字益智游戏。
- **贪吃蛇 (Snake)**：经典的贪吃蛇游戏，控制蛇吃食物并变长。
- **俄罗斯方块 (Tetris)**：标志性的方块堆叠益智游戏。
- **扫雷 (Minesweeper)**：基于逻辑的益智游戏，清除雷区而不引爆任何地雷。
- **Flappy Bird**：侧滚游戏，控制小鸟避开障碍物。
- **吃豆人 (Pacman)**：经典街机游戏，吃掉所有豆子，躲避幽灵。

## 技术栈

- **HTML5**：用于网页结构和内容。
- **Tailwind CSS**：用于快速、响应式和自定义样式设计。
- **JavaScript**：用于游戏逻辑和页面交互性。
- **Python**：用于本地开发环境搭建（如简易 HTTP 服务器）和自动化脚本（如游戏下载）。
- **GitHub**：版本控制和代码托管平台。
- **Cloudflare Pages**：高性能静态网站部署和托管服务。
- **Google Analytics**：网站流量和用户行为分析。

## 本地开发

要在本地运行项目，请按照以下步骤操作：

1.  **克隆仓库**：
    ```bash
    git clone https://github.com/yourusername/gameshiftly.git
    cd gameshiftly
    ```

2.  **启动本地服务器**（例如，使用 Python。请确保你已安装 Python）：
    ```bash
    python -m http.server 8080
    ```

3.  打开浏览器并导航到 `http://localhost:8080` 查看网站。

## 部署

该网站使用 Cloudflare Pages 进行部署。要部署自己的版本：

1.  将代码推送到 GitHub 仓库。
2.  在 Cloudflare Pages 中，连接你的 GitHub 仓库。
3.  配置构建设置（如果需要，例如 `npm install` 和 `npm run build`）并部署。Cloudflare Pages 会自动检测 GitHub 仓库的更新并重新部署。

## Cloudflare 配置与域名管理

为确保域名 `gameshiftly.online` 的正确访问和 HTTPS 跳转，我们进行了以下 Cloudflare 配置：

### 1. DNS 设置

-   确保 Cloudflare DNS 中有指向 Cloudflare Pages 的 CNAME 记录（例如 `www` 指向 `[your-site-id].pages.dev`）。
-   根域名 `@` 通常通过 CNAME Flattening 或 A 记录指向 Cloudflare Pages 提供的 IP 地址。
-   确保代理状态 (Proxy status) 为"已代理"（橙色云朵图标），以便 Cloudflare 提供 CDN、SSL 和页面规则服务。

### 2. SSL/TLS 设置

-   在 Cloudflare 控制面板的 **"SSL/TLS" -> "概述"** 中，将加密模式设置为 **"完全" (Full)** 或 **"完全（严格）" (Full (Strict))**，以确保端到端的加密。

### 3. 页面规则 (Page Rules)

我们创建了以下三条页面规则（Cloudflare 免费计划限制 3 条），以实现网站访问的统一性和安全性：

1.  **强制 HTTP 到 HTTPS (针对根域名):**
    *   **URL:** `http://gameshiftly.online/*`
    *   **设置:** `始终使用 HTTPS` (Always Use HTTPS)
    *   **作用:** 将所有 `http://gameshiftly.online` 的请求强制跳转到 `https://gameshiftly.online`。

2.  **强制 HTTP 到 HTTPS (针对 www 域名):**
    *   **URL:** `http://www.gameshiftly.online/*`
    *   **设置:** `始终使用 HTTPS` (Always Use HTTPS)
    *   **作用:** 将所有 `http://www.gameshiftly.online` 的请求强制跳转到 `https://www.gameshiftly.online`。

3.  **强制非 www 到 www 域名重定向 (并保持 HTTPS):**
    *   **URL:** `gameshiftly.online/*`
    *   **设置:** `转发 URL` (Forwarding URL)，类型为 `301 - 永久重定向` (301 - Permanent Redirect)
    *   **目标 URL:** `https://www.gameshiftly.online/$1`
    *   **作用:** 将 `gameshiftly.online`（不带 www）的所有请求永久重定向到 `https://www.gameshiftly.online`，并保留原路径 (通过 `$1` 实现)。
    *   **注意:** 创建此规则时遇到的"此规则可能不适用于您的流量"警告通常可以忽略并继续部署，因为 Cloudflare Pages 的 DNS 代理通常是兼容的。在遇到此警告时，选择"忽略并继续部署规则"即可。

## Google Analytics 集成

为了追踪网站流量和用户行为，我们将 Google Analytics (gtag.js) 代码集成到 `index.html` 文件中。若要追踪其他游戏页面，需将同样的代码添加到对应游戏页面的 `<head>` 标签内。

**集成位置**：将谷歌分析代码段粘贴到每个 HTML 文件的 `<head>` 标签内部，`</head>` 标签之前。

**已集成代码示例 (在 `index.html` 中):**

```html
    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-ZPVFP3K52R"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'G-ZPVFP3K52R');
    </script>
</head>
```

## 遇到的主要挑战与解决方案

-   **第三方游戏 iframe 嵌入问题**：
    *   **问题**：尝试嵌入 `crazygames.com` 和 `y8.com` 的游戏时，由于目标网站的防盗链或 iframe 限制，导致游戏无法正常加载或交互。
    *   **解决方案**：转向本地托管开源 HTML5 游戏，并手动优化游戏区布局，确保所有游戏能无缝嵌入并自适应显示。

-   **域名访问与重定向问题**：
    *   **问题**：网站上线后，用户通过 `http://gameshiftly.online/` 或 `gameshiftly.online/` 访问时无法正常打开，只有 `https://www.gameshiftly.online/` 可以。
    *   **解决方案**：通过 Cloudflare 的页面规则和 SSL/TLS 设置，强制所有 HTTP 请求跳转到 HTTPS，并将非 www 域名重定向到 www 域名，确保所有访问路径最终都能通过 `https://www.gameshiftly.online/` 正常访问。

## 贡献

欢迎对本项目进行贡献！如果您有任何改进建议或发现 Bug，请随时提交 Pull Request。

## 许可证

该项目采用 MIT 许可证 - 详情请参阅 [LICENSE](LICENSE) 文件。 