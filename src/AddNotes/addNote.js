import React from 'react';
import config from './../config';
import context from '../context'

class AddNote extends React.Component {
  static contextType= context;

  addNewNote = (e) => {
    e.preventDefault();
    const note = {
      name: e.target["addNote-name"].value,
      modified: new Date(),
      folderId: e.target["addNote-folderId"].value,
      content: e.target["addNote-content"].value
    };
    fetch(`${config.API_ENDPOINT}/notes`,{
      method: 'POST',
      body: JSON.stringify(note),
      headers: {'Content-Type': 'application/json'}
    })
    .then(response => {
      if(response.ok){
        return response.json();
      } else {
        return response.json().then(e => Promise.reject(e))
      }
    })
    .then(resJson => {
      this.context.addNote(resJson);
    })
    .catch (console.error);
  };

  render() {
    const {addNewNote} = this.context;

    return (
      <form onSubmit={addNewNote}>
        <label htmlFor="addNoteName"> Note Name: </label>
        <input 
          required
          id="addNoteName" 
          type="text" 
          name="addNoteName"
          placeholder="Your Note Name" 
        />
        <label htmlFor="addNoteContent"> Note Content </label>
        <textarea
          required
          type="text"
          id="addNoteContent"
          name="addNoteContent"
          placeholder="Your Note Content"
        />
        <label htmlFor="addNote-folderId"> Note Folder </label>
        <select required id="addNote-folderId" name="addNote-folderId">
          {folders.map(f => (
            <option key={f.id} value={f.id}>
              {f.name}
            </option>
          ))}
        </select>
        <button type="submit"> Submit Your Note </button>
      </form>
    );
  }
}

export default AddNote