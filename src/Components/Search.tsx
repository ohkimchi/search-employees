import { createStyles, makeStyles, Theme } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import InputBase from '@material-ui/core/InputBase'
import Paper from '@material-ui/core/Paper'
import SearchIcon from '@material-ui/icons/Search'
import { debounce } from 'lodash'
import React, { FC, useContext, useState } from 'react'
import { ActionType, Context } from '../App/AppReducer'
import { getDirectSub } from '../utils/directSub'

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
    },
    divider: {
      height: 28,
      margin: 4
    }
  })
)

const Search: FC = () => {
  const classes = useStyles()
  const { state, dispatch } = useContext(Context)
  const [name, setName] = useState('')
  const [showReminder, setShowReminder] = useState(false)

  const handleOnChange = debounce(async (name: string) => {
    if (name !== '') {
      setName(name)
      const dirSubRes = await getDirectSub(name)
      // console.log(dirSubRes)
      if (dirSubRes) {
        const [role, dirSubObj] = dirSubRes as any
        const subArr = dirSubObj['direct-subordinates']
        dispatch({
          directSub: subArr,
          type: ActionType.SET_DIRECT_SUB
        })
        dispatch({
          employeeName: name,
          type: ActionType.SET_EMPLOYEE_NAME
        })
      }
    }
  }, 300)

  function handleOnClick(e: any) {
    e.preventDefault()
    if (name === '') {
      setShowReminder(true)
    } else {
      // setShowReminder(false)
      console.log('name', name)
      dispatch({
        currentPage: 'ResultPage',
        type: ActionType.SET_CURRENT_PAGE
      })
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
    </div>
  )
}

export default Search
