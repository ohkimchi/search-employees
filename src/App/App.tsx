import React, { useReducer } from 'react'
import { PAGE_LOGIC } from '../Pages/PAGE_PAGE_LOGIC'
import './App.css'
import { Context, initialState, Reducer } from './AppReducer'

const App: React.FC = () => {
  const [state, dispatch] = useReducer(Reducer, initialState)
  const Compo = PAGE_LOGIC[state.currentPage]

  return (
    <Context.Provider value={{ state, dispatch }}>
      <div className='App'>
        <Compo />
      </div>
    </Context.Provider>
  )
}

export default App
