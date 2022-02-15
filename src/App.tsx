import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Layout from 'layouts'
import Landing from 'pages/Landing'
import './App.css';

const App = () => {
  return (
    <div className='App'>
      <Router>
        <Switch>
          <Layout>
            <Route exact path='/'>
              <Landing />
            </Route>
          </Layout>
        </Switch>
      </Router>
    </div>
  )
}

export default App