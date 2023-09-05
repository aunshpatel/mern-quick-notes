import { useState, useEffect } from 'react';
import * as notesAPI from "../../utilities/notes-api";
import NewNoteForm from '../../components/NewNoteForm/NewNoteForm';
import './MyNotesPage.css';


export default function MyNotesPage() {
  const [notes, setNotes] = useState([]);
  const [sortOrder, setSortOrder] = useState('descending');
  const [editNoteId, setEditNoteId] = useState(null);
  
  useEffect(() => {
    async function getNotes() {
      const notes = await notesAPI.getAll();
      // const sortedNotes = sortNotes(notes, sortOrder);
      setNotes(notes);
    }
    getNotes();
  });

  function handleAddNote(newNote) {
    setNotes([...notes, newNote]);
  }

  return (
    <>
      <h1>All Notes</h1>
      <NewNoteForm handleAddNote={handleAddNote} />
      {notes.length === 0 ? (
        <p>No Notes Yet!</p>
      ) : (
        <ul>
          {notes.map((note) => (
            <div key={note._id} className="note">
              {note.text} - {new Date(note.createdAt).toLocaleString()}
            </div>
          ))}
        </ul>
      )}
    </>
  );
}