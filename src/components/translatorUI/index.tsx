import LanguageIcon from '@mui/icons-material/Language';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import React, {useState} from "react";

const TranslatorFilterUI = () => {

    const [language, setLanguage] = useState("en-US");
    const handleButtonClick = () => {
        if (language == 'en-US') {
            setLanguage('uk-UA');
            console.log('Language changed to uk-UA');
        } else {
            setLanguage('en-US');
            console.log('Language changed to en-US');
        }
    };
    return (
            <IconButton aria-label="translate" onClick={handleButtonClick}>
                <LanguageIcon color="inherit"/>
                <Typography variant="caption" sx={{ ml: 0 }}>
                    {language === 'en-US' ? 'en' : 'ua'}
                </Typography>
            </IconButton>
    );
};

export default TranslatorFilterUI