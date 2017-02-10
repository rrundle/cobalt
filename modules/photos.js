/* global React, ReactDOM, Redux */
const { Step, Button, Icon } = require('semantic-ui-react')

const StepFour = () => {
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

        <Step completed>
        <Step.Content>
            <Step.Title>Colors</Step.Title>
            <Step.Description>Add your sites design colors</Step.Description>
          </Step.Content>
        </Step>

        <Step active title='Photos' description='Enter profile & background photos' />
      </Step.Group>
    </div>
  )
}

module.exports = StepFour
