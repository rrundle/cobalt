/* global React, ReactDOM, Redux */
const { Step, Button, Icon } = require('semantic-ui-react')

const StepTwo = () => {
  return (
    <div>
      <Step.Group ordered>
        <Step completed>
        <Step.Content>
            <Step.Title>Setup</Step.Title>
            <Step.Description></Step.Description>
          </Step.Content>
        </Step>

        <Step active title='Contact' description='Enter your contact info' />

        <Step title='Colors' description='Add your sites design colors' />

        <Step title='Photos' description='Enter profile & background photos' />
      </Step.Group>
    </div>
  )
}

/*
const Next = () => (
  <div>
    <Button animated>
      <Button.Content visible>Next</Button.Content>
      <Button.Content hidden>
        <Icon name='right arrow' />
      </Button.Content>
    </Button>
  </div>
)

const Back = () => (
  <div>
    <Button animated>
      <Button.Content visible>Back</Button.Content>
      <Button.Content hidden>
        <Icon name='left arrow' />
      </Button.Content>
    </Button>
  </div>
)
*/

module.exports = StepTwo
