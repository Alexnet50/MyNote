import React, { useState, useContext } from 'react';
import { Routes, Route } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import NotesList from './NotesList';
import { NotesContext } from './App';
import { Container } from '@mui/material';
import StyledEngineProvider from "@mui/material/StyledEngineProvider";
import './index.css';
import Note from './Note';

let idCounter = 0;

export default function NotesInput() {
    const { notes, setNotes } = useContext(NotesContext);
    const [input, setInput] = useState('');  

    const handleClick = () => {
        if (input !== "") {
            const n = notes;
            n.push({
                "id": idCounter,        
                "data": input,
                "description": '',
                "subtasks": [],
                "date": '',
            });        
            setNotes(n);
            setInput("");
            idCounter++; 
        }          
    }
    return (        
        <>  
            <Container 
                className="container"               
                sx={{                                                       
                    display: 'flex',
                }}
            >            
                <Typography variant="h6" color="primary" gutterBottom component="div">
                    MyNote
                </Typography>              
            </Container>

            <StyledEngineProvider injectFirst>
                <Container 
                    className="container"               
                    sx={{                                                       
                        display: 'flex',
                        ml: -3,
                    }}
                >            
                    <TextField label={'Enter a note'} id="input" value={input} sx={{mr: 1, minWidth: 400}} onChange={(event) => setInput(event.target.value)} size="small" />
                    <Button variant="outlined" size="medium" onClick={handleClick}
                    >Add
                    </Button>               
                </Container>
            </StyledEngineProvider>                      
                
            <Paper
                elevation={3}
                sx={{ 
                    mt: 1,                                                          
                    borderRadius: 3,
                    p: 2,
                    maxWidth: 500,
                }}
            >   
                <Routes>
                    <Route path="/" element={<NotesList />} />
                    <Route path="profile/note" element={<Note />} />               
                </Routes>                           
            </Paper>
        </>   
    )
}
