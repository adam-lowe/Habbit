import React, { Component } from 'react';
import { Line } from 'rc-progress';

class PetStatus extends Component {
    state = {
        health: 100
    };

    loseHealth = () => {
        const pHealth = this.state.health - 10
        this.setState({
            health: pHealth
        });
    }

    render() {
        const { health } = this.state;

        return (
            <div className='PetStatus'>
                <div className='card'>
                    <div className='card-body'>
                    <img src="http://placekitten.com/400/300" alt="Kitten"/>
                    <Line percent={ health } strokeWidth="2" strokeColor="#2db7f5" />
                    <button className='btn btn-primary' onClick={this.loseHealth} type='submit'>Pass Time</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default PetStatus;

