import { createContext, Dispatch } from "react"

export interface IAction {
  currentPage?: string
  type: ActionType
}

export enum ActionType {
  SET_CURRENT_PAGE = "SET_CURRENT_PAGE"
}

export const initialState = {
  currentPage: "SearchPage"
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
    default:
      return state
  }
}
