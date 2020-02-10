import React, { Component } from 'react'
import context from '../context'
import config from './../config';

export class AddFolder extends Component {
  static contextType = context;
  
  render() {

    handleAddNewFolder = (e) => {
      e.preventDefault();
      
      const folderName = {
        name: e.target.addFolder.value
      }
      fetch(`${config.API_ENDPOINT}/folders`,
        {
          method: 'POST',
          body: JSON.stringify(folderName),
          headers: {
            'Content-Type' : 'application/json'
          }
        })
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            return response.json().then( e => Promise.reject(e))
          }
        })
        .then(resJson => {
          this.context.addFolder(resJson)
        })
    }

    return (
      <form onSubmit={this.handleAddNewFolder}>
        <label htmlFor="addFolder"> Add a Folder! </label>
        <input
          required
          placeholder="Your Folder"
          name="addFolder"
          id="addFolder"
          type="text"
        />
        <button type="submit"> Submit Your Folder </button> 
      </form>
    )
  }
}

export default AddFolder
