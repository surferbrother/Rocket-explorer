import { Link } from "react-router-dom";
import { FiSearch, FiLogOut, FiUser, FiShoppingBag, FiHeart } from 'react-icons/fi';

import { Container, Content, Logo, Search, Logout, Button, ButtonMenu, Profile } from "./styles";
import { useAuth } from '../../hooks/auth';
import { BsReceipt } from 'react-icons/bs';
import logo from '../../assets/logo.svg';
import { useCart } from '../../hooks/cart';

export function Header({ search, favoritesFilter }) {
    const { user } = useAuth()
    const { signOut } = useAuth();
    const { cart, orders } = useCart();

    function mobileMenu() {
        document.getElementById('hamburger').classList.toggle('active')
        document.getElementById('nav-menu').classList.toggle('active')
    }

    function userMenu() {
        document.getElementById('user-menu').classList.toggle('active')
    }

    return (
        <Container>
            <Content>
                <Logo>
                    <div className="logo">
                        <Link to="/">
                            <svg width="26" height="30" viewBox="0 0 26 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13.0635 0.306641L25.7096 7.60782V22.2102L13.0635 29.5114L0.417527 22.2102V7.60782L13.0635 0.306641Z" fill="#d946ef" />
                            </svg>
                            <h1>food explorer</h1>
                        </Link>
                    </div>
                </Logo>
                <div className="hamburger" id="hamburger" onClick={mobileMenu}>
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </div>
                <div className="nav-menu" id="nav-menu">
                    <Search>
                        <label>
                            <FiSearch size={24} />
                            <input
                                type="text"
                                placeholder="Busque pelas opções de pratos"
                                onChange={e => { search(e.target.value) }}
                            />
                        </label>
                    </Search>
                    {
                        user.isAdmin ?
                            <Link to="/orders">
                                <Button
                                    type='button'
                                >
                                    <BsReceipt size={24} />
                                    Ver pedidos <span>({orders.length})</span>
                                </Button>
                            </Link>
                            :
                            <Link to="/cart">
                                <Button
                                    type='button'
                                >
                                    <BsReceipt size={24} />
                                    Carrinho <span>({cart.length})</span>
                                </Button>
                            </Link>
                    }
                    {
                        user.isAdmin ?
                            <Link to="/profile">
                                <Profile>
                                    <FiUser />
                                </Profile>
                            </Link>
                            :
                            <Profile onClick={userMenu}>
                                <FiUser />
                                <div className="user-menu" id="user-menu">
                                    <Link to="/orders">
                                        <ButtonMenu>
                                            <FiShoppingBag size={24} />
                                            Meus Pedidos
                                        </ButtonMenu>
                                    </Link>
                                    <Link to="/">
                                        <ButtonMenu onClick={favoritesFilter}>
                                            <FiHeart size={24} />
                                            Meus Favoritos
                                        </ButtonMenu>
                                    </Link>
                                    <Link to="/profile">
                                        <ButtonMenu>
                                            <FiUser size={24} />
                                            Meu Perfil
                                        </ButtonMenu>
                                    </Link>
                                </div>
                            </Profile>
                    }
                    <Logout to="/" onClick={signOut}>
                        <FiLogOut />
                    </Logout>
                </div>
            </Content>
        </Container>
    );
}
