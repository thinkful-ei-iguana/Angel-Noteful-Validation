import React from 'react';
import config from '../config';
import context from '../context'

class AddNote extends React.Component {
  static contextType= context;

  addNewNote = (e) => {
    e.preventDefault();

    const newNote = {
      note_name: e.target["addNoteName"].value,
      date_modified: new Date(),
      folder_id: e.target["addNoteFolderId"].value,
      content: e.target["addNoteContent"].value
    }

    fetch(`${config.API_ENDPOINT}/notes`,{
      method: 'POST',
      body: JSON.stringify(newNote),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if(response.ok){
        this.props.history.push('/');
        return response.json();
      } else {
        return response.json()
          .then(e => Promise.reject(e))
      }
    })
    
    .then(resJson => {
      this.context.addNote(resJson);
    })
    .catch (console.error);
  };

  render() {
    const {folders} = this.context;

    return (
      <form onSubmit={this.addNewNote}>
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
        
        <label htmlFor="addNoteFolderId"> Note Folder </label>
        <select required id="addNoteFolderId" name="addNoteFolderId">
          {folders.map(folder => (
            <option key={folder.id} value={folder.id}>
              {folder.folder_name}
            </option>
          ))}
        </select>
        <button type="submit"> Submit Your Note </button>
      </form>
    );
  }
}

export default AddNote;