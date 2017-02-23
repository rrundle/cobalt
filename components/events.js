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

  const contents = []
  const handleSubmit = (event, value) => {
    event.preventDefault()
    console.log(value);
    const time = timeStamp(new Date())
    const route = 'POST'
    const path = '/events'
    const data = {
      site_id: stateProps.site_id,
      details: value.formData.details,
      event_name: value.formData.event_name,
      event_date: value.formData.date,
      location_address: value.formData.address,
      location_city: value.formData.city,
      location_state: value.formData.state,
      location_zipcode: value.formData.zip,
      happened: time
    }
    sendData(data, path, route)
      .then(result => {
        contents.push(result)
        return contents
      })
      .then(function(array) {
        console.log(array)
        const updates = array.map((post) =>
          <li id='event-post'>{post}
            <span id="event-timestamp">{timeStamp(new Date())}</span>
          </li>
        )
        ReactDOM.render(
          <ul id='event-list'>{updates}</ul>,
          document.getElementById('event-container')
        )
      })
  }

  const handleChange = (event) => {
    console.log(event)
  }

  const buttonStyle = {
    backgroundColor: stateProps.site_color_primary
  }

  return (
    <div>
      <Form id='events-form' onSubmit={handleSubmit}>
        <Container id="events-container" text>
          <Form.Group inline>
            <Form.Field control={Input} name="event_name">
              <input placeholder='Event name' />
            </Form.Field>
            <Form.Field control={Input} name="date">
            <input placeholder='MM/DD/YYY' />
            </Form.Field>
          </Form.Group>
          <Form.Field control={Input} name="address">
            <input placeholder='Location address..' />
          </Form.Field>
          <Form.Group widths='equal'>
            <Form.Field control={Input} name="city">
              <input placeholder='City' />
            </Form.Field>
            <Form.Field control={Input} name="state">
              <input placeholder='ST' />
            </Form.Field>
            <Form.Field control={Input} name="zip">
              <input placeholder='Zip' />
            </Form.Field>
          </Form.Group>
          <Form.TextArea id='events-text-area' name='details' placeholder='Event details...' rows='4' />
        </Container>
        <Button id='events-submit' primary type='submit' style={buttonStyle}>Publish</Button>
      </Form>
      <Container id='events-container'></Container>
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
