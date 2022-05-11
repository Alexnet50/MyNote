import './App.css';
import {TextField, Box, FormGroup, Button, Container} from '@mui/material';
import {useEffect, useState} from "react";
import {auth, db} from "./config";
import {collection, getDocs, addDoc, updateDoc, doc} from "firebase/firestore";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

function App() {

    const emailReg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const passReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmedPassword, setConfirmedPassword] = useState('')
    const [emailError, setEmailError] = useState(false)

    const userRef = collection(db, 'users');
    const prodRef = collection(db, 'products');
    const [users, setUsers] = useState();

    const getUsers = async () => {
        const data = await getDocs(userRef);
        setUsers(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
    }

    useEffect(() => {
        getUsers();
    }, []);


    const emailHandler = (email) => {
        setEmail(email)
        isEmailValid()
        setEmailError(!isEmailValid())
    }

    const passwordHandler = (password) => {
        setPassword(password)
    }

    const confirmPasswordHandler = (password) => {updateProfile
        setConfirmedPassword(password)
    }

    const handleSave = async () => {
        const user = {name: 'Petro', lastName: "Petro1"};
        await addDoc(userRef, user);
        getUsers();

        createUserWithEmailAndPassword(auth, 'email@kkgg.com', 'password')
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                console.log(user);
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            });
    }

    const handleCreateUser = async () => {updateProfile
        createUserWithEmailAndPassword(auth, 'email@kkgg1.com', 'password')
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                console.log(user);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
            });
    }


    //https://firebase.google.com/docs/auth/admin/manage-users

    const handleSignIn = () => {
        signInWithEmailAndPassword(auth, 'yana@gmail.com', '123456')
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                console.log(user);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);updateProfile
            });
    }

    const handleChange = async () => {
        const id = "43zlPS0u6U7o7OQeffhL";

        await updateDoc(doc(db,'users', id), {name: 'Perto'});
        getUsers();
    }

    const isEmailValid = () => emailReg.test(email)

    const isPasswordValid = () => passReg.test(password) && password === confirmedPassword

    return (
        <Container maxWidth={'xs'}>
            <FormGroup>
                <Box my={2}>
                    <TextField
                        error={emailError}
                        type='text'
                        placeholder='Email'
                        label="Email"
                        helperText={emailError && "Incorrect email"}
                        onChange={event => emailHandler(event.target.value)}
                    />
                </Box>
                <Box my={2}>
                    <TextField
                        type='password'
                        placeholder='Password'
                        onChange={event => passwordHandler(event.target.value)}

                    />
                </Box>
                <Box my={2}>
                    <TextField
                        type='password'
                        placeholder='Confirm Password'
                        onChange={event => confirmPasswordHandler(event.target.value)}
                    />
                </Box>

                <Box>
                    <Button variant="outlined"
                            disabled={!isEmailValid() || !isPasswordValid()}
                            onClick={handleSave}
                    >
                        Submit
                    </Button>
                </Box>

            </FormGroup>


            <Button variant="outlined"
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
            {JSON.stringify(users)}
        </Container>
    );
}

export default App;
