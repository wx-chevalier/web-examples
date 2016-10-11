/**
 * Created by apple on 16/10/11.
 */
//待渲染完整的页面
//这里的页面建议以最简形式,如果需要复杂的头设定使用react-helmet组件

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
        ${
    styles.map((style)=> {
      return <link href={style} media="screen, projection" rel="stylesheet" type="text/css" charSet="UTF-8"/>
    })
    }
      </head>
      <body>
        <div id="root">${html}</div>        
      </body>
      ${
    scripts.map((script)=> {
      return `<script src=${script}></script>`
    })
    }
      <script>
        window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
      </script>
    </html>
  `;
};