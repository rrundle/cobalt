/* global React, ReactDOM, Redux, jsx */
const { Step, Button, Icon, Image } = require('semantic-ui-react')
const { IndexLink } = require('react-router')
const { connect } = require('react-redux')
const Dropzone = require('react-dropzone')
const request = require('superagent')
const { Back, Next } = require('./buttons.js')

const StepFour = ({ stateProps, addPhoto, addBackground, addId }) => {
  return (
    <div className="status">
      <Step.Group ordered>
        <Step completed>
        <Step.Content>
            <Step.Title>Setup</Step.Title>
            <Step.Description></Step.Description>
          </Step.Content>
        </Step>

        <Step completed>
        <Step.Content>
            <Step.Title>Contact</Step.Title>
            <Step.Description>Enter your contact info</Step.Description>
          </Step.Content>
        </Step>

        <Step completed>
        <Step.Content>
            <Step.Title>Colors</Step.Title>
            <Step.Description>Add your sites design colors</Step.Description>
          </Step.Content>
        </Step>

        <Step active title='Photos' description='Enter profile & background photos' />
      </Step.Group>

      <Uploader
        stateProps={stateProps}
        addPhoto={addPhoto}
        addBackground={addBackground}
      />

      <Back link={'/colors'}/>
      <Finish
        stateProps={stateProps}
        addPhoto={addPhoto}
        addBackground={addBackground}
        addId={addId}
      />
    </div>
  )
}

const Uploader = ({ stateProps, addPhoto, addBackground, addId }) => {

  const CLOUDINARY_UPLOAD_PRESET = 'l25kfhpr'
  const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/ryanrundle/upload'

  const onPhoto = (acceptedFiles, rejectedFiles) => {
    handlePhotoUpload(acceptedFiles[0])
  }

  const onBackground = (acceptedFiles, rejectedFiles) => {
    handleBackgroundUpload(acceptedFiles[0])
  }

  function handlePhotoUpload(file) {
    let upload = request.post(CLOUDINARY_UPLOAD_URL)
                        .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                        .field('file', file)

    upload.end((err, response) => {
      if (err) {
        console.error(err)
      }

      if (response.body.secure_url !== '') {
        const value = response.body.secure_url
        addPhoto(value)
      }
    })
  }

  function handleBackgroundUpload(file) {
    let upload = request.post(CLOUDINARY_UPLOAD_URL)
                        .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                        .field('file', file)

    upload.end((err, response) => {
      if (err) {
        console.error(err)
      }

      if (response.body.secure_url !== '') {
        const value = response.body.secure_url
        addBackground(value)
      }
    })
  }

  const handleLoad = () => {
    return (
      <Segment>
        <Dimmer active>
          <Loader indeterminate>Preparing Files</Loader>
        </Dimmer>
        <Image src='http://semantic-ui.com/images/wireframe/short-paragraph.png' />
      </Segment>
    )
  }

  return (
    <div>
      <div className="photos-title">{'Add a profile photo for the organization'}</div>
      <div>{'Please upload a square image - i.e. a logo'}</div>
      <Dropzone
        className="dropzone"
        multiple={false}
        accept="image/*"
        onDrop={onPhoto}
      >
        <p className="dropzone-description">Drop an image or click to select a file to upload.</p>
        <img className="drop" src={'http://i.imgur.com/jQM2WCi.png'} />
        <Image className="display" src={stateProps.site_photo} size='small' shape='circular' />
      </Dropzone>
      <div className="photos-title">{'Add a background photo for the organization'}</div>
      <Dropzone
        className="dropzone"
        multiple={false}
        accept="image/*"
        onDrop={onBackground}>
        <p className="dropzone-description">Drop an image or click to select a file to upload.</p>
        <img className="drop" src={'http://i.imgur.com/jQM2WCi.png'} />
        <Image className="display" src={stateProps.site_background_photo} size='large' />
      </Dropzone>
    </div>
  )
}

const Finish = ({ stateProps, addPhoto, addBackground, addId }) => {

  const completeSignup = () => {
    const data = {
      site_url: stateProps.site_url,
      name: stateProps.name,
      org_name: stateProps.org_name,
      org_address: stateProps.org_address,
      org_city: stateProps.org_city,
      org_state: stateProps.org_state,
      org_zipcode: stateProps.org_zipcode,
      org_phone: stateProps.org_phone,
      site_color_primary: stateProps.site_color_primary,
      site_color_secondary: stateProps.site_color_secondary,
      site_photo: stateProps.site_photo,
      site_background_photo: stateProps.site_background_photo
    }
    const route = 'POST'
    const path = '/site'
    sendData(data, path, route)
      .then(result => {

        addId(result[0])

        const displayData = {
          site_id: result[0],
          org_address: true,
          org_phone: true,
          site_color_primary: true,
          site_color_secondary: true,
          site_photo: true,
          site_background_photo: true,
          news: true,
          events: true
        }
        const displayPath = '/display'

        sendData(displayData, displayPath, route)
          .then(result => console.log(result))
      })
  }

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


  return (
    <div id="finish">
      <IndexLink to={'/dashboard'} activeClassName="active">
        <Button onClick={completeSignup} animated>
          <Button.Content visible>Finish</Button.Content>
          <Button.Content hidden>
            <Icon name='right arrow' />
          </Button.Content>
        </Button>
      </IndexLink>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    stateProps: {
      site_id: state.site_id,
      site_url: state.site_url,
      name: state.name,
      org_name: state.org_name,
      org_address: state.org_address,
      org_phone: state.org_phone,
      site_color_primary: state.site_color_primary,
      site_color_secondary: state.site_color_secondary,
      site_photo: state.site_photo,
      site_background_photo: state.site_background_photo
    }
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addPhoto: (value) => dispatch({type:'PHOTO', value}),
    addBackground: (value) => dispatch({type: 'BACKGROUND', value}),
    addId: (value) => dispatch({type: 'ID', value})
  }
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(StepFour)
