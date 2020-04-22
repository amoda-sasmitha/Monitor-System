
import Dashboard from '../views/Dashboard';
import SingleSensor from '../views/SingleSensor';


let indexRoutes = [
    {
      path: "/",
      name: "Dashboard",
      component: Dashboard,
      exact: true,
    },
    {
      path: "/sensor/:id",
      name: "SingleSensor",
      component: SingleSensor,
    }
];

export default indexRoutes;