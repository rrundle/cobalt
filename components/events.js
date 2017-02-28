/* global React, ReactDOM, Redux */
const { Form, Button, Container, Header, Input } = require('semantic-ui-react')
const { connect } = require('react-redux')

function sendData(data, path, route) {
  const options = {
    method: route,
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data)
  }
  const result = fetch(path, options)
    .then(res => res.json())
  return result
}

const Events = ({ stateProps, dispatchProps }) => {

  function timeStamp(now) {
    var date = [
      now.getMonth() + 1,
      now.getDate(),
      now.getFullYear()
    ]
    var time = [
      now.getHours(),
      now.getMinutes()
    ]
    var suffix
    if (time[0] < 12) {
      suffix = 'AM'
    }
    else {
      suffix = 'PM'
    }
    if (time[0] >= 12) {
      time[0] =- 12
    }
    for ( var i = 1; i < 2; i++ ) {
      if ( time[i] < 10 ) {
        time[i] = '0' + time[i]
      }
    }
    return date[0] + '/' + date[1] + '/' + date[2] + ' ' + time[0] + (':') + time[1] + ' ' + suffix
  }

  const newEvents = []
  const handleEvent = (event, value) => {
    event.preventDefault()
    const time = timeStamp(new Date())
    const route = 'POST'
    const path = '/occasion'
    const data = {
      site_id: stateProps.site_id,
      event_name: value.formData.event_name,
      event_date: value.formData.date,
      location_address: value.formData.address,
      location_city: value.formData.city,
      location_state: value.formData.state,
      location_zipcode: value.formData.zip,
      details: value.formData.details,
      happened: time
    }
    sendData(data, path, route)
      .then(result => {
        newEvents.push(result)
        return newEvents
      })
      .then(function(array) {
        console.log(array)
        const updates = array.map((post) =>
          <li id='event-post'>
            <div>{post[0].event_name}
              <span>{post[0].event_date}</span>
            </div>
            <div>
              <span>{post[0].location_address}</span>
              <span>{post[0].location_city}</span>
              <span>{post[0].location_state}</span>
              <span>{post[0].location_zipcode}</span>
            </div>
            <div>{post[0].details}</div>
            <div id="event-timestamp">{'Added on' + post[0].happened}</div>
          </li>
        )
        ReactDOM.render(
          <ul id='event-list'>{updates}</ul>,
          document.getElementById('new-events-container')
        )
      })
  }

  const buttonStyle = {
    backgroundColor: stateProps.site_color_primary
  }

  return (
    <div>
      <Form id='events-form' onSubmit={handleEvent}>
        <Container id="events-container" text>
          <Form.Group inline>
            <Form.Field control={Input} name="event_name" placeholder='Event name'></Form.Field>
            <Form.Field control={Input} name="date" placeholder='MM/DD/YYY'></Form.Field>
          </Form.Group>
          <Form.Field control={Input} name="address" placeholder='Location address..'></Form.Field>
          <Form.Group widths='equal'>
            <Form.Field control={Input} name="city" placeholder='City'></Form.Field>
            <Form.Field control={Input} name="state" placeholder='ST'></Form.Field>
            <Form.Field control={Input} name="zip" placeholder='Zip'></Form.Field>
          </Form.Group>
          <Form.TextArea id='events-text-area' name='details' placeholder='Event details...' rows='4' />
        </Container>
        <Button id='events-submit' primary type='submit' style={buttonStyle}>Publish</Button>
      </Form>
      <Container id='new-events-container'></Container>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    stateProps: {
      site_id: state.site_id,
      site_color_primary: state.site_color_primary
    }
  }
}

module.exports = connect(mapStateToProps)(Events)
