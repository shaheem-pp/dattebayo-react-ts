import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

// Replace with your API URL
const API_URL = "https://dattebayo-api.onrender.com/";

function CardDetails() {
    const {id} = useParams();
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        if (id) {
            fetch(`${API_URL}${id}`)
                .then(response => response.json())
                .then(data => setData(data))
                .catch(error => console.log(error));
        }
    }, [id]);

    if (!data) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container">
            <h2>{data.title || id}</h2>
            <p>{data.description || "No description available."}</p>
            <div>
                {data.image && <img src={data.image} alt={data.title || id}/>}
            </div>
            {/* Render other dynamic content based on data */}
        </div>
    );
}

export default CardDetails;