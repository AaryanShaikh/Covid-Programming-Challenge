import React, { Component } from 'react'
import Covid from './Covid'
import Maps from './Maps'

export class Home extends Component {
    render() {
        return (
            <div className='home-cont'>
                <div className="left">
                    <Maps getIsLogged={this.props.getIsLogged} />
                </div>
                <div className="right">
                    <Covid />
                </div>
            </div>
        )
    }
}

export default Home
