/* global React, ReactDOM, Redux */
const { Form, Button, Container, Header } = require('semantic-ui-react')
const { connect } = require('react-redux')
const { DatePicker, DatePickerInput } = require('rc-datepicker')

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
    let date = [
      now.getMonth() + 1,
      now.getDate(),
      now.getFullYear()
    ]
    let time = [
      now.getHours(),
      now.getMinutes()
    ]
    let suffix
    if (time[0] < 12) {
      suffix = 'AM'
    }
    else {
      suffix = 'PM'
    }
    if (time[0] >= 12) {
      time[0] =- 12
    }
    for ( let i = 1; i < 2; i++ ) {
      if ( time[i] < 10 ) {
        time[i] = '0' + time[i]
      }
    }
    return date[0] + '/' + date[1] + '/' + date[2] + ' ' + time[0] + (':') + time[1] + ' ' + suffix
  }

  const contents = []
  const handleSubmit = (event, value) => {
    event.preventDefault()
    const time = timeStamp(new Date())
    const route = 'POST'
    const path = '/events'
    const data = {
      site_id: stateProps.site_id,
      content: value.formData.details,
      timestamp: time
    }
    sendData(data, path, route)
      .then(result => {
        contents.push(result)
        return contents
      })
      .then(function(array) {
        console.log(contents);
        const updates = array.map((post) =>
          <li id='new-event-post'>{post}
            <span id="timestamp">{timeStamp(new Date())}</span>
          </li>
        )
        ReactDOM.render(
          <ul id='events-posts'>{updates}</ul>,
          document.getElementById('events-container')
        )
      })
  }

  return (
    <div>
      <Form id='events-form' onSubmit={handleSubmit}>
        <Container text>
          <Header as='h2'>{'New Event'}</Header>
          <Form.Group inline>
            <Form.Field>
              <input placeholder='Event name' />
            </Form.Field>
            <Form.Field>
              <DatePickerInput
                /*onChange={onChange}
                value={date}*/
                className='datepicker'
              />
            </Form.Field>
          </Form.Group>
          <Form.Field>
            <input placeholder='Location' />
          </Form.Field>
          <Form.TextArea id='news-form' name='details' placeholder='Event details...' rows='4' />
        </Container>
        <Button id='events-submit' primary type='submit'>Publish</Button>
      </Form>
      <Container id='events-container'></Container>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    stateProps: {
      site_id: state.site_id,
    }
  }
}

module.exports = connect(mapStateToProps)(Events)
