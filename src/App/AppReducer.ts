import { createContext, Dispatch } from 'react'

export interface IAction {
  currentPage?: string
  directSub?: string[]
  employeeName?: string
  type: ActionType
}

export enum ActionType {
  SET_CURRENT_PAGE = 'SET_CURRENT_PAGE',
  SET_DIRECT_SUB = 'SET_DIRECT_SUB',
  SET_EMPLOYEE_NAME = 'SET_EMPLOYEE_NAME'
}

export const initialState = {
  currentPage: 'SearchPage',
  directSub: [''],
  employeeName: ''
}

interface IContextProps {
  state: typeof initialState
  dispatch: Dispatch<IAction>
}

export const Context = createContext({} as IContextProps)

export function Reducer(state: any, action: IAction) {
  switch (action.type) {
    case ActionType.SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.currentPage
      }
    case ActionType.SET_DIRECT_SUB:
      return {
        ...state,
        directSub: action.directSub
      }
    case ActionType.SET_EMPLOYEE_NAME:
      return {
        ...state,
        employeeName: action.employeeName
      }
    default:
      return state
  }
}
