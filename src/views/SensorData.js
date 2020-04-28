import React, { Component } from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DATA from '../util/env'
import moment from 'moment';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit , faTrash } from '@fortawesome/free-solid-svg-icons'
import Modal from 'react-modal';

class SensorData extends Component {
    
    constructor() {
        super();
        this.state = {
            selectedItem : {},
            delete_modal_visible : false,
            update_mode : false,
            id : '' ,
            floor_id : '',
            room_id : '',
            sensors : [],
            loading : false,
            errors : { floor_id : '' , room_id : ''}
        };
    }

    componentDidMount(){
        this.getDataFromApi();
    }

    getDataFromApi = () => {
        axios.get(`${DATA.API}/sensors/get`)
            .then(result => {
                console.log(result.data);
                this.setState({ sensors: result.data});
            })
            .catch(err => {
                console.log(err);
            })
    }

    formValueChange = (e) => {
       this.setState({[e.target.name] : e.target.value });
    }

    onFormSubmit(e){
        e.preventDefault();
        if(this.validate()){
            if(this.state.update_mode){
                this.updateSensorData()
            }else{
                this.insertNewSensor();
            }
        }
    }


    updateSensorData = () => {
        const { floor_id , room_id , id } = this.state;
        axios.patch(`${DATA.API}/sensors/update` , {
            id : id,
            floor_id : floor_id,
            room_id : room_id,
        })
        .then( result => {
            console.log(result);
            toast("Sensor Successfully Updated");
            this.clearall();
            this.setState({ update_mode : false , selectedItem : {} })
        })
        .catch( err => {
            console.log(err);
            toast("Somthing Wrong Happend");
        })
        this.getDataFromApi();
    }

    insertNewSensor = () => {
        const { floor_id , room_id } = this.state;
        axios.post(`${DATA.API}/sensors/insert` , {
            floor_id : floor_id,
            room_id : room_id,
        })
        .then( result => {
            toast("Sensor Successfully Added");
            this.clearall();
        })
        .catch( err => {
            console.log(err);
            toast("Somthing Wrong Happend");
        })
        this.getDataFromApi();
    }

    // deleteSensor = () => {
    //     const { selectedItem } = this.state;
    //     axios.post(`${DATA.API}/sensors/insert` , {
    //         floor_id : floor_id,
    //         room_id : room_id,
    //     })
    //     .then( result => {
    //         toast("Sensor Successfully Added");
    //         this.clearall();
    //     })
    //     .catch( err => {
    //         console.log(err);
    //         toast("Somthing Wrong Happend");
    //     })
    //     this.getDataFromApi();
    // }
    

    render() {
        const { sensors , update_mode , room_id , floor_id , errors , id} = this.state;
        return (
        <>
        <Topbar />
        <Sidebar />
        <div className="page-wrapper pt-5 h-100">
            <div className="page-breadcrumb">
                <div className="row align-items-center">
                    <div className="col-12">
                        {/* <h4 className="page-title">Admin Register</h4> */}
                    </div>
                </div>
                <ToastContainer autoClose={1500} pauseOnFocusLoss={true} hideProgressBar={true} />
                <div className="container-fluid">
                    <div className="row mt-2">

                        <div className="col-md-12">
                            <div className="card  h-100 pb-3" style={{ backgroundColor: "transparent" }}>
                                <div className="card-body bg-white">
                                    <div className="col-12 pl-0" >
                                    <h4 className="page-title">Sensors Settings 
                                    <span className="badge mx-2 font-weight-bold px-2 badge-secondary">
                                        {update_mode ? 'Update Mode' : 'Add Mode'}
                                    </span></h4>
                                        <br />
                                    </div>
                                     <form onSubmit={(e) => this.onFormSubmit(e)}>
                                        <div className="row">
                                            <div className="mt-2 col-md-6">
                                                <div className="form-label-group">
                                                    <label >Sensor ID  </label>
                                                    <input type="text" 
                                                           className="form-control" 
                                                           name="id" 
                                                           value={id}
                                                           placeholder="Value will be auto genarated" 
                                                           onChange={ (e) => this.formValueChange(e)}
                                                           readOnly 
                                                    />
                                                </div>
                                            </div>
                                            <div className="mt-2 col-md-6">
                                                <div className="form-label-group">
                                                    <label >Floor No  </label>
                                                    <input 
                                                          type="text" 
                                                          className="form-control" 
                                                          name="floor_id" 
                                                          value={floor_id}
                                                          onChange={ (e) => this.formValueChange(e)}
                                                          placeholder="Enter Floor No"  />
                                                          { errors.floor_id.length > 0 &&
                                                            <h4 className="small text-danger mt-2 font-weight-bold mb-0">{errors.floor_id}</h4>
                                                          }      
                                                </div>
                                            </div>
                                            <div className="mt-2 col-md-6">
                                                <div className="form-label-group">
                                                    <label >Room No </label>
                                                    <input type="text" 
                                                           className="form-control" 
                                                           onChange={ (e) => this.formValueChange(e)}
                                                           name="room_id" 
                                                           value={room_id}
                                                           placeholder="Enter Room No"  />
                                                           { errors.room_id.length > 0 &&
                                                            <h4 className="small text-danger mt-2 font-weight-bold mb-0">{errors.room_id}</h4>
                                                           }  
                                                </div>
                                            </div>                              
                                            <div className="mt-auto  col-md-6 ">
                                                { !update_mode &&
                                                <button 
                                                    className="btn btn-success  p-2 rounded btn-sm  font-weight-bold   text-uppercase" 
                                                    type="submit">
                                                    Add Sensor
                                                </button>
                                                }
                                                { update_mode &&
                                                <div>
                                                    <button 
                                                        className="btn btn-secondary  p-2 rounded btn-sm  font-weight-bold   text-uppercase" 
                                                        type="submit">
                                                        Update Sensor
                                                    </button>
                                                    <button 
                                                        className="btn btn-danger mx-2 p-2 rounded btn-sm  font-weight-bold   text-uppercase" 
                                                        onClick={(e) => this.onPressUpdateModeCancel(e) }
                                                        type="cancel">
                                                        Cancel
                                                    </button>
                                                </div>
                                                }
                                            </div>                                       
                                        </div>
                                    </form> 
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-2" >
                        <div className="col-12">
                            <div className="card">
                                <div className="card-body pb-1">
                                    <div className="d-md-flex align-items-center">
                                        <div>
                                            <h4 className="card-title">Sensor Details</h4>
                                        </div>

                                    </div>
                                </div>
                                <div className="table-responsive">
                                    <table className="table v-middle" id="td">
                                        <thead>
                                            <tr className="bg-light">
                                                <th className="border-top-0">Sensor ID</th>
                                                <th className="border-top-0">Floor No</th>
                                                <th className="border-top-0">Room No</th>
                                                <th className="border-top-0">Updated Date</th>
                                                <th className="border-top-0">Time</th>
                                                <th className="border-top-0">Actions</th> 
                                            </tr>
                                        </thead >
                                        <tbody >
                                          { sensors.map( item => this.renderSensorTable(item) )}  
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <this.deleteModal/>
         </>
        );
    }

