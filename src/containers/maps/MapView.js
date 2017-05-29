import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Mapbox, { ZoomControl } from 'react-mapbox-gl'
import { connect } from 'react-redux'

import { loadNodeRecords, loadAllGateways } from '../../actions'
import GatewayLayer from './GatewayLayer'
import NodeLayer from './NodeLayer'
import RealtimeNodeLayer from './RealtimeNodeLayer'

import styled from 'styled-components'

const Wrapper = styled.div`
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
`
const center = [13.3866103, 52.5170092]
const colorStyle = {
  width: "100vw",
  height: "100vh",
}

class MapView extends Component {
  static propTypes = {
    fetchNodeRecords: PropTypes.func,
    loadAllGateways: PropTypes.func,
    changeZoom: PropTypes.func,
    nodes: PropTypes.object,
    zoom: PropTypes.number
  }

  componentDidMount() {
    this.props.loadAllGateways(1000, 0)
    this.props.loadNodeRecords()
  }

  render() {
    return (
    <Wrapper>
      <Mapbox
        style="mapbox://styles/mapbox/light-v9"
        accessToken="pk.eyJ1IjoiemhvdXF1YW4iLCJhIjoiY2oyNHN1ZWVqMDAzbTJxcWsxa3IzaWtjbCJ9.qDS9tt6xECnllXR2fCJnWQ"
        containerStyle={colorStyle}
        center={center}>
        <ZoomControl
          position={"topLeft"} />
        <NodeLayer />
        <GatewayLayer />
        <RealtimeNodeLayer />
      </Mapbox>
    </Wrapper>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
})

export default connect(mapStateToProps, {
  loadNodeRecords,
  loadAllGateways,
})(MapView)
