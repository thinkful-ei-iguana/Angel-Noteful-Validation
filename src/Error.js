import React from 'react';
import PropTypes from 'prop-types';

class Error extends React.Component {
  state= {
    error: null
  };

  static getDerivedStateFromError(error) {
    return {error};
  }

  render(){

    if (this.state.error){
      return(
      <div className="error-page">
        <h1> Something seems to have gone wrong</h1>
        <p> Try refreshing the page </p>  
      </div>)
      }
      return this.props.children;
  }
}

Error.PropTypes={children: PropTypes.oneOfType([string, PropTypes.array])}

export default Error