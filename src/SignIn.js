
import './index.css';
import {TextField, Box, FormGroup, Button, Container, Checkbox, FormControlLabel} from '@mui/material';
import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker, DatePickerProps } from '@mui/x-date-pickers/DatePicker';
// import {auth, db} from "./config";
// import {collection, getDocs, addDoc, updateDoc, doc} from "firebase/firestore";
// import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

export default function SignIn() {

    const emailReg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const passReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/

    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [password, setPassword] = useState('');
    const [confirmedPassword, setConfirmedPassword] = useState('')
    const [check, setCheck] = useState(false);
    const [dateOfBirth, setDateOfBirth] = useState(null);
    const [emailError, setEmailError] = useState(false);
    const [isFormValid, setIsFormValid] = useState(null);
    // const userRef = collection(db, 'users');
    // const prodRef = collection(db, 'products');
    const [users, setUsers] = useState();

    const getUsers = async () => {
        // const data = await getDocs(userRef);
        // setUsers(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
    }

    let createButtonLink = '';

    useEffect(() => {
        getUsers();
    }, []);

    const firstNameHandler = (firstName) => {
        setFirstName(firstName);        
    };

    const lastNameHandler = (lastName) => {
        setLastName(lastName);        
    };

    const emailHandler = (email) => {
        setEmail(email);
        isEmailValid();
        setEmailError(!isEmailValid());
    };

    const passwordHandler = (password) => {
        setPassword(password);
    };

    const confirmPasswordHandler = (password) => {
        // updateProfile
        setConfirmedPassword(password);
    };

    const dateOfBirthHandler = (date) => {
        
        setDateOfBirth(date);
        isDateOfBirthValid();
        
        // console.log(dateOfBirthError);
    };

    const checkHandler = () => {
        setCheck(!check);
    };

    // console.log(dateOfBirth.getTime);
    
    
    
    const fieldsFilled = () => {
        if (firstName.length > 1 && lastName.length > 1 && check && dateOfBirth) {
            return true
        }
    }

    const isEmailValid = () => emailReg.test(email);

    const isPasswordValid = () => passReg.test(password) && password === confirmedPassword;

    const isDateOfBirthValid = () => dateOfBirth ? dateOfBirth.getTime() + 567993600000 < Date.now() : null; 
    console.log(isDateOfBirthValid());

    const formValidation = () => {
        if (firstName.length > 1
            && lastName.length > 1
            && email.length > 0
            && isEmailValid
            && password.length > 0
            && isPasswordValid
            && dateOfBirth
            && isDateOfBirthValid
            && check
        ) {
            createButtonLink = '../profile';
            setIsFormValid(true);
        }
        else {
            createButtonLink = '../signin';
            setIsFormValid(false);
        }
    }

    return (
        <>
            
        <Container maxWidth={'xs'}>
            <FormGroup>
                <Box my={2}>
                    <TextField                        
                        type='text'
                        size="small"
                        error={true}
                        helperText={firstName <= 1 && "Required field"}
                        placeholder='First name'
                        label="First name"                        
                        onChange={event => firstNameHandler(event.target.value)}
                    />
                </Box>

                <Box my={2}>
                    <TextField                        
                        type='text'
                        size="small"
                        error={lastName <= 1}
                        helperText={lastName <= 1 && "Required field"}
                        placeholder='Last name'
                        label="Last name"                        
                        onChange={event => lastNameHandler(event.target.value)}
                    />
                </Box>

                <Box my={2}>
                    <TextField
                        error={emailError}
                        type='text'
                        size="small"
                        placeholder='Email'
                        label="Email"
                        helperText={emailError && "Incorrect email"}
                        onChange={event => emailHandler(event.target.value)}
                    />
                </Box>
                <Box my={2}>
                    <TextField
                        type='password'
                        size="small"
                        error={password == 0}
                        helperText={password == 0 && "Required field"}
                        placeholder='Password'
                        onChange={event => passwordHandler(event.target.value)}
                    />
                </Box>
                <Box my={2}>
                    <TextField
                        type='password'
                        size="small"
                        error={confirmedPassword == 0}
                        helperText={confirmedPassword == 0 && "Required field"}
                        placeholder='Confirm Password'
                        onChange={event => confirmPasswordHandler(event.target.value)}
                    />
                </Box>

                <Box my={2}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label="Date of birth"
                            value={dateOfBirth}
                            openTo="year"
                            disableFuture                            
                            type='text'
                            size="small"
                            placeholder='Date of birth'                     
                            onChange={newValue => dateOfBirthHandler(newValue)}
                            
                            renderInput={(params) => <TextField {...params} error={!isDateOfBirthValid()} helperText={!isDateOfBirthValid() && "You are under 18 y. o.!"}/>}                            
                        />
                    </LocalizationProvider>
                </Box>

                <FormControlLabel control={
                <Checkbox 
                    onChange={checkHandler} 
                    error={!check}
                    helperText={!check && "Required field"}
                />}
                    label="I agree with the terms and conditions" />

                <Box>                    
                    <Button variant="outlined" 
                        disabled={!isEmailValid() || !isPasswordValid() || !isDateOfBirthValid() || !fieldsFilled()}                           
                    >
                        <Link to={createButtonLink}>
                            Create profile
                        </Link>                                
                    </Button>                    
                </Box>

            </FormGroup>


            {/* <Button variant="outlined"
                    onClick={handleSave}
            >
                Save
            </Button>
            <Button variant="outlined"
                    onClick={handleChange}
            >
                Change
            </Button>

            <Button variant="outlined"
                    onClick={handleCreateUser}
            >
                Create User
            </Button>

            <Button variant="outlined"
                    onClick={handleSignIn}
            >
                Sign In
            </Button>
            {JSON.stringify(users)} */}
        </Container>
        </>
    );
}


