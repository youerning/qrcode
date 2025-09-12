import QRCode from 'qrcode'

/**
 * 将图片文件转换为Image对象
 * @param {File} file - 图片文件
 * @returns {Promise<HTMLImageElement>} 返回Image对象
 */
function loadImageFromFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const img = new Image()
      img.onload = () => resolve(img)
      img.onerror = reject
      img.src = e.target.result
    }
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

/**
 * 在canvas上绘制带logo的二维码
 * @param {string} content - 二维码内容
 * @param {File} logoFile - logo文件
 * @param {Object} options - 二维码选项
 * @param {string} format - 图片格式 ('png', 'jpg')
 * @returns {Promise<string>} 返回base64格式的图片数据URL
 */
export async function generateQRCodeWithLogo(content, logoFile, options = {}, format = 'png') {
  if (format === 'svg') {
    return Promise.reject(new Error('带logo的SVG格式二维码暂不支持。'));
  }
  try {
    // 默认配置
    const defaultOptions = {
      width: 300,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      },
      errorCorrectionLevel: 'H' // 使用高错误纠正级别以支持logo
    }
    
    // 合并配置
    const finalOptions = { ...defaultOptions, ...options }
    
    // 创建canvas
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    
    // 生成二维码到canvas
    await QRCode.toCanvas(canvas, content, finalOptions)
    
    // 如果有logo文件，则添加logo
    if (logoFile) {
      const logoImg = await loadImageFromFile(logoFile)
      
      // 计算logo尺寸（二维码的15%）
      const logoSize = canvas.width * 0.15
      const logoX = (canvas.width - logoSize) / 2
      const logoY = (canvas.height - logoSize) / 2
      
      // 绘制白色背景圆形（确保logo清晰可见）
      const bgSize = logoSize * 1.2
      const bgX = (canvas.width - bgSize) / 2
      const bgY = (canvas.height - bgSize) / 2
      
      ctx.fillStyle = '#FFFFFF'
      ctx.beginPath()
      ctx.arc(bgX + bgSize/2, bgY + bgSize/2, bgSize/2, 0, 2 * Math.PI)
      ctx.fill()
      
      // 绘制logo（圆形裁剪）
      ctx.save()
      ctx.beginPath()
      ctx.arc(logoX + logoSize/2, logoY + logoSize/2, logoSize/2, 0, 2 * Math.PI)
      ctx.clip()
      ctx.drawImage(logoImg, logoX, logoY, logoSize, logoSize)
      ctx.restore()
    }
    
    // 返回base64数据URL
    const dataType = format === 'jpg' ? 'image/jpeg' : 'image/png';
    return canvas.toDataURL(dataType);
    
  } catch (error) {
    console.error('生成带logo的二维码失败:', error)
    throw new Error('生成带logo的二维码失败，请检查输入内容和logo文件')
  }
}

/**
 * 生成二维码图片
 * @param {string} content - 要编码的内容
 * @param {Object} options - 二维码生成选项
 * @param {string} format - 图片格式 ('png', 'jpg', 'svg')
 * @returns {Promise<string>} 返回base64格式的图片数据URL或SVG字符串
 */
export async function generateQRCode(content, options = {}, format = 'png') {
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
    
    if (format === 'svg') {
      return new Promise((resolve, reject) => {
        QRCode.toString(content, {...finalOptions, type: 'svg'}, (err, svgString) => {
          if (err) {
            console.error('生成SVG二维码失败:', err);
            reject(new Error('生成SVG二维码失败，请检查输入内容'));
          } else {
            resolve(svgString);
          }
        });
      });
    }

    const dataType = format === 'jpg' ? 'image/jpeg' : 'image/png';
    // 生成二维码
    const dataUrl = await QRCode.toDataURL(content, {...finalOptions, type: dataType});
    
    return dataUrl
  } catch (error) {
    console.error('生成二维码失败:', error)
    throw new Error('生成二维码失败，请检查输入内容')
  }
}

/**
 * 生成高质量二维码（用于下载）
 * @param {string} content - 要编码的内容
 * @param {string} format - 图片格式 ('png', 'jpg', 'svg')
 * @returns {Promise<string>} 返回高分辨率的base64图片数据URL或SVG字符串
 */
export async function generateHighQualityQR(content, format = 'png') {
  return generateQRCode(content, {
    width: 800,
    margin: 4,
    errorCorrectionLevel: 'H'
  }, format)
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
 * @param {string} dataUrl - 图片数据URL或SVG字符串
 * @param {string} filename - 文件名（不包含扩展名）
 * @param {string} format - 图片格式 ('png', 'jpg', 'svg')
 */
export function downloadQRImage(dataUrl, filename = 'qrcode', format = 'png') {
  try {
    const link = document.createElement('a')
    link.download = `${filename}-${Date.now()}.${format}`
    
    if (format === 'svg') {
      const blob = new Blob([dataUrl], { type: 'image/svg+xml;charset=utf-8' });
      link.href = URL.createObjectURL(blob);
    } else {
      link.href = dataUrl;
    }
    
    // 临时添加到DOM并触发点击
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    if (format === 'svg') {
      URL.revokeObjectURL(link.href);
    }
  } catch (error) {
    console.error('下载二维码失败:', error)
    throw new Error('下载失败，请重试')
  }
}