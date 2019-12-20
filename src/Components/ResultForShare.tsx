import { createStyles, makeStyles, Theme } from '@material-ui/core'
import React, { FC, useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { ActionType, Context } from '../App/AppReducer'
import { getDirAndUnDirSub } from '../utils/utils'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    demo: {
      backgroundColor: theme.palette.background.paper,
      margin: 'auto',
      width: '85%'
    }
  })
)
function generate(directSub: string[]) {
  return directSub.map((name, i) => <p key={`${name}-${i}`}>{name}</p>)
}

const ResultForShare: FC = () => {
  const classes = useStyles()
  const { state, dispatch } = useContext(Context)
  const history = useHistory()
  const employeeName = history.location.pathname.split('/').splice(-1)[0]

  useEffect(() => {
    if (state.employeeName === '' && employeeName !== '') {
      dispatch({
        employeeName,
        type: ActionType.SET_EMPLOYEE_NAME
      })
      getDirAndUnDirSub(employeeName, dispatch)
    }

  }, [state.employeeName, history, employeeName, dispatch])

  return (
    <div>
      <h1>Employee Overview</h1>
      {state.employeeName !== '' && (
        <div>
          <div className={classes.demo}>
            <p>Subordinates of employee {state.employeeName}: ({state.directSub.length})</p>
            <div>{generate(state.directSub)}</div>
          </div>
          {state.nonDirectSub.length !== 0 && (
            <div className={classes.demo}>
<p>Non-direct subordinates of employee {state.employeeName}: ({state.nonDirectSub.length})</p>
              <div>{generate(state.nonDirectSub)}</div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default ResultForShare
