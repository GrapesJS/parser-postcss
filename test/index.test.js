import parser from './../src/parser';

describe('Parser', () => {

  it('returns the correct object of the @font-face rule', () => {
    expect(parser(`@font-face {
      font-family: "Glyphicons Halflings";
      src: url("https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/fonts/glyphicons-halflings-regular.eot")
    }`)).toEqual([
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

  it('returns the correct object of the @keyframes rule', () => {
    expect(parser(`@keyframes keyframe-name {
      from {opacity: 0;}
      to {opacity: 1;}
    }`)).toEqual([
      {
        params: 'keyframe-name',
        selectors: 'from',
        atRule: 'keyframes',
        style: {
          opacity: "0",
        },
      }, {
        params: 'keyframe-name',
        selectors: 'to',
        atRule: 'keyframes',
        style: {
          opacity: "1",
        },
      }
    ]);
  });

  it('returns the correct object of a @media rule', () => {
    expect(parser(`@media screen and (min-width: 480px) {
        body {
            background-color: lightgreen;
        }

        .class-test {
          color: blue;
        }
    }`)).toEqual([
      {
        params: 'screen and (min-width: 480px)',
        selectors: 'body',
        atRule: 'media',
        style: {
          'background-color': 'lightgreen',
        },
      }, {
        params: 'screen and (min-width: 480px)',
        selectors: '.class-test',
        atRule: 'media',
        style: {
          color: 'blue',
        },
      }
    ]);
  });

  it('returns the correct object of a simple @media rule', () => {
    expect(parser(`@media (max-width: 500px) {
      .class-test {
        font-size: 20px;
      }
    }`)).toEqual([
      {
        params: '(max-width: 500px)',
        selectors: '.class-test',
        atRule: 'media',
        style: {
          'font-size': '20px',
        },
      },
    ]);
  });

  it('returns the correct object of a simple @page rule', () => {
    expect(parser(`@page Normal {
                size: 21.0cm 29.7cm;
                margin: 2.5cm;
      }`)).toEqual([
      {
        params: 'Normal',
        selectors: '',
        atRule: 'page',
        style: {
          size: '21.0cm 29.7cm',
          margin: '2.5cm',
        },
      },
    ]);
  });

  it('returns the correct object of a @page rule', () => {
    expect(parser(`@page Normal {
                size: 21.0cm 29.7cm;
                margin: 2.5cm;
                @top-left-corner {
                  content: "@top-left-corner";
                  background-color: red;
                  padding: 10px;
                  border: 1px solid black; 
                }
      }`)).toEqual([
      {
        params: 'Normal',
        selectors: '',
        atRule: 'page',
        style: {
          size: '21.0cm 29.7cm',
          margin: '2.5cm',
        },
      }, {
        params: 'Normal',
        selectors: '@top-left-corner',
        atRule: 'page',
        style: {
          content: '"@top-left-corner"',
          'background-color': "red",
          padding: "10px",
          border: "1px solid black",
        },
      }
    ]);
  });

  it('returns the correct object of a @page rule', () => {
    expect(parser(`@page Normal {
                size: 21.0cm 29.7cm;
                margin: 2.5cm;
                @top-left {
                  content: "@top-left";
                  background-color: orange;
                  padding: 10px;
                  border: 2px solid blue; 
                }
                @top-center {
                  content: "@top-center";
                  background-color: yellow;
                  padding: 10px;
                  border: 3px solid green; 
                }
                @top-right {
                  content: "@top-right";
                  background-color: deeppink;
                  padding: 10px;
                  border: 1px solid magenta; 
                }
      }`)).toEqual([
      {
        params: 'Normal',
        selectors: '',
        atRule: 'page',
        style: {
          size: '21.0cm 29.7cm',
          margin: '2.5cm',
        },
      }, {
        params: 'Normal',
        selectors: '@top-left',
        atRule: 'page',
        style: {
          content: '"@top-left"',
          'background-color': "orange",
          padding: "10px",
          border: "2px solid blue",
        },
      }, {
        params: 'Normal',
        selectors: '@top-center',
        atRule: 'page',
        style: {
          content: '"@top-center"',
          'background-color': "yellow",
          padding: "10px",
          border: "3px solid green",
        },
      }, {
        params: 'Normal',
        selectors: '@top-right',
        atRule: 'page',
        style: {
          content: '"@top-right"',
          'background-color': "deeppink",
          padding: "10px",
          border: "1px solid magenta",
        },
      }
    ]);
  });

  it('returns the correct object of a simple id rule', () => {
    expect(parser(`#main {
        border: 1px solid black;
    }`)).toEqual([
      {
        selectors: '#main',
        style: {
          border: '1px solid black',
        },
      },
    ]);
  });

  it('returns the correct object of a simple class rule and important style', () => {
    expect(parser(`.important {
      color: yellow !important;
    }`)).toEqual([
      {
        selectors: '.important',
        style: {
          color: 'yellow !important',
        },
      },
    ]);
  });

  it('returns the correct object of a class rule', () => {
    expect(parser(`.header-banner, .header-banner2 {
      background-image:url("http://grapesjs.com/img/bg-gr-v.png"), url("http://grapesjs.com/img/work-desk.jpg");
      background-attachment: fixed, scroll;
      background-position:left top, center center;
      background-repeat:repeat-y, no-repeat;
      background-size: contain, cover;
      box-shadow: 0 0 5px #9d7aa5, 0 0 10px #e6c3ee;
    }`)).toEqual([
      {
        selectors: '.header-banner, .header-banner2',
        style: {
          'background-image': 'url("http://grapesjs.com/img/bg-gr-v.png"), url("http://grapesjs.com/img/work-desk.jpg")',
          'background-attachment': 'fixed, scroll',
          'background-position': 'left top, center center',
          'background-repeat': 'repeat-y, no-repeat',
          'background-size': 'contain, cover',
          'box-shadow': '0 0 5px #9d7aa5, 0 0 10px #e6c3ee',
        },
      },
    ]);
  });

  it('returns the correct object of a class rule with state', () => {
    expect(parser(`.header-banner:hover {
      color: green;
    }`)).toEqual([
      {
        selectors: '.header-banner:hover',
        style: {
          color: 'green',
        },
      },
    ]);
  });

  it('returns the correct object of a rule with CSS variables', () => {
    expect(parser(`:root {
        --some-color: red;
        --some-width: 55px;
    }`)).toEqual([
      {
        selectors: ':root',
        style: {
          '--some-color': 'red',
          '--some-width': '55px',
        },
      },
    ]);
  });

})
