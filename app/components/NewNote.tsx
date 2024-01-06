import { Form, useNavigation, useActionData} from '@remix-run/react';
import styles from './NewNote.css';

interface ActionData {
  error?: string;
}

//important note remix assumes natural form behavior, so we don't need to add an onSubmit handler
//action attribute is not needed because we are using the default route 
//in other words the form gets submitted to the same route that rendered it
function NewNote() {
  
  //This hook provides information about a pending page navigation
  const navigation = useNavigation();
  const isSubmitting : boolean = navigation.state === 'submitting';

  const data : ActionData = useActionData() || {};

  return (
    <Form method="post" id="note-form">
      {data.error && <p>{`Invalid: ${data.error}`}</p>}
      <p>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" name="title" required />
      </p>
      <p>
        <label htmlFor="content">Content</label>
        <textarea id="content" name="content" rows="5" required />
      </p>
      <div className="form-actions">
        <button disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Save'}
        </button>
      </div>
    </Form>
  );
}

export default NewNote;

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}