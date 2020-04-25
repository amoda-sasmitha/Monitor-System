import React from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faArrowUp , faArrowDown , faCircle } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import {Line as LineChart} from 'react-chartjs-2';
import DATA from '../util/env'
import moment from 'moment'
import {Link } from "react-router-dom";
import ReactSpeedometer from "react-d3-speedometer"

class SingleSensor extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            prevCo2 : 0,
            prevSmoke : 0,
            log : [],
            loading : false,
            sensor : { smoke_level : 0 , co2_level : 0 },
            labels : [],
            co2 : [],
            smoke : [],
        }
    }

    componentDidMount(){
        const { id } = this.props.match.params
        this.getDataFromApi(id);
        this._interval = setInterval(() => {
            this.getDataFromApi(id);
          }, 4000);
        
    }

    getDataFromApi = id => {
    axios.get(`${DATA.API}/sensors/getall/${id}/20`)
            .then( result => {

                let labels = [];
                let co2 = [];
                let smoke = [];
            
                let dataarray = result.data.data.log;
                if(dataarray.length > 6){
                    dataarray =  dataarray.slice(Math.max(dataarray.length - 6 , 0))
                }

                let log = result.data.data.log;
                if(log.length > 12){
                    log =  log.slice(Math.max(log.length - 12 , 0))
                }

                dataarray.forEach( item => {
                    labels.push(moment(item.datetime).format('HH:mm:ss') );
                    co2.push(item.co2_level);
                    smoke.push(item.smoke_level);
                })

                const prev = this.state.sensor;
                this.setState({
                    sensor : result.data.data.current ,
                    labels : labels ,
                    co2 : co2 , 
                    smoke : smoke ,
                    log : log,
                    prevCo2 : prev.co2_level,
                    prevSmoke : prev.smoke_level
                });
                
            })
            .catch( err => {
                console.log(err);
            })
    }

    componentWillUnmount() {
        clearInterval(this._interval);
      }

    render(){
        const {sensor , labels , co2 , smoke  , log , prevSmoke , prevCo2 } = this.state;
        return(
            <>
            <Topbar/>
            <Sidebar/>
            <div className="page-wrapper ">
                <div className="page-breadcrumb">
                    <div className="row align-items-center">
                        <div className="col-12">
                            <h4 className="page-title">Sensor Live Data</h4>
                        </div>
                    </div>
                </div>

                <div className="container-fluid">
                    {/* -----------------card area---------------- */}
                    <div className="row mb-3">
                        <div className="mt-2 col-lg-3 col-md-6 col-sm-6 rounded">
                            <div className="h-100 bg-white shadow-sm pt-2 rounded ">
                            <div className="d-flex" >
                                <img src="images/co2.png" className="my-auto ml-3 my-auto" width="60" height="60"/>
                                    <div className="pt-1 pl-3 pr-3 ">
                                        <h5 className="card-title mb-0  font-weight-bold">Co2 Level</h5>
                                        <h2 className={`text-${this.changeStyleColor(sensor.co2_level)} card-title font-weight-bold mb-0`}>{sensor.co2_level}.00</h2>
                                        { this.changeLimit(sensor.co2_level , prevCo2 ) }
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                        <div className="mt-2 col-lg-3 col-md-6 col-sm-6 rounded">
                            <div className="h-100 bg-white mb-0 shadow-sm pt-2 rounded ">
                            <div className="d-flex" >
                                <img src="images/sensor.png" className="my-auto ml-3 my-auto" width="50" height="50"/>
                                    <div className="pt-1 pl-3 pr-3 ">
                                        <h5 className="card-title mb-0  font-weight-bold">Smoke Level</h5>
                                        <h2 className={`text-${this.changeStyleColor(sensor.smoke_level)} card-title font-weight-bold mb-0`}>{sensor.smoke_level}.00</h2>
                                        { this.changeLimit(sensor.smoke_level , prevSmoke ) }
                                    </div>
                                    <div className="my-auto pt-3 pl-3">
                                        <h4 className="card-title mb-0 small text-danger font-weight-bold "></h4>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-2 col-lg-2 col-md-4 col-sm-6 rounded">
                            <div className="h-100 bg-white mb-0  shadow-sm pt-2 rounded ">
                            <div className="d-flex" >
                                    <div className="pt-3 px-3 mx-auto">
                                        <h5 className="card-title mb-0 font-weight-bold">Sensor Id</h5>
                                        <h2 className="card-title text-secondary font-weight-bold">00{sensor.id}</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-2 col-lg-2 col-md-4 col-sm-6 rounded">
                            <div className="h-100 bg-white mb-0 shadow-sm pt-2 rounded ">
                            <div className="d-flex" >
                                    <div className="pt-3 px-3 mx-auto">
                                        <h5 className="card-title mb-0 font-weight-bold">Floor No</h5>
                                        <h2 className="card-title text-secondary font-weight-bold">{sensor.floor_id}</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-2 col-lg-2 col-md-4 col-sm-6 rounded">
                            <div className="h-100  bg-white mb-0  shadow-sm pt-2 rounded ">
                            <div className="d-flex" >
                                    <div className="pt-3 px-3 mx-auto">
                                        <h5 className="card-title mb-0 font-weight-bold">Room No</h5>
                                        <h2 className="card-title text-secondary font-weight-bold">{sensor.room_id}</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>    
                    {/* ------------------------------------------ */}
                    <div className="row">
                        <div className="col-md-6 rounded">
                            <div className="card shadow-sm rounded">
                                <div className="card-body">
                                    <div className="d-md-flex align-items-center">
                                        <div>
                                            <h4 className="card-title font-weight-bold">Smoke Level</h4>
                                            <h5 className="card-subtitle">Update every 2s</h5>
                                        </div>
                                        <div className="ml-auto d-flex no-block align-items-center">
                                            <ul className="list-inline font-12 dl m-r-15 m-b-0">
                                                <li className="list-inline-item text-primary"><FontAwesomeIcon icon={faCircle} /> Smoke </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="row">
                                        
                                        <div className="col-lg-12">
                                            <div className="my-2 ct-charts">
                                            <LineChart data={{
                                                labels: labels ,
                                                datasets:[{
                                                    label : "Smoke",
                                                    backgroundColor: 'rgba(116,96,238,0.15)',
                                                    borderColor: 'rgba(116,96,238,0.4)',
                                                    data : smoke
                                                   }]
                                            }}
                                            options={options}
                                            width={600} height={260}/>
                                            </div>
                                        </div>
                                    
                                    </div>
                                </div>
                            </div>
                        </div>
                       
                        <div className="col-md-6 rounded">
                            <div className="card shadow-sm rounded">
                                <div className="card-body">
                                    <div className="d-md-flex align-items-center">
                                        <div>
                                            <h4 className="card-title font-weight-bold">Co2 Level</h4>
                                            <h5 className="card-subtitle">Update every 2s</h5>
                                        </div>
                                        <div className="ml-auto d-flex no-block align-items-center">
                                            <ul className="list-inline font-12 dl m-r-15 m-b-0">
                                                <li className="list-inline-item text-info"><FontAwesomeIcon icon={faCircle} /> Co2</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="row">
                                        
                                        <div className="col-lg-12">
                                            <div className="my-2 ct-charts">
                                            <LineChart data={{
                                                labels: labels ,
                                                datasets:[{
                                                    label : "Co2",
                                                    backgroundColor: 'rgba(41,98,255,0.15)',
                                                    borderColor: 'rgba(41,98,255,0.4)',
                                                    data : co2
                                                   }]
                                            }}
                                            options={options}
                                            width={600} height={260}/>
                                            </div>
                                        </div>
                                    
                                    </div>
                                </div>
                            </div>
                        </div>
                       
                    </div>
                    <div className="row" >
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body pb-1">
                                <div className="d-md-flex align-items-center">
                                    <h4 className="card-title">Sensor Log 
                                    <span className="card-subtitle small px-2">Last 02 min</span>
                                    </h4> 
                                </div>
                            </div>
                            <div className="table-responsive">
                                <table className="table v-middle" id="td">
                                    <thead>
                                        <tr className="bg-light">
                                            <th className="border-top-0">Date</th>
                                            <th className="border-top-0">Time</th>
                                            <th className="border-top-0">Co2 Level</th>
                                            <th className="border-top-0">Smoke Level</th>
											<th className="border-top-0">Status</th>
                                        </tr>
                                    </thead >
                                    <tbody >
                                        {log.slice(0).reverse().map(sensor => this.renderSensorTable(sensor))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
            </>
        );
    }

    renderSensorTable = item => {

        const status = (item.co2_level + item.smoke_level) / 2;
        return (<tr key={item.id}>
            <td>
                <div className="d-flex align-items-center">
                    <div className="">
                        <h6 className="m-b-0 font-16">{moment(item.datetime).format('DD , MMMM YYYY')}</h6>
                    </div>
                </div>
            </td>
            <td>{moment(item.datetime).format('hh:mm:ss')}</td>
            <td>
                <FontAwesomeIcon 
                    icon={faCircle} 
                    className={`text-${this.changeStyleColor(item.co2_level)} `} 
                /> {item.co2_level}.00 
            </td>
            <td>
                <FontAwesomeIcon 
                    icon={faCircle} 
                    className={`text-${this.changeStyleColor(item.smoke_level)} `} 
                    /> {item.smoke_level}.00
            </td>
            <td>
                <span 
                    className={`btn-sm bg-light text-dark`}>
                        {this.changestatus(status)}
                </span>
            </td>
        </tr>
        );

    }

    changeLimit = (current, prev ) => {
        if(current != prev && prev != 0 ){
        let increased = current > prev; 
        let dif = Math.abs( current - prev ) / prev * 100
        return (
             dif > 0 ?
            <h4 className={`text-${increased && dif >= 500 ? 'danger' : 'dark'} small card-title font-weight-bold`}>
               {increased ? 'Increased' : 'Decreased'} By 
                <FontAwesomeIcon icon={ increased ? faArrowUp : faArrowDown } className="mx-1"/> {(Math.round( dif * 100) / 100).toFixed(2)}%
            </h4>
            : <h4 className={`text-danger small card-title font-weight-bold`}></h4>
            
        );
        }
    }

    changeStyleColor = number => {
        if (number >= 0 && number <= 4) {
            return 'success';
        } else if (number >= 5 && number <= 7) {
            return 'warning';
        } else if (number >= 8 && number <= 10) {
            return 'danger';
        } else {
            return 'secondary';
        }
    }

    changestatus = number => {
        if (number >= 0 && number <= 4) {
            return 'Normal';
        } else if (number >= 5 && number <= 7) {
            return 'Average';
        } else if (number >= 8 && number <= 10) {
            return 'Danger';
        } else {
            return 'None';
        }
    }


}


const options = {
    scaleShowGridLines: false,
    scaleGridLineColor: 'rgba(0,0,0,.05)',
    scaleGridLineWidth: 0,
    scaleShowHorizontalLines: true,
    scaleShowVerticalLines: true,
    bezierCurve: true,
    bezierCurveTension: 0.4,
    pointDot: true,
    pointDotRadius: 4,
    pointDotStrokeWidth: 1,
    pointHitDetectionRadius: 20,
    datasetStroke: true,
    datasetStrokeWidth: 2,
    datasetFill: true,
    legend: {
        display: false
     },
    scales: {
        xAxes: [{
            gridLines: {
                display:false
            }
        }],
        yAxes: [{
            gridLines: {
                display:false
            }   
        }]
    }
 }

export default SingleSensor;