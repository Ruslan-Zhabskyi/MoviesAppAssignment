import React, { ChangeEvent } from "react";  // useState/useEffect redundant
import { FilterOption } from "../../types/interfaces";
import {SelectChangeEvent, Slider} from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SortIcon from '@mui/icons-material/Sort';

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
    onUserInput: (f: FilterOption, s: string)  => void;
    nameFilter: string;
    popularityFilter: number;
    genderFilter: number;
}

const FilterPeopleCard: React.FC<FilterMoviesCardProps> = ({ nameFilter, popularityFilter,  genderFilter, onUserInput }) => {

    const handleChange = (e: SelectChangeEvent, type: FilterOption, value: string) => {
        e.preventDefault()
        onUserInput(type, value)
    };

    const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
        handleChange(e, "name", e.target.value)
    };

    const handlePopularityChange = (e: ChangeEvent<HTMLInputElement>) => {
        handleChange(e, "popularity", e.target.value)
    };

    const handleGenderChange = (e: ChangeEvent<HTMLInputElement>) => {
        handleChange(e, "gender", e.target.value)
    };

    return (
        <>
            <Card sx={styles.root} variant="outlined">
                <CardContent>
                    <Typography variant="h5" component="h1">
                        <FilterAltIcon fontSize="large" />
                        Filter the actors.
                    </Typography>
                    <Typography id="input-slider" gutterBottom>
                        Name Filter
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

                    {/*<Typography id="input-slider" gutterBottom>*/}
                    {/*    Gender Filter*/}
                    {/*</Typography>*/}
                    {/*<TextField*/}
                    {/*    sx={styles.formControl}*/}
                    {/*    id="filled-search"*/}
                    {/*    label="Search field"*/}
                    {/*    type="search"*/}
                    {/*    value={genderFilter}*/}
                    {/*    variant="filled"*/}
                    {/*    onChange={handleGenderChange}*/}
                    {/*/>*/}

                    <Typography id="input-slider" gutterBottom>
                        Popularity Filter
                    </Typography>
                    <Slider
                        aria-label="Popularity"
                        defaultValue={30}
                        valueLabelDisplay="auto"
                        shiftStep={30}
                        step={10}
                        marks
                        min={10}
                        max={200}
                        sx={styles.formControl}
                        id="filled-search"
                        label="Search field"
                        type="search"
                        value={popularityFilter}
                        variant="filled"
                        onChange={handlePopularityChange}
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