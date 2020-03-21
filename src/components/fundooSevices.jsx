import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import { Row, Col } from 'react-grid-system'
import Typography from '@material-ui/core/Typography'

class FundooService extends Component {
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
            <div className='cardbox' id="card1">
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
            <div className='cardbox' id="card2">
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
            <a href="" >click instead </a>
        </div>
      </div>
    )
  }
}
export default FundooService
