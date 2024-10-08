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
      console.log(cart)
      for (let i = 0; i < cart.length; i++) {
        const newData = {}
        if (item.title === cart[i].title) {
            newData.title = item.title
            newData.quantity = addOrSub ? cart[i].quantity + 1: (quantity - 1 > 0 ? cart[i].quantity - 1 : 1)
            newData.cost = cart[i].price
            const newCart = [...cart]
            newCart[i] = newData
            
            setCart([...newCart])
            return
        }
      }
    }

    function makeCartItem(item) {
      console.log('fire 2')
      return (
        <div className="cartItem" key={item.title + item.quantity}>
          <h6 className="itemName">{item.title + "X " + item.quantity}</h6>
          <p className="cartItemTotal">{"Cost: " + item.cost}</p>
          <div className="itemIconContainer">
            <button onClick={alterQuantity(item, true)} className="addOne">+</button>
            <button className="minusOne">-</button>
            <button className="">DEL</button>
          </div>
        </div>
      )
    }

    function fillCart() {
      console.log('fire')
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
          <p className="cartTotal">{"Subtotal: $" + getTotal()}</p>
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
