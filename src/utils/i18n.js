/**
 * 国际化翻译配置
 * 支持英文(en)和中文(zh)
 */
export const translations = {
  en: {
    title: 'Free QR Code Generator',
    nav: {
      home: 'Home',
      help: 'Help Center',
      about: 'About',
      blog: 'Blog'
    },
    hero: {
      title: 'Free QR Code Generator',
      subtitle: 'Create QR codes instantly for text, URLs, contacts, WiFi, email, and SMS',
      description: 'Generate high-quality QR codes for free. Perfect for businesses, events, and personal use.',
      learnMore: 'Learn more about QR codes'
    },
    tabs: {
      text: 'Text',
      url: 'URL',
      contact: 'Contact',
      wifi: 'WiFi',
      email: 'Email',
      sms: 'SMS'
    },
    forms: {
      text: {
        label: 'Enter your text',
        placeholder: 'Type or paste your text here...',
        hint: 'Maximum 1000 characters'
      },
      url: {
        label: 'Enter URL',
        placeholder: 'https://example.com',
        hint: 'Include http:// or https://'
      },
      contact: {
        title: 'Contact Information',
        name: 'Full Name',
        phone: 'Phone Number',
        email: 'Email Address',
        organization: 'Organization',
        address: 'Address',
        hint: 'Creates a vCard format QR code'
      },
      wifi: {
        title: 'WiFi Network',
        ssid: 'Network Name (SSID)',
        password: 'Password',
        noPassword: 'No Password',
        hidden: 'Hidden Network',
        hint: 'Scan to connect to WiFi automatically'
      },
      email: {
        title: 'Email',
        to: 'Recipient Email',
        subject: 'Subject',
        body: 'Message Body',
        hint: 'Creates a mailto link'
      },
      sms: {
        title: 'SMS Message',
        phone: 'Phone Number',
        message: 'Message',
        hint: 'Maximum 160 characters for message'
      }
    },
    buttons: {
      generate: 'Generate QR Code',
      download: 'Download PNG',
      copy: 'Copy Code'
    },
    share: {
      title: 'Share this tool',
      text: 'Check out this free QR code generator!',
      twitter: 'Share on Twitter',
      facebook: 'Share on Facebook',
      linkedin: 'Share on LinkedIn',
      reddit: 'Share on Reddit'
    },
    embed: {
      title: 'Embed on Your Website',
      description: 'Copy and paste this code to embed the QR generator on your website:'
    },
    help: {
      title: 'How to Use',
      textQR: 'Text QR Codes',
      textDesc: 'Convert any text into a QR code',
      urlQR: 'URL QR Codes',
      urlDesc: 'Create QR codes for websites and links',
      contactQR: 'Contact QR Codes',
      contactDesc: 'Share contact information easily',
      wifiQR: 'WiFi QR Codes',
      wifiDesc: 'Let others connect to your WiFi instantly'
    },
    footer: {
      copyright: '© 2024 QR Generator Tool. All rights reserved.',
      contact: 'Contact us'
    },
    messages: {
      copied: 'Copied to clipboard!',
      generated: 'QR code generated successfully!'
    },
    errors: {
      generateFailed: 'Failed to generate QR code. Please try again.',
      copyFailed: 'Failed to copy to clipboard.',
      invalidUrl: 'Please enter a valid URL.',
      invalidEmail: 'Please enter a valid email address.',
      invalidPhone: 'Please enter a valid phone number.',
      required: 'This field is required.'
    }
  },
  zh: {
    title: '免费二维码生成器',
    nav: {
      home: '首页',
      help: '帮助中心',
      about: '关于',
      blog: '博客'
    },
    hero: {
      title: '免费二维码生成器',
      subtitle: '快速创建文本、网址、联系人、WiFi、邮件和短信二维码',
      description: '免费生成高质量二维码，适用于商业、活动和个人使用。',
      learnMore: '了解更多关于二维码的信息'
    },
    tabs: {
      text: '文本',
      url: '网址',
      contact: '联系人',
      wifi: 'WiFi',
      email: '邮件',
      sms: '短信'
    },
    forms: {
      text: {
        label: '输入文本',
        placeholder: '在此输入或粘贴您的文本...',
        hint: '最多1000个字符'
      },
      url: {
        label: '输入网址',
        placeholder: 'https://example.com',
        hint: '请包含 http:// 或 https://'
      },
      contact: {
        title: '联系人信息',
        name: '姓名',
        phone: '电话号码',
        email: '邮箱地址',
        organization: '组织机构',
        address: '地址',
        hint: '创建vCard格式的二维码'
      },
      wifi: {
        title: 'WiFi网络',
        ssid: '网络名称(SSID)',
        password: '密码',
        noPassword: '无密码',
        hidden: '隐藏网络',
        hint: '扫描后自动连接WiFi'
      },
      email: {
        title: '邮件',
        to: '收件人邮箱',
        subject: '主题',
        body: '邮件内容',
        hint: '创建邮件链接'
      },
      sms: {
        title: '短信',
        phone: '电话号码',
        message: '短信内容',
        hint: '短信内容最多160个字符'
      }
    },
    buttons: {
      generate: '生成二维码',
      download: '下载PNG',
      copy: '复制代码'
    },
    share: {
      title: '分享此工具',
      text: '看看这个免费的二维码生成器！',
      twitter: '分享到Twitter',
      facebook: '分享到Facebook',
      linkedin: '分享到LinkedIn',
      reddit: '分享到Reddit'
    },
    embed: {
      title: '嵌入到您的网站',
      description: '复制并粘贴此代码以在您的网站上嵌入二维码生成器：'
    },
    help: {
      title: '使用方法',
      textQR: '文本二维码',
      textDesc: '将任何文本转换为二维码',
      urlQR: '网址二维码',
      urlDesc: '为网站和链接创建二维码',
      contactQR: '联系人二维码',
      contactDesc: '轻松分享联系信息',
      wifiQR: 'WiFi二维码',
      wifiDesc: '让他人快速连接您的WiFi'
    },
    footer: {
      copyright: '© 2024 二维码生成工具。保留所有权利。',
      contact: '联系我们'
    },
    messages: {
      copied: '已复制到剪贴板！',
      generated: '二维码生成成功！'
    },
    errors: {
      generateFailed: '生成二维码失败，请重试。',
      copyFailed: '复制到剪贴板失败。',
      invalidUrl: '请输入有效的网址。',
      invalidEmail: '请输入有效的邮箱地址。',
      invalidPhone: '请输入有效的电话号码。',
      required: '此字段为必填项。'
    }
  }
}

/**
 * 获取翻译文本
 * @param {string} key - 翻译键，支持点号分隔的嵌套键
 * @param {string} lang - 语言代码
 * @returns {string} 翻译后的文本
 */
export function t(key, lang = 'en') {
  const keys = key.split('.')
  let value = translations[lang] || translations.en
  
  for (const k of keys) {
    value = value?.[k]
  }
  
  return value || key
}

/**
 * 获取当前语言设置
 * @returns {string} 语言代码
 */
export function getCurrentLanguage() {
  return localStorage.getItem('qr-lang') || 'en'
}

/**
 * 设置语言
 * @param {string} lang - 语言代码
 */
export function setLanguage(lang) {
  if (['en', 'zh'].includes(lang)) {
    localStorage.setItem('qr-lang', lang)
  }
}