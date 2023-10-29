
  server.host('https://example.com', () => {
    server
      .post('/h5/:method/1.0')
      .on('request', (req) => {})
      .intercept((req, res, interceptor) => {
        interceptor.passthrough();
      })
      .on('beforeResponse', (req, res) => {
        console.log(res);
      });
  });
