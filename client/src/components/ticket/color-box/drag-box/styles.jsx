import { withStyles } from '@material-ui/styles'
import queries from '../../mediaqueries'
import chroma from 'chroma-js'

const styles = {
  root: {
    width: "20%",
    height: "25%",
    margin: "0 auto",
    display: "inline-block",
    position: "relative",
    cursor: "pointer",
    marginBottom: "-3.5px",
    "&:hover svg": {
      color: "white",
      transform: "scale(1.5)"
    },
    [queries.down("lg")]: {
      width: "25%",
      height: "20%"
    },
    [queries.down("md")]: {
      width: "50%",
      height: "10%"
    },
    [queries.down("sm")]: {
      width: "100%",
      height: "10%"
    }
  },
  boxContent: {
    position: "absolute",
    width: "100%",
    left: "0px",
    bottom: "0px",
    padding: "10px",
    letterSpacing: "1px",
    textTransform: "uppercase",
    fontSize: "12px",
    display: "flex",
    justifyContent: "space-between",
    color: props =>
        chroma(props.color).luminance() <= 0.08 ? "white" : "black", 
  },
  deleteIcon: {
    transition: "all 0.3s ease-in-out"
  }
}

export default withStyles(styles)