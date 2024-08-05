import React from "react";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import StarRate from "@mui/icons-material/StarRate";
import Typography from "@mui/material/Typography";
import {BasePeopleProps, PersonSocialMedia} from "../../types/interfaces";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
import YouTubeIcon from '@mui/icons-material/YouTube';
import {useQuery} from "react-query";
import {getPersonSocialMedia} from "../../api/tmdb-api.ts";


const styles = {
    chipSet: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
        listStyle: "none",
        padding: 1.5,
        margin: 0,
    },
    chipLabel: {
        margin: 0.5,
    },
    fab: {
        position: "fixed",
        top: 50,
        right: 2,
    },
};

const PersonDetails: React.FC<BasePeopleProps> = (person) => {
    const { data: social, error, isLoading, isError } = useQuery<PersonSocialMedia, Error>(
        ["social", person.id],
        () => getPersonSocialMedia(person.id)
    );
    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error: {error.message}</div>;
    return (
        <>
            <Typography variant="h5" component="h3">Overview</Typography>
            <Typography variant="h6" component="p">{person.biography}</Typography>
            <Paper component="ul" sx={styles.chipSet}>
                <Chip icon={<StarRate />} label={`${person.popularity} popularity`} />
            </Paper>
            <Paper component="ul" sx={styles.chipSet}>
                {social.facebook_id && (
                <Chip
                    icon={<FacebookIcon />}
                    label="Facebook"
                    component="a"
                    href={`https://facebook.com/${social.facebook_id}`}
                    clickable
                    />)}
                {social.instagram_id && (
                <Chip
                    icon={<InstagramIcon />}
                    label="Instagram"
                    component="a"
                    href={`https://instagram.com/${social.instagram_id}`}
                    clickable
                />)}
                {social.twitter_id && (
                <Chip
                    icon={<XIcon />}
                    component="a"
                    href={`https://x.com/${social.twitter_id}`}
                    clickable
                />)}
                {social.youtube_id && (
                <Chip
                    icon={<YouTubeIcon />}
                    label="Youtube"
                    component="a"
                    href={`https://youtube.com/${social.youtube_id}`}
                    clickable
                />)}
            </Paper>
        </>
    );
};
export default PersonDetails;