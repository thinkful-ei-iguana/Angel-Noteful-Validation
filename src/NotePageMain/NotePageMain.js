import React from 'react';
import Note from '../Note/Note';
import './NotePageMain.css';
import context from '../context';
import { findNote } from '../notes-helpers';



class NotePageMain extends React.Component {
  static defaultProps = {
    match: { params: {}}
  }

  static contextType= context

  handleDelete = noteId => {
    this.props.history.push(`/`)
  }

  render() {
    const { notes=[] } = this.context
    const { noteId }=this.props.match.params
    const note = findNote(notes, parseInt(noteId)) || { content: '' }

    return (
      <section className='NotePageMain'>
        <Note
          id={note.id}
          name={note.note_name}
          modified={note.date_modified}
          onDeleteNote={this.handleDelete}
        />
        <div className='NotePageMain__content'>
          {note.content.split(/\n \r|\n/).map((para, i) =>
            <p key={i}>{para}</p>
          )}
        </div>
      </section>
    )
  }
}

export default NotePageMain
