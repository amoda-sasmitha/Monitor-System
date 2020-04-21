import React from 'react';

class Sidebar extends React.Component {
    render(){
        return(
            <aside className="left-sidebar" data-sidebarbg="skin6">
                <div className="scroll-sidebar">
                <nav className="sidebar-nav">
                    <ul id="sidebarnav">
                        <li>
                            <div className="user-profile d-flex no-block dropdown m-t-20">
                                <div className="user-pic">
                                    <img src="images/users/1.jpg" alt="users" className="rounded-circle" width="40" />
                                </div>
                                <div className="user-content hide-menu ml-3">
                                    <h5 className="mb-0 user-name font-medium">Admin </h5>
                                    <span className="op-5 user-email">amoda@gmail.com</span>                                                                 
                                </div>
                            </div>
                        </li>
                        <li className="sidebar-item"> 
                            <a className="sidebar-link waves-effect waves-dark sidebar-link" 
                                href="/" aria-expanded="false">
                                <i className="mdi mdi-view-dashboard"></i><span className="hide-menu">
                                    Dashboard</span>
                            </a>
                        </li>
                    </ul>      
                </nav>
            </div>
        </aside>
        );
    }
}

export default Sidebar;