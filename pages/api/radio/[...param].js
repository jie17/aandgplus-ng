const { createProxyMiddleware } = require('http-proxy-middleware');

const devProxy = {
    target: 'http://ic-www.uniqueradio.jp/iphone',
    pathRewrite: { '^/api/radio': '/' },
    changeOrigin: true,
    selfHandleResponse: true,
    onProxyRes: (proxyRes, req, res) => {
      var body = [];
        proxyRes.on('data', function (chunk) {
            body.push(chunk);
        });
        proxyRes.on('end', function () {
            body = Buffer.concat(body).toString();
            res.end(body.split("http://ic-www.uniqueradio.jp/iphone/").join("/api/radio_media/"));
            // res.end( proxyRes.headers['Content-Type'] === 'application/x-mpegURL' ? body.replace("http://ic-www.uniqueradio.jp/iphone/", "/radio") : body);
        });
    }
  }

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}

async function handler(req, res) {
  // Run the middleware
  await runMiddleware(req, res, createProxyMiddleware(devProxy))

  // Rest of the API logic
  res.json({ message: 'Hello Everyone!' })
}

export default handler