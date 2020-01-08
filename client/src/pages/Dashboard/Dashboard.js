import React, { Component, useState } from 'react';
import PetEnhancer from '../../components/PetEnhancer/PetEnhancer';
import PetStatus from '../../components/PetStatus/PetStatus';
import TaskList from '../../components/TaskList/TaskList';

export default function Dashboard(props) {
  const authContext = useContext(AuthContext);
  const [health, setHealth] = useState(authContext.user.pet.health);
  const [points, setPoints] = useState(authContext.user.points);
  const user = authContext.user
  const handleSubmit = event => {
    event.preventDefault();
    
  };

  const petDeathTimer = setInterval(() => {
    const pHealth = health - 10
    setHealth(pHealth);
    if (health <= 0) {
      clearInterval(petDeathTimer)
    }
  }, 30000);

    
  const handleInputChange = event => {
    console.log("============================================")
    console.log(points)
      const { value } = event.target;
          if (value < 0) {
              return;
          } else if (value > user.points) {
              return;
          }
      setPoints(value);
  };

  return (
    <div className='Dashboard'>
      <div className='row'>
        <div className='col'>
          <PetStatus health={health} />
          <PetEnhancer handleSubmit={handleSubmit} points={points} handleInputChange={handleInputChange} />
          <TaskList />
        </div>
      </div>
    </div>
  );

}

export default Dashboard;
