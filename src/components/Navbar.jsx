import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
    //showing Navbar just to ease in development mode// 
      <Link to="/">Home</Link> |{" "}
      <Link to="/login">Login</Link> |{" "}
      <Link to="/register">Register</Link> |{" "}
      <Link to="/dashboard">Dashboard</Link>
    </nav>
  );
}

export default Navbar;
