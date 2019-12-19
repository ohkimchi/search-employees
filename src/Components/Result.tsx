import { createStyles, makeStyles, Theme } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import React, { FC, useContext } from 'react'
import { Context } from '../App/AppReducer'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      maxWidth: 752
    },
    demo: {
      backgroundColor: theme.palette.background.paper,
      width: '85%',
      margin: 'auto'
    }
  })
)
function generate(directSub: string[]) {
  return directSub.map((name, i) => <div key={`${name}-${i}`}>{name}</div>)
}

const Result: FC = () => {
  const classes = useStyles()
  const { state, dispatch } = useContext(Context)

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <p>Employee Overview</p>
          {state.employeeName !== '' && (
            <div className={classes.demo}>
              <p>Subordinates of employee {state.employeeName}</p>
              <div>{generate(state.directSub)}</div>
            </div>
          )}
        </Grid>
      </Grid>
    </div>
  )
}

export default Result
