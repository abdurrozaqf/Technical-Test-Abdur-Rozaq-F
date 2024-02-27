import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="w-full py-8">
      <nav className="container w-full flex items-center font-bold gap-x-6 rounded-full border py-4 bg-white/90">
        <Link to="/">Home</Link>
        <Link to="/product">Product</Link>
      </nav>
    </header>
  );
};

export default Navbar;
