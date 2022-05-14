import React, { useContext, useState } from 'react';
import { NotesContext } from './App';
import { Link } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { Container } from '@mui/material';
import StyledEngineProvider from "@mui/material/StyledEngineProvider";
import SubtasksList from './SubtasksList';
import BasicDatePicker from './DatePicker'
import moment from 'moment';

let idCounter = 0;

export default function Note() {
    const { notes, setNotes } = useContext(NotesContext);
    const [ state, setState ] = useState(0);
    const updateState = (value) => setState(value);        

    const editingId = notes.find(item => item.editing >= 0);
    const editingNote = notes.find(item => item.id == editingId.editing);
    
    return (
        <>
        <NoteContent editingNote={editingNote}/>
        <NoteEdit editingId={editingId.editing} state={updateState}/>
        </>
    )
}

function NoteContent(props) {        
    return (        
        <Paper
            elevation={3}
            sx={{ 
                mb: 2,                                      
                borderRadius: 3,
                p: 2,
                maxWidth: 500,
            }}
        >   
            <h2>{props.editingNote.data}</h2>            
            
            <h3>{props.editingNote.description}</h3>

            {props.editingNote.date &&
                <h4>End date: {moment(props.editingNote.date).format('DD MMM, YYYY  HH:mm')}</h4>                
            }        
            <SubtasksList />
        </Paper>         
    )
}

function NoteEdit(props) {
    const { notes, setNotes } = useContext(NotesContext);
    const [description, setDescription] = useState('');  
    const [subtask, setSubtask] = useState('');

    const descriptionClick = () => {
        if (description !== "") {
            const n = notes;
            const editingNote = n.find(item => item.id == props.editingId);
            editingNote.description = description; 
            setNotes(n);
            props.state(description);
            setDescription("");                     
        } 
    }         

    const subtaskClick = () => {
        if (subtask !== "") {
            const n = notes;
            const editingNote = n.find(item => item.id == props.editingId);
            editingNote.subtasks.push({
                content: subtask,
                id: idCounter
            }); 
            setNotes(n);
            props.state(subtask);
            setSubtask("");  
            idCounter++;          
        } 
    }   
    
    const backClick = () => {
        let n = notes;        
        const editIndex = n.findIndex(item => item.editing >= 0);
        n.splice(editIndex, 1);        
        setNotes(n);        
    }
    
    return (
        <>
            <StyledEngineProvider injectFirst>
                <Container 
                    className="container"               
                    sx={{                                                       
                        display: 'flex',
                        mb: 1
                    }}
                >            
                    <TextField label={'Enter a description'} id="description" value={description} sx={{mr: 1, maxWidth: 680}} onChange={(event) => setDescription(event.target.value)} size="small" />
                    <Button variant="outlined" size="medium" onClick={descriptionClick}
                    >Add
                    </Button>               
                </Container>

                <Container 
                    className="container"               
                    sx={{                                                       
                        display: 'flex',
                        mb: 2
                    }}
                >            
                    <TextField label={'Enter a sub-task'} id="subtask" value={subtask} sx={{mr: 1, maxWidth: 680}} onChange={(event) => setSubtask(event.target.value)} size="small" />
                    <Button variant="outlined" size="medium" onClick={subtaskClick}
                    >Add
                    </Button>               
                </Container>

                <Container 
                    className="container"               
                    sx={{                                                       
                        display: 'flex',
                        mb: 1
                    }}
                >            
                    <BasicDatePicker state={props.state} />
                </Container>
            </StyledEngineProvider> 

            <Link to="../profile" underline="none">
                <Button variant="outlined" size="medium" onClick={backClick}>
                    Back
                </Button> 
            </Link> 
        </>        
    )    
};

