import React, { useContext } from "react";
import LanguageIcon from '@mui/icons-material/Language';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { LanguageContext } from "../../contexts/languageContext";
const TranslatorFilterUI = () => {
    const { language, toggleLanguage } = useContext(LanguageContext);
    return (
        <IconButton aria-label="translate" onClick={toggleLanguage}>
            <LanguageIcon color="inherit"/>
            <Typography variant="caption" sx={{ ml: 0 }}>
                {language === 'en-US' ? 'en' : 'ua'}
            </Typography>
        </IconButton>
    );
};
export default TranslatorFilterUI;