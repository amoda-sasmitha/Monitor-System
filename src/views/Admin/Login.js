import React, { Component } from 'react';
// import top bar
import Topbar from '../../components/Topbar';

// import controll file 
import A_Admin from '../../Controllers/Admin'

// imporrt css
import './login.css'


class Login extends Component {
    constructor() {
        super();
        this.state = {
            uEmail: '',
            uPass: ''

        };



    }

    // ---------------------------------------- functions ----------------------------------------
    // ---------------------------------------- functions ----------------------------------------
    // ---------------------------------------- functions ----------------------------------------

    // user email
    onChangeEmail(e) {
        this.setState({
            uEmail: e.target.value
        })
    }
    // user passsword
    onChangePassword(e) {
        this.setState({
            uPass: e.target.value
        })
    }


    // sign in

    async OnSignIn(e) {
        e.preventDefault();

        const SignIn = {
            uEmail: this.state.uEmail,
            uPass: this.state.uPass
        }

        var signStatus = await A_Admin.adminSign(SignIn)
        await console.log(signStatus);

        switch (signStatus.status) {
            case 200:
                const SignedInUser = {
                    status: signStatus.data.status,
                    id: signStatus.data.user.id,
                    name: signStatus.data.user.name,
                    email: signStatus.data.user.email,
                    phone: signStatus.data.user.phone
                }
                A_Admin.setCookies(SignedInUser.status, SignedInUser.id, SignedInUser.name, SignedInUser.email, SignedInUser.phone);
                window.location.replace("/dashboard");
                break;
            default:
                window.location.replace("/");
        }


    }








    // ---------------------------------------- render functions ----------------------------------------
    // ---------------------------------------- render functions ----------------------------------------
    // ---------------------------------------- render functions ----------------------------------------
    render() {
        return (
            <>
                <Topbar />

                <div className="container">
                    <div className="row">
                        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                            <div className="card card-signin my-5">
                                <div className="card-body">
                                    <h5 className="card-title text-center">Sign In</h5>
                                    <form className="form-signin" onSubmit={(e) => this.OnSignIn(e)}>
                                        <div className="form-label-group">
                                            <label >Email address</label>
                                            <input type="email" id="inputEmail" className="form-control" name="uEmail" placeholder="Email address" required autoFocus onChange={(e) => this.onChangeEmail(e)} />
                                        </div>

                                        <div className="form-label-group">
                                            <label >Password</label>
                                            <input type="password" id="inputPassword" className="form-control" name="uPass" placeholder="Password" required onChange={(e) => this.onChangePassword(e)} />
                                        </div>
                                        <hr className="my-4"></hr>
                                        <button className="btn btn-md btn-primary btn-block text-uppercase" type="submit">Sign in</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}


export default Login;