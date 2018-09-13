import postcss from 'postcss';

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

export default css => {
  const result = [];
  console.log('CSS', css);

  const ast = postcss.parse(css);

  console.log('AST', ast);

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

  console.log('result', result);

  return result;
}
