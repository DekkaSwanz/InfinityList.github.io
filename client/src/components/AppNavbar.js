import React from 'react';
import { Jumbotron, Container } from 'reactstrap';
const headStyle = {
    fontFamily:"'Permanent Marker', cursive",
    border: "solid black",
    borderRadius: "25px"
}
const Header = (props) => {
  return (
    <div>
 
        <Container fluid className="text-center">
          <h1 style={headStyle} className="display-4" id="header">Derrick & Alex's Infinite <br></br> To-do List</h1>
        </Container>

    </div>
  );
};

export default Header;