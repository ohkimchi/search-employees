import IconButton from "@material-ui/core/IconButton"
import InputBase from "@material-ui/core/InputBase"
import Paper from "@material-ui/core/Paper"
import SearchIcon from "@material-ui/icons/Search"
import React, { FC, useContext, useEffect, useState } from "react"
import { Context, ActionType } from "../../App/AppReducer"
import { API } from "../../utils/api"
import { useStyles } from "./SearchReducer"
import "./_search.scss"
import { debounce } from "lodash"
import { getDirectSub } from "../../utils/directSub"

const data = [
  "CEO",
  {
    "direct-subordinates": [
      "Samad Pitt",
      "Leanna Hogg"
    ]
  }
]
const Search: FC = () => {
  const classes = useStyles()
  const { state, dispatch } = useContext(Context)
  const [name, setName] = useState("")

  const handleOnChange = debounce(async (name: string) => {
    setName(name)
    const dirSubRes = await getDirectSub(name)
    // console.log(dirSubRes)
    if (dirSubRes) {
      let [role, dirSubObj] = dirSubRes as any
      const subArr = dirSubObj["direct-subordinates"]
      dispatch({
        directSub: subArr,
        type: ActionType.SET_DIRECT_SUB
      })
      dispatch({
        employeeName: name,
        type: ActionType.SET_EMPLOYEE_NAME
      })
    }
  }, 300)

  function handleOnClick () {
    dispatch({
      currentPage: "ResultPage",
      type: ActionType.SET_CURRENT_PAGE
    })
  }


  return (
    <div className="search-page">
      <p>Employee Explorer</p>
      <Paper component="form" className={ classes.root }>
        <InputBase
          className={ classes.input }
          placeholder="Search Employee Name"
          inputProps={ { "aria-label": "search employee name" }}
          onChange={(e) => handleOnChange(e.target.value)}
        />
        <IconButton
          type="submit"
          className={ classes.iconButton }
          aria-label="search"
          onClick={() => handleOnClick()}
        >
          <SearchIcon />
        </IconButton>
      </Paper>
    </div>
  )
}

export default Search
