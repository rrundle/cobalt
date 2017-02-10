/* global React, ReactDOM, Redux, jsx */
const { Step, Button, Icon, Image } = require('semantic-ui-react')
const Dropzone = require('react-dropzone')
const request = require('superagent')

const StepFour = () => {
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

      <Uploader />

    </div>
  )
}

const Uploader = () => {

  const CLOUDINARY_UPLOAD_PRESET = 'l25kfhpr'
  const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/ryanrundle/upload'

  const onDrop = (acceptedFiles, rejectedFiles) => {
    console.log(acceptedFiles[0])
    handleImageUpload(acceptedFiles[0])
  }

  function handleImageUpload(file) {
    let upload = request.post(CLOUDINARY_UPLOAD_URL)
                        .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                        .field('file', file)

    upload.end((err, response) => {
      if (err) {
        console.error(err)
      }

      if (response.body.secure_url !== '') {
        return {
          uploadedFileCloudinaryUrl: response.body.secure_url
        }
      }
    })
  }

  return (
    <div>
      <div>{'Add a profile photo for the organization'}</div>
      <div>{'i.e. a logo'}</div>
      <Image size='medium' shape='circular' />
      <Dropzone
        multiple={false}
        accept="image/*"
        onDrop={onDrop}>
        <p>Drop an image or click to select a file to upload.</p>
      </Dropzone>
      <div>{'Add a background photo for the organization'}</div>
      <Image size='large' />
      <Dropzone
        multiple={false}
        accept="image/*"
        onDrop={onDrop}>
        <p>Drop an image or click to select a file to upload.</p>
      </Dropzone>
    </div>
  )
}

module.exports = StepFour
