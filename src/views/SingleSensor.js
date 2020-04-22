import React from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faCircle} from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import {Line as LineChart} from 'react-chartjs-2';
import DATA from '../util/env'
import moment from 'moment'
import {Link } from "react-router-dom";

class SingleSensor extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            loading : false,
            sensors : {},
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
          }, 2000);
        
    }

    getDataFromApi = id => {
    axios.get(`${DATA.API}/sensors/getall/${id}/2`)
        .then( result => {

            let labels = [];
            let co2 = [];
            let smoke = [];
        
            let dataarray = result.data.data.log;
            if(dataarray.length > 6){
                dataarray =  dataarray.slice(Math.max(dataarray.length - 6 , 0))
            }
            console.log(dataarray);

            dataarray.forEach( item => {
                labels.push(moment(item.datetime).format('HH:mm:ss') );
                co2.push(item.co2_level);
                smoke.push(item.smoke_level);
            })

            this.setState({
                sensors : result.data.current ,
                labels : labels ,
                co2 : co2 , 
                smoke : smoke 
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
        const {sensors , labels , co2 , smoke } = this.state;
        return(
            <>
            <Topbar/>
            <Sidebar/>
            <div className="page-wrapper ">
                <div className="page-breadcrumb">
                    <div className="row align-items-center">
                        <div className="col-12">
                            <h4 className="page-title">Sensors Live Data</h4>
                        </div>
                    </div>
                </div>

                <div className="container-fluid">
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
                                                <li className="list-inline-item text-primary"><FontAwesomeIcon icon={faCircle} /> Smoke Level</li>
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
                                    <h4 className="card-title">Sensor Details 
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
                                        </tr>
                                    </thead >
                                    <tbody >
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