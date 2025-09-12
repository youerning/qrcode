<template>
  <div class="qr-form">
    <!-- 文本二维码 -->
    <div v-if="activeTab === 'text'" class="form-group">
      <label>{{ $t('forms.text.label') }}</label>
      <textarea 
        v-model="formData.text"
        :placeholder="$t('forms.text.placeholder')"
        rows="4"
        maxlength="1000"
      ></textarea>
      <small>{{ $t('forms.text.hint') }}</small>
    </div>

    <!-- URL二维码 -->
    <div v-if="activeTab === 'url'" class="form-group">
      <label>{{ $t('forms.url.label') }}</label>
      <input 
        type="url" 
        v-model="formData.url"
        :placeholder="$t('forms.url.placeholder')"
      />
      <small>{{ $t('forms.url.hint') }}</small>
    </div>

    <!-- 联系人二维码 -->
    <div v-if="activeTab === 'contact'" class="form-group">
      <label>{{ $t('forms.contact.title') }}</label>
      <div class="contact-fields">
        <input 
          type="text" 
          v-model="formData.contact.name"
          :placeholder="$t('forms.contact.name')"
        />
        <input 
          type="tel" 
          v-model="formData.contact.phone"
          :placeholder="$t('forms.contact.phone')"
        />
        <input 
          type="email" 
          v-model="formData.contact.email"
          :placeholder="$t('forms.contact.email')"
        />
        <input 
          type="text" 
          v-model="formData.contact.organization"
          :placeholder="$t('forms.contact.organization')"
        />
        <textarea 
          v-model="formData.contact.address"
          :placeholder="$t('forms.contact.address')"
          rows="2"
        ></textarea>
      </div>
      <small>{{ $t('forms.contact.hint') }}</small>
    </div>

    <!-- WiFi二维码 -->
    <div v-if="activeTab === 'wifi'" class="form-group">
      <label>{{ $t('forms.wifi.title') }}</label>
      <div class="wifi-fields">
        <input 
          type="text" 
          v-model="formData.wifi.ssid"
          :placeholder="$t('forms.wifi.ssid')"
          required
        />
        <input 
          type="password" 
          v-model="formData.wifi.password"
          :placeholder="$t('forms.wifi.password')"
        />
        <select v-model="formData.wifi.security">
          <option value="WPA">WPA/WPA2</option>
          <option value="WEP">WEP</option>
          <option value="nopass">{{ $t('forms.wifi.noPassword') }}</option>
        </select>
        <label class="checkbox-label">
          <input 
            type="checkbox" 
            v-model="formData.wifi.hidden"
          />
          {{ $t('forms.wifi.hidden') }}
        </label>
      </div>
      <small>{{ $t('forms.wifi.hint') }}</small>
    </div>

    <!-- 邮件二维码 -->
    <div v-if="activeTab === 'email'" class="form-group">
      <label>{{ $t('forms.email.title') }}</label>
      <div class="email-fields">
        <input 
          type="email" 
          v-model="formData.email.to"
          :placeholder="$t('forms.email.to')"
          required
        />
        <input 
          type="text" 
          v-model="formData.email.subject"
          :placeholder="$t('forms.email.subject')"
        />
        <textarea 
          v-model="formData.email.body"
          :placeholder="$t('forms.email.body')"
          rows="3"
        ></textarea>
      </div>
      <small>{{ $t('forms.email.hint') }}</small>
    </div>

    <!-- 短信二维码 -->
    <div v-if="activeTab === 'sms'" class="form-group">
      <label>{{ $t('forms.sms.title') }}</label>
      <div class="sms-fields">
        <input 
          type="tel" 
          v-model="formData.sms.phone"
          :placeholder="$t('forms.sms.phone')"
          required
        />
        <textarea 
          v-model="formData.sms.message"
          :placeholder="$t('forms.sms.message')"
          rows="3"
          maxlength="160"
        ></textarea>
      </div>
      <small>{{ $t('forms.sms.hint') }}</small>
    </div>

    <!-- Logo上传区域 -->
    <div class="form-group logo-section">
      <label>{{ $t('forms.logo.title') }}</label>
      <div class="logo-upload-area">
        <input 
          type="file" 
          ref="logoInput"
          @change="handleLogoUpload"
          accept="image/*"
          class="logo-input"
          id="logo-upload"
        />
        <label for="logo-upload" class="logo-upload-btn">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7,10 12,15 17,10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
          </svg>
          {{ logoFile ? $t('forms.logo.change') : $t('forms.logo.upload') }}
        </label>
        <div v-if="logoFile" class="logo-preview">
          <img :src="logoPreview" :alt="$t('forms.logo.preview')" />
          <button @click="removeLogo" class="remove-logo-btn" type="button">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>
      <small>{{ $t('forms.logo.hint') }}</small>
    </div>

    <!-- 下载格式选择 -->
    <div class="form-group">
      <label>{{ $t('forms.format.title') }}</label>
      <div class="format-options">
        <label class="format-option">
          <input type="radio" v-model="downloadFormat" value="png">
          <span>PNG</span>
        </label>
        <label class="format-option">
          <input type="radio" v-model="downloadFormat" value="jpg">
          <span>JPG</span>
        </label>
        <label class="format-option">
          <input type="radio" v-model="downloadFormat" value="svg">
          <span>SVG</span>
        </label>
      </div>
      <small>{{ $t('forms.format.hint') }}</small>
    </div>

    <!-- 生成按钮 -->
    <button 
      @click="handleGenerate" 
      :disabled="!isFormValid"
      class="generate-btn"
    >
      {{ $t('buttons.generate') }}
    </button>
  </div>
</template>

