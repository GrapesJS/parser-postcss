import parser from './parser';

export default (editor) => {
  editor.setCustomParserCss(parser);
};
