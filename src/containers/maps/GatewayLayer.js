import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Marker, Popup } from "react-mapbox-gl";

import { connect } from 'react-redux'
import _ from 'lodash'
import gatewayIcon from '../../../public/images/gateway.png'
import styled from 'styled-components'
import { updateGatewayPopup } from '../../actions'

// import { Feature, Layer } from "react-mapbox-gl";

/*
<Layer
  type="symbol"
  id="marker"
  layout={{ "icon-image": "marker-15" }}>
  {
    _.map(gateways, (gw) =>
      <Feature
        key={gw.mac}
        coordinates={[gw.longitude, gw.latitude]}
        onClick={this.handleClick(gw)}/>
    )
  }
</Layer>
*/

const PopupContent = styled.div`
  p {
    margin: 0px;
    padding: 0px;
  }
  hr {
    margin: 0px;
    padding: 0px;
  }
`

class GatewayLayer extends Component {
  static propTypes = {
    gateways: PropTypes.object,
    gatewayPopup: PropTypes.object,
    updateGatewayPopup: PropTypes.func
  }

  handleClick(gw) {
    if (gw) {
      gw.coordinates = [gw.longitude, gw.latitude]
    }
    this.props.updateGatewayPopup(gw)
  }

  render() {
    const { gateways, gatewayPopup } = this.props

    return (
      <div>
        {
          _.map(gateways, (gw) =>
            <Marker
              key={gw.mac}
              onClick={this.handleClick.bind(this, gw)}
              coordinates={[gw.longitude, gw.latitude]}>
              <img src={gatewayIcon} draggable="false" alt=""/>
            </Marker>
          )
        }
        {gatewayPopup &&
          <Popup
            coordinates={gatewayPopup.coordinates}
            anchor={"bottom"}
            offset={10}>
            <PopupContent>
              <p>
                <strong>{gatewayPopup.name}</strong>
                <i onClick={this.handleClick.bind(this, null)} style={{'float': 'right'}} className="fa fa-times" aria-hidden="true"></i>
              </p>
              <hr></hr>
              <p>Description: {gatewayPopup.description}</p>
              <p>mac addr: {gatewayPopup.mac}</p>
              <p>Status: <i className="fa fa-circle" aria-hidden="true" style={{color:"#76FF03"}}></i></p>
            </PopupContent>
          </Popup>
        }
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  gateways: state.entities.gateways,
  gatewayPopup: state.ui.gatewayPopup
})

export default connect(mapStateToProps, {
  updateGatewayPopup
})(GatewayLayer)
