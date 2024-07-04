import React from "react";  // useState/useEffect redundant
import Grid from "@mui/material/Grid";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import {getPersonImages} from "../../api/tmdb-api";
import { PersonImage, BasePeopleProps} from "../../types/interfaces";
import { useQuery } from "react-query";
import Spinner from '../spinner';
import PersonHeader from "../headerPerson";

const styles = {
    gridListRoot: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
    },
    gridListTile: {
        width: 450,
        height: '100vh',
    },
};

interface TemplatePersonPageProps {
    person: BasePeopleProps;
    children: React.ReactElement;
}


const TemplatePersonPage: React.FC<TemplatePersonPageProps> = ({person, children}) => {
    const { data, error, isLoading, isError } = useQuery<PersonImage[], Error>(
        ["images", person.id],
        () => getPersonImages(person.id)
    );

    if (isLoading) {
        return <Spinner />;
    }

    if (isError) {
        return <h1>{(error

        ).message}</h1>;
    }

    const images = data as PersonImage[];

    return (
        <>
            <PersonHeader {...person} />

            <Grid container spacing={5} style={{ padding: "15px" }}>
                <Grid item xs={3}>
                    <div>
                        <ImageList cols={1}>
                            {images.map((image: PersonImage) => (
                                <ImageListItem
                                    key={image.file_path}
                                    sx={styles.gridListTile}
                                    cols={1}
                                >
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500/${image.file_path}`}
                                        alt={'Image alternative'}
                                    />
                                </ImageListItem>
                            ))}
                        </ImageList>
                    </div>
                </Grid>

                <Grid item xs={9}>
                    {children}
                </Grid>
            </Grid>
        </>
    );
};

export default TemplatePersonPage;