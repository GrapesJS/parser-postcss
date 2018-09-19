# GrapesJS Parser PostCSS

This plugin enables custom CSS parser via [PostCSS](https://github.com/postcss/postcss). If you import templates from HTML/CSS or embed custom codes (eg. by using [grapesjs-custom-code](https://github.com/artf/grapesjs-custom-code) plugin) you definitely need to use this one to avoid issues with styles, [check here why](http://grapesjs.com/docs/guides/Custom-CSS-parser.html#cssom-results-are-inconsistent).

> Requires GrapesJS v0.14.33 or higher





## Summary

* Plugin name: `grapesjs-parser-postcss`





## Options

This plugin has no options





## Download

* CDN
  * `https://unpkg.com/grapesjs-parser-postcss`
* NPM
  * `npm i grapesjs-parser-postcss`
* GIT
  * `git clone https://github.com/artf/grapesjs-parser-postcss.git`





## Usage

Directly in the browser
```html
<link href="https://unpkg.com/grapesjs/dist/css/grapes.min.css" rel="stylesheet"/>
<script src="https://unpkg.com/grapesjs"></script>
<script src="path/to/grapesjs-parser-postcss.min.js"></script>

<div id="gjs"></div>

<script type="text/javascript">
  var editor = grapesjs.init({
      container : '#gjs',
      // ...
      plugins: ['grapesjs-parser-postcss'],
  });
</script>
```

Modern javascript
```js
import grapesjs from 'grapesjs';
import parserPostCSS from 'grapesjs-parser-postcss';

const editor = grapesjs.init({
  container : '#gjs',
  // ...
  plugins: [parserPostCSS],
});
```





## Development

Clone the repository

```sh
$ git clone https://github.com/artf/grapesjs-parser-postcss.git
$ cd grapesjs-parser-postcss
```

Install dependencies

```sh
$ npm i
```

Start the dev server

```sh
$ npm start
```





## License

BSD 3-Clause
