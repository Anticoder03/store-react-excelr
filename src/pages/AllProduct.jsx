import { useEffect, useState } from 'react'
import axios from 'axios'
import '../css/AllProduct.css'

const AllProduct = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products')
        setProducts(response.data)
      } catch {
        setError('Failed to load products.')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  if (loading) {
    return (
      <section className="all-product-page all-product-page--status">
        <p>Loading products...</p>
      </section>
    )
  }

  if (error) {
    return (
      <section className="all-product-page all-product-page--status">
        <p className="all-product-page__error">{error}</p>
      </section>
    )
  }
 

  return (
    <section className="all-product-page">
      <header className="all-product-page__hero">
        <p className="all-product-page__eyebrow">Fake Store API</p>
        <h1>All Products</h1>
        <p className="all-product-page__subtitle">
          Browse a clean, responsive catalog powered by Axios and the Fake Store API.
        </p>
      </header>

      <div className="all-product-grid">
        {products.map((product) => (
          <article className="all-product-card" key={product.id}>
            <div className="all-product-card__image-wrap">
              <img
                className="all-product-card__image"
                src={product.image}
                alt={product.title}
              />
            </div>

            <div className="all-product-card__body">
              <p className="all-product-card__category">{product.category}</p>
              <h2 className="all-product-card__title">{product.title}</h2>
              <div className="all-product-card__footer">
                <strong className="all-product-card__price">${product.price}</strong>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default AllProduct
