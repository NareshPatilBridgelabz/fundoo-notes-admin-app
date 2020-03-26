import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import { Row, Col } from 'react-grid-system'
import Typography from '@material-ui/core/Typography'

class FundooService extends Component {

  constructor(props){
    super(props)
    this.state={
      serviceName:''
    }
  }

  loginHandler = ()=>{
    this.props.history.push('./login')
  }

  registerHandler = (event)=>{
    let service=event.currentTarget.getAttribute('service');
    this.props.history.push({pathname :'./registration',data:{
      service:service
    }})
  }
  render () {
    return (
      <div>
        <div className='fundoo_header'>
          <div className='fundoo_content'>fundoo Notes</div>
        </div>
        <h2>fundooNotes offered. Choose below service to Register.</h2>

        <Grid container xs={12}>
          <Grid item xs></Grid>
          <Grid item xs>
            <div className='cardbox' id="card1" service="advance" onClick={this.registerHandler}>
              <div className='services_card front_card '>
                <Typography variant='h4'>price: $99 per month</Typography>
                <Typography style={{color:"blue"}}>advance</Typography>
                <ul className='servicecard_ul'>
                  <li>$99/month</li>
                  <li>
                    Ability to add title, description, images, labels, checklist
                    and colors
                  </li>
                </ul>
              </div>
              <div className='services_card back_card'>ADD TO CART</div>
            </div>
          </Grid>
          <Grid item xs>
            <div className='cardbox' id="card2" service="basic" onClick={this.registerHandler}>
              <div className='services_card front_card'>
                <Typography variant='h4'>price: $49 per month</Typography>
                <Typography style={{color:"blue"}}>basic</Typography>
                <ul className='servicecard_ul'>
                  <li>$49/month</li>
                  <li>Ability to add only title and description</li>
                </ul>
              </div>
              <div className='services_card back_card'>ADD TO CART</div>
            </div>
          </Grid>
          <Grid item xs></Grid>
        </Grid>
        <div className="header_footer">
            <a href="login" >click instead </a>
        </div>
      </div>
    )
  }
}
export default FundooService
