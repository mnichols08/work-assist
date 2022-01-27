import { withStyles } from '@material-ui/styles'
import { drawerWidth } from '../constants'

const pickerWidth = ((drawerWidth / 100) * 80)
const styles = {
    picker: {
      width: `${pickerWidth}px !important`,
      marginTop: "2rem"
    },
    addColor: {
      width: "100%",
      padding: "1rem",
      marginTop: "1rem",
      fontSize: "2rem"
    },
    colorNameInput: {
      width: "100%",
      height: "70px"
    }
  }

export default withStyles(styles)