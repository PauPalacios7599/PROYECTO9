# 📁 Proyecto: Scraper + CRUD - Productos RunnerInn

Web scraper construido con **Node.js** y **Puppeteer** para extraer productos (nombre, precio e imagen) desde [TradeInn - RunnerInn](https://www.tradeinn.com/runnerinn/es/zapatillas-hombre/14687/s). Los datos se guardan en un archivo `products.json`, y se exponen mediante una API REST con Express y un CRUD básico.

---

## 🛠 Tecnologías usadas

- Node.js
- Puppeteer
- Express
- dotenv
- fs (File System)
- cors

---

## 📦 Instalación

```bash
git clone https://github.com/PauPalacios7599/puppeteer-scraper.git
cd puppeteer-scraper
npm install
```

---

## ⚙️ Configuración del entorno

Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:

```env
TARGET_URL=https://www.tradeinn.com/runnerinn/es/zapatillas-hombre/14687/s
```

---

## 📜 Scripts disponibles

| Comando        | Descripción                                 |
| -------------- | ------------------------------------------- |
| npm run scrape | Ejecuta el scraper y guarda `products.json` |
| npm run dev    | Inicia el servidor Express (CRUD)           |

---

## 📦 Scraping de productos

Al ejecutar el script con:

```bash
npm run scrape
```

➡ Recorre todas las páginas de productos, elimina modales, espera cargas, y guarda un JSON con:

```json
[
  {
    "name": "adidas Zapatillas running Galaxy 7",
    "price": "36.49 €",
    "image": "https://..."
  },
  ...
]
```

---

## 🔧 API REST (CRUD de productos)

Una vez ejecutado el servidor (`npm run dev`), puedes acceder a los siguientes endpoints:

| Método | Endpoint      | Descripción                      |
| ------ | ------------- | -------------------------------- |
| GET    | /products     | Obtener todos los productos      |
| GET    | /products/:id | Obtener producto por índice      |
| POST   | /products     | Añadir un nuevo producto         |
| PUT    | /products/:id | Actualizar un producto existente |
| DELETE | /products/:id | Eliminar un producto             |

📌 Los productos se gestionan directamente desde el archivo `products.json`.

---

## 📝 Notas

Este proyecto forma parte de una práctica de backend, enfocada en:

- ✅ Web scraping con Puppeteer
- ✅ Tratamiento de modales, scroll y paginación
- ✅ CRUD sin base de datos (usando JSON como almacenamiento)
- ✅ Buenas prácticas con Express y separación de rutas

---

## 👨‍💻 Autor

**Pau Palacios Gordillo**  
📍 Calella, Barcelona  
🔗 [GitHub - PauPalacios7599](https://github.com/PauPalacios7599)
