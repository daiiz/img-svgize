# img-svgize
Create a svg-screenshot-style svg text from dataURI image.

By including accurate `xmlns`, `viewBox`, etc., svg images generated can also be displayed with an `<img>` element. Optionally you can embed external links in svg images. When these are displayed in an `<object>` or a `<iframe>` element, embedded  anchor links can be clicked.

It works on both server (Node.js) and client side js.

## Installation
```
$ npm install img-svgize
```

## Usage
Create a svg element's outerText, i.e. `<svg>...</svg>`.
```ts
const svg = createSvg(dataURI, options)
```

## Options
```ts
interface External {
  url: string,
  x: number,
  y: number,
  width: number,
  height: number,
  text?: string,
  className?: string,
  type?: "a" | "img" // default is "a"
}

interface Options {
  width: number,
  height: number,
  className?: string,
  dataset?: { [s: string]: string },
  style?: Array<string>, // [<style>...<style>, ...]
  externals?: Array<External>
}

```

## Examples

### Minimum options
```js
// ./demo/demo0.js
const image = new Buffer(fs.readFileSync('./demo/demo0.png')).toString('base64')

const svg = createSvg(`data:image/png;base64,${image}`, {width: 44, height: 44})
```

[![](https://storage.googleapis.com/daiiz-bucket-1/public/demo0.svg)](https://storage.googleapis.com/daiiz-bucket-1/public/demo0.svg)


### SVG Screenshot
Generate a [SVG Screenshot](https://scrapbox.io/daiiz/SVG_Screenshot) image.
```
$ node ./demo/demo1.js > res/demo1.svg
```

Open in the new browser tab, you can click anchor links in the svg image.

[![](https://storage.googleapis.com/daiiz-bucket-1/public/demo1.svg)](https://storage.googleapis.com/daiiz-bucket-1/public/demo1.svg)


## Related projects
- https://github.com/daiiz/svg-screenshot
- https://github.com/daiiz/svg-screenshot-puppeteer
- https://scrapbox.io/daiiz/Retinaディスプレイで撮ったscreenshotをsvgに包んで配信して、imgタグで原寸大で表示する
