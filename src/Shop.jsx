import { Fragment, useEffect, useState } from "react";
import "./shop.css"









const Shop = () => {
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
    console.log('func data', data)
    const cat = []
    for (let i = 0; i < data.length; i++) {
      console.log(data[i].category)
      if (!(cat.includes(data[i].category))) {
        cat.push(data[i].category)
      }
    }
    console.log('preeeee list', cat)
    setCategories([...cat])
  }
  
  
  useEffect(() => {
      console.log('items', items) 
      console.log('categories', categories)                                                                            
  }, [items])

  

  // function getProductCards() {
  //   return (
      
  //   )
  // }

  function itemsByCat(cat) {
    return (items.filter(item => item.category === cat))
  }

  function itemCardsByCat(cat) {
    const itemCards = itemsByCat(cat).map(item =>
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
    </li>
    )
    console.log('item cards by cat', itemCards)
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
         {itemCardsByCat(cat)}
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