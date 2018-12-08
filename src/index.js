const xmlns = {
  svg: 'http://www.w3.org/2000/svg',
  xlink: 'http://www.w3.org/1999/xlink',
  xhtml: 'http://www.w3.org/1999/xhtml'
}

const rmHeadSpaces = (tagText, spacesLen) => {
  const regExp = new RegExp(`^\\\s{${spacesLen}}`)
  return tagText.split('\n')
    .filter(line => line.replace(/^\s+/, '').length > 0)
    .map(line => line.replace(regExp, ''))
    .join('\n')
}

const renderExternals = externals => {
  const res = []
  for (const external of externals) {
    const {x, y, url} = external
    if (!x || !y || !url) continue
    const type = external.type || 'a'
    let tagText = ''
    switch (type) {
      case 'a': {
        tagText = createATag(external)
        break
      }
      case 'img': {
        tagText = createImgTag(external)
        break
      }
    }
    if (tagText.length > 0) res.push(tagText)
  }
  return res.join('\n')
}

const renderStyleTag = (style) => {
  const res = []
  if (style) res.push(style)
  return res.join('\n')
}

const createATag = ({width, height, x, y, url, text, className}) => {
  // テキストの描画は文字の下部を基準に行われるため、y値を補正する
  height = height || 0
  let rectText = `<text x="${x}" y="${y + height}" fill="rgba(0,0,0,0)">${text || ''}</text>`
  if (width && height) {
    rectText = `<rect width="${width}" height="${height}"
      x="${x}" y="${y}" fill="rgba(0,0,0,0)"></rect>` + rectText
  }
  return `
    <a
      xmlns:xlink="${xmlns.xlink}"
      xlink:href="${url}"
      class="${className}"
      target="_blank"
      style="cursor: pointer;">
      ${rectText}
    </a>`
}

const createImgTag = ({width, height, x, y, url, className}) => {
  return `
    <foreignObject
      xmlns="${xmlns.svg}"
      width="${width}" height="${height}" x="${x}" y="${y}">
      <html xmlns="${xmlns.xhtml}">
        <img
          src="${url}" class="${className || ''}"
          width="${width}" height="${height}"
          style="display: block;" />
      </html>
    </foreignObject>`
}

export function createSvg (dataURI, {width, height, className, style, dataset, externals}) {
  if (!className) className = ''
  if (!dataURI.startsWith('data:image/')) return ''
  let dataAttrs = []
  if (dataset) {
    const attrs = Object.keys(dataset)
    for (const attr of attrs) {
      dataAttrs.push(`data-${attr}="${dataset[attr]}"`)
    }
  }
  return rmHeadSpaces(`
    <svg
      xmlns="${xmlns.svg}"
      viewBox="0 0 ${width} ${height}"
      width="${width}" height="${height}"
      class="${className}" ${dataAttrs.join(' ')}>
      ${renderStyleTag(style)}
      <image
        xmlns:xlink="${xmlns.xlink}"
        width="${width}" height="${height}" x="0" y="0"
        xlink:href="${dataURI}">
      </image>
      ${renderExternals(externals)}
    </svg>`, 4)
}
