import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Mapbox from 'react-mapbox-gl'
import { connect } from 'react-redux'

import { loadNodeRecords, loadAllGateways } from '../../actions'
import GatewayLayer from './GatewayLayer'
import NodeLayer from './NodeLayer'

class MapView extends Component {
  static propTypes = {
    fetchNodeRecords: PropTypes.func,
    loadAllGateways: PropTypes.func,

    nodes: PropTypes.object

  }

  componentDidMount() {
    this.props.loadAllGateways(1000, 0)
    this.props.loadNodeRecords()
  }

  render() {
    const center = [13.3866103, 52.5170092]
    const colorStyle = {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      position: 'fixed'
    }
    return (
      <Mapbox
        zoom={[11]}
        style="mapbox://styles/mapbox/light-v9"
        accessToken="pk.eyJ1IjoiemhvdXF1YW4iLCJhIjoiY2oyNHN1ZWVqMDAzbTJxcWsxa3IzaWtjbCJ9.qDS9tt6xECnllXR2fCJnWQ"
        containerStyle={colorStyle}
        center={center}>
        <NodeLayer />
        <GatewayLayer />
      </Mapbox>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
})

export default connect(mapStateToProps, {
  loadNodeRecords,
  loadAllGateways
})(MapView)
