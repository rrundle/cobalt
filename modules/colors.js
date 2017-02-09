/* global React, ReactDOM, Redux */
const { Step, Button, Icon, Checkbox, Segment } = require('semantic-ui-react')
const { IndexLink } = require('react-router')
const { connect } = require('react-redux')
const { CirclePicker, clientWidth } = require('react-color')

const StepThree = () => {
  return (
    <div>
      <Step.Group ordered>
        <Step completed>
        <Step.Content>
            <Step.Title>Setup</Step.Title>
            <Step.Description></Step.Description>
          </Step.Content>
        </Step>

        <Step completed>
        <Step.Content>
            <Step.Title>Contact</Step.Title>
            <Step.Description>Enter your contact info</Step.Description>
          </Step.Content>
        </Step>

        <Step active title='Colors' description='Add your sites design colors' />

        <Step title='Photos' description='Enter profile & background photos' />
      </Step.Group>

      <ColorSetup />
    </div>
  )
}

const ColorSetup = () => {

  const handlePrimary = (color) => {
    site_color_primary: color.hex
  }

  const handleSecondary = (color) => {
    site_color_secondary: color.hex
  }

  return (
    <div>
      <div>{'Choose your site\'s color scheme.'}</div>
      <div>{'Primary site color'}</div>
      <div>
        <CirclePicker onChange={handlePrimary}/>
      </div>
      <div>{'Secondary site color'}</div>
      <div>
        <CirclePicker onChange={handleSecondary}/>
      </div>
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

module.exports = connect()(StepThree)
