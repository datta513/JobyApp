import './App.css'
import {Route, Switch, Redirect} from 'react-router-dom'
import Home from './component/home/home'
import Routecheck from './component/routecheck/routecheckf'
import NotFound from './component/notfound'
import RouteChecklogedin from './component/Logedinusercheck/checkforlogin'
import Jobs from './component/JOBS/Jobs'
import Login from './component/login/login'
import ProductId from './component/Producteach/Producteach'
// These are the lists used in the application. You can move them to any component needed.

// Replace your code here
const App = () => (
  <div className="back">
    <Switch>
      <Routecheck exact path="/" component={Home} />
      <RouteChecklogedin exact path="/login" component={Login} />
      <Routecheck exact path="/jobs" component={Jobs} />
      <Route path="/not-found" component={NotFound} />
      <Routecheck exact path="/Jobs/:id" component={ProductId} />
      <Redirect to="/not-found" />
    </Switch>
  </div>
)

export default App
