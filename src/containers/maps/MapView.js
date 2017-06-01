import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Mapbox, { ZoomControl } from 'react-mapbox-gl'
import { connect } from 'react-redux'
import { loadPackets, loadAllGateways } from '../../actions'
import GatewayLayer from './GatewayLayer'
import NodeLayer from './NodeLayer'
import RealtimeNodeLayer from './RealtimeNodeLayer'
import Slider from '../../components/ui/Slider'
import styled from 'styled-components'

const Wrapper = styled.div`
  top: 50px;
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
    fetchPackets: PropTypes.func,
    loadAllGateways: PropTypes.func,
    changeZoom: PropTypes.func,
    nodes: PropTypes.object,
    zoom: PropTypes.number
  }

  componentDidMount() {
    this.props.loadAllGateways(1000, 0)
    this.props.loadPackets()
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
        <Slider/>
        <NodeLayer />
        <GatewayLayer />
        <RealtimeNodeLayer />
      </Mapbox>
    </Wrapper>
    )
  }
}
//
// onChange={this.props.filterNodesByRange}

const mapStateToProps = (state, ownProps) => ({
})

export default connect(mapStateToProps, {
  loadPackets,
  loadAllGateways,
})(MapView)
