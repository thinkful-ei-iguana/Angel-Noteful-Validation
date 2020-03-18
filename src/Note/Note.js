import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import config from '../config';
import context from './../context';
import './Note.css';


export default class Note extends Component {
  static defaultProps={
    onDeleteNote: () => {}
  }

  static contextType = context;

  handleDeleteClicked = e => {
    e.preventDefault();
    const note_id = this.props.id;

    fetch(`${config.API_ENDPOINT}/notes/${note_id}`, {
      method: 'DELETE',
      headers: {
        'contentType' : 'application/json'
      },
    })
    .then(res => {
      if(!res.ok)
        return res.json().then(e => Promise.reject(e))
    })
    .then( ()=> {
      this.context.deleteNote(note_id)
      this.props.onDeleteNote(note_id)
    })
    .catch(error => {
      console.error({error})
    })
  }

  render() {
    const { id, name, modified } = this.props;
    return ( 
      <div className='Note'>
        <h2 className='Note__title'>
          <Link to={`/note/${ id }`}>
            {name}
            {console.log(name)}
          </Link>
        </h2>
        <button className='Note__delete' type='button' onClick={this.handleDeleteClicked}>
          <FontAwesomeIcon icon='trash-alt'/> {' '}
          remove
        </button>
        <div className='Note__dates'>
          <div className='Note__dates-modified'>
            Modified {' '}
            <span className='Date'>
              {format( modified, 'Do MMM YYYY' )}
            </span>
          </div>
        </div>
      </div> 
    )
  }
}


