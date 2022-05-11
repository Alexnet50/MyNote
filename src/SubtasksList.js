import React, { useContext, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

import { NotesContext } from './App';

export default function SubtasksList(props) {
    const { notes, setNotes } = useContext(NotesContext);
    const [ state, setState ] = useState(0);

    const editingId = notes.find(item => item.editing >= 0);
    const editingNote = notes.find(item => item.id == editingId.editing);

    const handleDelete = (event) => {    
        let n = notes;
        const eventId = event.currentTarget.id; 
        const editNote = n.find(item => item.id == editingId.editing);             
        const deleteIndex = editNote.subtasks.findIndex(item => item.id == eventId);           
        editNote.subtasks.splice(deleteIndex, 1);     
        setNotes(n);
        setState(eventId);                  
    }

    if (editingNote.subtasks.length > 0) {
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
                <h4>Sub-tasks:</h4>
                <List>                   
                    {editingNote.subtasks.map(note => {                   
                        return (                        
                            <ListItem
                                key={note.id}
                                divider                                       
                            >                            
                                <ListItemText primary={note.content} />    
                                
                                <IconButton edge="end" id={note.id} onClick={handleDelete}>
                                    <DeleteIcon color="primary" fontSize="small"/>
                                </IconButton>
                            </ListItem>
                        )                                       
                    })}                             
                </List>
            </Paper>
        );
    } 
};
