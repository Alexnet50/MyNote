import React, { useContext, useState } from 'react';
import { Link } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { NotesContext } from './App';

export default function NotesList() {
    const { notes, setNotes } = useContext(NotesContext);
    const [ state, setState ] = useState(0);    
    
    const handleDelete = (event) => {    
        let n = notes;
        const eventId = event.currentTarget.id;        
        const deleteIndex = n.findIndex(item => item.id == eventId);           
        n.splice(deleteIndex, 1);     
        setNotes(n);
        setState(eventId);                  
    }

    const handleEdit = (event) => {  
        let n = notes;
        const eventId = event.currentTarget.id;        
        const editId = n.find(item => item.editing >= 0);
        if (editId) {
            editId.editing = eventId
        } else {
            n.push({
                "editing": eventId
            })           
        }      
        setNotes(n);
        setState(eventId); 
    }
    
    if (notes.length > 0) {
        return (
            <List>                   
                {notes.map(note => {
                    if (!note.editing) {
                        return (                        
                            <ListItem
                                key={note.id}   
                                divider           
                            >                            
                                <ListItemText primary={note.data} />
    
                                <Link to="note">
                                    <IconButton edge="end" id={note.id} onClick={handleEdit}>
                                        <EditIcon color="primary" fontSize="small"/>
                                    </IconButton>
                                </Link>
    
                                <IconButton edge="end" id={note.id} onClick={handleDelete}>
                                    <DeleteIcon color="primary" fontSize="small"/>
                                </IconButton>
                            </ListItem>
                        )
                    }                   
                })}                             
            </List>
        );
    } else return (
        <List>
            <ListItem>                
                <ListItemText primary="No notes yet" />                
            </ListItem>
        </List>
    )    
};
