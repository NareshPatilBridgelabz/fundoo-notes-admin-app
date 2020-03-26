import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {makeStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import {Container, Card, Snackbar, IconButton} from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Alert from '@material-ui/lab/Alert'
import TextField from '@material-ui/core/TextField'
import { forgotPassword } from '../services/userServices'
import EmailIcon from '@material-ui/icons/Email';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import Grid from '@material-ui/core/Grid'
import InputAdornment from '@material-ui/core/InputAdornment';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAling: 'center',
    color: theme.palette.text.secondary
  }
}))

class Registration extends Component {
  constructor (props) {
    super(props)

    this.state = {
      Email: '',
      snackbarOpen: false,
      snackbarMessage: '',
      alertMsgType:'error'
    }
  }
  
  onSubmit = () => {
    const errors = this.validate(this.state)
    // alert('Submitted')
    console.log(errors)
    if (errors.email || this.state.Email === '') {
      this.setState({
        snackbarOpen: true,
        snackbarMessage: 'Enter propper email-ID.   '
      })
    } else {
      let sendData = {
        email: this.state.Email
      }
      
      console.log(JSON.stringify(sendData));
      forgotPassword(sendData)
        .then(response => {
          if(response.data){
            this.state.alertMsgType = 'success'
            this.setState({
                snackbarOpen:true,
                snackbarMessage:response.data.message
            })
            setTimeout(() => {
                this.loginPage();
            }, 2000)
          } else {
            this.state.alertMsgType = 'error'
            this.setState({
              snackbarOpen:true,
              snackbarMessage:'Enter registered email ID'
            })
          }
            
        }).catch()
    }
  }

  validate = data => {
    const errors = {}
    if (!/([A-Z0-9a-z_-][^@])+?@[^$#<>?]+?\.[\w]{2,4}/.test(data.Email))
    errors.email = 'Invalid email'
    return errors
  }

  
  onchangeEmail = event => {
    this.setState({ Email: event.target.value })
  }

  SnackbarClose = e => {
    this.setState({ snackbarOpen: false })
  }
  handleCloseSnackbar = () => {
    this.setState({ snackbarOpen: false })
  }
  loginPage = () => {
    this.props.history.push('/login')
  }
  render () {
    const classes = { useStyles }

    return (
      <div className="login_main">
              <Card
          className='login_card'
          style={{
          boxShadow: "5px 10px 12px 1px",
          backgroundColor: "#f8f6f6"
        }}>
          <CardContent>
            <Typography className="forgotPassword_title" variant="h5" color="textSecondary">
              Forgot Password
            </Typography>
            <Typography className="forgotPassword_title" variant="h6" color="textSecondary">
              Enter Your email
            </Typography>
            <Typography variant="body2" component="p">
              <form className={classes.root} noValidate autoComplete="off" id="login_form">
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
                  value={this.state.Email}
                  onChange={this.onchangeEmail}
                  InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon/>
                    </InputAdornment>
                  )
                }}/>
                
              </form>
            </Typography>
          </CardContent>

          <div className="login-btn">
          <div className="links_left">
              <a href="login">Back
              </a>
            </div>
          <div className="button_right">
          <CardActions>
            <Button
              variant="contained"
              color="primary"
              onClick={this.onSubmit}>Next</Button>
          </CardActions>
          </div>
          </div>  
        </Card>
     </div>
    )
  }
}

export default withRouter(Registration)
