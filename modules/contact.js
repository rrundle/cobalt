/* global React, ReactDOM, Redux */
const { Step, Button, Icon, Input, Popup, Grid } = require('semantic-ui-react')
const { IndexLink } = require('react-router')

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

      <Form></Form>

    </div>
  )
}

const Form = () => {
  return (
    <div>
      <div>{'Enter the contact info for your organization'}</div>
      <Popup
        trigger={<Button icon='question' />}
        content="This displays live on your website."
        basic
      />
      <div>{'Your organization\'s address'}</div>
      <Input defaultText="Optional" id="org-address" />
      <div>{'Your organization\'s phone number'}</div>
      <Input defaultText="Optional" keyboardType='numeric' id="org-phone" />
      <Back></Back>
      <Next></Next>
    </div>
  )
}

const Next = () => (
  <div>
    <Button animated>
      <IndexLink to='/colors' activeClassName="active">
        <Button.Content visible>Next</Button.Content>
        <Button.Content hidden>
          <Icon name='right arrow' />
        </Button.Content>
      </IndexLink>
    </Button>
  </div>
)

const Back = () => (
  <div>
    <Button animated>
      <IndexLink to='/' activeClassName="active">
        <Button.Content visible>Back</Button.Content>
        <Button.Content hidden>
          <Icon name='left arrow' />
        </Button.Content>
      </IndexLink>
    </Button>
  </div>
)


module.exports = StepTwo
