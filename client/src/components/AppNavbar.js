import React from 'react';
import { Jumbotron, Container } from 'reactstrap';

const Header = (props) => {
  return (
    <div>
 
        <Container fluid className="text-center">
          <h1 className="display-4" id="header">Derrick & Alex's Infinite <br></br> To-do List</h1>
        </Container>

    </div>
  );
};

export default Header;