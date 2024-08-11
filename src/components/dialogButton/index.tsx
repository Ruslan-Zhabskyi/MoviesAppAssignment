import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import {BaseFantasyMovieProps} from "../../types/interfaces.ts";
import LlamaAI from 'llamaai';
import {useState} from "react";

const apiToken = import.meta.env.VITE_API_TOKEN;
const llamaAPI = new LlamaAI(apiToken);


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));
const CustomizedDialogs: React.FC<BaseFantasyMovieProps> = (fantasy) => {
// export default function CustomizedDialogs() {
    const [open, setOpen] = React.useState(false);
    const [apiResponse, setApiResponse] = useState(null);
    const [error, setError] = useState(null);
    const [newTitle, setNewTitle] = useState('');
    const [newOverview, setNewOverview] = useState('');

    const handleClickOpen = () => {

        const apiRequestJson = {
            'model': 'llama-70b-chat',
            'max_token': 500,
            'temperature': 0.9,

            'functions': [
                {
                    "name": "Fantasy",
                    "description": "Creating fantasy movie.",
                    "parameters": {
                        "type": "object",
                        "properties": {
                            "title": {"title": "Title", "description": "Movie's title", "type": "string"},
                            "overview": {
                                "title": "Overview",
                                "description": "Movie's overview",
                                "type": "string",
                            },
                        },
                        "required": ["title", "overview"]
                    }
                }
            ],
            'function_call': {'name': 'Fantasy'},

            'messages': [
                {
                    'role': 'user',
                    'content': `Rephrase a fantasy movie title and a description based on the user-provided title "${fantasy.title}" and description "${fantasy.overview}" like Quentin Tarantino`
                }
            ]
        };

        llamaAPI.run(apiRequestJson)
            .then(response => {
                setApiResponse(response);
                const newTitle = response.choices[0].message.function_call.arguments.title;
                const newOverview = response.choices[0].message.function_call.arguments.overview;
                setNewTitle(newTitle);
                setNewOverview(newOverview);
                setOpen(true);
            })
            .catch(error => {
                setError(error.message);
            });

    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <Button variant="outlined" onClick={handleClickOpen}>
                Quentin Tarantino Version
            </Button>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    Here is GenAI generated title to explain idea to tech savvy person
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent dividers>
                    <Typography gutterBottom>
                        <b>Original Title:</b> {fantasy.title}
                    </Typography>
                    <Typography gutterBottom>
                        <b>Original Overview:</b> {fantasy.overview}
                    </Typography>

                    <Typography gutterBottom>
                        <b>Quentin Tarantino Title:</b> {newTitle}
                    </Typography>
                    <Typography gutterBottom>
                        <b>Quentin Tarantino Overview:</b> {newOverview}
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        Close
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </React.Fragment>
    );
};

export default CustomizedDialogs;