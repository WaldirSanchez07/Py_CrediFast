import React from 'react'
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <header className="nav-container">
            <nav className="nav-content">
                <Link to="/">Inicio</Link>
                <NavLink to="/solicitar-credito" activeClassName="active">Crédito</NavLink>
            </nav>
        </header>
    )
}

export default Navbar
