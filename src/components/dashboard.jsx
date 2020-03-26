import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton'
import InputBase from '@material-ui/core/InputBase'
import { Menu, MenuItem } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import MenuIcon from '@material-ui/icons/Menu'
import SearchIcon from '@material-ui/icons/Search'
import { Card, Tooltip } from '@material-ui/core'
import Divider from '@material-ui/core/Divider'
import WbIncandescentIcon from '@material-ui/icons/WbIncandescent';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import EditIcon from '@material-ui/icons/Edit';
import ArchiveIcon from '@material-ui/icons/Archive';
import SettingsIcon from '@material-ui/icons/Settings';
import ListAltIcon from '@material-ui/icons/ListAlt';
import RefreshIcon from '@material-ui/icons/Refresh';
import DialpadIcon from '@material-ui/icons/Dialpad';

// import Appbar from './appBar'
import AcUnitIcon from '@material-ui/icons/AcUnit'
// import Header from './dashbord/header'

class Dashboard extends Component {
  constructor (props) {
    super(props)
    this.state = {
      menuAnchor: null,
      menuOpen: false,
      sideBarOpen: true,
      sidebarLeft: '-20%'
    }
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
    this.setState({ sideBarOpen: !this.state.sideBarOpen })
    if (this.state.sideBarOpen) this.setState({ sidebarLeft: '0%' })
    else this.setState({ sidebarLeft: '-20%' })
  }
  test = e => {
    console.log(e.currentTarget)
  }
  handleLogout = () => {
    localStorage.removeItem('token')
    this.props.history.push('/login')

  }

  render () {
    return (
      <div>
        <div className='headerbar'>
          <div className='header_left'>
            <IconButton onClick={this.sidebarActive}>
              <MenuIcon />
            </IconButton>
            <img src='https://www.gstatic.com/images/branding/product/1x/keep_48dp.png' />
          </div>
          <div className='searchBox'>
            <Card id='searchbar'>
              <Tooltip title='search'>
                <IconButton>
                  <SearchIcon />
                </IconButton>
              </Tooltip>
              <InputBase placeholder='Search' fullWidth />
            </Card>
          </div>
          <div>
            <IconButton>
              <RefreshIcon />
            </IconButton>
            <IconButton>
              <ListAltIcon />
            </IconButton>
            <IconButton>
              <SettingsIcon />
            </IconButton>
          </div>
          <div>
            <div className='header_userProfile'>
              <IconButton>
                <DialpadIcon />
              </IconButton>
              <Button
                variant='contained'
                color='primary'
                onClick={this.handleClick}
                size='small'
              >
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
              onClose={this.handleClose}
            >
              <MenuItem>Profile</MenuItem>
              <MenuItem>My account</MenuItem>
              <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
            </Menu>
          </div>
        </div>

        <div
          className='sidebar'
          style={{
            left: this.state.sidebarLeft
          }}
        >
          <div class='sidebar_component' onClick={this.test}>
            <WbIncandescentIcon />
            Notes
          </div>
          <div class='sidebar_component' onClick={this.test}>
            <NotificationsNoneIcon />
            Reminder
          </div>
          <Divider 
          />
          <div class='sidebar_component' onClick={this.test}>
            <EditIcon />
            Edit Lable
          </div>
          <div class='sidebar_component' onClick={this.test}>
            <ArchiveIcon />
            Archive
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Dashboard)
