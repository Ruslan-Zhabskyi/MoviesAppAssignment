import React, {useContext} from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import StarsIcon from '@mui/icons-material/Stars';
import FavoriteIcon from "@mui/icons-material/Favorite";
import Grid from "@mui/material/Grid";
import img from '../../images/film-poster-placeholder.png';
import { BasePeopleProps } from "../../types/interfaces";
import { Link } from "react-router-dom";
import { PeopleContext } from "../../contexts/peopleContext";
import Avatar from "@mui/material/Avatar";

const styles = {
    card: { maxWidth: 345 },
    media: { height: 500 },
    avatar: {
        backgroundColor: "rgb(255, 0, 0)",
    },
};

interface PeopleCardProps {
    person: BasePeopleProps;
    action: (p: BasePeopleProps) => React.ReactNode;
}

const PeopleCard: React.FC<PeopleCardProps> = ({person, action}) => {

    const { favouritePeople } = useContext(PeopleContext);//NEW
    const isFavouritePerson = favouritePeople.find((id) => id === person.id)? true : false;//NEW

    return (
        <Card sx={styles.card}>
            <CardHeader
                avatar={
                    isFavouritePerson ? (
                        <Avatar sx={styles.avatar}>
                            <FavoriteIcon />
                        </Avatar>
                    ) : null
                }
                title={
                    <Typography variant="h5" component="p">
                        {person.name}{" "}
                    </Typography>
                }
            />
            <CardMedia
                sx={styles.media}
                image={
                    person.profile_path
                        ? `https://image.tmdb.org/t/p/w500/${person.profile_path}`
                        : img
                }
            />
            <CardContent>
                <Grid container>

                        <Typography variant="h6" component="p">
                            {<b>Rating:</b>} {person.popularity} <StarsIcon fontSize="small" />
                            <p> {<b>Original Name:</b>} {person.original_name} </p>
                        </Typography>

                </Grid>
            </CardContent>
            <CardActions disableSpacing>
                {action(person)}
                <Link to={`/popular/people/${person.id}`}>
                    <Button variant="outlined" size="medium" color="primary">
                        More Info ...
                    </Button>
                </Link>
            </CardActions>
        </Card>
    );
}

export default PeopleCard;