/* global React, ReactDOM, Redux */
const { Step, Button, Icon, Checkbox, Segment } = require('semantic-ui-react')
const { IndexLink } = require('react-router')
const { connect } = require('react-redux')
const { CirclePicker, clientWidth } = require('react-color')
const { Back, Next } = require('./buttons.js')

const StepThree = ({ addPrimary, addSecondary }) => {
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

      <ColorSetup
        addPrimary={addPrimary}
        addSecondary={addSecondary}
      >
      </ColorSetup>
    </div>
  )
}

const ColorSetup = ({ addPrimary, addSecondary }) => {

  const handlePrimary = (color, event) => {
    const value = event.target.title
    addPrimary(value)

    const circleOne = document.getElementById('circle-1')
    circleOne.style.background = event.target.title
  }

  const handleSecondary = (color, event) => {
    const value = event.target.title
    addSecondary(value)

    const circleTwo = document.getElementById('circle-2')
    circleTwo.style.background = event.target.title
  }

  return (
    <div>
      <div id="color-title">{'Choose your site\'s color scheme'}</div>
      <div id="primary-title">{'Primary site color'}</div>
      <div>
        <CirclePicker id="circle-group-1" onChange={handlePrimary}/>
        <div className="circle" id="circle-1"></div>
      </div>
      <div id="secondary-title">{'Secondary site color'}</div>
      <div>
        <CirclePicker id="circle-group-2" onChange={handleSecondary}/>
        <div className="circle" id="circle-2"></div>
      </div>
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
