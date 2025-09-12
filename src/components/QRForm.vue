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
      }
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
      
      this.$emit('generate', content)
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
    
    // 清空表单
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