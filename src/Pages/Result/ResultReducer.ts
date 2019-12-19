import { createStyles, makeStyles, Theme } from '@material-ui/core'

export const useStyles = makeStyles((theme: Theme) =>
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
