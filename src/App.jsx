import { Routes, Route, Outlet, Link } from "react-router-dom";
import Homepage from "./Homepage";
import Shop from "./Shop";
import "./App.css"



export default function App() {
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
          <Route path="shop" element={<Shop/>} />
          

          {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </div>
  );
}

function Layout() {
  return (
    <>
      <div className="header">
        <h1>SHOP<span id="title2">iction</span></h1>
        <nav >
          <ul className="navBar">
            <li>
              <Link to="/">Homepage</Link>
            </li>
            <li>
              <Link to="/shop">Shop</Link>
            </li>
          </ul>
        </nav>
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