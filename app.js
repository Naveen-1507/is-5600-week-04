const fs = require('fs').promises
const path = require('path')
const express = require('express')
const middleware = require('./middleware.js')
const bodyParser = require('body-parser')


// Add the api module
const api = require('./api.js')
// Require the middleware module

// Set the port
const port = process.env.PORT || 3000
// Boot the app
const app = express()
// Register the public directory
app.use(express.static(__dirname + '/public'));
//console.log(typeof middleware.cors)
app.use(middleware.cors)
app.use(bodyParser.json())
// register the routes
app.get('/products', listProducts)
app.get('/', handleRoot);
//app.get('/products', listProducts)
//app.get('/', handleRoot);
// update the route handlers
// app.get('/', api.handleRoot)
// app.get('/products', api.listProducts)
// app.get('/products/:id', api.getProduct)
app.get('/', api.handleRoot)
app.get('/products', api.listProducts)
app.get('/products/:id', api.getProduct)
app.post('/products', api.createProduct)
app.delete('/products/:id', api.deleteProduct)
app.put('/products/:id', api.updateProduct)
// Boot the server
app.listen(port, () => console.log(`Server listening on port ${port}`))

/**
 * Handle the root route
 * @param {object} req
 * @param {object} res
*/
app.listen(port, () => console.log(`Server listening on port ${port}`))
function handleRoot(req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
}
@@ -30,10 +48,16 @@ function handleRoot(req, res) {
 */
async function listProducts(req, res) {
  const productsFile = path.join(__dirname, 'data/full-products.json')

  try {
    const data = await fs.readFile(productsFile)
    res.json(JSON.parse(data))
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

module.exports = {
  handleRoot,
  listProducts
}