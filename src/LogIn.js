import {TextField, Box, FormGroup, Button, Container} from '@mui/material';
import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";

export default function LogIn() {
    return (
        <>
            <Link to="signin">
                <Button variant="outlined" size="medium"
                    >Sign In
                </Button> 
            </Link>

            <Link to="profile">
                <Button variant="outlined" size="medium"
                    >Log in
                </Button> 
            </Link>
        </>
        
    )
}