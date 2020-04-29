import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

import A_Admin from '../Controllers/Admin'
import './topbar.css'

class Topbar extends React.Component {



    signOut() {
        var sg = A_Admin.signOut()
    }
    render() {
        return (

            <nav className="navbar navbar-dark bg-dark p-0 m-0 fixed-top">
                <div className="navbar-header" >
                    <a className="navbar-brand">
                        <h4 className=" text-light mt-1 mx-2">
                            Sensor Dashboard
                        </h4>

                    </a>
                    <a className="nbt_sig" onClick={()=> this.signOut()} >
                    <FontAwesomeIcon icon={faSignOutAlt} style={{ color: 'white' }} />  <span className="pl-2 hide-menu " style={{ color: 'white' }}>
                            Sign Out</span>

                    </a>
                    
                </div>
            </nav>
        );
    }
}

export default Topbar;