import React from 'react'
import { GoogleLogin, GoogleLogout } from 'react-google-login'
const CLIENT_ID = '766626669832-pdrt94d14jeee5n7m85evhukjs3lhb5v.apps.googleusercontent.com'
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
 }

 logout (response) {
   this.setState(state => ({
     isLoggedIn: false,
     accessToken: ''
   }));
 }

 handleLoginFailure (response) {
   alert('Failed to log in')
 }

 handleLogoutFailure (response) {
   alert('Failed to log out')
 }

 render() {
     console.log(this.state)
   return (
   <div>
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
     { this.state.accessToken ? <h5>{['hey there, ', 'hello ', 'well hi, ', 'welcome '][Math.floor(Math.random() * 4)] + this.state.profile.givenName }</h5> : null }

   </div>
   )
 }
}
export default GoogleSignIn