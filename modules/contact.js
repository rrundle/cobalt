/* global React, ReactDOM, Redux */
const { Form, Step, Button, Icon, Input, Popup, Grid } = require('semantic-ui-react')
const { IndexLink } = require('react-router')
const { connect } = require('react-redux')

const StepTwo = ({ reducer, org_address, org_city, org_state, org_zipcode, org_phone, addAddress, addCity, addState, addZipcode, addPhone }) => {

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

      <Contact
        org_address={org_address}
        org_city={org_city}
        org_state={org_state}
        org_zipcode={org_zipcode}
        org_phone={org_phone}
        addAddress={addAddress}
        addCity={addCity}
        addState={addState}
        addZipcode={addZipcode}
        addPhone={addPhone}
      >
      </Contact>

    </div>
  )
}

const Contact = ({ reducer, org_address, org_city, org_state, org_zipcode, org_phone, addAddress, addCity, addState, addZipcode, addPhone }) => {

  const handleAddress = event => {
    const value = event.target.value
    addAddress(value)
  }

  const handleCity = event => {
    const value = event.target.value
    addCity(value)
  }

  const handleState = event => {
    const value = event.target.value
    addState(value)
  }

  const handleZipcode = event => {
    const value = event.target.value
    addZipcode(value)
  }

  const handlePhone = event => {
    const value = event.target.value
    addPhone(value)
  }
  return (
    <div>
      <div id="org-enter">{'Enter the contact info for your organization'}</div>
      <Popup
        trigger={<Button id="popup-button" icon='info circle' />}
        content="This displays live on your website."
        id="popop"
        basic
      />
      <div className="org-title">{'Your organization\'s address'}</div>
      <Input className="contact" placeholder="address" value={org_address} onChange={handleAddress} id="org-address" />
      <Input className="contact" placeholder="city" value={org_city} onChange={handleCity} id="org-city" />
      <Input className="contact" placeholder="state" value={org_state} onChange={handleState} id="org-state" />
      <Input className="contact" placeholder="zipcode" value={org_zipcode} onChange={handleZipcode} id="org-zipcode" />
      <div className="org-title">{'Your organization\'s phone number'}</div>
      <Input keyboardType='numeric' placeholder="(555) 555-555" value={org_phone} onChange={handlePhone} id="org-phone" />
      <div id="butons">
        <Back></Back>
        <Next></Next>
      </div>
    </div>
  )
}

const Next = () => {
  return (
  <div id="next">
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
}

const Back = () => {
  return (
    <div id="back">
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
}

const mapStateToProps = state => {
  return {
    org_address: state.org_address,
    org_city: state.org_city,
    org_state: state.org_state,
    org_zipcode: state.org_zipcode,
    org_phone: state.org_phone
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addAddress: (value) => dispatch({type:'ADDRESS', value}),
    addCity: (value) => dispatch({type: 'CITY', value}),
    addState: (value) => dispatch({type: 'STATE', value}),
    addZipcode: (value) => dispatch({type: 'ZIPCODE', value}),
    addPhone: (value) => dispatch({type: 'PHONE', value})
  }
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(StepTwo)
