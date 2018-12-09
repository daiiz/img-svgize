const fs = require('fs')
const {createSvg} = require('../lib/index.js')

const image = new Buffer(fs.readFileSync('./demo/demo0.png')).toString('base64')
const svgTagText = createSvg(`data:image/png;base64,${image}`, {
  width: 43,
  height: 44
})
console.log(svgTagText)
