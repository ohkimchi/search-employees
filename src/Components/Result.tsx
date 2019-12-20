import { createStyles, makeStyles, Theme } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import React, { FC, useContext } from 'react'
import { Context } from '../App/AppReducer'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    demo: {
      backgroundColor: theme.palette.background.paper,
      margin: 'auto',
      width: '85%'
    },
    root: {
      flexGrow: 1,
      maxWidth: 752
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
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <p>Employee Overview</p>
          {state.employeeName !== '' && (
            <div>
              <div className={classes.demo}>
                <p>Subordinates of employee {state.employeeName}</p>
                <div>{generate(state.directSub)}</div>
              </div>
              <div className={classes.demo}>
                <p>Non-direct subordinates of employee {state.employeeName}</p>
                <div>{generate(state.nonDirectSub)}</div>
              </div>
            </div>
          )}
        </Grid>
      </Grid>
    </div>
  )
}

export default Result
