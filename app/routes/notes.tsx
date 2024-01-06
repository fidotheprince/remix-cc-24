import { ActionFunctionArgs, redirect } from '@remix-run/node';
import NewNote, { links as newNoteLinks } from '~/components/NewNote';
import { getStoredNotes, storeNotes } from '~/data/notes';

export default function NotesPage() {
    return (
        <main>
            <NewNote />
        </main>
     );
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
    return [...newNoteLinks()];
}