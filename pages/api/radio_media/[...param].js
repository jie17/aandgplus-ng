const { createProxyMiddleware } = require('http-proxy-middleware');

const devProxy = {
  target: 'http://ic-www.uniqueradio.jp/iphone',
  pathRewrite: { '^/api/radio_media': '/' },
  changeOrigin: true
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