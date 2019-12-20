import React, { useReducer } from 'react'
import { HashRouter as Router, Route } from 'react-router-dom'
import ResultForShare from '../Components/ResultForShare'
import { PAGE_LOGIC } from '../utils/utils'
import './App.css'
import { Context, initialState, Reducer } from './AppReducer'

const App: React.FC = () => {
  const [state, dispatch] = useReducer(Reducer, initialState)
  const Compo = PAGE_LOGIC[state.currentPage]

  return (
    <Context.Provider value={{ state, dispatch }}>
      <div className='App'>
        <Router>
          <Route exact path='/' component={Compo}/>
          <Route path='/overview/:name' component={ResultForShare} />
        </Router>
      </div>
    </Context.Provider>
  )
}

export default App
