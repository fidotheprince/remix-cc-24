import NoteList, {links as noteListLinks} from '~/components/NoteList'; 
import NewNote, { links as newNoteLinks } from '~/components/NewNote';
import { json, ActionFunctionArgs, redirect } from '@remix-run/node';
import { getStoredNotes, storeNotes } from '~/data/notes';
import { useLoaderData } from '@remix-run/react';

// Note interface
interface Note {
    id: string;
    title: string;
    content: string;
}

export default function NotesPage() {

    //useLoaderData hook is used to access the data returned from the loader function
    //Note[] is an array of Note objects
    const notes : Note[] = useLoaderData();
    
    return (
        <main>
            <NewNote />
            <NoteList notes={notes}/>
        </main>
     );
}

//load, fetch, the notes from the data store
//return data is sent to the client, below are three ways to return data
/*
    1. return new Response(JSON.stringify({ notes }), {headers: {'Content-Type': 'application/json'}});
    2. return json(notes);
    3. return notes;
*/
export async function loader() {
    const notes = await getStoredNotes();
    return notes;
}

//action function is used to capture the form data and send it to the server
//data object contains the form data and is destructured below
export async function action({ request }: ActionFunctionArgs) {
    const formData = await request.formData();
    //convert the formData object into a plain object
    const noteData = Object.fromEntries(formData);
    //access json data
    const existingNotes = await getStoredNotes();
    //add an id to the noteData object
    noteData.id = new Date().toISOString();
    //add the new note to the existing notes
    const updatedNotes = existingNotes.concat(noteData);
    //save the updated notes
    await storeNotes(updatedNotes);
    //redirect to the notes page
    return redirect('/notes');
}

//surface the styling links from the NewNote component
export function links() {
    return [...newNoteLinks(), ...noteListLinks()];
}