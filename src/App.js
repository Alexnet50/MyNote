import { Routes, Route } from "react-router-dom";
import React, { useState, useMemo } from 'react';
import Box from '@mui/material/Box';
import { cyan } from '@mui/material/colors';
import NotesInput from './NotesInput';
import Note from './Note';
import SignIn from './SignIn';
import Home from './Home';

export const NotesContext = React.createContext({
    notes: [],
    setNotes: () => {},
});

function App() {
    const [notes, setNotes] = useState([]);
    const value = useMemo(() => ({ notes, setNotes }), [notes]);  

    function dateCheck() {                   
        setTimeout(function check() {                                                      
            notes.forEach(item => {                                                      
                if (item.date && item.date.getTime() < Date.now() && item.date.getTime() + 1000 > Date.now()) {                        
                    alert(item.data + ' is overdue!')                        
                } 
            });            
            setTimeout(check, 1000);              
        }, 1000)               
    }  
    dateCheck();       

    return (
        <NotesContext.Provider value={value}>
                <>  
                    <Box
                        sx={{                                                   
                            boxShadow: 1,
                            borderRadius: 3,
                            p: 2,
                            maxWidth: 500,
                            backgroundColor: cyan[50],
                        }}
                    >     
                        <Routes>
                            <Route path="/" element={<Home /> } />
                            <Route path="signin" element={<SignIn /> } />
                            <Route path="profile/*" element={<NotesInput /> } />
                            <Route path="profile/note" element={<Note /> } />               
                        </Routes> 
                    </Box>
                </>
            </NotesContext.Provider>   
    );
}

export default App;
