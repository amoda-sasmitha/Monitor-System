import React from 'react';

class Topbar extends React.Component {
    render(){
        return(
            
            <nav className="navbar navbar-dark bg-dark p-0 m-0 fixed-top">
                <div className="navbar-header" >
                    <a className="navbar-brand">
                        <h4 className=" text-light mt-1 mx-2">
                        Sensor Dashboard
                        </h4>
                        
                    </a>
                </div>
            </nav>
        );
    }
}

export default Topbar;