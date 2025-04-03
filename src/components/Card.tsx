import {motion} from "framer-motion";

interface CardProps {
    title?: string;
    image?: string;
}

function Card({title, image}: CardProps) {
    return (
        <motion.div
            className="card w-100"
            whileHover={{y: -10, boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)"}}
            transition={{duration: 0.3, ease: "easeOut"}}
        >
            <img src={image} className="card-img-top" alt="Image"/>
            <div className="card-body text-center">
                <h5 className="card-title text-decoration-none m-0 p-0">{title}</h5>
            </div>
        </motion.div>
    );
}

export default Card;
