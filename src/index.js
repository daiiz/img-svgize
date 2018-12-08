const xmlns = {
  svg: 'http://www.w3.org/2000/svg',
  xlink: 'http://www.w3.org/1999/xlink',
  html: 'http://www.w3.org/1999/xhtml'
}

const renderExternals = externals => {
  const res = []
  for (const external of externals) {
    const {width, height, x, y, href} = external
    if (!width || !height || !x || !y || !href) continue
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

const createATag = ({width, height, x, y, href, text, className}) => {
  return `
    <a
      xmlns:xlink="${xmlns.xlink}"
      xlink:href="${href}"
      class="${className}"
      target="_blank"
      style="cursor: pointer;">
      <rect width="${width}" height="${height}" x="${x}" y="${y}" fill="rgba(0,0,0,0)">
      </rect>
      <text x="${x}" y="${y}" fill="rgba(0,0,0,0)">${text}</text>
    </a>
  `
}

const createImgTag = ({width, height, x, y, href, className}) => {
  return `
    <foreignObject
      xmlns="${xmlns.svg}"
      width="${width}" height="${height}" x="${x}" y="${y}">
      <img
        src="${href}" className="${className}"
        width="${width}" height="${height}"
        style="display: block;" />
    </foreignObject>
  `
}

export function createSvg (dataURI, {width, height, className, style, externals}) {
  if (!className) className = ''
  if (!dataURI.startsWith('data:image/')) return ''
  return `
    <svg
      xmlns="${xmlns.svg}"
      viewBox="0 0 ${width} ${height}"
      width="${width}" height="${height}"
      class="${className}">
      ${renderStyleTag(style)}
      <image
        xmlns:xlink="${xmlns.xlink}"
        width="${width}" height="${height}" x="0" y="0"
        xlink:href="${dataURI}">
      </image>
      ${renderExternals(externals)}
    </svg>
  `
}
