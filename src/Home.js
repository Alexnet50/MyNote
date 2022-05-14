import React from "react";
import { Button } from '@mui/material';
import { Link } from "react-router-dom";
import Typography from '@mui/material/Typography';

export default function Home() {
    return (
        <>            
            <Typography variant="h2" component="div" color="primary" gutterBottom>
                MyNote
            </Typography>
            <Link to="signin" underline="none">
                <Button variant="outlined" size="medium"
                    >Sign In
                </Button> 
            </Link>
        </>
        
    )
}