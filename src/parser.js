import postcss from 'postcss';

/**
 * Log stuff
 * @param  {Editor} editor
 * @param  {*} msg
 */
export const log = (editor, msg) =>
  editor && editor.log(msg, { ns: 'parser-poscss' });

/**
 * Create rule from node
 * @param  {Object} node
 * @return {Object}
 */
export const createRule = node => {
  const declarations = node.nodes || [];
  const style = {};

  declarations.forEach(({ prop, value, important }) => {
    style[prop] = value + (important ? ' !important' : '');
  });

  return {
    selectors: node.selector || '',
    style,
  }
};

/**
 * Create at rule from node
 * @param  {Object} node
 * @param  {Array<Object>} result
 * @return {Object}
 */
export const createAtRule = (node, result) => {
  const { name, params } = node;
  const isNested = ['media', 'keyframes'].indexOf(name) >= 0;

  if (isNested) {
    node.nodes.forEach(node => {
      result.push({
        ...createRule(node),
        atRule: name,
        params,
      })
    });
  } else {
    result.push({
      ...createRule(node),
      atRule: name,
    })
  }
};

export default (css, editor) => {
  const result = [];
  log(editor, ['Input CSS', css]);

  const ast = postcss.parse(css);
  log(editor, ['PostCSS AST', ast]);

  ast.nodes.forEach(node => {
    const { type } = node;

    switch (type) {
      case 'rule':
        result.push(createRule(node));
        break;
      case 'atrule':
        createAtRule(node, result);
        break;
    }
  });

  log(editor, ['Output', result]);

  return result;
}
