import { NavLink } from "react-router";
import { FaLaptopCode, FaTimes, FaBars } from "react-icons/fa";
import { useState } from "react";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const base = "transition hover: text-blue-400";
    const active = "text-blue-400 font-semibold";

    return ( 
    <nav className="bg-gray-800 border-b border-gray-700 shadow-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
            <NavLink to='/' className='flex item-center gap-2 text-lg font-bold text-blue-300'>
            <FaLaptopCode className="text-blue-400 text-xl"/>
            <span>Ted Scanner</span>
            </NavLink>
            {/*Desktop Nav */}
            <div className="hidden md:flex items-center gap-6">
                <div className="space-x-4 text-sm text-gray-300">
                    <NavLink to='/entities' className={({ isActive }) => isActive ?  active : base }>Entities</NavLink>
                    <NavLink to='/search' className={({ isActive }) => isActive ?  active : base }>Search</NavLink>
                    <NavLink to='/about' className={({ isActive }) => isActive ?  active : base }>About</NavLink>
                </div>
            </div>
             {/* Mobile Nav */}
            <div className="md:hidden flex items-center gap-4">
                <button onClick={ () => setMenuOpen(!menuOpen) } className="text-blue-400 text-xl cursor-pointer">
                    { menuOpen ? <FaTimes/> : <FaBars /> }
                </button>
            </div>
        </div>
            {/* Mobile Nav */}
        {
            menuOpen && (
                <div className="md:hidden bg-gray-800 border-t border-gray-700 px-6 py-4 space-y-2 space-x-4 text-center text-gray-300">
                    <NavLink 
                        className={({ isActive }) => isActive ? active : base } 
                        to='/'
                        onClick={() => setMenuOpen(false) }>Home</NavLink>
                    <NavLink 
                        className={({ isActive }) => isActive ? active : base } 
                        to='/entities'
                        onClick={() => setMenuOpen(false) }>Entites</NavLink>
                    <NavLink 
                        className={({ isActive }) => isActive ? active : base } 
                        to='/search'
                        onClick={() => setMenuOpen(false) }>Search</NavLink>
                    <NavLink 
                        className={({ isActive }) => isActive ? active : base } 
                        to='/about'
                        onClick={() => setMenuOpen(false) }>About</NavLink>
                    <NavLink 
                        className={({ isActive }) => isActive ? active : base } 
                        to='/contact'
                        onClick={() => setMenuOpen(false) }>Contact</NavLink>
                </div>

            )
        }        
    </nav>
      );
}
 
export default Navbar;