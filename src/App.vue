<template>
  <div id="app">
    <!-- 导航栏 -->
    <nav class="navbar">
      <div class="nav-container">
        <div class="nav-logo">
          <h1>{{ $t('title') }}</h1>
        </div>
        <ul class="nav-menu">
          <li><a href="#" class="nav-link active">{{ $t('nav.home') }}</a></li>
          <li><a href="help.html" class="nav-link">{{ $t('nav.help') }}</a></li>
          <li><a href="about.html" class="nav-link">{{ $t('nav.about') }}</a></li>
          <li><a href="blog/" class="nav-link">{{ $t('nav.blog') }}</a></li>
          <li>
            <button @click="toggleLanguage" class="lang-toggle">
              {{ currentLang === 'en' ? '中文' : 'English' }}
            </button>
          </li>
        </ul>
      </div>
    </nav>

    <!-- 主要内容区域 -->
    <main class="main-content">
      <!-- 页面标题和介绍 -->
      <section class="hero-section">
        <h1>{{ $t('hero.title') }}</h1>
        <p>{{ $t('hero.subtitle') }}</p>
        <div class="qr-intro">
          <p>{{ $t('hero.description') }} 
            <a href="https://en.wikipedia.org/wiki/QR_code" target="_blank" rel="noopener">{{ $t('hero.learnMore') }}</a>
          </p>
        </div>
      </section>

      <!-- 二维码生成器 -->
      <section class="qr-generator">
        <div class="generator-container">
          <!-- 功能选择标签 -->
          <div class="tab-container">
            <button 
              v-for="tab in tabs" 
              :key="tab.id"
              @click="activeTab = tab.id"
              :class="['tab-button', { active: activeTab === tab.id }]"
            >
              {{ $t(`tabs.${tab.id}`) }}
            </button>
          </div>

          <!-- 输入表单区域 -->
          <div class="input-section">
            <QRForm 
              :activeTab="activeTab" 
              :currentLang="currentLang"
              @generate="generateQR"
            />
          </div>

          <!-- 二维码显示和下载区域 -->
          <div class="output-section" v-if="qrDataUrl">
            <div class="qr-display">
              <div v-if="qrFormat === 'svg'" v-html="qrDataUrl" class="qr-svg-container"></div>
              <div v-else-if="qrFormat === 'pdf'" class="qr-pdf-preview">
                <div class="pdf-icon">📄</div>
                <p>{{ $t('messages.pdfReady') }}</p>
              </div>
              <img v-else :src="qrDataUrl" alt="Generated QR Code" />
              <div class="qr-actions">
                <button @click="downloadQR" class="download-btn">
                  {{ getDownloadButtonText() }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 社交分享区域 -->
      <section class="social-share" v-if="qrDataUrl">
        <h3>{{ $t('share.title') }}</h3>
        <div class="share-buttons">
          <a :href="getShareUrl('twitter')" target="_blank" class="share-btn twitter">
            {{ $t('share.twitter') }}
          </a>
          <a :href="getShareUrl('facebook')" target="_blank" class="share-btn facebook">
            {{ $t('share.facebook') }}
          </a>
          <a :href="getShareUrl('linkedin')" target="_blank" class="share-btn linkedin">
            {{ $t('share.linkedin') }}
          </a>
          <a :href="getShareUrl('reddit')" target="_blank" class="share-btn reddit">
            {{ $t('share.reddit') }}
          </a>
        </div>
      </section>

      <!-- 嵌入代码区域 -->
      <section class="embed-section">
        <h3>{{ $t('embed.title') }}</h3>
        <p>{{ $t('embed.description') }}</p>
        <div class="embed-code">
          <textarea readonly :value="embedCode"></textarea>
          <button @click="copyEmbedCode" class="copy-btn">
            {{ $t('buttons.copy') }}
          </button>
        </div>
      </section>

      <!-- 帮助文档链接 -->
      <section class="help-links">
        <h3>{{ $t('help.title') }}</h3>
        <div class="help-grid">
          <a href="help.html#text" class="help-link">
            <h4>{{ $t('help.textQR') }}</h4>
            <p>{{ $t('help.textDesc') }}</p>
          </a>
          <a href="help.html#url" class="help-link">
            <h4>{{ $t('help.urlQR') }}</h4>
            <p>{{ $t('help.urlDesc') }}</p>
          </a>
          <a href="help.html#contact" class="help-link">
            <h4>{{ $t('help.contactQR') }}</h4>
            <p>{{ $t('help.contactDesc') }}</p>
          </a>
          <a href="help.html#wifi" class="help-link">
            <h4>{{ $t('help.wifiQR') }}</h4>
            <p>{{ $t('help.wifiDesc') }}</p>
          </a>
          <a href="blog/qr-to-pdf-converter.html" class="help-link">
            <h4>{{ $t('help.pdfQR') }}</h4>
            <p>{{ $t('help.pdfDesc') }}</p>
          </a>
        </div>
      </section>
    </main>

    <!-- 页脚 -->
    <footer class="footer">
      <div class="footer-content">
        <p>{{ $t('footer.copyright') }}</p>
        <p>{{ $t('footer.contact') }}: <a href="mailto:support@qrgeneratortool.top">support@qrgeneratortool.top</a></p>
      </div>
    </footer>
  </div>
</template>

<script>
import QRForm from './components/QRForm.vue'
import { generateQRCode, generateQRCodeWithLogo, downloadQRImage } from './utils/qrGenerator.js'
import { translations } from './utils/i18n.js'

export default {
  name: 'App',
  components: {
    QRForm
  },
  data() {
    return {
      // 当前语言
      currentLang: 'en',
      // 当前激活的标签页
      activeTab: 'text',
      // 生成的二维码数据URL
      qrDataUrl: '',
      // 当前二维码格式
      qrFormat: 'png',
      // 当前二维码内容（用于分享）
      currentQRContent: '',
      // 功能标签页配置
      tabs: [
        { id: 'text', icon: '📝' },
        { id: 'url', icon: '🔗' },
        { id: 'contact', icon: '👤' },
        { id: 'wifi', icon: '📶' },
        { id: 'email', icon: '📧' },
        { id: 'sms', icon: '💬' }
      ],
      // 嵌入代码模板
      embedCode: `<iframe src="https://qrgeneratortool.top" width="100%" height="600" frameborder="0"></iframe>`
    }
  },
  methods: {
    // 切换语言
    toggleLanguage() {
      this.currentLang = this.currentLang === 'en' ? 'zh' : 'en'
      localStorage.setItem('qr-lang', this.currentLang)
    },
    
    // 获取翻译文本
    $t(key) {
      const keys = key.split('.')
      let value = translations[this.currentLang]
      for (const k of keys) {
        value = value?.[k]
      }
      return value || key
    },
    
    /**
     * 生成二维码
     * @param {string|Object} data - 二维码内容或包含content和logo的对象
     */
    async generateQR(data) {
      try {
        // 兼容旧版本的字符串参数和新版本的对象参数
        const content = typeof data === 'string' ? data : data.content
        const logo = typeof data === 'object' ? data.logo : null
        const format = typeof data === 'object' ? data.format : 'png'
        
        this.currentQRContent = content
        this.qrFormat = format
        
        // 根据是否有logo选择不同的生成方法
        if (logo) {
          this.qrDataUrl = await generateQRCodeWithLogo(content, logo, {}, format)
        } else {
          this.qrDataUrl = await generateQRCode(content, {}, format)
        }
        
        // 显示成功消息
        console.log('二维码生成成功')
      } catch (error) {
        console.error('生成二维码失败:', error)
        alert(this.$t('errors.generateFailed'))
      }
    },
    
    // 下载二维码
    downloadQR() {
      if (!this.qrDataUrl) return
      
      downloadQRImage(this.qrDataUrl, 'qrcode', this.qrFormat)
    },
    
    // 获取社交分享链接
    getShareUrl(platform) {
      const url = encodeURIComponent('https://qrgeneratortool.top')
      const text = encodeURIComponent(this.$t('share.text'))
      
      const shareUrls = {
        twitter: `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
        reddit: `https://reddit.com/submit?url=${url}&title=${text}`
      }
      
      return shareUrls[platform] || '#'
    },
    
    // 复制嵌入代码
    copyEmbedCode() {
      navigator.clipboard.writeText(this.embedCode).then(() => {
        alert(this.$t('messages.copied'))
      }).catch(() => {
        alert(this.$t('errors.copyFailed'))
      })
    },
    
    // 获取下载按钮文字
    getDownloadButtonText() {
      const formatMap = {
        'png': 'downloadPng',
        'jpg': 'downloadJpg', 
        'svg': 'downloadSvg',
        'pdf': 'downloadPdf'
      }
      return this.$t(`buttons.${formatMap[this.qrFormat] || 'download'}`)
    }
  },
  
  // 组件挂载时初始化语言设置
  mounted() {
    const savedLang = localStorage.getItem('qr-lang')
    if (savedLang && ['en', 'zh'].includes(savedLang)) {
      this.currentLang = savedLang
    }
  }
}
</script>

<style>
/* SVG二维码容器样式 */
.qr-svg-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 300px;
  margin: 0 auto;
}

.qr-svg-container svg {
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
}

/* PDF预览样式 */
.qr-pdf-preview {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 300px;
  border: 2px dashed #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.qr-pdf-preview .pdf-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.qr-pdf-preview p {
  margin: 0;
  color: #666;
  font-size: 14px;
  text-align: center;
}
</style>