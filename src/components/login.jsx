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
import {register} from '../services/userServices'

const useStyles = makeStyles(theme => ({
  // root: {   flexGrow: 1 }, paper: {   padding: theme.spacing(2),   textAling:
  // 'center',   color: theme.palette.text.secondary }
}))

class Registration extends Component {
  constructor(props) {
    super(props)

    this.state = {
      Firstname: '',
      Lastname: '',
      Email: '',
      Phone: '',
      Password: '',
      Passwordagain: '',
      snackbarOpen: false,
      snackbarMessage: '',
      alertMsgType: 'error'
    }
  }

  onSubmit = () => {
    const errors = this.validate(this.state)
    // alert('Submitted')
    console.log(errors)
    console.log('PasswordAgain : ' + this.state.Email)
    if (this.state.Firstname === '') {
      console.log('firstname is empty')
      this.setState({snackbarOpen: true, snackbarMessage: 'Enter first name'})
    } else if (this.state.Lastname === '') {
      this.setState({snackbarOpen: true, snackbarMessage: 'Enter last name'})
      console.log('lastname is empty')
    } else if (errors.email || this.state.Email === '') {
      this.setState({snackbarOpen: true, snackbarMessage: 'Enter propper email-ID.   '})
    } else if (this.state.Country === '') {
      this.setState({snackbarOpen: true, snackbarMessage: 'Enter country '})
      console.log('lastname is empty')
    } else if (this.state.Password === '') {
      this.setState({snackbarOpen: true, snackbarMessage: 'Enter correct password'})
      console.log('password is empty')
    } else if (this.state.Passwordagain === '') {
      this.setState({snackbarOpen: true, snackbarMessage: 'Enter same password'})
      console.log('requires same password')
    } else {
      let sendData = {
        firstName: this.state.Firstname,
        lastName: this.state.Lastname,
        email: this.state.Email,
        service: 'advance',
        password: this.state.Password,
        phoneNumber: this.state.Phone
      }

      console.log(JSON.stringify(sendData));
      register(sendData).then(response => {
        this.state.alertMsgType = 'success'
        this.setState({snackbarOpen: true, snackbarMessage: "Succefully Registered."})
        setTimeout(() => {
          this.loginPage();
        }, 2000)
        console.log('RESPONSE :', response);
      }).catch()
    }
  }

  validate = data => {
    const errors = {}
    if (!/([A-Z0-9a-z_-][^@])+?@[^$#<>?]+?\.[\w]{2,4}/.test(data.Email)) 
      errors.email = 'Invalid email'
    return errors
  }

  onchangeFirstName = event => {
    if (/^[a-zA-Z]*$/.test(event.target.value)) {
      this.setState({Firstname: event.target.value})
    } else {
      this.setState({snackbarOpen: true, snackbarMessage: 'Enter only alphabets   '})
    }
  }

  onchangeLastName = event => {
    if (/^[a-zA-Z]*$/.test(event.target.value)) {
      this.setState({Lastname: event.target.value})
    } else {
      this.setState({snackbarOpen: true, snackbarMessage: 'Enter only alphabets.   '})
    }
  }

  onchangeEmail = event => {
    this.setState({Email: event.target.value})
  }

  onchangePhone = event => {
    if (/^[0-9]*$/.test(event.target.value)) {
      this.setState({Phone: event.target.value})
    } else {
      this.setState({snackbarOpen: true, snackbarMessage: 'Enter only numbers.   '})
    }
  }

  onchangePassword = event => {
    if (event.target.value.match('^[A-Za-z0-9]*$') != null) {
      // console.log("on click function is working", event.target.value)
      this.setState({Password: event.target.value})
    } else {
      // console.log("on click function is not working", event.target.value)
      this.setState({snackbarOpen: true, snackbarMessage: 'enter correct password'})
    }
  }

  onchangePasswordagain = async event => {
    await this.setState({Passwordagain: event.target.value})
    this.checkPassword()
  }

  checkPassword() {
    if (this.state.Password === this.state.Passwordagain) {
      this.setState({snackbarOpen: true, snackbarMessage: 'done'})
    } else {
      this.setState({snackbarOpen: true, snackbarMessage: 'enter same password'})
    }
  }

  SnackbarClose = e => {
    this.setState({snackbarOpen: false})
  }
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
    console.log(this.setState({
      [e.target.name]: e.target.value
    }))
  }
  handleCloseSnackbar = () => {
    this.setState({snackbarOpen: false})
  }
  loginPage = () => {
    this
      .props
      .history
      .push('/login')
  }
  render() {
    const classes = {
      useStyles
    }

    return (
      <div className="login_main">

        <Card className='login_card'>
          <CardContent>
            <Typography className="register_title"  variant="h5" color="textSecondary">
              Login On Fundoo Notes
            </Typography>
            <Typography variant="body2" component="p">
              <form className={classes.root} noValidate autoComplete="off">
                <div className="form_row" style={{width: 'fit-content'}}>
                  <TextField
                    required
                    fullWidth
                    id="standard-required"
                    label="First Name"
                    />
                </div>
                
                <div className="form_row" style={{width: 'fit-content'}}>
                  <TextField
                    required
                    fullWidth
                    id="standard-required"
                    type="password"
                    label="Password"
                    />
                </div>
              </form>
            </Typography>
          </CardContent>
          <CardActions>
            <Button className="register-btn" variant="contained" color="primary" href="#contained-buttons" >Login</Button>
          </CardActions>
        </Card>
      </div>
    )
  }
}

export default withRouter(Registration)
