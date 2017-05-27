import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Mapbox from 'react-mapbox-gl'
import { connect } from 'react-redux'


class MapView extends Component {



  render() {
    const center = [13.3866103, 52.5170092]
    const colorStyle = {
      height: "100vh",
      width: "100vw",
    }
    return (
      <Mapbox
        style="mapbox://styles/mapbox/light-v9"
        accessToken="pk.eyJ1IjoiemhvdXF1YW4iLCJhIjoiY2oyNHN1ZWVqMDAzbTJxcWsxa3IzaWtjbCJ9.qDS9tt6xECnllXR2fCJnWQ"
        containerStyle={colorStyle}
        center={center}>
      </Mapbox>
    )
  }
}

const mapStateToProps = (state, ownProps) => {


  return {

  }

}

export default connect(mapStateToProps, {

})(MapView)
