import React from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import { Line as LineChart } from 'react-chartjs-2';
import DATA from '../util/env'
import moment from 'moment'
import { Link } from "react-router-dom";

import A_Admin from '../Controllers/Admin'

class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            sensors: [],
            labels: [],
            co2: [],
            smoke: [],
        }
    }

    async componentDidMount() {
        var State = await A_Admin.checkSignedIn();
        if (State === false) {
            await window.location.replace("/");
        } else {
        this.getDataFromApi();
        this._interval = await setInterval(() => {
            this.getDataFromApi();
        }, 2000);
        }
    }

    getDataFromApi = () => {
        axios.get(`${DATA.API}/sensors/getall/2`)
            .then(result => {

                let labels = [];
                let co2 = [];
                let smoke = [];
                // console.log(result.data.log);
                let dataarray = result.data.log;
                if (dataarray.length > 10) {
                    dataarray = dataarray.slice(Math.max(dataarray.length - 10, 0))
                }
                // console.log(dataarray.length);

                dataarray.forEach(item => {
                    labels.push(moment(item.datetime).format('HH:mm:ss'));
                    co2.push(item.average_co2);
                    smoke.push(item.average_smoke);
                })

                this.setState({
                    sensors: result.data.current,
                    labels: labels,
                    co2: co2,
                    smoke: smoke
                });
            })
            .catch(err => {
                console.log(err);
            })
    }

    componentWillUnmount() {
        clearInterval(this._interval);
    }

    render() {
        const { sensors, labels, co2, smoke } = this.state;
        return (
            <>
            <Topbar/>
            <Sidebar/>
            <div className="page-wrapper pt-4">
                <div className="page-breadcrumb">
                    <div className="row align-items-center">
                        <div className="col-12">
                            <h4 className="page-title pt-4 pb-3 px-2">Sensors Live Data</h4>
                        </div>
                    </div>

                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-9 rounded">
                                <div className="card shadow-sm rounded">
                                    <div className="card-body">
                                        <div className="d-md-flex align-items-center">
                                            <div>
                                                <h4 className="card-title font-weight-bold">Average Co2 & Smoke Levels</h4>
                                                <h5 className="card-subtitle">Update every 2s</h5>
                                            </div>
                                            <div className="ml-auto d-flex no-block align-items-center">
                                                <ul className="list-inline font-12 dl m-r-15 m-b-0">
                                                    <li className="list-inline-item text-info"><FontAwesomeIcon icon={faCircle} /> Co2</li>
                                                    <li className="list-inline-item text-primary"><FontAwesomeIcon icon={faCircle} /> Heat</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        
                                        <div className="col-lg-12">
                                            <div className="campaign ct-charts px-3">
                                            <LineChart data={{
                                                labels:labels ,
                                                datasets:[
                                                   {
                                                     label : "Co2",
                                                     backgroundColor: 'rgba(41,98,255,0.15)',
                                                     borderColor: 'rgba(41,98,255,0.4)',
                                                     data : co2
                                                   },
                                                   {
                                                    label : "Smoke",
                                                    backgroundColor: 'rgba(116,96,238,0.15)',
                                                    borderColor: 'rgba(116,96,238,0.4)',
                                                    data : smoke
                                                   } 
                                                ]
                                            }}
                                            options={options}
                                            width="600" height="220"/>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="card  h-100 pb-3" style={{ backgroundColor: "transparent" }}>
                                    <div className="card-body bg-white">
                                        <h4 className="card-title">Recent Alerts</h4>
                                        <div className="feed-widget">
                                            <ul className="list-style-none feed-body m-0 p-b-20">
                                            </ul>
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
                                    <h4 className="card-title">Current Sensor Details  
                                    <span className="card-subtitle small px-2">Update every 2s</span>
                                    </h4> 
                                </div>
                                    </div>
                                    <div className="table-responsive">
                                        <table className="table v-middle" id="td">
                                            <thead>
                                                <tr className="bg-light">
                                                    <th className="border-top-0">Floor No</th>
                                                    <th className="border-top-0">Room No</th>
                                                    <th className="border-top-0">Co2 Level</th>
                                                    <th className="border-top-0">Smoke Level</th>
                                                    <th className="border-top-0">Status</th>
                                                    <th className="border-top-0">Actions</th>
                                                </tr>
                                            </thead >
                                            <tbody >
                                                {sensors.map(sensor => this.renderSensorTable(sensor))}
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

    renderSensorTable = item => {
        const status = (item.co2_level + item.smoke_level) / 2;
        return (<tr key={item.id}>
            <td>
                <div className="d-flex align-items-center">
                    <div className="">
                        <h4 className="m-b-0 font-16">{item.floor_id}</h4>
                    </div>
                </div>
            </td>
            <td>{item.room_id}</td>
            <td><FontAwesomeIcon icon={faCircle} className={`text-${this.changeStyleColor(item.co2_level)} blink`} /> {item.co2_level}.00 </td>
            <td><FontAwesomeIcon icon={faCircle} className={`text-${this.changeStyleColor(item.smoke_level)} blink`} /> {item.smoke_level}.00</td>
            <td><span className={`btn-sm bg-light text-dark`}>{this.changestatus(status)}</span></td>
            <td><Link to={`/sensor/${item.id}`}><span className="label bg-dark btn font-weight-bold">Details</span></Link> </td>
        </tr>
        );

    }

    changeStyleColor = number => {
        if (number >= 0 && number <= 2) {
            return 'success';
        } else if (number >= 3 && number <= 4) {
            return 'warning';
        } else if (number >= 5 && number <= 10) {
            return 'danger';
        } else {
            return 'secondary';
        }
    }

    changestatus = number => {
        if (number >= 0 && number <= 2) {
            return 'Normal';
        } else if (number >= 3 && number <= 4) {
            return 'Average';
        } else if (number >= 5 && number <= 10) {
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
                display: false
            }
        }],
        yAxes: [{
            gridLines: {
                display: false
            }
        }]
    }
}

export default Dashboard;