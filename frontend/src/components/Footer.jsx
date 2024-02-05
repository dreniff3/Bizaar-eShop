import { useState, useEffect } from "react";
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
    const [year, setYear] = useState(new Date().getFullYear());

    useEffect(() => {
        // Update the year when the component mounts
        setYear(new Date().getFullYear());
    }, []);

    return (
        <footer>
            <Container>
                <Row>
                    <Col className="text-center py-3">
                        <p>My eShop &copy; {year}</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;