import parser from './../src/parser';

describe('Parser', () => {

  it('returns correct @font-face rule', () => {
    expect(parser(`@font-face {
      font-family: "Glyphicons Halflings";
      src: url("https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/fonts/glyphicons-halflings-regular.eot")
    }`)).toBe([
      {
        selectors: '',
        atRule: 'font-face',
        style: {
          'font-family': '"Glyphicons Halflings"',
          src: 'url("https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/fonts/glyphicons-halflings-regular.eot")',
        },
      }
    ]);
  });

})
