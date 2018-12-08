const fs = require('fs')
const {createSvg} = require('../lib/index.js')

const style = `
  <style>
    .source text {
      fill: #888888;
      font-size: 11px;
      font-weight: 400;
      text-decoration: none;
      font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    }
    .source text:hover {
      text-decoration: underline;
      fill: #2962FF;
    }
  </style>
`

const main = (srcUrl) => {
  const image = new Buffer(fs.readFileSync(srcUrl)).toString('base64')

  // https://scrapbox.io/teamj/svgize#5c08a4aaadf4e70000daa6d4
  const options = {
    width: 571,
    height: 506,
    className: 'svg-screenshot',
    dataset: {
      url: 'https://scrapbox.io/daiiz/The_Great_Burgerに行ってきた',
      title: 'The_Great_Burgerに行ってきた - daiiz',
    },
    externals: [
      {
        url: 'https://scrapbox.io/daiiz/パンケーキ',
        x: 53.5,
        y: 79,
        width: 75,
        height: 17,
        text: 'パンケーキ'
      },
      {
        url: 'https://scrapbox.io/daiiz/卵',
        x: 76,
        y: 106,
        width: 15,
        height: 17,
        text: '卵'
      },
      {
        url: 'https://scrapbox.io/daiiz/目玉焼き',
        x: 121,
        y: 160,
        width: 60,
        height: 17,
        text: '目玉焼き'
      },
      {
        url: 'https://gyazo.com/69610bbbbac53717766940df8203de08',
        x: 31,
        y: 325,
        width: 300,
        height: 17
      },
      {
        url: 'https://scrapbox.io/daiiz/The_Great_Burgerに行ってきた',
        x: 4,
        y: 502,
        text: 'The Great Burgerに行ってきた - daiiz - Scrapbox',
        className: 'source'
      },
      {
        url: 'https://gyazo.com/69610bbbbac53717766940df8203de08/thumb/1000',
        x: 31,
        y: 185,
        width: 300,
        height: 300,
        type: 'img'
      }
    ],
    style
  }

  return createSvg(`data:image/png;base64,${image}`, options)
}

const svgTagText = main('./demo/demo1.png')
console.log(svgTagText)
