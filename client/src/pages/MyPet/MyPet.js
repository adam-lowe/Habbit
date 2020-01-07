import React, { Component } from 'react';
import PetEnhancer from '../../components/PetEnhancer/PetEnhancer';
import PetStatus from '../../components/PetStatus/PetStatus';
import TaskList from '../../components/TaskList/TaskList';

class MyPet extends Component {
  render() {
    return (
      <div className='Dashboard'>
        <div className='row'>
          <div className='col'>
            <PetStatus/>
            <PetEnhancer/>
            <TaskList/>
          </div>
        </div>
      </div>
    );
  }
}

export default MyPet;
