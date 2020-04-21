import React from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';

class Dashboard extends React.Component {
    render(){
        return(
            <>
            <Topbar/>
            <Sidebar/>
            <div className="page-wrapper h-100">
                <h1>Hello</h1>
            </div>
            </>
        );
    }
}

export default Dashboard;