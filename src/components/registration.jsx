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
import {register} from '../services/userServices'
import Grid from '@material-ui/core/Grid'
import AccountCircle from '@material-ui/icons/AccountCircle';
import InputAdornment from '@material-ui/core/InputAdornment';

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
      Password: '',
      Passwordagain: '',
      snackbarOpen: false,
      snackbarMessage: '',
      alertMsgType: 'error',
      service:'',
      advanceService: 'ADD TO CART',
      basicService: 'ADD TO CART',
      advanceBGcolor: "gray",
      basicBGcolor: "gray"
    }
    if (this.props.location.data) {
      console.log(this.props.location.data)
      if (this.props.location.data.service === "advance") {
        this.state.advanceService = "Selected"
        this.state.advanceBGcolor = "yellowgreen"
        this.state.basicBGcolor = "gray"
        this.state.service = "advance"
      } else if (this.props.location.data.service === "basic") {
        this.state.basicService = "Selected"
        this.state.basicBGcolor = "yellowgreen"
        this.state.advanceBGcolor = "gray"
        this.state.service = "basic"
      }
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
    } else if (this.state.service === '') {
      this.setState({snackbarOpen: true, snackbarMessage: 'Service not selected'})
    } else {
      let sendData = {
        firstName: this.state.Firstname,
        lastName: this.state.Lastname,
        email: this.state.Email,
        service: this.state.service,
        password: this.state.Password
      }

      console.log(JSON.stringify(sendData));
      register(sendData).then(response => {
        if(response.data){
          this.state.alertMsgType = 'success'
          this.setState({snackbarOpen: true, snackbarMessage: "Succefully Registered."})
          setTimeout(() => {
            this.props.history.push('/login')
          }, 2000)
        } else {
          this.state.alertMsgType = 'error'
          this.setState({snackbarOpen: true, snackbarMessage: "Something went wrong"})
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
      .push({pathname:'./login',data:{
        service:this.state.service
      }})
  }
  render() {
    const classes = {
      useStyles
    }

    return (
      <div className="reg_main">

        <Card
          className='reg_card'
          style={{
          boxShadow: "5px 10px 12px 1px",
          backgroundColor: "#f8f6f6"
        }}>
          <CardContent>
            <Typography className="register_title" variant="h5" color="textSecondary">
              Create Your Fundoo Account
            </Typography>
            <Typography variant="body2" component="p">
              <form className={classes.root} noValidate autoComplete="off">
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
                    className={classes.margin}
                    id="input-with-icon-textfield"
                    label="First Name"
                    variant="outlined"
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
                    className={classes.margin}
                    id="input-with-icon-textfield"
                    label="Last Name"
                    variant="outlined"
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
                    fullWidth
                    className={classes.margin}
                    value={this.state.Email}
                    onChange={this.onchangeEmail}
                    id="input-with-icon-textfield"
                    variant="outlined"
                    label="Email"
                    style={{
                    maxWidth: "572px"
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
                    className={classes.margin}
                    id="input-with-icon-textfield"
                    variant="outlined"
                    label="Password"
                    value={this.state.Password}
                    onChange={this.onchangePassword}
                    InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <VpnKeyIcon/>
                      </InputAdornment>
                    )
                  }}/>
                  <TextField
                    className={classes.margin}
                    id="input-with-icon-textfield"
                    variant="outlined"
                    label="Comfirm-Password"
                    value={this.state.Passwordagain}
                    onChange={this.onchangePasswordagain}
                    InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <VpnKeyIcon/>
                      </InputAdornment>
                    )
                  }}/>
                </div>
              </form>
            </Typography>
          </CardContent>

          <div>

            <Grid container xs={12}>

              <Grid item xs>
                <div className='cardbox'>
                  <div className='small_services_card front_card '>
                    <Typography >price: $99 per month</Typography>
                    <Typography style={{
                      color: "blue"
                    }}>advance</Typography>
                    <ul className='servicecard_ul'>
                      <li>$99/month</li>
                      <li>
                        Ability to add title, description, images, labels, checklist and colors
                      </li>
                    </ul>
                  </div>
                  <div
                    className='small_services_card back_card'
                    style={{
                    backgroundColor: this.state.advanceBGcolor
                  }}>{this.state.advanceService}</div>
                </div>
              </Grid>
              <Grid item xs>
                <div className='cardbox'>
                  <div className='small_services_card front_card'>
                    <Typography >price: $49 per month</Typography>
                    <Typography style={{
                      color: "blue"
                    }}>basic</Typography>
                    <ul className='servicecard_ul'>
                      <li>$49/month</li>
                      <li>Ability to add only title and description</li>
                    </ul>
                  </div>
                  <div
                    className='small_services_card back_card'
                    style={{
                    backgroundColor: this.state.basicBGcolor
                  }}>{this.state.basicService}</div>
                </div>
              </Grid>

            </Grid>
            
          </div>
          
          <div className="login-btn">
          <div className="links_left">
          <a onClick={this.loginPage}>click instead
              </a>
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
