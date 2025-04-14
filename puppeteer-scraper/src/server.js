const express = require('express')
const cors = require('cors')
const productRoutes = require('./routes/products')

const app = express()
app.use(cors())
app.use(express.json())
app.use('/products', productRoutes)

const PORT = 3000
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
})