    renderSensorTable = item => {     
        return (<tr key={item.id}>
            <td>
                <div className="d-flex align-items-center">
                    <div className="">
                        <h4 className="m-b-0 font-16">{item.id}</h4>
                    </div>
                </div>
            </td>
            <td>{item.floor_id}</td>
            <td>{item.room_id}</td>
            <td>{moment(item.updated_at).format('DD , MMMM YYYY') }</td>
            <td>{moment(item.updated_at).format('LT') }</td>
            <td>
                <Link to={`/sensor/${item.id}`}><span className="label py-1 ml-2 bg-dark btn font-weight-bold">Details</span></Link> 
                <span className="label py-1 bg-secondary btn font-weight-bold ml-2"
                 onClick={() => this.onPressUpdate(item)}   ><FontAwesomeIcon icon={faEdit} /></span>
                <span  onClick={() => this.onPressDelete(item)}
                 className="label py-1 bg-danger btn font-weight-bold ml-2"><FontAwesomeIcon icon={faTrash} /></span>
            </td>
        </tr>
        );
    }

    deleteModal = () => (
        <Modal
            shouldCloseOnOverlayClick={true}
            style={customStyles}
            overlayClassName="Overlay"
            onRequestClose={() => this.setState({delete_modal_visible : false}) }
            isOpen={this.state.delete_modal_visible}
        >
        <h4>Sensor Delete</h4>
        <p>Are you sure you want to delete    
             <spam className="font-weight-bold mx-1">ID : {this.state.selectedItem.id}</spam> sensor ? <br></br>
        <span className="text-danger" >This process can not be undone !</span>
        </p>
        <div className="d-flex" >
        <button onClick={() => this.deleteSensor()} 
        className="btn btn-danger px-2 ml-auto">Delete</button>
        <button
            onClick={() => this.setState({delete_modal_visible : false}) } 
            className="btn btn-secondary px-2 mx-2">close</button>
        </div>
        </Modal>
    );

    validate = () => {
        let { errors , floor_id , room_id } = this.state;
        let count = 0;
        
        if( floor_id.length == 0 ){
            errors.floor_id = "Floor no can not be empty"
            count++
        }else{
            errors.floor_id = "" 
        }
        if( room_id.length == 0 ){
            errors.room_id = "Room no can not be empty"
            count++
        }else{
            errors.room_id = "" 
        }

        this.setState({errors});
        return count == 0;
    }

    onPressDelete = sensor =>{
        this.setState({
            selectedItem : sensor,
            delete_modal_visible : true,
            update_mode : false,
            floor_id : "",
            room_id : "",
            id : "",
            errors : { floor_id : '' , room_id : ''}
        });
    }

    onPressUpdate = sensor =>{
        this.setState({
            selectedItem : sensor,
            update_mode : true,
            floor_id : sensor.floor_id,
            room_id : sensor.room_id,
            id : sensor.id,
            errors : { floor_id : '' , room_id : ''}
        });
    }

    onPressUpdateModeCancel = (e) => {
        e.preventDefault();
        this.setState({ update_mode : false , selectedItem : {} })
        this.clearall();
    }

    clearall = () => {
        this.setState({
            floor_id : "",
            room_id : "",
            id : "",
        });
    }
}

const customStyles = {
    content : {
      top                   : '25%',
      left                  : '50%',
      right                 : '10%',
      bottom                : 'auto', 
      transform             : 'translate(-50%, -50%)'
    }
  };
export default SensorData;