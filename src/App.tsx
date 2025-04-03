import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import {Container, Nav, Navbar} from "react-bootstrap";
import Characters from "./pages/Characters.tsx";
import Clans from "./pages/Clans.tsx";
import Villages from "./pages/Villages.tsx";
import Akatsuki from "./pages/Akatsuki.tsx";
import TailedBeasts from "./pages/TailedBeasts.tsx";
import Home from "./pages/Home.tsx"; // Creating a separate home page

function App() {
    return (
        <BrowserRouter>
            {/* Navbar Component */}
            <Navbar bg="light" variant="light" expand="lg" className="sticky-top">
                <Container>
                    <Navbar.Brand as={Link} to="/">Dattebayo</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <Nav.Link as={Link} to="/characters">Characters</Nav.Link>
                            <Nav.Link as={Link} to="/clans">Clans</Nav.Link>
                            <Nav.Link as={Link} to="/villages">Villages</Nav.Link>
                            <Nav.Link as={Link} to="/akatsuki">Akatsuki</Nav.Link>
                            <Nav.Link as={Link} to="/tailedbeasts">Tailed Beasts</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/* Routing for Pages */}
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/characters" element={<Characters/>}/>
                <Route path="/clans" element={<Clans/>}/>
                <Route path="/villages" element={<Villages/>}/>
                <Route path="/akatsuki" element={<Akatsuki/>}/>
                <Route path="/tailedbeasts" element={<TailedBeasts/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
