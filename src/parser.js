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

  if (declarations.length > 0) {
    declarations.forEach(({prop, value, important}) => {
      style[prop] = value + (important ? ' !important' : '');
    });
  }

  return {
    selectors: (node.parent.type == 'atrule' && node.type == 'atrule' ? '@' + node.name : node.selector)  || '',
    style,
  }
};

/**
 * Add declaration to existing rule
 * @param  {Object} node
 * @return {Object}
 */
export const addDeclaration = (node, style) => {
  let {prop, value, important} = node;

  style[prop] = value + (important ? ' !important' : '');

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
  let { name, params } = node;
  const isNested = ['media', 'page', 'keyframes'].indexOf(name) >= 0;

  if (isNested) {
    const style = {};
    let ruleCreated = false;
    node.nodes.forEach(cnode => {
        if (cnode.type == 'decl') {
          addDeclaration(cnode, style);
          if (!ruleCreated) {
            result.push({
              selectors: '',
              style,
              atRule: name,
              params,
            });
            ruleCreated = true;
          }
        } else {
          result.push({
            ...createRule(cnode),
            atRule: name,
            params,
          })
        }
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
