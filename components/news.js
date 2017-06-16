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

  const data = {
    site_id: stateProps.site_id,
  }
  sendData(data, '/posts', 'POST')
    .then(result => {
      contents.push(result)
      return contents
    })
    .then(function(array) {
      console.log(array)
      const news = array.map((post) =>
        <li>{post.content}
          <span>{post.happened}</span>
        </li>
      )
      ReactDOM.render(
        <ul>{news}</ul>,
        document.getElementById('news-container')
      )
    })
    .catch(console.log('no news posts'))

  const handleSubmit = (event, value) => {
    event.preventDefault()
    const time = timeStamp(new Date())
    const newsData = {
      site_id: stateProps.site_id,
      content: value.formData.details,
      happened: time
    }
    console.log(newsData)

    sendData(newsData, '/news', 'POST')
      .then(result => {
        contents.push(result)
        console.log(contents);
        return contents
      })
      .then(function(array) {
        const textArea = document.getElementsByTagName('textarea')
        console.log(textArea)
        textArea[0].textContent = ''
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

  const buttonStyle = {
    backgroundColor: stateProps.site_color_primary
  }

  return (
    <div>
      <Form id='news-form' onSubmit={handleSubmit}>
        <Form.TextArea id='news-form' name='details' placeholder="What's new?" rows='4' />
        <Button className="dash-button" id='news-submit' primary type='submit' style={buttonStyle}>Publish</Button>
      </Form>
      <Container id='news-container'></Container>
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

module.exports = connect(mapStateToProps)(News)
