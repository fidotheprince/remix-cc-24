import { Link } from '@remix-run/react';
import homeStyles from '../styles/home.css';

export default function Index(){
  return (
    <main id="content">
      <h1>A better way of keeping track of your notes</h1>
      <p>Keep track of your notes with <strong>Notes</strong></p>
      <p id="cta">
        <Link to="/notes">Try Now</Link>
      </p> 
    </main>
  )
}

//link tag gets inserted into the head of the document when the page is rendered
export function links() {
  return [{rel: 'stylesheet', href: homeStyles}]
}