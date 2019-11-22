// import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
// import { format } from 'date-fns';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import PropTypes from 'prop-types';
// import config from '../config';
// import context from './../context';
// import './Note.css';


// export default class Note extends Component {
//   static defaultProps={
//     onDeleteNote: () => {}
//   }

//   static contextType = context;

//   handleDeleteClicked = (e)=> {
//     e.preventDefault();
//     const noteId = this.props.id;
//     // const { handleDelete } = this.context;
//     // handleDelete( id ); 
//     // return history.push('/');
//     fetch(`${config.API_ENDPOINT}/notes/${noteId}`, {
//       method: 'DELETE',
//       headers: {'contentType' : 'application/json'}
//     })
//     .then(res => {
//       if(!res.ok)
//         return res.json().then(e => Promise.reject(e))
//         return res.json()
//     })
//     .then( ()=>{
//       this.context.onDeleteNote(noteId)
//       this.props.onDeleteNote(noteId)
//     })
//     .catch(error => {
//       console.error({error})
//     })
//   }

//   render() {
//     const { id, name, modified } = this.props;
//     return ( <div className='Note'>
//       <h2 className='Note__title'>
//         <Link to={`/note/${ id }`}>
//           {name}
//         </Link>
//       </h2>
//       <button className='Note__delete' type='button' onClick={this.handleDeleteClicked}>
//         <FontAwesomeIcon icon='trash-alt'/> {' '}
//         remove
//       </button>
//       <div className='Note__dates'>
//         <div className='Note__dates-modified'>
//           Modified {' '}
//           <span className='Date'>
//             {format( modified, 'Do MMM YYYY' )}
//           </span>
//         </div>
//       </div>
//     </div> )
//   }
// }

// Note.propTypes = {
//   name: PropTypes.string,
//   id:PropTypes.string,
//   modified:PropTypes.string,
//   onDeleteNote: PropTypes.func
// }

import React from 'react'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PropTypes from 'prop-types';
import context from '../context'
import config from '../config'
import './Note.css'

export default class Note extends React.Component {
  static defaultProps = {
    onDeleteNote: () => {}
  }
  static contextType = context;

  handleClickDelete = e => {
    e.preventDefault()
    const noteId = this.props.id

    fetch( `${ config.API_ENDPOINT}/notes/${ noteId }`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      }
    } ).then( res => {
      if ( !res.ok ) 
        return res.json().then( e => Promise.reject( e ) )
      return res.json()
    } ).then( () => {
      this.context.deleteNote( noteId )
      // allow parent to perform extra behaviour
      this.props.onDeleteNote( noteId )
    } ).catch( error => {
      console.error( { error } )
    } )
  }

  render() {
    const { name, id, modified } = this.props
    return ( <div className='Note'>
      <h2 className='Note__title'>
        <Link to={`/note/${ id }`}>
          {name}
        </Link>
      </h2>
      <button className='Note__delete' type='button' onClick={this.handleClickDelete}>
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
    </div> )
  }
}

Note.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string,
  modified: PropTypes.string,
  onDeleteNote: PropTypes.func
}