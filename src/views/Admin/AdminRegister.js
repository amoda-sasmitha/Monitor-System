import React, { Component } from 'react';

import Sidebar from '../../components/Sidebar';
import Topbar from '../../components/Topbar';
import A_Admin from '../../Controllers/Admin'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import './login.css'
class AdminRegister extends Component {
    constructor() {
        super();
        this.clearall = this.clearall.bind(this)
        this.state = {
            uName: '',
            uEmail: '',
            uCn: '',
            uPass: '',
            uConPass: '',
            passwordMatch: true,
            allusers: [],
        };



    }


    async componentWillMount() {
        await this.getRegditedAdmins()
        await console.log(this.state.allusers);

    }

    // admin register
    onChnageName(e) {
        this.setState({
            uName: e.target.value
        })
    }
    onChangeEmail(e) {
        this.setState({
            uEmail: e.target.value
        })
    }

    onChangeCn(e) {
        this.setState({
            uCn: e.target.value
        })
    }

    onChangePassword(e) {
        this.setState({

            uPass: e.target.value
        })
    }


    onChangeConPassword(e) {
        this.setState({

            uConPass: e.target.value
        }, () => this.checkPasswordMatch())
    }

    //password match
    async  checkPasswordMatch() {
        if (this.state.uPass != this.state.uConPass) {
            await this.setState({
                passwordMatch: false
            })
        } else {
            await this.setState({
                passwordMatch: true
            })
        }
    }


    clearall() {
        this.setState({
            uName: '',
            uEmail: '',
            uCn: '',
            uPass: ''

        })
    }

    //register admin

    async registerAdmin(e) {
        e.preventDefault()
        if (this.state.passwordMatch != false) {


            const Admin = {
                uName: this.state.uName,
                uEmail: this.state.uEmail,
                uCn: this.state.uCn,
                uPass: this.state.uPass
            }

            console.log(Admin);

            var addUser = await A_Admin.registerAdmin(Admin);

            console.log(addUser);

            switch (addUser.status) {
                case 200:

                    await this.getRegditedAdmins()
                    await this.clearall()
                    await this.notify()

                    break;
                case 201:
                    console.log("Already you have user");

                default:
                    window.location.replace("/admin");
            }

        }

    }


    // get registed admins
    async   getRegditedAdmins() {
        var alluser = await A_Admin.getAllAdminDetails()
        switch (alluser.status) {
            case 200:
                console.log("Data come");
                this.setState({
                    allusers: alluser.data
                })

                break;
            case 201:
                console.log("No data");

            default:
            // window.location.replace("/admin");
        }
    }

    // messages 
    notify = () => toast("Successfully Added");

    render() {

        if (this.state.allusers != null || this.state.allusers != undefined) {

            var allAdmins = this.state.allusers.map((data, i) => {
                return (<tr key={data.id}>
                    <td>
                        {data.id}
                    </td>
                    <td>{data.name}</td>
                    <td>{data.email}</td>
                    <td>{data.phone}</td>
                    {/* <td>
                        <button className="btn btn-sm btn-danger">Remove</button>
                    </td> */}

                </tr>
                );
            });
        } else {
            return (<h3>No Admin</h3>)
        }

        return (
            <>
                <Topbar />
                <Sidebar />


                {/* Registerd Admin Views */}

                <div className="page-wrapper pt-5">
                    <div className="page-breadcrumb">
                        <div className="row align-items-center">
                            <div className="col-12">
                                {/* <h4 className="page-title">Admin Register</h4> */}
                            </div>
                        </div>
                        <ToastContainer autoClose={1500} pauseOnFocusLoss={true} hideProgressBar={true} />
                        <div className="container-fluid">
                            <div className="row">

                                <div className="col-md-12">
                                    <div className="card  h-100 pb-3" style={{ backgroundColor: "transparent" }}>
                                        <div className="card-body bg-white">
                                            <div className="col-12 pl-0" >
                                                <h4 className="page-title">Register Admin</h4>
                                                <br />
                                            </div>
                                            <form onSubmit={(e) => this.registerAdmin(e)}>
                                                <div className="row">
                                                    <div className="col-md-4">
                                                        <div className="form-label-group">
                                                            <label >Name : </label>
                                                            <input type="text" className="form-control" name="uName" placeholder="Name" required autoFocus onChange={(e) => this.onChnageName(e)} />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="form-label-group">
                                                            <label >Email address : </label>
                                                            <input type="email" className="form-control" name="uEmail" placeholder="Email address" required onChange={(e) => this.onChangeEmail(e)} />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="form-label-group">
                                                            <label >Contact No : </label>
                                                            <input type="tel" className="form-control" name="uCn" placeholder="Contact Number" required onChange={(e) => this.onChangeCn(e)} />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="form-label-group">
                                                            <label >Password : </label>
                                                            <input type="password" className="form-control" name="uPass" placeholder="Password" required onChange={(e) => this.onChangePassword(e)} />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="form-label-group">
                                                            <label >Confirm Password : </label>
                                                            <input type="password" className="form-control" name="uConPass" placeholder="Confirm Password" required onChange={(e) => this.onChangeConPassword(e)} />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-3 mt-2">
                                                        <br />
                                                        <button className="btn btn-secondary btn-block text-uppercase" type="submit">Register</button>
                                                    </div>
                                                    <div className="col-md-12 mt-2">
                                                        <br />
                                                        <p className="SignUp_password_not_match" style={{ display: this.state.passwordMatch === false ? 'block' : 'none' }}>Password and Confrim Password did not match</p>
                                                    </div>


                                                </div>
                                            </form>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row" >
                                <div className="col-12">
                                    <div className="card">
                                        <div className="card-body pb-1">
                                            <div className="d-md-flex align-items-center">
                                                <div>
                                                    <h4 className="card-title">Admin Details</h4>
                                                </div>

                                            </div>
                                        </div>
                                        <div className="table-responsive">
                                            <table className="table v-middle" id="td">
                                                <thead>
                                                    <tr className="bg-light">
                                                        <th className="border-top-0">ID</th>
                                                        <th className="border-top-0">Name</th>
                                                        <th className="border-top-0">Email</th>
                                                        <th className="border-top-0">Contact No</th>
                                                        {/* <th className="border-top-0">Actions</th> */}
                                                    </tr>
                                                </thead >
                                                <tbody >
                                                    {allAdmins}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </>
        );
    }
}


export default AdminRegister;