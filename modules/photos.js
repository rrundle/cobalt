/* global React, ReactDOM, Redux, jsx */
const { Step, Button, Icon, Image } = require('semantic-ui-react')
const { IndexLink } = require('react-router')
const { connect } = require('react-redux')
const Dropzone = require('react-dropzone')
const request = require('superagent')

const StepFour = ({ reducer, site_photo, site_background_photo, addPhoto, addBackground }) => {
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
        site_photo={site_photo}
        site_background_photo={site_background_photo}
        addPhoto={addPhoto}
        addBackground={addBackground}
      />

    </div>
  )
}

const Uploader = ({ reducer, site_photo, site_background_photo, addPhoto, addBackground }) => {

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
      <div>{'Add a profile photo for the organization'}</div>
      <div>{'i.e. a logo'}</div>
      <Image src={site_photo} size='medium' shape='circular' />
      <Dropzone
        multiple={false}
        accept="image/*"
        onDrop={onPhoto}>
        <p>Drop an image or click to select a file to upload.</p>
      </Dropzone>
      <div>{'Add a background photo for the organization'}</div>
      <Image src={site_background_photo} size='large' />
      <Dropzone
        multiple={false}
        accept="image/*"
        onDrop={onBackground}>
        <p>Drop an image or click to select a file to upload.</p>
      </Dropzone>
    </div>
  )
}

const mapStateToProps = state => {
  return {
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
