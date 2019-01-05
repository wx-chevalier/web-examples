/* eslint-disable no-use-before-define */
// 待渲染完整的页面
// 这里的页面建议以最简形式,如果需要复杂的头设定使用react-helmet组件

/**
 * @function 生成同构直出的HTML界面模板
 * @param html
 * @param initialState
 * @param scripts
 * @param styles
 * @return {string}
 */
export default (html, initialState = {}, scripts = [], styles = []) => {
  return `
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        ${styleMapper(styles)}
      </head>
      <body>
        <div id="root">${html}</div>        
      </body>
      <script>
        window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
      </script>
      ${scriptMapper(scripts)}
    </html>
  `;
};

/**
 * @function 将输入的样式文件路径转化为Link标签
 * @param styles
 * @return {*}
 */
const styleMapper = styles => {
  return styles.map(style => {
    return `<link href="${style}" media="screen, projection" rel="stylesheet" type="text/css" charSet="UTF-8"/>`;
  });
};

const scriptMapper = scripts => {
  const scriptTags = [];

  for (let i = 0; i < scripts.length; i = i + 1) {
    scriptTags.push(`<script src=${scripts[i]}></script>`);
  }

  return scriptTags;
};
