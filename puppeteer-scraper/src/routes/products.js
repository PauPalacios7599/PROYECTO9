const express = require('express')
const fs = require('fs')
const router = express.Router()

const getProducts = () => {
  const data = fs.readFileSync('products.json', 'utf-8')
  return JSON.parse(data)
}

// GET todos
router.get('/', (req, res) => {
  const products = getProducts()
  res.json(products)
})

// GET por índice
router.get('/:id', (req, res) => {
  const products = getProducts()
  const product = products[req.params.id]
  if (product) res.json(product)
  else res.status(404).json({ message: 'Producto no encontrado' })
})

// POST nuevo
router.post('/', (req, res) => {
  const products = getProducts()
  products.push(req.body)
  fs.writeFileSync('products.json', JSON.stringify(products, null, 2))
  res.status(201).json(req.body)
})

// PUT actualizar
router.put('/:id', (req, res) => {
  const products = getProducts()
  const id = req.params.id
  if (products[id]) {
    products[id] = req.body
    fs.writeFileSync('products.json', JSON.stringify(products, null, 2))
    res.json(req.body)
  } else {
    res.status(404).json({ message: 'Producto no encontrado' })
  }
})

// DELETE producto
router.delete('/:id', (req, res) => {
  const products = getProducts()
  const id = req.params.id
  if (products[id]) {
    products.splice(id, 1)
    fs.writeFileSync('products.json', JSON.stringify(products, null, 2))
    res.json({ message: 'Producto eliminado' })
  } else {
    res.status(404).json({ message: 'Producto no encontrado' })
  }
})

module.exports = router
