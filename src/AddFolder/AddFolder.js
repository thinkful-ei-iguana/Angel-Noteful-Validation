import React from 'react';
import config from '../config'
import context from '../context'

class AddFolder extends React.Component{
  static contextType= context;

  addNewFolder = (e) => {
    e.preventDefault();
    const folderName = {
      name: e.target.addFolder.value
    }
    fetch(`${config.API_ENDPOINT}/folders`,{
      method: 'POST',
      body: JSON.stringify(folderName),
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
      this.context.addFolder(resJson);
    })
  }

  render() {
    const {addNewFolder} = this.addNewFolder
    return (
      <form onSubmit={addNewFolder}>
        <label htmlFor="addFolder"> Folder Name: </label>
        <input 
          id="addFolder" 
          type="text" 
          name="addFolder"> 
        </input>
        <button type="Submit"> Submit Folder </button>
      </form>
    )
  }
}

export default AddFolder;