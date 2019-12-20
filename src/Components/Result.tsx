import { createStyles, makeStyles, Theme } from '@material-ui/core'
import React, { FC, useContext } from 'react'
import { Context } from '../App/AppReducer'

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

const Result: FC = () => {
  const classes = useStyles()
  const { state } = useContext(Context)

  return (
    <div>
      <h1>Employee Overview</h1>
      {state.employeeName !== '' && (
        <div>
          <div className={classes.demo}>
            <p>Subordinates of employee {state.employeeName}:</p>
            <div>{generate(state.directSub)}</div>
          </div>
          {state.nonDirectSub.length !== 0 && (
            <div className={classes.demo}>
              <p>Non-direct subordinates of employee {state.employeeName}:</p>
              <div>{generate(state.nonDirectSub)}</div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Result
