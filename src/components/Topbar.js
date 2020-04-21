import React from 'react';

class Topbar extends React.Component {
    render(){
        return(
            <header className="topbar" data-navbarbg="skin5">
            <nav className="navbar top-navbar navbar-expand-md navbar-dark">
                <div className="navbar-header" data-logobg="skin5">
                    <a className="navbar-brand" href="index.html">
                        <h4 className=" text-light mt-4 mx-2">
                        Sensor Dashboard
                        </h4>
                        
                    </a>
                    <a className="nav-toggler waves-effect waves-light d-block d-md-none" href="javascript:void(0)">
					<i className="ti-menu ti-close"></i></a>
                </div>
            </nav>
        </header>
        );
    }
}

export default Topbar;