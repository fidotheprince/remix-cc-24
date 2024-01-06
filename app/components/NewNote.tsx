import styles from './NewNote.css';


//important note remix assumes natural form behavior, so we don't need to add an onSubmit handler
//action attribute is not needed because we are using the default route 
//in other words the form gets submitted to the same route that rendered it
function NewNote() {
  return (
    <form method="post" id="note-form">
      <p>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" name="title" required />
      </p>
      <p>
        <label htmlFor="content">Content</label>
        <textarea id="content" name="content" rows="5" required />
      </p>
      <div className="form-actions">
        <button>Add Note</button>
      </div>
    </form>
  );
}

export default NewNote;

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}