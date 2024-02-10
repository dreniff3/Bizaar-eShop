import { Navbar, Nav, Container, Badge } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector } from 'react-redux';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { PiShoppingBagFill } from 'react-icons/pi';

const Header = () => {
    // access cartSliceReducer by calling store 'cart' reducer
    // destructure state to get cart properties
    const { cartItems } = useSelector((state) => state.cart);

    return (
        <header>
            <Navbar bg="dark" data-bs-theme="dark" expand="md" collapseOnSelect>
                <Container>

                    <LinkContainer to='/'>
                        <Navbar.Brand style={{display: "flex", alignItems: "center"}}>
                            <PiShoppingBagFill style={{fontSize: "2rem", paddingRight: "5px"}} />
                            My eShop
                        </Navbar.Brand>
                    </LinkContainer>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />

                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
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
                                                {cartItems.reduce((acc, curr) => acc + curr.qty, 0)}
                                            </Badge>
                                        )
                                    }
                                </Nav.Link>
                            </LinkContainer>
                            
                            <LinkContainer to="/login">
                                <Nav.Link>
                                    <FaUser /> Sign In
                                </Nav.Link>
                            </LinkContainer>

                        </Nav>
                    </Navbar.Collapse>

                </Container>
            </Navbar>
        </header>
    )
};

export default Header;