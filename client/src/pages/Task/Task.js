import React, { Component } from 'react';

import logo from './logo.svg';
/**
 * This page will be used to create and edit tasks.
 * Start with create, then add support for editing.
 *  * Convert these functions, so we can use hooks.
 * @todo: Link to state?
 * @todo: Make Components 
 */
class TaskPage extends Component {
  render() {
    return (
      <div className='Home'>
        <div className='row'>
          <div className='col'>
            <img src={logo} className='App-logo' alt='logo' />
            <p>
              Edit <code>src/pages/Home.js</code> and save to reload.
            </p>
            <a
              className='App-link'
              href='https://reactjs.org'
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default TaskPage;
