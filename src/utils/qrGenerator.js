import QRCode from 'qrcode'

/**
 * 生成二维码图片
 * @param {string} content - 要编码的内容
 * @param {Object} options - 二维码生成选项
 * @returns {Promise<string>} 返回base64格式的图片数据URL
 */
export async function generateQRCode(content, options = {}) {
  try {
    // 默认配置
    const defaultOptions = {
      width: 300,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      },
      errorCorrectionLevel: 'M'
    }
    
    // 合并配置
    const finalOptions = { ...defaultOptions, ...options }
    
    // 生成二维码
    const dataUrl = await QRCode.toDataURL(content, finalOptions)
    
    return dataUrl
  } catch (error) {
    console.error('生成二维码失败:', error)
    throw new Error('生成二维码失败，请检查输入内容')
  }
}

/**
 * 生成高质量二维码（用于下载）
 * @param {string} content - 要编码的内容
 * @returns {Promise<string>} 返回高分辨率的base64图片数据URL
 */
export async function generateHighQualityQR(content) {
  return generateQRCode(content, {
    width: 800,
    margin: 4,
    errorCorrectionLevel: 'H'
  })
}

/**
 * 验证二维码内容长度
 * @param {string} content - 要验证的内容
 * @param {string} errorLevel - 错误纠正级别
 * @returns {boolean} 是否在允许的长度范围内
 */
export function validateQRContent(content, errorLevel = 'M') {
  // 不同错误纠正级别的最大容量（字符数）
  const maxCapacity = {
    'L': 2953, // 低级别
    'M': 2331, // 中级别
    'Q': 1663, // 四分之一级别
    'H': 1273  // 高级别
  }
  
  const maxLength = maxCapacity[errorLevel] || maxCapacity['M']
  return content.length <= maxLength
}

/**
 * 下载二维码图片
 * @param {string} dataUrl - 图片数据URL
 * @param {string} filename - 文件名（不包含扩展名）
 */
export function downloadQRImage(dataUrl, filename = 'qrcode') {
  try {
    const link = document.createElement('a')
    link.download = `${filename}-${Date.now()}.png`
    link.href = dataUrl
    
    // 临时添加到DOM并触发点击
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  } catch (error) {
    console.error('下载二维码失败:', error)
    throw new Error('下载失败，请重试')
  }
}