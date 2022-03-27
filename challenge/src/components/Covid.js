import React, { Component } from 'react'
import { Select, Button } from 'antd';
import Country from './Country';
import axios from 'axios';
import { toast } from 'react-toastify';

const { Option } = Select;

export class Covid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            countries: [],
            countrySelected: "",
            displayCountry: [],
            worldData: {}
        }
    }
    componentDidMount = () => {
        axios.get('https://covid19.mathdro.id/api/countries')
            .then((res) => {
                this.setState({
                    countries: res.data.countries
                })
                axios.post('http://localhost/covid/fetchCountries.php',
                    JSON.stringify({
                        email: localStorage.getItem("useremail")
                    }))
                    .then((res) => {
                        res.data.forEach((ele) => {
                            let name = this.state.countries.filter(x => x.iso3 === ele.country)
                            this.fetchCountryData(ele.country, name[0].name)
                        })
                    })
            })
            .catch((err) => {
                toast.error('Opps! An error occured while fetching the API!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            })

        axios.get('https://covid19.mathdro.id/api')
            .then((res) => {
                this.setState({
                    worldData: { name: "World", data: res.data }
                })
            })
            .catch((err) => {
                toast.error('Opps! An error occured while fetching the API!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                console.log(err);
            })



    }
    onChangeValue = (value) => {
        console.log("onChangeValue", value);
        this.setState({
            countrySelected: value
        })
    }
    addCountry = () => {
        console.log("addCountry", this.state.countrySelected);
        if (this.state.countrySelected === "") {
            toast.warn('Please select a country!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else {
            console.log("displayCountry", this.state.displayCountry);
            let name = this.state.countries.filter(x => x.iso3 === this.state.countrySelected)
            console.log("name", name);
            this.fetchCountryData(this.state.countrySelected, name[0].name)
            axios.post('http://localhost/covid/setCountries.php',
                JSON.stringify({
                    email: localStorage.getItem("useremail"),
                    country: this.state.countrySelected
                }))
        }
    }
    fetchCountryData = (countryIso, countryName) => {
        axios.get(`https://covid19.mathdro.id/api/countries/${countryIso}`)
            .then((res) => {
                let obj = { name: countryName, data: res.data }
                this.setState({
                    displayCountry: [...this.state.displayCountry, obj]
                })
                toast.success(`${countryName} added!`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                this.setState({
                    countries: this.state.countries.filter(x => x.iso3 !== countryIso)
                })
            })
            .catch((err) => {
                toast.error('Opps! An error occured while fetching the API!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                console.log(err);
            })
    }
    render() {
        if (this.state.countries.length === 0 || Object.keys(this.state.worldData).length === 0) {
            return <div className="load">
                <img src="https://covid19.uk.gov.in/NewAssets/images/loaders/heart-loading2.gif" alt="" />
            </div>
        } else {
            return (
                <>
                    <div className='covid-cont'>
                        <div className="top">
                            <h2>Countries</h2>
                            <Select
                                style={{ width: "10vw" }}
                                showSearch
                                placeholder="Select a country"
                                optionFilterProp="children"
                                onChange={this.onChangeValue}
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                {
                                    this.state.countries.map((ele, index) => {
                                        return <Option key={index} value={ele.iso3}>{ele.name}</Option>
                                    })
                                }
                            </Select>
                            <Button onClick={this.addCountry}>Add</Button>
                        </div>
                        <div className="bottom">
                            <Country cdata={this.state.worldData} />
                            {
                                this.state.displayCountry.map((ele, index) => {
                                    return <Country key={index} cdata={ele} />
                                })
                            }
                        </div>
                    </div>
                </>
            )
        }
    }
}

export default Covid
