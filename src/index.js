import parser from './parser';

export default (editor, opts = {}) => {
  const options = { ...{
    // default options
  },  ...opts };

  editor.setCustomParserCss(parser);
};
