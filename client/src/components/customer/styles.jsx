import { withStyles } from '@material-ui/styles'
import queries from './mediaqueries'

const rNum = (n = 100) => Math.floor(Math.random()*n)+1

const styles = {
  "@global":{
    ".fade-exit": {
      opacity: 1
    },
    ".fade-exit-active": {
      opacity: 0, 
      transition: 'opacity 500ms ease-out'
    }
  },
  root: {
    backgroundImage: `linear-gradient(${rNum()}deg, hsl(${rNum(360)},50%,10%), hsl(${rNum(360)},15%,5%))`,
    height: "100vh",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    overflow:'scroll'
  },
  container: {
    width: "50%",
    display: "flex",
    alignItems: "flex-start",
    flexDirection: "column",
    flexWrap: "wrap",
    [queries.down("xl")]: {
      width: "80%"
    },
    [queries.down("xs")]: {
      width: "75%"
    }
  },
  nav: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    color: "white",
    "& a": {
      color: "white"
    }
  },
  tickets: {
    boxSizing: "border-box",
    width: "100%",
    display: "grid",
    gridTemplateColumns: "repeat(3, 30%)",
    gridGap: "2.5rem",
    [queries.down("md")]: {
      gridTemplateColumns: "repeat(2, 50%)"
    },
    [queries.down("xs")]: {
      gridTemplateColumns: "repeat(1, 100%)",
      gridGap: "1.4rem"
    }
  }
}

  export default withStyles(styles)