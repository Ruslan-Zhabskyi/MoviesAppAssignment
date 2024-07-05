import React, { useState } from "react";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import StarRate from "@mui/icons-material/StarRate";
import Typography from "@mui/material/Typography";
import {BasePeopleProps, PeopleDetailsProps} from "../../types/interfaces";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
import YouTubeIcon from '@mui/icons-material/YouTube';


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

const PersonDetails: React.FC<PeopleDetailsProps> = (person) => {

    return (
        <>
            <Typography variant="h5" component="h3">
                Overview
            </Typography>

            <Typography variant="h6" component="p">
                {person.biography}
            </Typography>
            <Paper component="ul" sx={styles.chipSet}>
            <Chip
                icon={<StarRate />}
                label={`${person.popularity} popularity` }
            />
            </Paper>
            <Paper component="ul" sx={styles.chipSet}>
                <a href={'https://facebook.com/' + person.facebook_id}>
                    <FacebookIcon color="primary" fontSize="large"/>
                </a>

                <a href={'https://instagram.com/' + person.instagram_id}>
                    <InstagramIcon color="primary" fontSize="large"/>
                </a>

                <a href={'https://x.com/' + person.twitter_id}>
                    <XIcon color="primary" fontSize="large"/>
                </a>

                <a href={'https://www.youtube.com/' + person.youtube_id}>
                    <YouTubeIcon color="primary" fontSize="large"/>
                </a>
            </Paper>

        </>
    );
};
export default PersonDetails;