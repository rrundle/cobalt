/* global React, ReactDOM, Redux */
const { Form, Step, Button, Icon, Input, Grid, Segment, Dropdown } = require('semantic-ui-react')
const { connect } = require('react-redux')
const { Back, Next } = require('../components/buttons.js')
const stateOptions = require('../components/states')
const InputElement = require('react-input-mask')

const StepTwo = ({ stateProps, addAddress, addCity, addState, addZipcode, addPhone }) => {

  return (
    <div className="status">
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
        stateProps={stateProps}
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

const Contact = ({ stateProps, addAddress, addCity, addState, addZipcode, addPhone }) => {

  const handleAddress = event => {
    const value = event.target.value
    addAddress(value)
  }

  const handleCity = event => {
    const value = event.target.value
    addCity(value)
  }

  const handleState = (event, result) => {
    const { value } = result
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
      <div className="org-title">{'Your organization\'s address'}</div>
      <Input className="contact" placeholder="address" value={stateProps.org_address} onChange={handleAddress} id="org-address" />
      <Input className="contact" placeholder="city" value={stateProps.org_city} onChange={handleCity} id="org-city" />
      <Dropdown search selection options={stateOptions} className="contact" placeholder="CA" value={stateProps.org_state} onChange={handleState} id="org-state" />
      <Input className="contact" placeholder="zipcode" type="number" value={stateProps.org_zipcode} onChange={handleZipcode} id="org-zipcode" />
      <div raised className="org-title">{'Your organization\'s phone number'}</div>
      <InputElement {...this.props} mask="(\ 999 )\ 999 -\ 9999" maskChar=" " placeholder="(555) 555-555" value={stateProps.org_phone} onChange={handlePhone} className="ui input contact" id="org-phone" />
      <div id="buttons">
        <Back link={'/'}></Back>
        <Next link={'/colors'}></Next>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    stateProps: {
      org_address: state.org_address,
      org_city: state.org_city,
      org_state: state.org_state,
      org_zipcode: state.org_zipcode,
      org_phone: state.org_phone
    }
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
