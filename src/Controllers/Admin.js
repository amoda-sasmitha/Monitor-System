import Axios from 'axios';
import DATA from '../util/env'

// import cookies 
import Cookies from "js-cookie";

class Admin {

    constructor() {
        this.api = {
            signin: "/users/login",
            register: "/users/register",
            getAllAdmins: "/users/a/all"

        };
    }



    // ------------------------------- Sign In ---------------------------------------
    // ------------------------------- Sign In ---------------------------------------
    // ------------------------------- Sign In ---------------------------------------
    // ------------------------------- Sign In ---------------------------------------
    async adminSign(Admin) {
        var requestData = {
            admin: Admin
        };
        console.log("REquset data", requestData);

        // var for store respose
        var resp = 600;
        var data = {};
        // sending request
        await Axios.post(
            `${DATA.API}${this.api.signin}`,
            requestData
        )
            .then(Response => {
                resp = Response.status;
                data = Response.data;
            })
            .catch(err => {
                console.error(err);

                try {
                    resp = err.response.status;
                } catch (error) {
                    //   network error
                    resp = 600;
                }
            });

        var returnObj = {
            status: resp,
            data: data
        };
        return returnObj;
    }



    // ------------------------------- Register ---------------------------------------
    // ------------------------------- Register ---------------------------------------
    // ------------------------------- Register ---------------------------------------
    // ------------------------------- Register ---------------------------------------

    async registerAdmin(Admin) {
        var requestData = {
            admin: Admin
        };
        // var for store respose
        var resp = 600;
        var data = {};
        // sending request
        await Axios.post(
            `${DATA.API}${this.api.register}`,
            requestData
        )
            .then(Response => {
                resp = Response.status;
                data = Response.data;
            })
            .catch(err => {
                console.error(err);

                try {
                    resp = err.response.status;
                } catch (error) {
                    //   network error
                    resp = 600;
                }
            });

        var returnObj = {
            status: resp,
            data: data
        };
        return returnObj;
    }





    // ------------------------------- Get all Admins ---------------------------------------
    // ------------------------------- Get all Admins ---------------------------------------
    // ------------------------------- Get all Admins ---------------------------------------
    // ------------------------------- Get all Admins ---------------------------------------


    getAllAdminDetails = async () => {
        var resp = 600;
        var data = {};
        // var for store respose
        var resp = 600;
        var data = {};
        // sending request
        await Axios.get(
            `${DATA.API}${this.api.getAllAdmins}`

        )
            .then(Response => {
                resp = Response.status;
                data = Response.data;
            })
            .catch(err => {
                console.error(err);

                try {
                    resp = err.response.status;
                } catch (error) {
                    //   network error
                    resp = 600;
                }
            });

        var returnObj = {
            status: resp,
            data: data.result
        };

        
        return returnObj;



    }


    // ------------------------------- Set Cookeis ---------------------------------------
    // ------------------------------- Set Cookeis ---------------------------------------
    // ------------------------------- Set Cookeis ---------------------------------------
    // ------------------------------- Set Cookeis ---------------------------------------


    // ======================================================= ================================================================================================================
    // ===============   set cookies when user login  start here ===============================================================================================================
    // ======================================================== ================================================================================================================

    setCookies(status, id, name, email, phone) {
        var secureState = false;


        Cookies.set("cSta", status, { secure: secureState });
        Cookies.set("cI", btoa(id), { secure: secureState });
        Cookies.set("cN", btoa(name), { secure: secureState });
        Cookies.set("cE", btoa(email), { secure: secureState });
        Cookies.set("cP", btoa(phone), { secure: secureState });

    }

    // ======================================================= ================================================================================================================
    // ===============   set cookies when user login  end here ===============================================================================================================
    // ======================================================== ================================================================================================================

    // ======================================================= ================================================================================================================
    // ===============   chekc signed in start here               ==============================================================================================================
    // ======================================================== ================================================================================================================
    checkSignedIn() {
        if (
            Cookies.get("cSta") === false ||
            Cookies.get("cI") === undefined ||
            Cookies.get("cE") === undefined || Cookies.get("cSta") === undefined || Cookies.get("cSta") === null
        ) {
            return false;
        } else {
            return true;
        }
    }

    // ======================================================= ================================================================================================================
    // ===============   chekc signed in end   here               ==============================================================================================================
    // ======================================================== ================================================================================================================



    // ======================================================= ================================================================================================================
    // ===============  get user details from cookies  start here =============================================================================================================
    // ======================================================== ================================================================================================================

    // get name
    getName() {
        return atob(Cookies.get("cN"));
    }
    // get state
    getState() {
        return Cookies.get("cSta");
    }
    // get email
    getEmail() {
        return atob(Cookies.get("cE"));
    }
    // get created at
    getPhone() {
        return atob(Cookies.get("cP"));
    }
    // get created at
    getId() {
        return atob(Cookies.get("cI"));
    }



    // ======================================================= ================================================================================================================
    // ===============  get user details from cookies  end   here =============================================================================================================
    // ======================================================== ================================================================================================================

}

var obj = new Admin();
export default obj;
