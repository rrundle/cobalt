/* global React, ReactDOM, Redux */
const { Form, Button, Container } = require('semantic-ui-react')
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

const News = ({ stateProps, dispatchProps }) => {

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
    const time = timeStamp(new Date())
    const route = 'POST'
    const path = '/news'
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
          <li id='new-post'>{post}
            <span id="timestamp">{timeStamp(new Date())}</span>
          </li>
        )
        ReactDOM.render(
          <ul id='news-posts'>{updates}</ul>,
          document.getElementById('news-container')
        )
      })
  }

  return (
    <div>
      <Form id='news-form' onSubmit={handleSubmit}>
        <Form.TextArea id='news-form' name='details' placeholder='What is new?' rows='4' />
        <Button id='news-submit' primary type='submit'>Publish</Button>
      </Form>
      <Container id='news-container'></Container>
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

module.exports = connect(mapStateToProps)(News)
