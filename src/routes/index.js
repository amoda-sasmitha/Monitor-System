
import Dashboard from '../views/Dashboard';
import SingleSensor from '../views/SingleSensor';

// import Login
import Login from '../views/Admin/Login'


let indexRoutes = [
  {
    path: "/*",
    name: "Login",
    component: Login,
  }
];

export default indexRoutes;