import React, { Component } from 'react'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

export class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isActive: false,
            remail: "",
            rpass: "",
            rname: "",
            rcpass: "",
            lemail: "",
            lpass: ""
        }
    }
    toggleForm = () => {
        this.setState({
            isActive: !this.state.isActive
        })
    }
    validatePass = (pass) => {
        var re = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
        return re.test(String(pass).toLowerCase());
    }
    validateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    register = (e) => {
        e.preventDefault()
        if (this.state.remail === "" || this.state.rpass === "" || this.state.rname === "" || this.state.rcpass === "") {
            toast.warn('Please enter all the fields!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else if (!this.validateEmail(this.state.remail)) {
            toast.warn('Email is Invalid!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else {
            axios.post('http://localhost/covid/login.php',
                JSON.stringify({
                    email: this.state.remail
                }))
                .then((res) => {
                    console.log("res from db", res.data[0]);
                    if (res.data.length !== 0) {
                        toast.warn('This email is already registered!', {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                    } else if (this.state.rpass !== this.state.rcpass) {
                        toast.error('Passwords dont match!', {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                    } else if (!this.validatePass(this.state.rpass)) {
                        toast.error('Passwords should be atleast 6 characters long and contain atleast 1 number & special character!', {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                    } else {
                        axios.post('http://localhost/covid/register.php',
                            JSON.stringify({
                                email: this.state.remail,
                                name: this.state.rname,
                                pass: this.state.rpass
                            }))
                            .then((res) => {
                                toast.success('Registration Successfull!', {
                                    position: "top-right",
                                    autoClose: 5000,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    draggable: true,
                                    progress: undefined,
                                });
                                localStorage.setItem("isLogged", true)
                                localStorage.setItem("username", this.state.rname)
                                localStorage.setItem("useremail", this.state.remail)
                                this.props.getIsLogged(true)
                            })
                            .catch((err) => {
                                console.log("err", err);
                            })
                    }
                })
                .catch((err) => {
                    console.log("err", err);
                })
        }
    }
    login = (e) => {
        e.preventDefault()
        if (this.state.lemail === "" || this.state.lpass === "") {
            toast.warn('Please enter all the fields!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else {
            axios.post('http://localhost/covid/login.php',
                JSON.stringify({
                    email: this.state.lemail
                }))
                .then((res) => {
                    console.log("res from db", res.data[0]);
                    if (res.data.length === 0) {
                        toast.warn('This email is not registered!', {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                    } else if (res.data[0].pass !== this.state.lpass) {
                        toast.error('Password is incorrect!', {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                    } else {
                        toast.success(`Login Successfull! Welcome ${res.data[0].name}`, {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                        localStorage.setItem("isLogged", true)
                        localStorage.setItem("username", res.data[0].name)
                        localStorage.setItem("useremail", res.data[0].email)
                        this.props.getIsLogged(true)
                    }
                })
                .catch((err) => {
                    console.log("err", err);
                })
        }
    }
    render() {
        return (
            <div>
                <section>
                    <div className={(this.state.isActive) ? "container active" : "container"}>
                        <div className="user signinBx">
                            <div className="imgBx"><img src="https://raw.githubusercontent.com/AaryanShaikh/My-Stock/main/covid-challenge/glossy-covid-19-vaccination.png" alt="" /></div>
                            <div className="formBx">
                                <form action="" onSubmit={this.login}>
                                    <h2>Sign In</h2>
                                    <input type="text" name="" placeholder="Email" onChange={(e) => this.setState({ lemail: e.target.value })} />
                                    <input type="password" name="" placeholder="Password" onChange={(e) => this.setState({ lpass: e.target.value })} />
                                    <input type="submit" name="" value="Login" />
                                    <p className="signup">
                                        Don't have an account ?
                                        <span onClick={this.toggleForm}>Sign Up.</span>
                                    </p>
                                </form>
                            </div>
                        </div>
                        <div className="user signupBx">
                            <div className="formBx">
                                <form action="" onSubmit={this.register}>
                                    <h2>Create an account</h2>
                                    <input type="text" name="" placeholder="Username" onChange={(e) => this.setState({ rname: e.target.value })} />
                                    <input type="text" name="" placeholder="Email Address" onChange={(e) => this.setState({ remail: e.target.value })} />
                                    <input type="password" name="" placeholder="Create Password" onChange={(e) => this.setState({ rpass: e.target.value })} />
                                    <input type="password" name="" placeholder="Confirm Password" onChange={(e) => this.setState({ rcpass: e.target.value })} />
                                    <input type="submit" name="" value="Sign Up" />
                                    <p className="signup">
                                        Already have an account ?
                                        <span onClick={this.toggleForm}>Sign in.</span>
                                    </p>
                                </form>
                            </div>
                            <div className="imgBx"><img src="https://raw.githubusercontent.com/AaryanShaikh/My-Stock/main/covid-challenge/pale-antivirus-scientists.png" alt="" /></div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

export default Login
