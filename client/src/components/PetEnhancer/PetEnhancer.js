import React, { Component } from 'react';

class PetEnhancer extends Component {
    state = {
        points: 0,
        feedPoints: 0,
        playPoints: 0
    };

    handleInputChange = event => {
        const { name, value } = event.target;

        this.setState({
            [name]: value
        });
    }

    handleSubmit = event => {
        const { feedPoints, playPoints } = this.state;

        this.props.onSubmit(feedPoints, playPoints);
        event.preventDefault();
    }

    render() {
        const { feedPoints, playPoints, points } = this.state;

        return (
            <div className='PetEnhancer'>
                <div className="alert alert-dark" role="alert">You have {points} care points remaining</div>
                <div className='card'>
                    <div className='card-body'>
                        <form className='PetEnhancer' onSubmit={this.handleSubmit}>
                            <div className='input-group mb-3'>
                                <div className="input-group-prepend">
                                    <span className="input-group-text">Feed</span>
                                </div>
                                <input
                                    className='form-control'
                                    id='Feed'
                                    type='number'
                                    name='feedPoints'
                                    placeholder=''
                                    value={feedPoints}
                                    onChange={this.handleInputChange}
                                />
                            </div>

                            <div className='input-group mb-3'>
                                <div className="input-group-prepend">
                                    <span className="input-group-text">Play</span>
                                </div>
                                <input
                                    className='form-control'
                                    id='play'
                                    type='number'
                                    name='playPoints'
                                    placeholder=''
                                    value={playPoints}
                                    onChange={this.handleInputChange}
                                />
                            </div>

                            <button className='btn btn-primary' type='submit'>Care For Pet</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default PetEnhancer;

