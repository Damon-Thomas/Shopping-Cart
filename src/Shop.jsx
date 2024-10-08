import { Fragment, useEffect, useState } from "react";
import "./shop.css"









function Shop(cart, setCart) {
  const [items, setItems] = useState([])
  const [categories, setCategories] = useState([])
  

  function getItems(){
    useEffect(() => {
      fetch('https://fakestoreapi.com/products')
              .then(res=>res.json())
              .then(json=>dataProcessor(json))
        .catch((error) => console.error(error));
    }, []);
  }

  function dataProcessor(json) {
    setItems(json)
    getCategories(json)
  }

  function getCategories(data) {
    
    const cat = []
    for (let i = 0; i < data.length; i++) {
      
      if (!(cat.includes(data[i].category))) {
        cat.push(data[i].category)
      }
    }
    
    setCategories([...cat])
  }
  

  function addToCart(item, change) {
    
    for (let i = 0; i < cart.cart.length; i++) {
      const newData = {}
      if (item.title === cart.cart[i].title) {
          newData.title = item.title
          newData.quantity = cart.cart[i].quantity + change
          newData.cost = cart.cart[i].price
          const newCart = [...cart.cart]
          newCart[i] = newData
          
          cart.setCart([...newCart])
          return
      }
    }
  
   
    cart.setCart([...cart.cart, {title: item.title, quantity: change ,cost: item.price }])
    
    
 
    
    return
  }

  function itemsByCat(cat) {
    return (items.filter(item => item.category === cat))
  }

  
  

  function ItemCardsByCat(category) {
    const cat = category.cat


    
    function card(item) {
      const [count, setCount] = useState(1) 

      function countValidation(count) {
        if (count > 0) {
          setCount(count)
        }
      }

      return (
        <li className="itemCard" key={item.id}>
       <img
         src={item.image}
         alt={item.title}
         className="cardImg"
       />
       <h6 className="productName">{item.title}</h6>
       <p className="itemDescription">{item.description}</p>
       <div className="cardBottom">
         <p className="itemRating">{'Rating: ' + item.rating.rate + '/5'}</p>
         <p className="itemPrice">{"Price: $" +item.price}</p>
       </div>
       <div className="addToCartSection">
         <button onClick={() => countValidation(count - 1)}>-</button>
         <button onClick={() => addToCart(item, count)}> Add {count} cart</button>
         <button onClick={() => countValidation(count + 1)}>+</button>
       </div>
    </li>
      )
    }
   

    const itemCards = itemsByCat(cat).map(item =>
      card(item)
    )
    
    return (itemCards)
  }

  function capitalise(word) {
    return word.replace(
      /\w\S*/g,
      text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
    );
  }

  

  getItems()
  const shopItems = categories.map(cat =>
    <Fragment key={cat}>
       <h2 className="shopHeading">{capitalise(cat)}</h2>
       <div className="itemList">
         <ItemCardsByCat cat={cat} />
       </div>
     </Fragment>
)

    return (
      <div className="shopContent">
        <h1 className="pageTitle">Shop</h1>
        <div className="shopContainer">
         {shopItems}
        </div>
      </div>
    );
  };
  
  export default Shop;