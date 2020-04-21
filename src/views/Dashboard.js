import React from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faCircle} from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import {Line as LineChart} from 'react-chartjs-2';
import DATA from '../util/env'
import moment from 'moment'
class Dashboard extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            loading : false,
            sensors : [],
            labels : [],
            co2 : [],
            smoke : [],
        }
    }

    componentDidMount(){

        this._interval = setInterval(() => {
            this.getDataFromApi();
          }, 10000);
        
    }

    getDataFromApi = () => {
    axios.get(`${DATA.API}/sensors/getall/10`)
        .then( result => {

            let labels = [];
            let co2 = [];
            let smoke = [];

            result.data.log.forEach( item => {
                labels.push(moment(item.datetime).format('HH:mm:ss') );
                co2.push(item.average_co2);
                smoke.push(item.average_smoke);
            })

            this.setState({
                sensors : result.data.current ,
                labels : labels ,
                co2 : co2 , 
                smoke : smoke 
            });
             console.log( result.data.log);
        })
        .catch( err => {
            console.log(err);
        })
    }

    componentWillUnmount() {
        clearInterval(this._interval);
      }

    render(){
        const {sensors , log } = this.state;
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
                        <div className="col-md-9 rounded">
                            <div className="card shadow-sm rounded">
                                <div className="card-body">
                                    <div className="d-md-flex align-items-center">
                                        <div>
                                            <h4 className="card-title font-weight-bold">Co2 & Smoke Level</h4>
                                            <h5 className="card-subtitle">Update every 5s</h5>
                                        </div>
                                        <div className="ml-auto d-flex no-block align-items-center">
                                            <ul className="list-inline font-12 dl m-r-15 m-b-0">
                                                <li className="list-inline-item text-info"><FontAwesomeIcon icon={faCircle} /> Co2</li>
                                                <li className="list-inline-item text-primary"><FontAwesomeIcon icon={faCircle} /> Heat</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="row">
                                        
                                        <div className="col-lg-12">
                                            <div className="campaign ct-charts">
                                            <LineChart data={data}
                                            options={options}
                                            width="600" height="250"/>
                                            </div>
                                        </div>
                                    
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="card  h-100 pb-3" style={{backgroundColor : "transparent"}}>
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
                                    <div>
                                        <h4 className="card-title">Sensor Details</h4>
                                        <h5 className="card-subtitle">Update every 30s</h5>
                                    </div>
                                    <div className="ml-auto">
                                        <div className="dl">
                                            <select className="custom-select">
                                                <option value="0" selected>Co2 Max to Min</option>
                                               <option value="0" selected>Co2 Max to Min</option>
                                            </select>
                                        </div>
                                    </div>
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
                                        { sensors.map ( sensor => this.renderSensorTable(sensor) )}
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
        const status = (item.co2_level + item.smoke_level)/2; 
        return (<tr key={item.id}>
            <td>
            <div className="d-flex align-items-center">
                <div className="">
                    <h4 className="m-b-0 font-16">{item.floor_id}</h4>
                </div>
            </div>
        </td>
        <td>{item.room_id}</td>
        <td><FontAwesomeIcon icon={faCircle} className={`text-${this.changeStyleColor(item.co2_level)} blink`}/> {item.co2_level}.00 </td>
        <td><FontAwesomeIcon icon={faCircle} className={`text-${this.changeStyleColor(item.smoke_level)} blink`}/> {item.smoke_level}.00</td>
        <td><span className={`btn-sm bg-light text-dark`}>{this.changestatus(status)}</span></td>
        <td><span className="label bg-dark btn">Details</span></td>	
    </tr>   
    );

    }

    changeStyleColor = number => {
        if(number >= 0 && number <= 4 ){
            return 'success';
        }else if(number >= 5 && number <= 7){
            return 'warning';
        }else if(number >= 8 && number <= 10){
            return 'danger';
        }else{
            return 'secondary';
        }
    }

    changestatus = number => {
        if(number >= 0 && number <= 4 ){
            return 'Normal';
        }else if(number >= 5 && number <= 7){
            return 'Average';
        }else if(number >= 8 && number <= 10){
            return 'Danger';
        }else{
            return 'None';
        }
    }



}

const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
       
        data: [65, 59, 80, 81, 56, 55, 40],
      },
      {
        data: [28, 48, 40, 19, 86, 27, 90],
      },
    ]
}

const options = {
    scaleShowGridLines: true,
    scaleGridLineColor: 'rgba(0,0,0,.05)',
    scaleGridLineWidth: 1,
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
 }

export default Dashboard;