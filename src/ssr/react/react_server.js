/**
 * Created by apple on 16/9/13.
 */
import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { RouterContext, match } from 'react-router';
import createLocation from 'history/lib/createLocation';
import routes from '../../react/container/routes';

const app = express();

const renderFullPage = (html) => {
  return `
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Isomorphic Redux Example</title>
      </head>
      <body>
        <div id="root">${html}</div>
        <script src="/static/react-ssr.bundle.a84489e3.js"></script>
      </body>
    </html>
  `;
};

app.use('/static', express.static(__dirname + '/../../dist'));

app.get('/*', function (req, res) {

  const location = createLocation(req.url);

  match({routes, location}, (error, redirectLocation, renderProps) => {

    if (error) {
      res.status(500).send(error.message)
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      res.status(200).send(renderToString(<RouterContext {...renderProps} />))
    } else {
      res.status(404).send('Not found')
    }
  })
});

const server = app.listen(3001, function () {
  const host = server.address().address;
  const port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});