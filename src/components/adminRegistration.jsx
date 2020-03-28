import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {makeStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import {Container, Card, Snackbar, IconButton} from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Alert from '@material-ui/lab/Alert'
import EmailIcon from '@material-ui/icons/Email';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import TextField from '@material-ui/core/TextField'
import {adminRegister} from '../services/userServices'
import Grid from '@material-ui/core/Grid'
import AccountCircle from '@material-ui/icons/AccountCircle';
  import InputAdornment from '@material-ui/core/InputAdornment';
  import Visibility from '@material-ui/icons/Visibility';
  import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { blue } from '@material-ui/core/colors'

class Registration extends Component {
  constructor(props) {
    super(props)

    this.state = {
      Firstname: '',
      Lastname: '',
      Email: '',
      Password: '',
      Passwordagain: '',
      firstnameError:false,
      lastnameError:false,
      emailError:false,
      passwordError:false,
      passwordagainError:false,
      firstnameHelpertext:'',
      lastnameHelpertext:'',
      emailHelpertext:'',
      passwordHelpertext:'',
      passwordagainHelpertext:'',
      snackbarOpen: false,
      snackbarMessage: '',
      alertMsgType: 'error',
      showPassword: false
    }
  }

  onSubmit = () => {
    console.log('PasswordAgain : ' + this.state.Email)
    if ( this.state.firstnameError || this.state.lastnameError || this.state.emailError || this.state.passwordError || this.state.passwordagainError ) {
      this.setState({snackbarOpen: true, snackbarMessage: 'Enter registration data properly'})
    }  else {
      let sendData = {
        firstName: this.state.Firstname,
        lastName: this.state.Lastname,
        email: this.state.Email,
        role:"admin", 
        service: "advance",
        password: this.state.Password
      }
      adminRegister(sendData).then(response => {
        if(response.data){
          this.state.alertMsgType = 'success'
          this.setState({snackbarOpen: true, snackbarMessage: "Succefully Registered."})
          setTimeout(() => {
            this.props.history.push('/adminLogin')
          }, 2000)
        } else {
          this.state.alertMsgType = 'error'
          this.setState({snackbarOpen: true, snackbarMessage: "Something went wrong"})
        }
      }).catch()   
    }
  }

  onchangeFirstName = event => {
    if (/^[a-zA-Z]*$/.test(event.target.value)) {
      this.setState({Firstname: event.target.value})
      this.setState({firstnameError: false})
      this.setState({firstnameHelpertext: ""})
    } else {
      this.setState({Firstname: event.target.value})
      this.setState({firstnameError: true})
      this.setState({firstnameHelpertext: "enter only alphabets"})
    }
  }

  onchangeLastName = event => {
    if (/^[a-zA-Z]*$/.test(event.target.value)) {
      this.setState({Lastname: event.target.value})
      this.setState({lastnameError: false})
      this.setState({lastnameHelpertext: ""})
    } else {
      this.setState({Lastname: event.target.value})
      this.setState({lastnameError: true})
      this.setState({lastnameHelpertext: "enter only alphabets"})
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
      this.setState({emailHelpertext: "enter Proper Email."})
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
      this.setState({passwordHelpertext: "enter Proper password"})
    }
  }

  onchangePasswordagain = async event => {
    await this.setState({Passwordagain: event.target.value})
    this.checkPassword()
  }

  checkPassword() {
    if (this.state.Password === this.state.Passwordagain) {
      this.setState({passwordagainError: false})
      this.setState({passwordagainHelpertext: ""})
    } else {
      this.setState({passwordagainError: true})
      this.setState({passwordagainHelpertext: "enter same password"})
    }
  }
  SnackbarClose = e => {
    this.setState({snackbarOpen: false})
  }
  handleCloseSnackbar = () => {
    this.setState({snackbarOpen: false})
  }
  loginPage = () => {
    this
      .props
      .history
      .push('./adminLogin')
  }
  handleClickShowPassword = () =>{
    this.setState({showPassword: !this.state.showPassword })
  }
  render() {

    return (
      <div className="reg_main">

        <Card
          className='reg_card'
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
              Admin Registration
            </Typography>
            <Typography variant="body2" component="p">
              <form noValidate autoComplete="off">
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

                <div className="form_row">
                  <TextField
          
                    id="input-with-icon-textfield"
                    label="First Name"
                    variant="outlined"
                    margin="dense"
                    helperText={this.state.firstnameHelpertext}
                    error={this.state.firstnameError}
                    value={this.state.Firstname}
                    onChange={this.onchangeFirstName}
                    InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle/>
                      </InputAdornment>
                    )
                  }}/>
                  <TextField
          
                    id="input-with-icon-textfield"
                    label="Last Name"
                    variant="outlined"
                    margin="dense"
                    helperText={this.state.lastnameHelpertext}
                    error={this.state.lastnameError}
                    value={this.state.Lastname}
                    onChange={this.onchangeLastName}
                    InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle/>
                      </InputAdornment>
                    )
                  }}/>
                </div>
                <div className="form_row">
                  <TextField
                    
                    margin="dense"
                    helperText={this.state.emailHelpertext}
                    error={this.state.emailError}
                    value={this.state.Email}
                    onChange={this.onchangeEmail}
                    variant="outlined"
                    label="Email"
                    style={{
                      // width:"95%"
                  }}
                    InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon/>
                      </InputAdornment>
                    )
                  }}/>
                </div>
                <div className="form_row">
                  <TextField
          
                    id="input-with-icon-textfield"
                    variant="outlined"
                    label="Password"
                    margin="dense"
                    type={this.state.showPassword ? 'text' : 'password'}
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
                          style={{fontSize: '32px'}}
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
                  <TextField
                    margin="dense"
                    id="input-with-icon-textfield"
                    variant="outlined"
                    label="Comfirm-Password"
                    helperText={this.state.passwordHelpertext}
                    error={this.state.passwordError}
                    helperText={this.state.passwordagainHelpertext}
                    error={this.state.passwordagainError}
                    value={this.state.Passwordagain}
                    onChange={this.onchangePasswordagain}
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
                </div>
              </form>
            </Typography>
          </CardContent>

          <div className="login-btn">
          <div className="links_left">
            <span >
              for login click
              <a onClick={this.loginPage} style={{color:"blue", cursor:"pointer"}}> here</a>
              </span>
            </div>
          <div className="button_right">
          <CardActions>
            <Button
              variant="contained"
              color="primary"
              onClick={this.onSubmit}>Submit</Button>
          </CardActions>
          </div>
          </div> 
        </Card>
      </div>
    )
  }
}

export default withRouter(Registration)
