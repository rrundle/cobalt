/* global React, ReactDOM, Redux */
const { Segment, Button, Menu, Image, Icon, Header } = require('semantic-ui-react')
const { IndexLink } = require('react-router')
const { connect } = require('react-redux')

const Website = ({ stateProps, dispatchProps }) => {

  const backgroundPhoto = {
    backgroundImage: `url(${stateProps.site_background_photo})`,
    backgroundRepeat: 'no-repeat'
  }

  const profilePhoto = {
    backgroundImage: `url(${stateProps.site_photo}) no-repeat`,
    backgroundRepeat: 'no-repeat'
  }

  const backgroundStyle = {
    width: '100%',
    border: 'none',
    height: '300px',
  }

  const profileStyle = {
    width: '200px',
    height: '200px',
    borderRadius: '50%',
    border: 'none',
    backgroundImage: 'url(' + stateProps.site_photo + ')'
  }

  return (
    <Segment.Group id="dash-segments">
      <Segment id="website-background-photo" style={backgroundPhoto}>
        {
          stateProps.site_background_photo === ''
          ? <div id="default-org-name">{stateProps.org_name}</div>
          : null
        }
        <div
          id="dash-drop-background"
          multiple={false}
          accept="image/*"
          style={backgroundStyle}
        >
          <p className="dropzone-description"></p>
        </div>
        <div>
          <Segment
            id="website-profile-photo"
            style={profileStyle}
          >
            <div
              id="dash-drop-photo"
              multiple={false}
              accept="image/*"
            >
              {
                stateProps.site_photo === ''
                ? <i id="default-photo" class="fa fa-user" aria-hidden="true"></i>
                : null
              }
              <Image className="display" size='small' shape='circular' />
            </div>
          </Segment>
        </div>
      </Segment>
      <Segment>
        <div className="body-info" id="dash-org-title">{stateProps.org_name}</div>
        <div className="body-info">
        {
          stateProps.display_address
          ? `${stateProps.org_address}   ${stateProps.org_city}   ${stateProps.org_state} ${stateProps.org_zipcode}`
          : ''
        }
        </div>
        <div className="body-info">
        {
          stateProps.display_phone
          ? stateProps.org_phone
          : null
        }
        </div>
      </Segment>
      <Segment.Group horizontal>
        {
          stateProps.display_news
          ? <Segment id="news-segment">News</Segment>
          : null
        }
        {
          stateProps.display_events
          ? <Segment id="events-segment">Events</Segment>
          : null
        }
      </Segment.Group>
    </Segment.Group>
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
      org_city: state.org_city,
      org_state: state.org_state,
      org_zipcode: state.org_zipcode,
      org_phone: state.org_phone,
      org_phone: state.org_phone,
      site_color_primary: state.site_color_primary,
      site_color_secondary: state.site_color_secondary,
      site_photo: state.site_photo,
      site_background_photo: state.site_background_photo,
      view: state.view,
      display_address: state.display_address,
      display_phone: state.display_phone,
      display_news: state.display_news,
      display_events: state.display_events
    }
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchProps: {
      addPhoto: (value) => dispatch({type:'PHOTO', value}),
      addBackground: (value) => dispatch({type: 'BACKGROUND', value}),
      editName: (value) => dispatch({type: "NAME", value}),
      editOrg: (value) => dispatch({type: "ORG", value}),
      editAddress: (value) => dispatch({type: "ADDRESS", value}),
      editCity: (value) => dispatch({type: "CITY", value}),
      editState: (value) => dispatch({type: "STATE", value}),
      editZip: (value) => dispatch({type: "ZIPCODE", value}),
      editPhone: (value) => dispatch({type: "PHONE", value}),
      editPrimary: (value) => dispatch({type: "PRIMARY", value}),
      editSecondary: (value) => dispatch({type: "SECONDARY", value}),
      editRadio: (value, field) => dispatch({type: "RADIO", value, field})
    }
  }
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(Website)
