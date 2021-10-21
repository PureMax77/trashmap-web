import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

const Container = styled.input`
  width: 100%;
  height: 100%;
  -webkit-appearance: checkbox;
`

const Div = styled.div`
  display: flex;
  align-items: center;
  align-items: center;
  width: ${(props) => props.boxSize};
  height: ${(props) => props.boxSize};
  padding: 0;
  margin: ${(props) => props.margin};
`

const CheckBox = ({ checked, onChange, type = "checkbox", boxSize = "20px", margin }) => (
  <Div boxSize={boxSize} margin={margin}>
    <Container checked={checked} onChange={onChange} type={type} />
  </Div>
)

CheckBox.propTypes = {
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string,
}

export default CheckBox
