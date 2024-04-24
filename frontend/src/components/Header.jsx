import { useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Badge, NavDropdown } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { PiShoppingBagFill } from 'react-icons/pi';
import { SHOP_NAME } from "../constants.js";
import SearchBox from './SearchBox';
import { resetCart } from '../slices/cartSlice.js';
import logo from '../../public/images/logo.jpeg';

const Header = () => {
    // access cartSliceReducer by calling store 'cart' reducer
    // destructure state to get cart properties
    const { cartItems } = useSelector((state) => state.cart);
    const { userInfo } = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [ logoutApiCall ] = useLogoutMutation();

    const logoutHandler = async () => {
        try {
            await logoutApiCall().unwrap();
            // clear local storage
            dispatch(logout());
            // reset cart
            dispatch(resetCart());
            navigate('/login');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <header>
            <Navbar id="navbar" data-bs-theme="dark" expand="md" collapseOnSelect>
                <Container>

                    <LinkContainer to='/'>
                        <Navbar.Brand style={{display: "flex", alignItems: "center"}}>
                            <Image src={logo} fluid />
                        </Navbar.Brand>
                    </LinkContainer>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />

                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">

                            <SearchBox />

                            <LinkContainer to="/cart">
                                <Nav.Link>
                                    <FaShoppingCart /> Cart
                                    {
                                        cartItems.length > 0 && (
                                            <Badge 
                                                pill 
                                                bg='danger' 
                                                style={{marginLeft: '5px'}}
                                            >
                                                {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                                            </Badge>
                                        )
                                    }
                                </Nav.Link>
                            </LinkContainer>

                            {/* if user is logged in, show name and dropdown */}
                            { userInfo ? (
                                <NavDropdown 
                                    title={userInfo.name} 
                                    id='username'
                                >
                                    <LinkContainer to='/profile'>
                                        <NavDropdown.Item>
                                            Profile
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item
                                        onClick={logoutHandler}
                                    >
                                        Logout
                                    </NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                                <LinkContainer to="/login">
                                    <Nav.Link>
                                        <FaUser /> Sign In
                                    </Nav.Link>
                                </LinkContainer>
                            ) }

                            {userInfo && userInfo.isAdmin && (
                                <NavDropdown title="Admin" id="adminmenu">
                                    <LinkContainer to="/admin/productlist">
                                        <NavDropdown.Item>Products</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to="/admin/userlist">
                                        <NavDropdown.Item>Users</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to="/admin/orderlist">
                                        <NavDropdown.Item>Orders</NavDropdown.Item>
                                    </LinkContainer>
                                </NavDropdown>
                            )}

                        </Nav>
                    </Navbar.Collapse>

                </Container>
            </Navbar>
        </header>
    )
};

export default Header;
