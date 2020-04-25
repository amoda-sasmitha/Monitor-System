import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import indexRoutes from './routes/index'
import ProtectedindexRoutes from './routes/protected'
import A_Admin from './Controllers/Admin'

class App extends React.Component {

  render() {
    return (
      <>
        {A_Admin.checkSignedIn() == false ? <Router>
         <Switch>
            {indexRoutes.map((prop, key) => {
              return (
                <Route
                  path={prop.path}
                  key={key}
                  component={prop.component}
                  exact={prop.exact ? true : false}
                />
              );
            })}

          </Switch>
        </Router> : <Router>
            <Switch>

              {ProtectedindexRoutes.map((prop, key) => {
                return (
                  <Route
                    path={prop.path}
                    key={key}
                    component={prop.component}
                    exact={prop.exact ? true : false}
                  />
                );
              })}
            </Switch>
          </Router>}

      </>
    );
  }
}
export default App;
