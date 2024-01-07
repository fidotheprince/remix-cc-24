//$nodeId.tsx is a dynamic route 
//notes.$noteId.tsx is a dynamic route
//for example looks like notes/1
import { Link, json, useLoaderData } from '@remix-run/react';
import { getStoredNotes } from '~/data/notes';

import styles from '../styles/note-details.css';

// Note interface
interface Note {
    id: string;
    title: string;
    content: string;
}

export default function NoteDetailsPage() {

    const note : Note = useLoaderData();

    return (
        <main id="note-details">
            <header>
                <nav>
                    <Link to="/notes">Back to all Notes</Link>
                </nav>
                <h1>{note.title}</h1>
            </header>
            <p id="note-details-content">{note.content}</p>
        </main>
    )
}

export async function loader({ params }: { params: { noteId: string } }) {
    const notes : Note[] = await getStoredNotes();
    const noteId : string = params.noteId;
    const selectedNote = notes.find((note) => note.id === noteId);

    if (!selectedNote) {
        throw json({message: 'Could not find note' + noteId})
    }

    return selectedNote;
}

export function links() {
    return [{ rel: 'stylesheet', href: styles}]
}

//data is from the loader function you can also access params
export function meta({data}: {data: Note}) {
    return [ { title: data.title } ]
}