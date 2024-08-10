import React, { useState, useEffect } from "react";
import PageTemplate from "../components/templateFantasyMoviePage";
import FantasyMovieForm from "../components/fantasyMovieForm";
import LlamaAI from 'llamaai';

const apiToken = 'LL-Rx1a3iuvYUD27HNR5fx9YO0kEUxTL0RiAMWdmpPBxal4aePm5qfhALzlt0DOprOk';
const llamaAPI = new LlamaAI(apiToken);

const FantasyMoviePage: React.FC = () => {
    const [apiResponse, setApiResponse] = useState(null);
    const [error, setError] = useState(null);

    const apiRequestJson = {
        'model': 'llama-70b-chat',
        'max_token': 500,
        'temperature': 0.9,
        'messages': [
            {
                'role': 'user',
                'content': "Create a fantasy movie title and a brief description."
            }
        ]
    };

    useEffect(() => {
        llamaAPI.run(apiRequestJson)
            .then(response => {
                setApiResponse(response);
            })
            .catch(error => {
                setError(error.message);
            });
    }, []);

    return (
        <>
            <PageTemplate pageTitle="Fantasy Movie">
                <FantasyMovieForm/>

                <p>something additional here</p>
                <pre>{JSON.stringify(apiResponse, null, 2)}</pre>
                {error && <p>Error: {error}</p>}
            </PageTemplate>
        </>
    );
};

export default FantasyMoviePage;