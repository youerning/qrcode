# QR Generator Tool

一个功能完整的免费二维码生成工具网站，支持多种类型的二维码生成。

## 功能特性

- **文本二维码**：支持纯文本内容转换为二维码
- **URL二维码**：支持网址链接转换为二维码
- **联系人二维码**：支持vCard格式的联系人信息
- **WiFi二维码**：支持WiFi网络信息（SSID、密码、加密类型）
- **邮件二维码**：支持邮件地址和预设主题
- **短信二维码**：支持电话号码和预设短信内容
- 多语言支持（英文/中文）
- 社交媒体分享功能
- 网站嵌入功能
- SEO优化

## 技术栈

- Vue 3 (主页)
- Vite (构建工具)
- QRCode.js (二维码生成)
- 静态HTML页面 (帮助中心、关于页面)

## 开发环境设置

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

## 项目结构

```
├── index.html          # Vue3主页
├── help.html           # 帮助中心页面
├── about.html          # 关于页面
├── blog/               # 博客目录
├── assets/             # 静态资源
│   ├── css/           # 样式文件
│   └── js/            # JavaScript文件
├── src/               # Vue源码
└── dist/              # 构建输出
```

## 联系方式

- 客服邮箱：support@qrgeneratortool.top
- 网站域名：qrgeneratortool.top

## 许可证

MIT License