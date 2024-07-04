import React from "react"; // replace existing react import
import { useParams } from "react-router-dom";
import TemplatePeoplePage from "../components/templatePeoplePage";
import { getPerson } from '../api/tmdb-api'
import { useQuery } from "react-query";
import Spinner from '../components/spinner';
import {BasePeopleProps} from "../types/interfaces";
import {PersonDetails} from "../components/peopleDetails";

const PeopleDetailsPage: React.FC= () => {
    const { id } = useParams();
    const { data: person, error, isLoading, isError } = useQuery<BasePeopleProps, Error>(
        ["person", id],
        ()=> getPerson(id||"")
    );

    if (isLoading) {
        return <Spinner />;
    }

    if (isError) {
        return <h1>{(error as Error).message}</h1>;
    }

    return (
        <>
            {person ? (
                <>
                    <TemplatePeoplePage person={person}>
                        <PersonDetails {...person} />
                    </TemplatePeoplePage>
                </>
            ) : (
                <p>Waiting for people details</p>
            )}
        </>
    );
};

export default PeopleDetailsPage;