import React, { Component } from 'react'
import context from '../context'
import config from './../config';

export class AddFolder extends Component {
  static contextType = context;
  
  render() {
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
  handleAddNewFolder = (e) => {
    e.preventDefault();
    
    const folderName = {
      folder_name: e.target.addFolder.value
    }
    fetch(`${config.API_ENDPOINT}/folders`,{
        method: 'POST',
        body: JSON.stringify(folderName),
        headers: {
          'Content-Type' : 'application/json',
          'Access-Control-Allow-Origin' : '*'
        }
      })
      .then(response => {
        if (response.ok) {
          this.props.history.push('/')
          return response.json();
        } else {
          return response.json()
            .then( e => Promise.reject(e))
        }
      })
      .then(resJson => {
        this.context.addFolder(resJson)
      })
  }
}

export default AddFolder
