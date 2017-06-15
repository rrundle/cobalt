/* global React, ReactDOM, Redux */
const { Form, Button, Container, Header, Input, Dropdown } = require('semantic-ui-react')
const DayPicker = require('react-day-picker')
const { connect } = require('react-redux')
const TimePicker = require('rc-time-picker')
const stateOptions = require('./states')
const moment = require('moment')

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
  let eventDate
  let startTime
  let endTime

  const handleEvent = (event, value) => {
    event.preventDefault()
    console.log(eventDate)
    console.log(startTime)
    console.log(endTime)
    const time = timeStamp(new Date())
    const route = 'POST'
    const path = '/occasion'
    const data = {
      site_id: stateProps.site_id,
      event_name: '' ? '' : value.formData.event_name,
      event_date: '' ? '' : `${eventDate}`,
      event_start_time: '' ? '' : `${startTime}`,
      event_end_time: '' ? '' : `${endTime}`,
      location_address: '' ? '' : value.formData.address,
      location_city: '' ? '' : value.formData.city,
      location_state: '' ? '' : value.formData.state,
      location_zipcode: '' ? '' : value.formData.zip,
      details: '' ? '' : value.formData.details,
      happened: time
    }
    console.log(data)
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

 const handleDayClick = (day) => {
   eventDate = day
   console.log(eventDate)
  };

  const buttonStyle = {
    backgroundColor: stateProps.site_color_primary
  }

  const showSecond = false;
  const str = showSecond ? 'HH:mm:ss' : 'HH:mm';
  const use12Hours = true


  const timeStart = (value) => {
    console.log(value && value.format(str));
    startTime = value.format(str)
  }

  const timeEnd = (value) => {
    console.log(value && value.format(str));
    endTime = value.format(str)
  }

  return (
    <div>
      <Form id='events-form' onSubmit={handleEvent}>
        <Container id="events-container" text>
          <Form.Group>
            <Form.Field control={Input} name="event_name" placeholder='Event name'></Form.Field>
            <Form.Field control={Input}>
              <DayPicker
                id="calendar"
                selectedDays={this.eventDate}
                onDayClick={handleDayClick}
                control={Input}
                name="event_date"
              />
            </Form.Field>
          </Form.Group>
          <Form.Group>
            <Form.Field control={Input}>
              <TimePicker
                style={{ width: 200 }}
                showSecond={showSecond}
                use12Hours={use12Hours}
                defaultValue={moment()}
                className="time-picker"
                onChange={timeStart}
                control={Input}
                name="event_start_time"
              />
            </Form.Field>
            <Form.Field control={Input}>
              <TimePicker
                style={{ width: 200 }}
                showSecond={showSecond}
                use12Hours={use12Hours}
                defaultValue={moment()}
                className="time-picker-end"
                onChange={timeEnd}
                control={Input}
                name="event_end_time"
              />
            </Form.Field>
          </Form.Group>
          <Form.Field control={Input} name="address" placeholder='Location address..'></Form.Field>
          <Form.Group widths='equal'>
            <Form.Field control={Input} name="city" placeholder='City'></Form.Field>
            <Form.Field>
              <Dropdown control={Input} search selection name="state" options={stateOptions} className="contact" placeholder="CA" value={stateProps.org_state} id="org-state" />
            </Form.Field>
            <Form.Field control={Input} name="zip" placeholder='Zip' type="number" maxLength="5"></Form.Field>
          </Form.Group>
          <Form.TextArea id='events-text-area' name='details' placeholder='Event details...' rows='4' />
        </Container>
        <Button className="dash-button" id='events-submit' primary type='submit' style={buttonStyle}>Publish</Button>
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
