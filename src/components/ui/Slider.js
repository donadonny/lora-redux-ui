import React from 'react'
import Slider from 'rc-slider';
import { Col, Row, Grid, Panel } from 'react-bootstrap'
import styled from 'styled-components'

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

const Wrapper = styled.div`
  position: absolute;
  bottom: 50px;
  z-index: 102;

  p {
    text-align: center;
  }
`

const MapSlider = ({}) => (
  <Wrapper>
    <Grid>
      <Row className="show-grid">
        <Col xs={9} xsOffset={1} md={6} mdOffset={3} >
          <Panel>
            <p>Drag to display the history nodes</p>
            {' '}
            <Range
                all owCross={false}
                min={-30}
                max={0}
                defaultValue={[-30, 0]}
                tipFormatter={value => `${value} days`}
              />
          </Panel>
        </Col>
      </Row>
    </Grid>
  </Wrapper>
)

export default MapSlider
