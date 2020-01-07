import React, { Component } from 'react';
import PetEnhancer from '../../components/PetEnhancer/PetEnhancer';
import PetStatus from '../../components/PetStatus/PetStatus';

class Dashboard extends Component {
  render() {
    return (
      <div className='Dashboard'>
        <div className='row'>
          <div className='col'>
            <PetStatus/>
            <PetEnhancer/>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
