/* global React, ReactDOM, Redux */
const { connect } = require('react-redux')
const { Sidebar, Segment, Button, Menu, Image, Icon, Header, Input, Popup, Radio } = require('semantic-ui-react')
const { TwitterPicker, clientWidth } = require('react-color')
const Dropzone = require('react-dropzone')
const request = require('superagent')
const { Photo } = require('./photo-drop.js')

const Dashboard = ({stateProps, toggleVisibility, addPhoto, addBackground }) => {
  return (
    <Sidemenu
      stateProps={stateProps}
      toggleVisibility={toggleVisibility}
      addPhoto={addPhoto}
      addBackground={addBackground}
    />
  )
}

const Sidemenu = ({stateProps, toggleVisibility, addPhoto, addBackground }) => {

  return (
    <div>
      <Sidebar.Pushable id="dashboard" as={Segment}>
        <Sidebar id="sidebar" as={Menu} animation='scale down' width='thin' visible={stateProps.view} icon='labeled' vertical inverted>
          <Info
           stateProps={stateProps}
           toggleVisibility={toggleVisibility}
          />
      </Sidebar>
        <Sidebar.Pusher id="dash-body">
          <Photos
          stateProps={stateProps}
          addPhoto={addPhoto}
          addBackground={addBackground}
          >
          </Photos>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    </div>
  )
}

const Info = ({ stateProps, toggleVisibility }) => {

  const handleClick = () => {
    stateProps.view = false ? stateProps.view === true : true
  }

  return (
    <div>
      <div id="dash-title">Cobalt</div>
      <Button content="Hide" icon="left arrow" labelPosition="left" onClick={handleClick}></Button>
      <Menu.Item name='name'>
        <div>Name</div>
        <Input id="dash-name" icon='write' defaultValue={stateProps.name} />
      </Menu.Item>
      <Menu.Item name='org'>
        <div>Organization</div>
        <Input id="dash-org" icon='write' defaultValue={stateProps.org_name} />
        <Input id="dash-address" icon='write' defaultValue={stateProps.org_address} />
      </Menu.Item>
      <Menu.Item name='color'>
        <div>Primary Site Color</div>
        <Popup
          id="dash-color-1"
          trigger={<div id="dash-circle-1"></div>}
          flowing
          hoverable
        >
          <TwitterPicker />
        </Popup>
      </Menu.Item>
      <Menu.Item>
        <div>Secondary Site Color</div>
        <Popup
          id="dash-color-2"
          trigger={<div id="dash-circle-2"></div>}
          flowing
          hoverable
        >
          <TwitterPicker />
        </Popup>
      </Menu.Item>
      <Menu.Item>
        <div>Display Preferences</div>
        <div>Address</div>
        <Segment compact>
          <Radio slider />
        </Segment>
      </Menu.Item>
      <Menu.Item>
        <div>Phone</div>
        <Segment compact>
          <Radio slider />
        </Segment>
      </Menu.Item>
      <Menu.Item>
        <div>News</div>
        <Segment compact>
          <Radio slider />
        </Segment>
      </Menu.Item>
      <Menu.Item>
        <div>Events</div>
        <Segment compact>
          <Radio slider />
        </Segment>
      </Menu.Item>
    </div>
  )
}

const Photos = ({ stateProps, addPhoto, addBackground }) => {

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
      <Dropzone
        id="dash-drop-background"
        multiple={false}
        accept="image/*"
        onDrop={onBackground}
        background-photo={stateProps.site_background_photo}
      >
        <Button content="View site" icon="computer" labelPosition="right" />
        <Icon name="photo" />
        <p className="dropzone-description">Edit background photo</p>
        <Dropzone
          id="dash-drop-photo"
          multiple={false}
          accept="image/*"
          onDrop={onPhoto}>
          <p className="dropzone-description">Drop an image or click to select a file to upload.</p>
          <Icon name="photo" />
          <Image className="display" src={stateProps.ite_photo} size='small' shape='circular' />
        </Dropzone>
        <div className="photos-title">{'Add a background photo for the organization'}</div>
      </Dropzone>
    </div>
  )
}

const Body = () => {
  return (
    <div>
    </div>
  )
}


const mapStateToProps = state => {
  return {
    stateProps: {
      site_url: state.site_url,
      name: state.name,
      org_name: state.org_name,
      org_address: state.org_address,
      org_phone: state.org_phone,
      site_color_primary: state.site_color_primary,
      site_color_secondary: state.site_color_secondary,
      site_photo: state.site_photo,
      site_background_photo: state.site_background_photo,
      view: state.view
    }
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addPhoto: (value) => dispatch({type:'PHOTO', value}),
    addBackground: (value) => dispatch({type: 'BACKGROUND', value})
  }
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(Dashboard)
