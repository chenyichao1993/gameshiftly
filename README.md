# GameShiftly - 在线游戏平台

一个功能完整的在线游戏平台，包含用户认证系统和多个经典游戏。

## 功能特性

### 🎮 游戏功能
- **Tetris** - 经典俄罗斯方块
- **Pacman** - 吃豆人游戏
- **Flappy Bird** - 像素鸟游戏
- **Minesweeper** - 扫雷游戏
- **搜索功能** - 实时游戏搜索
- **分享功能** - 社交媒体分享

### 👤 用户系统
- **用户注册** - 安全的用户注册
- **用户登录** - JWT token认证
- **用户资料** - 个人信息管理
- **密码加密** - bcrypt安全加密
- **会话管理** - 自动登录状态保持

### 🎨 界面设计
- **响应式设计** - 适配桌面和移动设备
- **现代UI** - 使用Tailwind CSS
- **动画效果** - 流畅的交互动画
- **用户友好** - 直观的操作界面

## 技术栈

### 前端
- **HTML5** - 页面结构
- **CSS3** - 样式设计 (Tailwind CSS)
- **JavaScript** - 交互逻辑
- **Font Awesome** - 图标库

### 后端
- **Node.js** - 服务器运行环境
- **Express.js** - Web框架
- **SQLite** - 轻量级数据库
- **bcryptjs** - 密码加密
- **jsonwebtoken** - JWT认证
- **CORS** - 跨域支持

## 安装和运行

### 1. 安装依赖

```bash
npm install
```

### 2. 启动服务器

```bash
# 开发模式（自动重启）
npm run dev

# 生产模式
npm start
```

### 3. 访问网站

打开浏览器访问：`http://localhost:3000`

## API 接口

### 用户认证

#### 注册用户
```
POST /api/register
Content-Type: application/json

{
  "username": "用户名",
  "email": "邮箱",
  "password": "密码"
}
```

#### 用户登录
```
POST /api/login
Content-Type: application/json

{
  "email": "邮箱",
  "password": "密码"
}
```

#### 获取用户信息
```
GET /api/user
Authorization: Bearer <token>
```

#### 更新用户信息
```
PUT /api/user
Authorization: Bearer <token>
Content-Type: application/json

{
  "username": "新用户名",
  "email": "新邮箱"
}
```

#### 更改密码
```
PUT /api/user/password
Authorization: Bearer <token>
Content-Type: application/json

{
  "currentPassword": "当前密码",
  "newPassword": "新密码"
}
```

#### 删除账户
```
DELETE /api/user
Authorization: Bearer <token>
```

### 健康检查
```
GET /api/health
```

## 数据库结构

### users 表
```sql
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    last_login DATETIME,
    is_active BOOLEAN DEFAULT 1
);
```

## 安全特性

- **密码加密** - 使用bcrypt进行密码哈希
- **JWT认证** - 安全的token认证机制
- **请求限制** - 防止暴力攻击
- **CORS配置** - 安全的跨域设置
- **输入验证** - 全面的数据验证
- **SQL注入防护** - 参数化查询

## 文件结构

```
gameshiftly/
├── index.html                # 主页面
├── tetris.html               # Tetris游戏页面
├── pacman.html               # Pacman游戏页面
├── flappybird.html           # Flappy Bird游戏页面
├── minesweeper.html          # Minesweeper游戏页面
├── _redirects                # URL重定向配置
├── tetris/                   # Tetris游戏资源
├── flappybird/               # Flappy Bird游戏资源
├── img/                      # 游戏图片资源
├── auth.js                   # 前端认证脚本
├── server.js                 # 后端服务器
├── package.json              # 项目配置
├── users.db                  # SQLite数据库（自动生成）
└── README.md                 # 项目说明
```

## 开发指南

### 添加新游戏

1. 复制现有游戏页面（如 `tetris.html`）创建新游戏页面
2. 在 `index.html` 中添加游戏卡片
3. 更新搜索数据库中的游戏列表
4. 在 `_redirects` 文件中添加URL重写规则

### 自定义样式

项目使用Tailwind CSS，可以通过修改类名或添加自定义CSS来自定义样式。

### 扩展功能

- 添加用户头像上传
- 实现游戏分数记录
- 添加用户排行榜
- 集成支付系统
- 添加游戏评论功能

## 部署

### 本地部署
1. 安装Node.js
2. 运行 `npm install`
3. 运行 `npm start`
4. 访问 `http://localhost:3000`

### 服务器部署
1. 上传代码到服务器
2. 安装依赖：`npm install --production`
3. 使用PM2启动：`pm2 start server.js`
4. 配置Nginx反向代理

## 许可证

MIT License

## 贡献

欢迎提交Issue和Pull Request来改进项目！

## 联系方式

如有问题或建议，请通过GitHub Issues联系。 