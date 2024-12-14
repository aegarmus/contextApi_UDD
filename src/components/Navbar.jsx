
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/User/userContext';


export const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        setIsMobileMenuOpen(false);
    }

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    }

    return (
        <nav className="navbar">
            {/* Logo */}
            <div className="navbar__logo">
                <Link to="/">LOGO</Link>
            </div>

            {/* Ítems de Navegación */}
            <div className={`navbar__nav ${isMobileMenuOpen ? 'navbar__nav--active' : ''}`}>
                <ul className="navbar__list">
                    <li className="navbar__item">
                        <Link to="/" className="navbar__link">Inicio</Link>
                    </li>
                    <li className="navbar__item">
                        <Link to="/about" className="navbar__link">Acerca De</Link>
                    </li>
                    <li className="navbar__item">
                        <Link to="/product" className="navbar__link">Productos</Link>
                    </li>
                    <li className="navbar__item">
                        <Link to="/cart" className="navbar__link">Carrito</Link>
                    </li>
                </ul>
            </div>

            {/* Datos del Usuario */}
            <div className={`navbar__user-section ${isMobileMenuOpen ? 'navbar__user-section--active' : ''}`}>
                {!user ? (
                    <Link to="/login" className="navbar__login-link">Login</Link>
                ) : (
                    <div className="navbar__user-info">
                        <img 
                            src={user.image} 
                            alt="User Avatar" 
                            className="navbar__avatar" 
                        />
                        <span className="navbar__username">{user.name}</span>
                        <button className='navbar__logout-button' onClick={handleLogout}>Logout</button>
                    </div>
                )}
            </div>

            {/* Botón de Menú Hamburger */}
            <div className="navbar__toggle" onClick={toggleMobileMenu} aria-label="Toggle navigation">
                <span className="navbar__toggle-bar"></span>
                <span className="navbar__toggle-bar"></span>
                <span className="navbar__toggle-bar"></span>
            </div>
        </nav>
    )
}
