require('dotenv').config()
const puppeteer = require('puppeteer')
const fs = require('fs')

const BASE_URL = process.env.TARGET_URL
let products = []

;(async () => {
  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()

  await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' })

  let hasNextPage = true

  while (hasNextPage) {
    try {
      // Quitar posibles modales
      await page.evaluate(() => {
        const modal = document.querySelector('.modal, .popup, .overlay')
        if (modal) modal.remove()
      })

      // Scroll para que cargue el contenido
      await page.evaluate(() => window.scrollBy(0, window.innerHeight))
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Esperar a que aparezcan los productos
      await page.waitForSelector(
        'li.product-listing-wrapper.js-hover-producto',
        { timeout: 30000 }
      )

      // Extraer productos
      const newProducts = await page.evaluate(() => {
        const items = Array.from(
          document.querySelectorAll(
            'li.product-listing-wrapper.js-hover-producto'
          )
        )
        return items.map((el) => {
          const name = el
            .querySelector('a.js-href_list_products')
            ?.getAttribute('title')
            ?.trim()
          const price =
            el.querySelector('.product-price')?.innerText?.trim() ||
            'Precio no disponible'
          const image = el.querySelector('img.js-image_list_product')?.src
          return { name, price, image }
        })
      })

      console.log(`🛒 Página scrapeada: ${newProducts.length} productos`)
      products = [...products, ...newProducts]

      // Siguiente página
      const nextButton = await page.$('a.pagination__next')
      if (nextButton) {
        await Promise.all([
          page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
          nextButton.click()
        ])
      } else {
        hasNextPage = false
      }
    } catch (err) {
      console.error('❌ Error durante el scraping:', err.message)
      hasNextPage = false
    }
  }

  // Guardar productos
  fs.writeFileSync('products.json', JSON.stringify(products, null, 2))
  console.log(`✅ ${products.length} productos guardados en products.json`)

  await browser.close()
})()
