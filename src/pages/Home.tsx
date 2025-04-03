import {Col, Container, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import Card from "../components/Card.tsx";

// Importing images
import characters from "../../public/Characters.png";
import clans from "../../public/Clans.png";
import villages from "../../public/Villages.png";
import akatsuki from "../../public/Akatsuki.png";
import tailedbeasts from "../../public/TailedBeasts.png";

// Page Data
const pages = [
    {path: "/characters", title: "Characters", image: characters},
    {path: "/clans", title: "Clans", image: clans},
    {path: "/villages", title: "Villages", image: villages},
    {path: "/akatsuki", title: "Akatsuki", image: akatsuki},
    {path: "/tailedbeasts", title: "Tailed Beasts", image: tailedbeasts}
];

function Home() {
    return (
        <Container className="my-5">
            <h1 className="display-2 fw-bolder text-center">Dattebayo</h1>
            <Row>
                {pages.map(({path, title, image}) => (
                    <Col className="col-6 h-50" key={path}>
                        <Link to={path} className="text-decoration-none w-100 p-2">
                            <Card title={title} image={image}/>
                        </Link>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default Home;
