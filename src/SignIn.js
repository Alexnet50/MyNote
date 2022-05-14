
import './index.css';
import {TextField, Box, FormGroup, Button, Container, Checkbox, FormControlLabel} from '@mui/material';
import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker, DatePickerProps } from '@mui/x-date-pickers/DatePicker';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

export default function SignIn() {

    const emailReg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const passReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/

    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmedPassword, setConfirmedPassword] = useState('')
    const [check, setCheck] = useState(false);
    const [dateOfBirth, setDateOfBirth] = useState(null);       
    const [isFormUnfilled, setIsFormUnfilled] = useState([ null, null, null, null, null, null, 0]);
    const [showPassword, setShowPassword] = useState(false);
    const [secretQuestion, setSecretQuestion] = useState('');
    const [secretAnswer, setSecretAnswer] = useState('');   

    const isEmailValid = () => emailReg.test(email);
    const isPasswordValid = () => passReg.test(password);
    const isConfirmedPasswordValid = () => password === confirmedPassword;
    const isDateOfBirthValid = () => (dateOfBirth ? dateOfBirth.getTime() + 567993600000 < Date.now() : null)

    const firstNameHandler = (firstName) => {
        setFirstName(firstName);
    };

    const lastNameHandler = (lastName) => {
        setLastName(lastName);                
    };

    const emailHandler = (value) => {  
        setEmail(value);              
    };         

    const passwordHandler = (value) => {        
        setPassword(value);
    };

    const confirmPasswordHandler = (value) => {              
        setConfirmedPassword(value);              
    };

    const dateOfBirthHandler = (date) => {        
        setDateOfBirth(() => date);               
    };

    const secretQuestionHandler = (event) => setSecretQuestion(event.target.value);
    const secretAnswerHandler = (value) => setSecretAnswer(value);

    const checkHandler = () => {        
        setCheck(!check); 
        formValidation();        
    };

    const handleClickShowPassword = () => setShowPassword(!showPassword);        
    const handleMouseDownPassword = (event) => event.preventDefault();
    
    const errors = ["Required field",
        "Incorrect email",
        "Too simple password",
        "Passwords are not equivalent",
        "You are under 18 y. o.!"
    ];   
    
    const formValidation = () => {
        let form = isFormUnfilled;

        firstName.length > 1 ? form[0] = false : form[0] = true;        
        lastName.length > 1 ? form[1] = false : form[1] = true;
        email.length > 1 ? form[2] = false : form[2] = true;    
        password.length > 7 ? form[3] = false : form[3] = true;     
        confirmedPassword.length > 7 ? form[4] = false : form[4] = true;     
        isDateOfBirthValid() ? form[5] = false : form[5] = true;
        !form.includes(true) ? form[6] = 1 : form[6] = 0;   

        setIsFormUnfilled(() => form);      
    }


    return (
        <>
            <Typography variant="h6" gutterBottom component="div" color="primary">
                Enter some information about yourself
            </Typography>
            
        <Container maxWidth={'xs'}>
            <FormGroup>
                <Box my={2}>
                    <TextField  
                        required                      
                        type='text'
                        size="small"
                        error={isFormUnfilled[0] && firstName.length === 0}
                        helperText={isFormUnfilled[0] && firstName.length === 0 && errors[0]}
                        placeholder='First name'
                        label="First name"                        
                        onChange={event => firstNameHandler(event.target.value)}
                    />
                </Box>

                <Box my={2}>
                    <TextField  
                        required                      
                        type='text'
                        size="small"
                        error={isFormUnfilled[1] && lastName.length === 0}
                        helperText={isFormUnfilled[1] && lastName.length === 0 && errors[0]}
                        placeholder='Last name'
                        label="Last name"                        
                        onChange={event => lastNameHandler(event.target.value)}
                    />
                </Box>

                <Box my={2}>
                    <TextField
                        required                       
                        type='text'
                        size="small"
                        value={email}
                        placeholder='Email'
                        label="Email"
                        error={(!isEmailValid() && email.length > 0) || email.length === 0 && isFormUnfilled[2]}
                        helperText={(!isEmailValid() && email.length > 0 && errors[1]) 
                            || (isFormUnfilled[2] && email.length === 0 && errors[0])}
                        onChange={event => emailHandler(event.target.value)}
                    />
                </Box>

                <Box my={2}>
                    <FormControl sx={{}} variant="outlined">
                        <InputLabel htmlFor="password">{(!isPasswordValid() && password.length > 0 && errors[2]) 
                            || (isFormUnfilled[3] && password.length === 0 && errors[0])}
                        </InputLabel>
                        <OutlinedInput
                            id="password"                       
                            type={showPassword ? 'text' : 'password'}
                            size="small"
                            value={password}
                            error={(!isPasswordValid() && password.length > 0) || password.length === 0 && isFormUnfilled[3]}
                            label={(!isPasswordValid() && password.length > 0 && errors[2]) 
                                || (isFormUnfilled[3] && password.length === 0 && errors[0])}                            
                            placeholder='Password *'
                            onChange={event => passwordHandler(event.target.value)}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>                    
                </Box>

                <Box my={2}>
                    <FormControl sx={{}} variant="outlined">
                        <InputLabel htmlFor="confirmedPassword">{(!isConfirmedPasswordValid() && confirmedPassword.length > 0 && errors[3]) 
                            || (isFormUnfilled[4] && confirmedPassword.length === 0 && errors[0])}
                        </InputLabel>
                        <OutlinedInput 
                            id="confirmedPassword"                       
                            type={showPassword ? 'text' : 'password'}
                            size="small"
                            value={confirmedPassword}
                            error={(!isConfirmedPasswordValid() && confirmedPassword.length > 0) 
                                || confirmedPassword.length === 0 && isFormUnfilled[4]}
                            label={(!isConfirmedPasswordValid() && confirmedPassword.length > 0 && errors[3]) 
                                || (isFormUnfilled[4] && confirmedPassword.length === 0 && errors[0])}
                            placeholder='Confirm Password *'
                            onChange={event => confirmPasswordHandler(event.target.value)}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                </Box>

                <Box my={2}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker                            
                            label="Date of birth *"
                            value={dateOfBirth}
                            openTo="year"
                            disableFuture                            
                            type="text"
                            size="small" 
                            allowSameDateSelection={true}                                               
                            onChange={newValue => dateOfBirthHandler(newValue)}                            
                            renderInput={(params) => <TextField {...params} error={dateOfBirth !== null && !isDateOfBirthValid()  
                                || (dateOfBirth === null && isFormUnfilled[5])} 
                            helperText={(dateOfBirth !== null && !isDateOfBirthValid() && errors[4]) 
                                || (dateOfBirth === null && isFormUnfilled[5] && errors[0])}/>}                            
                        />
                    </LocalizationProvider>
                </Box>

                <Box my={2}>
                    <FormControl fullWidth>
                        <InputLabel id="select-label">Choose a secret question</InputLabel>
                        <Select
                            labelId="select-label"
                            id="select"
                            size="small"
                            value={secretQuestion}
                            label="Choose a secret question"
                            onChange={secretQuestionHandler}
                        >
                            <MenuItem value={"car color"}>What`s your first car color?</MenuItem>
                            <MenuItem value={"fawourite pet"}>What`s the name of your favourite pet?</MenuItem>
                            <MenuItem value={"born place"}>What`s the place where you were born?</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                <Box my={2}>
                    <TextField                                               
                        type="text"
                        size="small"                        
                        fullWidth                                             
                        placeholder="Answer to your secret question"
                        label="Answer to your secret question"                        
                        onChange={event => secretAnswerHandler(event.target.value)}
                    />
                </Box>

                <FormControlLabel control={
                    <Checkbox 
                        onChange={checkHandler}                        
                    />}
                    label="I agree with the terms and conditions" sx={{mb: 1}}
                />

                <Box>                    
                    <Button variant="outlined" 
                        onClick={formValidation}
                        disabled={(firstName.length < 2 || lastName.length < 2 || !isEmailValid() 
                            || !isPasswordValid() || !isConfirmedPasswordValid() || !isDateOfBirthValid() || !check)
                        }                        
                    >
                        <Link to={'../profile'} underline="none">
                            Create profile
                        </Link>                                
                    </Button>                    
                </Box>
            </FormGroup>            
        </Container>
        </>
    );
}


