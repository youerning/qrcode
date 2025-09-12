/**
 * 格式化联系人数据为vCard格式
 * @param {Object} contact - 联系人信息
 * @returns {string} vCard格式的字符串
 */
export function formatContactData(contact) {
  const { name, phone, email, organization, address } = contact
  
  let vcard = 'BEGIN:VCARD\n'
  vcard += 'VERSION:3.0\n'
  
  if (name) {
    vcard += `FN:${name}\n`
    vcard += `N:${name};;;;\n`
  }
  
  if (phone) {
    vcard += `TEL:${phone}\n`
  }
  
  if (email) {
    vcard += `EMAIL:${email}\n`
  }
  
  if (organization) {
    vcard += `ORG:${organization}\n`
  }
  
  if (address) {
    vcard += `ADR:;;${address};;;;\n`
  }
  
  vcard += 'END:VCARD'
  
  return vcard
}

/**
 * 格式化WiFi数据
 * @param {Object} wifi - WiFi信息
 * @returns {string} WiFi二维码格式的字符串
 */
export function formatWifiData(wifi) {
  const { ssid, password, security, hidden } = wifi
  
  let wifiString = 'WIFI:'
  wifiString += `T:${security};`
  wifiString += `S:${escapeSpecialChars(ssid)};`
  
  if (password && security !== 'nopass') {
    wifiString += `P:${escapeSpecialChars(password)};`
  }
  
  if (hidden) {
    wifiString += 'H:true;'
  }
  
  wifiString += ';'
  
  return wifiString
}

/**
 * 格式化邮件数据
 * @param {Object} email - 邮件信息
 * @returns {string} mailto格式的字符串
 */
export function formatEmailData(email) {
  const { to, subject, body } = email
  
  let mailtoString = `mailto:${to}`
  
  const params = []
  if (subject) {
    params.push(`subject=${encodeURIComponent(subject)}`)
  }
  if (body) {
    params.push(`body=${encodeURIComponent(body)}`)
  }
  
  if (params.length > 0) {
    mailtoString += '?' + params.join('&')
  }
  
  return mailtoString
}

/**
 * 格式化短信数据
 * @param {Object} sms - 短信信息
 * @returns {string} SMS格式的字符串
 */
export function formatSmsData(sms) {
  const { phone, message } = sms
  
  let smsString = `sms:${phone}`
  
  if (message) {
    smsString += `?body=${encodeURIComponent(message)}`
  }
  
  return smsString
}

/**
 * 转义WiFi字符串中的特殊字符
 * @param {string} str - 需要转义的字符串
 * @returns {string} 转义后的字符串
 */
function escapeSpecialChars(str) {
  return str
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/:/g, '\\:')
    .replace(/"/g, '\\"')
}

/**
 * 验证URL格式
 * @param {string} url - 要验证的URL
 * @returns {boolean} 是否为有效URL
 */
export function isValidUrl(url) {
  try {
    const urlObj = new URL(url)
    return ['http:', 'https:', 'ftp:', 'mailto:', 'tel:', 'sms:'].includes(urlObj.protocol)
  } catch {
    return false
  }
}

/**
 * 验证邮箱格式
 * @param {string} email - 要验证的邮箱
 * @returns {boolean} 是否为有效邮箱
 */
export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * 验证电话号码格式
 * @param {string} phone - 要验证的电话号码
 * @returns {boolean} 是否为有效电话号码
 */
export function isValidPhone(phone) {
  const phoneRegex = /^[+]?[\d\s\-\(\)]+$/
  return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 7
}

/**
 * 清理和格式化文本内容
 * @param {string} text - 要清理的文本
 * @returns {string} 清理后的文本
 */
export function sanitizeText(text) {
  return text
    .trim()
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
}