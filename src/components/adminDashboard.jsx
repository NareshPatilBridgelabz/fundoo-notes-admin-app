import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton'
import InputBase from '@material-ui/core/InputBase'
import {Menu, MenuItem, Snackbar} from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import Button from '@material-ui/core/Button'
import MenuIcon from '@material-ui/icons/Menu'
import SearchIcon from '@material-ui/icons/Search'
import {Card, Tooltip} from '@material-ui/core'
import Divider from '@material-ui/core/Divider'
import WbIncandescentIcon from '@material-ui/icons/WbIncandescent';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import EditIcon from '@material-ui/icons/Edit';
import ArchiveIcon from '@material-ui/icons/Archive';
import SettingsIcon from '@material-ui/icons/Settings';
import ListAltIcon from '@material-ui/icons/ListAlt';
import RefreshIcon from '@material-ui/icons/Refresh';
import DialpadIcon from '@material-ui/icons/Dialpad';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {adminUsersData} from '../services/userServices'
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

// import Appbar from './appBar'
import AcUnitIcon from '@material-ui/icons/AcUnit'
// import Header from './dashbord/header'

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      menuAnchor: null,
      menuOpen: false,
      sideBarOpen: true,
      sidebarLeft: '-20%',
      userData: [],
      backDropOpen: true,
      searchUser:[]
    }
    adminUsersData().then(response => {
      if (response.data) {
        this.setState({backDropOpen: false})
        this.setState({userData: response.data.data.data})
        this.setState({searchUser: response.data.data.data})
        
      } else {
        this.setState({backDropOpen: false})
        this.state.alertMsgType = 'error'
        this.setState({snackbarOpen: true, snackbarMessage: "check your internet connection "})
      }
    })
    
    
    
  }

  handleClick = event => {
    this.setState({
      menuAnchor: event.currentTarget,
      menuOpen: !this.state.menuOpen
    })
  }
  handleClose = event => {
    this.setState({
      menuAnchor: event.currentTarget,
      menuOpen: !this.state.menuOpen
    })
  }
  sidebarActive = () => {
    this.setState({
      sideBarOpen: !this.state.sideBarOpen
    })
    if (this.state.sideBarOpen) 
      this.setState({sidebarLeft: '0%'})
    else 
      this.setState({sidebarLeft: '-20%'})
  }
  test = e => {
    console.log(e.currentTarget)
  }
  handleLogout = () => {
    localStorage.removeItem('token')
    this
      .props
      .history
      .push('/login')

  }
  searchOnchange = (event) => {
    let searchUser = event.currentTarget.value;
    let user = this.state.userData.filter((users) => {
      return users.firstName === searchUser 
    })
    if(Array.isArray(user) && user.length){
      this.setState({searchUser: user})
    }else{
      this.setState({searchUser: this.state.userData})
    }
    console.log(user)
    
  }

  render() {
    return (
      <div>
        <Snackbar
          anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
          open={this.state.snackbarOpen}
          autoHideDuration={3000}
          onClose={() => this.setState({snackbarOpen: false})}
          message={< span id = 'message-id' > {
          ' '
        }
        {
          this.state.snackbarMessage
        }
        {
          ' '
        } < /span>}>
          <Alert onClose={this.handleCloseSnackbar} severity={this.state.alertMsgType}>
            {this.state.snackbarMessage}
          </Alert>
        </Snackbar>

        <div className='headerbar'>
          <div className='header_left'>
            <IconButton onClick={this.sidebarActive}>
              <MenuIcon/>
            </IconButton>
            <img src='https://www.gstatic.com/images/branding/product/1x/keep_48dp.png'/>
          </div>
          <div className='searchBox'>
            <Card id='searchbar'>
              <Tooltip title='search'>
                <IconButton>
                  <SearchIcon/>
                </IconButton>
              </Tooltip>
              <InputBase placeholder='Search' onChange={this.searchOnchange} fullWidth/>
            </Card>
          </div>

          <div className='header_userProfile'>

            <Button
              variant='contained'
              color='primary'
              onClick={this.handleClick}
              size='small'>
              Profile
            </Button>
          </div>
          <Menu
            id='profile-menu'
            anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
            transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
            anchorEl={this.state.menuAnchor}
            keepMounted
            open={this.state.menuOpen}
            onClose={this.handleClose}>
            <MenuItem>Profile</MenuItem>
            <MenuItem>My account</MenuItem>
            <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
          </Menu>
        </div>

        <div className="dashboard_body">
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead className="table_head">
                <TableRow>
                  <TableCell>User Name</TableCell>
                  <TableCell align="left">Email</TableCell>
                  <TableCell align="right">Role</TableCell>
                  <TableCell align="right">Service</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {this
                  .state
                  .searchUser
                  .map(row => (
                    <TableRow key={row.id}>
                      <TableCell component="th" scope="row">
                        {row.firstName}
                        {/* {row.lastName} */}
                      </TableCell>
                      <TableCell align="left">{row.email}</TableCell>
                      <TableCell align="right">{row.role}</TableCell>
                      <TableCell align="right">{row.service}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <Backdrop className="dashboard_loader" open={this.state.backDropOpen}>
          <CircularProgress color="inherit"/>
        </Backdrop>
      </div>
    )
  }
}

export default withRouter(Dashboard)
