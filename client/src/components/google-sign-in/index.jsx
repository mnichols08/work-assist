import React from 'react'
import { GoogleLogin, GoogleLogout } from 'react-google-login'
const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID
class GoogleSignIn extends React.Component {
  constructor(props) {
   super(props);

   this.state = {
     isLoggedIn: false,
     accessToken: ''
   };

   this.login = this.login.bind(this);
   this.handleLoginFailure = this.handleLoginFailure.bind(this);
   this.logout = this.logout.bind(this);
   this.handleLogoutFailure = this.handleLogoutFailure.bind(this);
 }

 login (response) {
   if(response.accessToken){
     this.setState(state => ({
       isLoggedIn: true,
       accessToken: response.accessToken,
       profile: response.profileObj
     }));
   }
   this.props.login({loggedIn: true, accessToken: response.accessToken, user: response.profileObj})
 }

 logout (response) {
   this.setState(state => ({
     isLoggedIn: false,
     accessToken: ''
   }));
   this.props.logout()
 }

 handleLoginFailure (response) {
   console.error('Failed to log in')
 }

 handleLogoutFailure (response) {
   console.error('Failed to log out')
 }

 render() {
   return (
   <div>
       <h1>Log In</h1>
       <p>Use Google (for now) to log in to the app.</p>
     { this.state.isLoggedIn ?
       <GoogleLogout
         clientId={ CLIENT_ID }
         buttonText='Logout'
         onLogoutSuccess={ this.logout }
         onFailure={ this.handleLogoutFailure }
       >
       </GoogleLogout>: <GoogleLogin
         clientId={ CLIENT_ID }
         buttonText='Login'
         onSuccess={ this.login }
         onFailure={ this.handleLoginFailure }
         cookiePolicy={ 'single_host_origin' }
         responseType='code,token'
       />
     }
     { this.state.accessToken ? <h5>{[`Good ${new Date().getHours() > 3 && new Date().getHours() < 12 ? 'Morning ' : new Date().getHours() > 12 && new Date().getHours() < 18 ? 'Afternoon ' : 'Evening ' }`,'Hey there, ', 'Hello ', 'Well hi, ', 'Welcome '][Math.floor(Math.random() * 5)] + this.state.profile.givenName }</h5> : null }

   </div>
   )
 }
}
export default GoogleSignIn