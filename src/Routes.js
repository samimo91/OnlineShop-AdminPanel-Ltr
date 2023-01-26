import Main from "./Components/Main/Main";
import Products from "./Components/Products/Products";
import Comments from "./Components/Comments/Comments";
import Users from "./Components/Users/Users";
import Orders from "./Components/Orders/Orders";
import Offs from "./Components/Offs/Offs";

const routes = [
  { path: "/", element: <Main /> },
  { path: "/products", element: <Products /> },
  { path: "/comments", element: <Comments /> },
  { path: "/users", element: <Users /> },
  { path: "/orders", element: <Orders /> },
  { path: "/offs", element: <Offs /> },
];

export default routes;
