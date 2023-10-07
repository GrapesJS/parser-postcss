import { Plugin } from 'grapesjs';
import parser from './parser';

const plugin: Plugin = (editor) => {
  editor.setCustomParserCss(parser);
};

export default plugin;
