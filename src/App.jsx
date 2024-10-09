import { Routes, Route, Outlet, Link } from "react-router-dom";
import Homepage from "./Homepage";
import Shop from "./Shop";
import "./App.css"
import { useEffect, useState } from "react";
import homeIcon from './assets/home.svg'
import shopIcon from './assets/dollar-sign.svg'
import cartIcon from './assets/shopping-cart.svg'

export default function App() {


  const [cart, setCart] = useState([])
  const [cartVisibility, setCartVisibility] = useState(false)


  function Layout() {

    const [pageSelected, setPageSelected] = useState('')
    
    function cartQuantity() {
      
      let count = 0
      for (let i = 0; i < cart.length; i++) {
        count += cart[i].quantity
      }
      return count
    }

    function getTotal() {
      let total = 0
      for (let i = 0; i < cart.length; i++) {
        
        total += (cart[i].cost * cart[i].quantity)
      }
      
      return total
    }

    function alterQuantity(item, addOrSub) {
      
      for (let i = 0; i < cart.length; i++) {
        const newData = {}
        if (item.title === cart[i].title) {
            newData.title = item.title
            newData.quantity = addOrSub ? cart[i].quantity + 1: ((cart[i].quantity - 1 > 0) ? (cart[i].quantity - 1) : 1)
            newData.cost = cart[i].cost
            const newCart = [...cart]
            newCart[i] = newData
            console.log(newCart)
            setCart([...newCart])
            return
        }
      }
      
    }

    function deleteCartItem(item) {
      
      for (let i = 0; i < cart.length; i++) {
        if (item.title === cart[i].title) {
          
          const newCart = [...cart]
          
          newCart.splice(i, 1)
          
          setCart([...newCart])
    }}}

    function makeCartItem(item) {
      
      return (
        <div className="cartItem" key={item.title + item.quantity}>
          <div className="topCardCart">
            <h6 className="itemName">{item.title}</h6>
            <p className="itemCartQuantity">{"X " + item.quantity}</p>
          </div>
          <div className="itemPrices">
            <p className="cartItemTotal">{"Cost: $" + item.cost}</p>
            <p className="itemTotal">{"Item Total: $" + (item.cost * item.quantity)}</p>
          </div>
          <div className="itemIconContainer">
            <button onClick={() => alterQuantity(item, true)} className="addOne">+</button>
            <button onClick={() => alterQuantity(item, false)} className="minusOne">-</button>
            <button onClick={() => deleteCartItem(item)} className="cartItemDeleteButton">DEL</button>
          </div>
        </div>
      )
    }

    function fillCart() {
     
      return cart.map(item => makeCartItem(item))
    }


    return (
      <>
        <div className="header">
          <h1>SHOP<span id="title2">iction</span></h1>
          <nav >
            <ul className="navBar">
              <li>
                <Link to="/" onClick={() => setPageSelected(0)} className={pageSelected === 0 ? "navIcon selected" : "navIcon"} style={{ textDecoration: 'none' }}>
                  <img src={homeIcon} alt="Home Icon" />

                </Link>
              </li>
              <li>
                <Link to="/shop" onClick={() => setPageSelected(1)} className={pageSelected === 1 ? "navIcon selected" : "navIcon"} >
                  <img src={shopIcon} alt="Shop Icon" />
                </Link>
              </li>
              <li className="shoppingCartIcon">
                <img onClick={() => setCartVisibility(!cartVisibility)} src={cartIcon} className="navIcon" alt="Cart Icon" />
                <p className="cartCount">
                  {cartQuantity()}
                </p>
              </li>
            </ul>
          </nav>
        </div>
        <div className={cartVisibility ? "cartMenu" : "cartMenu invisible"}>
          <h2 className="cartTitle">My Cart</h2>
          <div className="cartItems">{fillCart()}</div>
          <div className="cartBottomSection">
            <p className="cartTotal">{"Subtotal: $" + (Math.round(getTotal() * 100) / 100).toFixed(2)}</p>
            <p className="cartTotal">{"Total + extra store fee: $" + (Math.round((getTotal() + 50.99) * 100) / 100).toFixed(2)}</p>
            <button className="checkout">Checkout</button>
          </div>
        </div>
        <Outlet />
      </>
    );
  }

  function NoMatch() {
    return (
      <div className="errorPage">
        <h2>Nothing to see here!</h2>
        <p>
          <Link to="/">Go to the home page</Link>
        </p>
      </div>
    );
  }

  return (
    <div className="main">

      {/* <p>
        This example demonstrates some of the core features of React Router
        including nested <code>&lt;Route&gt;</code>s,{" "}
        <code>&lt;Outlet&gt;</code>s, <code>&lt;Link&gt;</code>s, and using a
        "*" route (aka "splat route") to render a "not found" page when someone
        visits an unrecognized URL.
      </p> */}

      {/* Routes nest inside one another. Nested route paths build upon
            parent route paths, and nested route elements render inside
            parent route elements. See the note about <Outlet> below. */}
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Homepage />} />
          <Route path="shop" element={<Shop cart={cart} setCart={setCart} />} />


          {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </div>
  );
}

// onClick={setPageSelected(0)}
