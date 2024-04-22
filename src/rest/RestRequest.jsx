import RequestResult from "../RequestResult";
import {useState} from "react";

const RestRequest = props => {
    const [results, setResults] = useState([])
    return (
        <div className="rest-request">
            <h3>Request name</h3>
            <div className="results-container">
                {
                    <RequestResult/>
                }
            </div>
        </div>
    )
}

export default RestRequest;