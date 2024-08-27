import '../index.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar(){

    const [click, setClick] = useState(false);

    const handleClick = () => setClick(!click);

    return (
      <nav className="navbar">
        <h1>Vid2Gif</h1>
        {/* Link to each pages */}
        <div className="links">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/login">User</Link>
        </div>
      </nav>
    );
  }
   
  export default Navbar;