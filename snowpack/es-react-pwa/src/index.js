import React from 'react';
import ReactDOM from 'react-dom';
import htm from 'htm';

window.html = htm.bind(React.createElement)

const Route = {
  '/': React.lazy(() => import('./routes/home/index.js')),
  '*': React.lazy(() => import('./routes/notfound/index.js')),
}

ReactDOM.render(
  html`
    <${React.Suspense} fallback=${html`<div>loading...</div>`}>
      <${Route[location.pathname] || Route['*']} />
    </>
  `,
  document.body
)
