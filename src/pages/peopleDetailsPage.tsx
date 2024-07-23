import React, {useContext} from "react"; // replace existing react import
import { useParams } from "react-router-dom";
import PeopleDetails from "../components/peopleDetails";
import PageTemplate from "../components/templatePeoplePage";
// import useMovie from "../hooks/useMovie";   Redundant
import { getPerson } from '../api/tmdb-api'
import { useQuery } from "react-query";
import Spinner from '../components/spinner';
import {BasePeopleProps} from "../types/interfaces";
import {LanguageContext} from "../contexts/languageContext.tsx";

const PersonDetailsPage: React.FC= () => {
    const { language } = useContext(LanguageContext);
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
                    <PageTemplate person={person}>
                        <PeopleDetails {...person} />
                    </PageTemplate>
                </>
            ) : (
                <p>Waiting for person details</p>
            )}
        </>
    );
};

export default PersonDetailsPage;