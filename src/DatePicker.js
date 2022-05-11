import React, { useContext, useState } from 'react';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { NotesContext } from './App';

export default function BasicDatePicker(props) {
    const { notes, setNotes } = useContext(NotesContext);
    const [date, setDate] = useState(null);

    const editingId = notes.find(item => item.editing >= 0);

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DateTimePicker
            label="End date and time"
            value={date}            
            onChange={(newValue) => {
                newValue.setSeconds(0);                
                const n = notes;
                const editingNote = n.find(item => item.id == editingId.editing);                 
                editingNote.date = newValue;
                setNotes(n);
                setDate(newValue);
                props.state(newValue);                
            }}
            renderInput={(params) => <TextField {...params} />}
            ampm={false}
        />
        </LocalizationProvider>
    );
}