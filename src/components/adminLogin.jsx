import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import Button from '@material-ui/core/Button'
import { Card, Snackbar, IconButton} from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Alert from '@material-ui/lab/Alert'
import TextField from '@material-ui/core/TextField'
import { adminLogin } from '../services/userServices'
import EmailIcon from '@material-ui/icons/Email';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';


class Registration extends Component {
  constructor(props) {
    super(props)

    this.state = {
      Email: '',
      Password: '',
      emailError:false,
      passwordError:false,
      emailHelpertext:'',
      passwordHelpertext:'',
      snackbarOpen: false,
      snackbarMessage: '',
      alertMsgType: 'error',
      showPassword: false
    }
  }

  onSubmit = () => {
    if ( this.state.emailError || this.state.passwordError ) {
      this.setState({snackbarOpen: true, snackbarMessage: 'Enter login data properly'})
    }  else {
      let sendData = {
        email: this.state.Email,
        password: this.state.Password
      }

      console.log(JSON.stringify(sendData))
      adminLogin(sendData)
        .then(response => {
          console.log('Responce : ')
          console.log(response)
          console.log(response.status)
          if (response.status === 200) {
            this.state.alertMsgType = 'success'
            this.setState({
              snackbarOpen: true,
              snackbarMessage: 'Login Succesfully.'
            })
            localStorage.setItem('token', response.data.id)
            setTimeout(() => {
              this.props.history.push('/adminDashboard')
            }, 2000)
          } else {
            this.state.alertMsgType = 'error'
            this.setState({
              snackbarOpen: true,
              snackbarMessage: 'Enter correct credentials.'
            })
          }
        })
        .catch()
    }
  }

  onchangeEmail = event => {
    if (/([A-Z0-9a-z_-][^@])+?@[^$#<>?]+?\.[\w]{2,4}/.test(event.target.value)){
      this.setState({Email: event.target.value})
      this.setState({emailError: false})
      this.setState({emailHelpertext: ""})
    }else{
      this.setState({Email: event.target.value})
      this.setState({emailError: true})
      this.setState({emailHelpertext: "Enter Proper Email."})
    }
  }


  onchangePassword = event => {
    if (event.target.value.match('^[A-Za-z0-9!@#$%^&*]{5,15}$') != null) {
      this.setState({Password: event.target.value})
      this.setState({passwordError: false})
      this.setState({passwordHelpertext: ""})
    } else {
      this.setState({Password: event.target.value})
      this.setState({passwordError: true})
      this.setState({passwordHelpertext: "Enter Proper password"})
    }
  }

  SnackbarClose = e => {
    this.setState({snackbarOpen: false})
  }
  handleCloseSnackbar = () => {
    this.setState({snackbarOpen: false})
  }
  handleClickShowPassword = () =>{
    this.setState({showPassword: !this.state.showPassword })
  }
  render() {
    return (
      <div className="login_main">

        <Card
          className='login_card'
          style={{
          boxShadow: "5px 10px 12px 1px",
          backgroundColor: "rgb(255, 251, 251)"
        }}>
          <CardContent>
            <Typography className="register_title" variant="h5" color="textSecondary">
              <span style={{color:"red"}}>F</span>
              <span style={{color:"blue"}}>U</span>
              <span style={{color:"green"}}>N</span>
              <span style={{color:"maroon"}}>D</span>
              <span style={{color:"red"}}>O</span>
              <span style={{color:"blue"}}>O</span>
            </Typography>
            <Typography className="register_title" variant="h6" color="textSecondary">
              ADMIN LOGIN
            </Typography>
            <Typography variant="body2" component="p">
              <form noValidate autoComplete="off" id="login_form">
              <Snackbar
                        anchorOrigin={{
                          vertical: 'bottom',
                          horizontal: 'center'
                        }}
                        open={this.state.snackbarOpen}
                        autoHideDuration={3000}
                        onClose={() => this.setState({snackbarOpen: false})}
                        message={
                          <span id='message-id'>
                            {' '}
                            {this.state.snackbarMessage}{' '}
                          </span>
                        }
                      >
                        <Alert
                          onClose={this.handleCloseSnackbar}
                          severity={this.state.alertMsgType}
                        >
                          {this.state.snackbarMessage}
                        </Alert>
                      </Snackbar>
                <TextField
                  fullWidth
                  id="input-with-icon-textfield"
                  label="Email"
                  variant="outlined"
                  margin="dense"
                  helperText={this.state.emailHelpertext}
                  error={this.state.emailError}
                  value={this.state.Email}
                  onChange={this.onchangeEmail}
                  InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon/>
                    </InputAdornment>
                  )
                }}/>
                <TextField
                  fullWidth
                  id="input-with-icon-textfield"
                  label="Password"
                  variant="outlined"
                  margin="dense"
                  type={this.state.showPassword ? "text" : "password" }
                  helperText={this.state.passwordHelpertext}
                  error={this.state.passwordError}
                  value={this.state.Password}
                  onChange={this.onchangePassword}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <VpnKeyIcon/>
                      </InputAdornment>
                    ),
                    endAdornment:(
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={this.handleClickShowPassword}
                          // onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}/>
              </form>
            </Typography>
          </CardContent>

         <div className="login-btn">
          <div className="links_left">
              
              <span>for create account. 
              <a href="adminRegistration"> create Account
              </a>
              </span>
            </div>
          <div className="button_right">
          <CardActions>
            <Button
              variant="contained"
              color="primary"
              onClick={this.onSubmit}>Login</Button>
          </CardActions>
          </div>
          </div>  
        </Card>
      </div>
    )
  }
}

export default withRouter(Registration)
