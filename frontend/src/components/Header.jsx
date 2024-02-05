import { Navbar, Nav, Container } from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { PiShoppingBagFill } from 'react-icons/pi';

const Header = () => {
  return (
    <header>
        <Navbar bg="dark" data-bs-theme="dark" expand="md" collapseOnSelect>
            <Container>
                <Navbar.Brand href="/" style={{display: "flex", alignItems: "center"}}>
                    <PiShoppingBagFill style={{fontSize: "2rem", paddingRight: "5px"}} />
                    My eShop
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link href="/cart">
                            <FaShoppingCart /> Cart
                        </Nav.Link>
                        <Nav.Link href="login">
                            <FaUser /> Sign In
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </header>
  )
};

export default Header;