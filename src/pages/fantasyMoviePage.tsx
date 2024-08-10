import React, { useState, useEffect } from "react";
import PageTemplate from "../components/templateFantasyMoviePage";
import FantasyMovieForm from "../components/fantasyMovieForm";
import LlamaAI from 'llamaai';

const apiToken = 'LL-Rx1a3iuvYUD27HNR5fx9YO0kEUxTL0RiAMWdmpPBxal4aePm5qfhALzlt0DOprOk';
const llamaAPI = new LlamaAI(apiToken);

const FantasyMoviePage: React.FC = () => {
    const [apiResponse, setApiResponse] = useState(null);
    const [error, setError] = useState(null);

    const api_request_json = {
        'model': 'llama-13b-chat',
        'functions': [
            {
                "name": "Person",
    "description": "Identifying information about a person.",
    "parameters": {
        "type": "object",
            "properties": {
            "name": {"title": "Name", "description": "The person's name", "type": "string"},
            "age": {"title": "Age", "description": "The person's age", "type": "integer"},
            "fav_food": {
                "title": "Fav Food",
                    "description": "The person's favorite food",
                    "type": "string",
            },
        },
        "required": ["name", "age"]
    }
}
],
    'function_call': {'name': 'Person'},
    'messages': [
        {'role': 'user', 'content': "John is 23 years old. He likes to eat pizza."}],
};

    useEffect(() => {
        llamaAPI.run(api_request_json)
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