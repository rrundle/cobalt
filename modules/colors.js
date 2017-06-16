/* global React, ReactDOM, Redux */
const { Step, Button, Icon, Checkbox, Segment, Grid } = require('semantic-ui-react')
const { IndexLink } = require('react-router')
const { connect } = require('react-redux')
const { SwatchesPicker, clientWidth } = require('react-color')
const { Back, Next } = require('../components/buttons.js')

const StepThree = ({ addPrimary, addSecondary, site_color_primary, site_color_secondary }) => {
  return (
    <div className="status">
      <Step.Group ordered>
        <IndexLink to={'/'} activeClassName="active">
          <Step completed>
            <Step.Content>
              <Step.Title>Setup</Step.Title>
              <Step.Description></Step.Description>
            </Step.Content>
          </Step>
        </IndexLink>

        <IndexLink to={'/contact'} activeClassName="active">
          <Step completed>
            <Step.Content>
              <Step.Title>Contact</Step.Title>
              <Step.Description>Enter your contact info</Step.Description>
            </Step.Content>
          </Step>
        </IndexLink>

        <Step active title='Colors' description='Add your sites design colors' />

        <IndexLink to={'/photos'} activeClassName="active">
          <Step title='Photos' description='Enter profile & background photos' />
        </IndexLink>
      </Step.Group>

      <ColorSetup
        addPrimary={addPrimary}
        addSecondary={addSecondary}
        site_color_primary={site_color_primary}
        site_color_secondary={site_color_secondary}
      >
      </ColorSetup>
    </div>
  )
}

const ColorSetup = ({ addPrimary, addSecondary, site_color_primary, site_color_secondary }) => {
  
  const handlePrimary = (color, event) => {
    const value = color.hex
    addPrimary(value)

    const circleOne = document.getElementById('circle-1')
    circleOne.style.background = event.target.title
  }

  const handleSecondary = (color, event) => {
    const value = color.hex
    addSecondary(value)

    const circleTwo = document.getElementById('circle-2')
    circleTwo.style.background = event.target.title
  }

  return (
    <div>
      <div id="color-title">{'Choose your site\'s color scheme'}</div>
      <div id="primary-title">{'Primary site color'}</div>
      <Grid columns={1} className="color-grid">
        <Grid.Row>
          <SwatchesPicker id="circle-group-1" onChange={handlePrimary}/>
          <div className="circle-container">
            <div style={{backgroundColor: site_color_primary}} className="circle" id="circle-1"></div>
          </div>
        </Grid.Row>
        <div id="secondary-title">{'Secondary site color'}</div>
        <Grid.Row>
          <SwatchesPicker id="circle-group-2" onChange={handleSecondary}/>
          <div className="circle-container">
            <div style={{backgroundColor: site_color_secondary}} className="circle" id="circle-2"></div>
          </div>
        </Grid.Row>
      </Grid>
      <Back link={'/contact'}/>
      <Next link={'/photos'}/>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    site_color_primary: state.site_color_primary,
    site_color_secondary: state.site_color_secondary
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addPrimary: (value) => dispatch({type:'PRIMARY', value}),
    addSecondary: (value) => dispatch({type: 'SECONDARY', value})
  }
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(StepThree)
