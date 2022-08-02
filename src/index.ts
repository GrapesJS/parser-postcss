import type grapesjs from 'grapesjs';
import parser from './parser';

const plugin: grapesjs.Plugin = (editor) => {
  editor.setCustomParserCss(parser);
};

export default plugin;
