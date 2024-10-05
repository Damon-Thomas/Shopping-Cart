import { NavLink } from "react-router-dom";

const Navigator = () => {
    return (
      <div>
        <h1>Nav</h1>
        <NavLink to="home">Homepage</NavLink>
        <NavLink to="shop">Shop page</NavLink> 
      </div>
    );
  };
  
  export default Navigator;