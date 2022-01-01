import React, { Component } from 'react'

export class Country extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mainData: this.props.cdata
        }
    }
    formatNumber = (n) => {
        let x = ('' + n).length, p = Math.pow, d = p(10, 2)
        x -= x % 3
        return Math.round(n * d / p(10, x)) / d + " kMBTPE"[x / 3]
    }
    render() {
        return (
            <div className='country-cont'>
                <div className="top">
                    <h1>{this.state.mainData.name}</h1>
                </div>
                <div className="bottom">
                    <div className="data-card">
                        <h2>{this.formatNumber(this.state.mainData.data.confirmed.value)}</h2>
                        <p>Active</p>
                    </div>
                    <div className="data-card">
                        <h2>{this.formatNumber(this.state.mainData.data.recovered.value)}</h2>
                        <p>Recovered</p>
                    </div>
                    <div className="data-card">
                        <h2>{this.formatNumber(this.state.mainData.data.deaths.value)}</h2>
                        <p>Deceased</p>
                    </div>
                    <div className="data-card">
                        <h2>{this.formatNumber(this.state.mainData.data.confirmed.value + this.state.mainData.data.recovered.value + this.state.mainData.data.deaths.value)}</h2>
                        <p>Total</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Country
