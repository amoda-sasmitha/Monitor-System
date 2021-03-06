
import Dashboard from '../views/Dashboard';
import SingleSensor from '../views/SingleSensor';
import SensorData from '../views/SensorData';

// import Login
import Login from '../views/Admin/Login'
import AdminVieww from '../views/Admin/AdminRegister'


let ProtectedindexRoutes = [
    {
        path: "/dashboard",
        name: "Dashboard",
        component: Dashboard,
        exact: true,
    },
    {
        path: "/sensor/:id",
        name: "SingleSensor",
        component: SingleSensor,
    },
    {
        path: "/sensordata",
        name: "Sensor Data",
        component: SensorData,
        exact: true,
    },
    {
        path: "/admin",
        name: "AdminView",
        component: AdminVieww,
    },
    {
        path: "/*",
        name: "Dashboard",
        component: Dashboard,
    },

];

export default ProtectedindexRoutes;