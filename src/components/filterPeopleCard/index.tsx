import React, { ChangeEvent } from "react";  // useState/useEffect redundant
import { FilterOption, GenreData } from "../../types/interfaces"; //include GenreData interface
import { SelectChangeEvent } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SortIcon from '@mui/icons-material/Sort';
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { getGenres } from "../../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from '../spinner';

const styles = {
    root: {
        maxWidth: 345,
    },
    media: { height: 300 },

    formControl: {
        margin: 1,
        minWidth: 220,
        backgroundColor: "rgb(255, 255, 255)",
    },
};

interface FilterMoviesCardProps {
    onUserInput: (f: FilterOption, s: string)  => void; // Add this line
    nameFilter: string;
    // genreFilter: string;
}

const FilterPeopleCard: React.FC<FilterMoviesCardProps> = ({ nameFilter, onUserInput }) => {
    // const { data, error, isLoading, isError } = useQuery<GenreData, Error>("genres", getGenres);
    //
    // if (isLoading) {
    //     return <Spinner />;
    // }
    // if (isError) {
    //     return <h1>{(error as Error).message}</h1>;
    // }
    // const genres = data?.genres || [];
    // if (genres[0].name !== "All") {
    //     genres.unshift({ id: "0", name: "All" });
    // }

    const handleChange = (e: SelectChangeEvent, type: FilterOption, value: string) => {
        e.preventDefault()
        onUserInput(type, value)
    };

    const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
        handleChange(e, "name", e.target.value)
    }

    // const handleGenreChange = (e: SelectChangeEvent) => {
    //     handleChange(e, "genre", e.target.value)
    // };

    return (
        <>
            <Card sx={styles.root} variant="outlined">
                <CardContent>
                    <Typography variant="h5" component="h1">
                        <FilterAltIcon fontSize="large" />
                        Filter the actors.
                    </Typography>
                    <TextField
                        sx={styles.formControl}
                        id="filled-search"
                        label="Search field"
                        type="search"
                        value={nameFilter}
                        variant="filled"
                        onChange={handleTextChange}
                    />

                </CardContent>
            </Card>
            <Card sx={styles.root} variant="outlined">
                <CardContent>
                    <Typography variant="h5" component="h1">
                        <SortIcon fontSize="large" />
                        Sort the actors.
                    </Typography>
                </CardContent>
            </Card>
        </>
    );
}

export default FilterPeopleCard;