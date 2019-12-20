import { createStyles, makeStyles, Theme } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import InputBase from '@material-ui/core/InputBase'
import Paper from '@material-ui/core/Paper'
import SearchIcon from '@material-ui/icons/Search'
import React, { FC, useContext, useState } from 'react'
import { ActionType, Context } from '../App/AppReducer'
import { getDirectSub, getNonDirectSub } from '../utils/utils'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: 300,
      margin: 'auto'
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1
    },
    iconButton: {
      padding: 10
    }
  })
)

const Search: FC = () => {
  const classes = useStyles()
  const { dispatch } = useContext(Context)
  const [name, setName] = useState('')
  const [showReminder, setShowReminder] = useState(false)
  const [showNoResult, setNoResult] = useState(false)

  const handleOnChange = (name: string) => {
    setName(name)
    if (name !== '') {
      setShowReminder(false)
    }
    setNoResult(false)
  }

  async function handleOnClick(e: any) {
    e.preventDefault()

    if (name === '') {
      setShowReminder(true)
    } else {
      const subArr = await getDirectSub(name)
      if (subArr) {
        const nonDirSubArr = await getNonDirectSub(subArr, [])
        if (nonDirSubArr !== []) {
          dispatch({
            nonDirectSub: nonDirSubArr,
            type: ActionType.SET_NON_DIRECT_SUB
          })
        }
        dispatch({
          directSub: subArr,
          type: ActionType.SET_DIRECT_SUB
        })
        dispatch({
          employeeName: name,
          type: ActionType.SET_EMPLOYEE_NAME
        })
        dispatch({
          currentPage: 'ResultPage',
          type: ActionType.SET_CURRENT_PAGE
        })
      } else {
        setNoResult(true)
      }
    }
  }

  return (
    <div className='search-page'>
      <p>Employee Explorer</p>
      <Paper component='form' className={classes.root}>
        <InputBase
          className={classes.input}
          placeholder='Search Employee Name'
          inputProps={{ 'aria-label': 'search employee name' }}
          onChange={(e) => handleOnChange(e.target.value)}
        />
        <IconButton
          type='submit'
          className={classes.iconButton}
          aria-label='search'
          onClick={(e) => handleOnClick(e)}
        >
          <SearchIcon />
        </IconButton>
      </Paper>
      {showReminder && <p>You should key in something then search.</p>}
      {showNoResult && <p>There is no person called {name}</p>}
    </div>
  )
}

export default Search
