import React, { Component } from 'react'
import axios from 'axios';

export class Maps extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isActive: false
        }
    }
    componentDidMount = () => {
        axios.get('https://data.covid19india.org/v4/min/data.min.json')
            .then((res) => {
                let newData = []
                let state = ["Andaman and Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chandigarh", "Chattisgarh", "Delhi", "Dadra and Nagar Haveli", "Goa", "Gujarat", "Himachal Pradesh", "Haryana", "Jharkhand", "Jammu and Kashmir", "Karnataka", "Kerala", "Ladakh", "Lakshadweep Islands", "Maharashtra", "Meghalaya",
                    "Manipur", "Madhya Pradesh", "Mizoram", "Nagaland", "Odisha", "Punjab", "Pondicherry", "Rajasthan", "Sikkim", "Telangana", "Tamil Nadu", "Tripura", "Other Territory", "Uttar Pradesh", "Uttarakhand", "West Bengal"]
                let states = ["AN", "AP", "AR", "AS", "BR", "CH", "CT", "DL", "DN", "GA", "GJ", "HP", "HR", "JH", "JK", "KA", "KL", "LA", "LD", "MH", "ML", "MN", "MP", "MZ", "NL", "OR", "PB", "PY", "RJ", "SK", "TG", "TN", "TR", "TT", "UP", "UT", "WB"]
                let total = 0
                states.forEach((ele) => {
                    total += res.data[ele].total.confirmed + res.data[ele].total.deceased + res.data[ele].total.recovered
                })
                states.forEach((ele, ind) => {
                    if (ele !== "LA" && ele !== "OR" && ele !== "TG" && ele !== "TT" && ele !== "UT") {
                        let fill = (res.data[ele].total.confirmed + res.data[ele].total.deceased + res.data[ele].total.recovered < ((total / states.length)) / 2) ? 'MINOR' : (res.data[ele].total.confirmed + res.data[ele].total.deceased + res.data[ele].total.recovered < total / states.length) ? 'MEDIUM' : 'MAJOR'
                        let radius = (res.data[ele].total.confirmed + res.data[ele].total.deceased + res.data[ele].total.recovered < ((total / states.length)) / 2) ? 10 : (res.data[ele].total.confirmed + res.data[ele].total.deceased + res.data[ele].total.recovered < total / states.length) ? 15 : 20
                        let obj = { state: state[ind], fillKey: fill, radius: radius, centered: ele, confirmed: res.data[ele].total.confirmed, deceased: res.data[ele].total.deceased, recovered: res.data[ele].total.recovered }
                        newData.push(obj)
                    }
                });
                window.makeIndia(newData)
            })
    }
    logout = () => {
        this.props.getIsLogged(false)
        localStorage.setItem("isLogged", false)
        console.log("logout");
    }
    render() {
        return (
            <div className='map-cont'>
                <h1 onMouseOver={() => this.setState({ isActive: !this.state.isActive })}>Hey {localStorage.getItem('username')}</h1>
                <button className={(this.state.isActive) ? "logout" : ""} onClick={this.logout}>Log out?</button>
                <div id="india" style={{ height: '600px', width: '900px' }}></div>
            </div>
        )
    }
}

export default Maps
