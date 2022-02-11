import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
.App {
  text-align: center;
}

nav.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  
}

nav.navbar ul {
  display: flex;
  justify-content: space-between;
  padding-right:2.5em;
}

nav.navbar ul li {
  display: block;
}

nav.navbar ul.right {
  width: 100%;
  padding-right: 2.5em;
}
.App-link {
  color: #61dafb;
}

`