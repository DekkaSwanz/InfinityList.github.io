import React from 'react';
import {Container } from 'reactstrap';
const headStyle = {
    fontFamily:"'Permanent Marker', cursive",
    border: "solid black",
    borderRadius: "25px",
    marginBottom:"0rem",
    color:"red",
    background:"black"
}
const span1 ={
  color:"red"
  }
  const span2 ={
  color:"rgb(234, 234, 0)"
  }
  const span3={
  color:"green"
  }

const Header = (props) => {
  return (
    <div>
 
        <Container fluid className="text-center">
          <h1 style={headStyle} className="display-4" id="header">Derrick & Alex's <span style={span3}>Infinite </span> <br></br> <span style={span2}>To-do List</span></h1>
        </Container>

    </div>
  );
};

export default Header;