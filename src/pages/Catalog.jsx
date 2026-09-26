import { useState } from 'react'
import GUNS from '../data/guns.js'
import GunCard from '../components/GunCard.jsx'

function Catalog() {
  const [filter, setFilter] = useState('All')
  const [cart, setCart] = useState([])
  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const [orderPlaced, setOrderPlaced] = useState(false)

  const filteredGuns =
    filter === 'All'
      ? GUNS
      : GUNS.filter((gun) => gun.type === filter)

  const addToCart = (gun) => {
    setOrderPlaced(false)

    setCart((prev) => {
      const existing = prev.find((item) => item.name === gun.name)

      if (existing) {
        return prev.map((item) =>
          item.name === gun.name
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }

      return [...prev, { ...gun, quantity: 1 }]
    })
  }

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  return (
    <>
      <section className="masthead">
        <h1 className="display">Hardware, by the spec sheet.</h1>
        <p className="lede">
          A small catalog of products. Choose a category to filter the items.
        </p>
      </section>

      <section>
        <div className="list-head">
          <h2>Current stock</h2>
          <span className="count">{filteredGuns.length} pieces</span>
        </div>

        <label htmlFor="type-filter">Filter by type: </label>
        <select
          id="type-filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Pistol">Pistol</option>
          <option value="Rifle">Rifle</option>
          <option value="Shotgun">Shotgun</option>
        </select>

        <ul className="stock">
          {filteredGuns.map((gun) => (
            <GunCard
              key={gun.name}
              gun={gun}
              onAdd={addToCart}
            />
          ))}
        </ul>
      </section>

      <section className="cart-section">
        <h2>Shopping Cart ({cart.reduce((sum, item) => sum + item.quantity, 0)})</h2>

        {cart.length === 0 ? (
          <p>Belum ada barang di keranjang.</p>
        ) : (
          <>
            {cart.map((item) => (
              <div className="cart-item" key={item.name}>
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span>
                  ${(item.price * item.quantity).toLocaleString()}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setCart((prev) =>
                      prev.filter((product) => product.name !== item.name)
                    )
                  }
                >
                  Remove
                </button>
              </div>
            ))}

            <p className="price">
              Total: ${total.toLocaleString()}
            </p>

            <button
              type="button"
              className="checkout-btn"
              onClick={() => {
                setCheckoutOpen(true)
                setOrderPlaced(false)
              }}
            >
              Checkout
            </button>
          </>
        )}

        {checkoutOpen && cart.length > 0 && (
          <div className="checkout-panel">
            <h3>Checkout Summary</h3>
            {cart.map((item) => (
              <p key={item.name}>
                {item.name} × {item.quantity}
              </p>
            ))}
            <p className="price">
              Total pembayaran: ${total.toLocaleString()}
            </p>

            {orderPlaced ? (
              <p>Pesanan berhasil dikonfirmasi (simulasi).</p>
            ) : (
              <button
                type="button"
                className="checkout-btn"
                onClick={() => {
                  setOrderPlaced(true)
                  setCart([])
                  setCheckoutOpen(false)
                }}
              >
                Konfirmasi Pesanan
              </button>
            )}

            <button
              type="button"
              onClick={() => setCheckoutOpen(false)}
            >
              Tutup
            </button>
          </div>
        )}
      </section>
    </>
  )
}

export default Catalog