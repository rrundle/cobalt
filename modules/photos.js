/* global React, ReactDOM, Redux, jsx */
const { Step, Button, Icon, Image } = require('semantic-ui-react')
const { IndexLink } = require('react-router')
const { connect } = require('react-redux')
const Dropzone = require('react-dropzone')
const request = require('superagent')

const StepFour = ({ reducer, site_url, name, org_name, org_address, org_city, org_state, org_zipcode, org_phone, site_color_primary, site_color_secondary, site_photo, site_background_photo, addPhoto, addBackground }) => {
  return (
    <div>
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
        site_url={site_url}
        name={name}
        org_name={org_name}
        org_address={org_address}
        org_city={org_city}
        org_state={org_state}
        org_zipcode={org_zipcode}
        org_phone={org_phone}
        site_color_primary={site_color_primary}
        site_color_secondary={site_color_secondary}
        site_photo={site_photo}
        site_background_photo={site_background_photo}
        addPhoto={addPhoto}
        addBackground={addBackground}
      />

      <Back />
      <Finish
        site_url={site_url}
        name={name}
        org_name={org_name}
        org_address={org_address}
        org_city={org_city}
        org_state={org_state}
        org_zipcode={org_zipcode}
        org_phone={org_phone}
        site_color_primary={site_color_primary}
        site_color_secondary={site_color_secondary}
        site_photo={site_photo}
        site_background_photo={site_background_photo}
        addPhoto={addPhoto}
        addBackground={addBackground}
      />
    </div>
  )
}

const Uploader = ({ reducer, site_url, name, org_name, org_address, org_city, org_state, org_zipcode, org_phone, site_color_primary, site_color_secondary, site_photo, site_background_photo, addPhoto, addBackground }) => {

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

  return (
    <div>
      <div className="photos-title">{'Add a profile photo for the organization'}</div>
      <div>{'Please upload a square image - i.e. a logo'}</div>
      <Dropzone
        className="dropzone"
        multiple={false}
        accept="image/*"
        onDrop={onPhoto}>
        <p className="dropzone-description">Drop an image or click to select a file to upload.</p>
        <img className="drop" src={'http://i.imgur.com/jQM2WCi.png'} />
        <Image className="display" src={site_photo} size='small' shape='circular' />
      </Dropzone>
      <div className="photos-title">{'Add a background photo for the organization'}</div>
      <Dropzone
        className="dropzone"
        multiple={false}
        accept="image/*"
        onDrop={onBackground}>
        <p className="dropzone-description">Drop an image or click to select a file to upload.</p>
        <img className="drop" src={'http://i.imgur.com/jQM2WCi.png'} />
        <Image className="display" src={site_background_photo} size='large' />
      </Dropzone>
    </div>
  )
}

const Finish = ({ reducer, site_url, name, org_name, org_address, org_city, org_state, org_zipcode, org_phone, site_color_primary, site_color_secondary, site_photo, site_background_photo, addPhoto, addBackground }) => {

  const completeSignup = () => {
    const data = {
      site_url: site_url,
      name: name,
      org_name: org_name,
      org_address: org_address,
      org_city: {org_city},
      org_state: {org_state},
      org_zipcode: {org_zipcode},
      org_phone: org_phone,
      site_color_primary: site_color_primary,
      site_color_secondary: site_color_secondary,
      site_photo: site_photo,
      site_background_photo: site_background_photo
    }
    const route = 'POST'
    const path = '/site'
    sendData(data, path, route)
      .then(result => console.log(result))
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
    <IndexLink activeClassName="active">
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

const Back = () => {
  return (
    <div id="back">
      <IndexLink to='/colors' activeClassName="active">
        <Button animated>
          <Button.Content visible>Back</Button.Content>
          <Button.Content hidden>
            <Icon name='left arrow' />
          </Button.Content>
        </Button>
      </IndexLink>
    </div>
  )
}

const mapStateToProps = state => {
  return {
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

const mapDispatchToProps = dispatch => {
  return {
    addPhoto: (value) => dispatch({type:'PHOTO', value}),
    addBackground: (value) => dispatch({type: 'BACKGROUND', value})
  }
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(StepFour)