<script>
import { translations } from '../utils/i18n.js'
import { formatContactData, formatWifiData, formatEmailData, formatSmsData } from '../utils/formatters.js'

export default {
  name: 'QRForm',
  props: {
    activeTab: {
      type: String,
      required: true
    },
    currentLang: {
      type: String,
      required: true
    }
  },
  emits: ['generate'],
  data() {
    return {
      // 表单数据
      formData: {
        text: '',
        url: '',
        contact: {
          name: '',
          phone: '',
          email: '',
          organization: '',
          address: ''
        },
        wifi: {
          ssid: '',
          password: '',
          security: 'WPA',
          hidden: false
        },
        email: {
          to: '',
          subject: '',
          body: ''
        },
        sms: {
          phone: '',
          message: ''
        }
      },
      // Logo相关数据
      logoFile: null,
      logoPreview: null,
      // 下载格式
      downloadFormat: 'png'
    }
  },
  computed: {
    // 验证表单是否有效
    isFormValid() {
      switch (this.activeTab) {
        case 'text':
          return this.formData.text.trim().length > 0
        case 'url':
          return this.isValidUrl(this.formData.url)
        case 'contact':
          return this.formData.contact.name.trim().length > 0
        case 'wifi':
          return this.formData.wifi.ssid.trim().length > 0
        case 'email':
          return this.isValidEmail(this.formData.email.to)
        case 'sms':
          return this.formData.sms.phone.trim().length > 0
        default:
          return false
      }
    }
  },
  methods: {
    // 获取翻译文本
    $t(key) {
      const keys = key.split('.')
      let value = translations[this.currentLang]
      for (const k of keys) {
        value = value?.[k]
      }
      return value || key
    },
    
    // 处理生成二维码
    handleGenerate() {
      if (!this.isFormValid) return
      
      let content = ''
      
      switch (this.activeTab) {
        case 'text':
          content = this.formData.text
          break
        case 'url':
          content = this.formData.url
          break
        case 'contact':
          content = formatContactData(this.formData.contact)
          break
        case 'wifi':
          content = formatWifiData(this.formData.wifi)
          break
        case 'email':
          content = formatEmailData(this.formData.email)
          break
        case 'sms':
          content = formatSmsData(this.formData.sms)
          break
      }
      
      // 传递内容和logo信息
      this.$emit('generate', {
        content,
        logo: this.logoFile,
        format: this.downloadFormat
      })
    },
    
    /**
     * 处理logo文件上传
     * @param {Event} event - 文件选择事件
     */
    handleLogoUpload(event) {
      const file = event.target.files[0]
      if (!file) return
      
      // 验证文件类型
      if (!file.type.startsWith('image/')) {
        alert(this.$t('forms.logo.invalidType'))
        return
      }
      
      // 验证文件大小（限制为2MB）
      const maxSize = 2 * 1024 * 1024 // 2MB
      if (file.size > maxSize) {
        alert(this.$t('forms.logo.tooLarge'))
        return
      }
      
      this.logoFile = file
      
      // 创建预览
      const reader = new FileReader()
      reader.onload = (e) => {
        this.logoPreview = e.target.result
      }
      reader.readAsDataURL(file)
    },
    
    /**
     * 移除已选择的logo
     */
    removeLogo() {
      this.logoFile = null
      this.logoPreview = null
      // 清空文件输入框
      if (this.$refs.logoInput) {
        this.$refs.logoInput.value = ''
      }
    },
    
    // 验证URL格式
    isValidUrl(url) {
      try {
        new URL(url)
        return true
      } catch {
        return false
      }
    },
    
    // 验证邮箱格式
    isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return emailRegex.test(email)
    },
    
    /**
     * 清空表单数据
     */
    clearForm() {
      this.formData = {
        text: '',
        url: '',
        contact: {
          name: '',
          phone: '',
          email: '',
          organization: '',
          address: ''
        },
        wifi: {
          ssid: '',
          password: '',
          security: 'WPA',
          hidden: false
        },
        email: {
          to: '',
          subject: '',
          body: ''
        },
        sms: {
          phone: '',
          message: ''
        }
      }
      
      // 清空logo数据
      this.removeLogo()
    }
  },
  
  // 监听activeTab变化，切换时清空表单
  watch: {
    activeTab() {
      this.clearForm()
    }
  }
}
</script>

<style scoped>
/* Logo上传区域样式 */
.logo-section {
  margin-top: 20px;
  padding: 20px;
  border: 2px dashed #e5e7eb;
  border-radius: 8px;
  background-color: #f9fafb;
  transition: all 0.3s ease;
}

.logo-section:hover {
  border-color: #3b82f6;
  background-color: #eff6ff;
}

.logo-upload-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}

.logo-input {
  display: none;
}

.logo-upload-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.logo-upload-btn:hover {
  background-color: #2563eb;
  transform: translateY(-1px);
}

.logo-preview {
  position: relative;
  display: inline-block;
}

.logo-preview img {
  max-width: 100px;
  max-height: 100px;
  border-radius: 6px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.remove-logo-btn {
  position: absolute;
  top: -8px;
  right: -8px;
  width: 24px;
  height: 24px;
  background-color: #ef4444;
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.remove-logo-btn:hover {
  background-color: #dc2626;
  transform: scale(1.1);
}

.logo-section small {
  color: #6b7280;
  font-size: 12px;
  text-align: center;
  margin-top: 10px;
}

/* 下载格式样式 */
.format-options {
  display: flex;
  gap: 20px;
  margin-top: 10px;
}

.format-option {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.format-option input {
  margin-right: 8px;
}

.format-option span {
  font-size: 14px;
}
</style>