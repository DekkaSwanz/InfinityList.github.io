import React, { Component } from 'react';
import { Container, Row, Col, ListGroup, ListGroupItem, ListGroupItemText, Button, Form, FormGroup, Label, Input, FormText, } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import uuid from 'uuid';
import axios from 'axios';
const labelStyle = {
    fontSize: '2rem'
}
const thingStyle = {
    fontSize: '2.5rem'
}
const colStyle = {
    flex: 'none',
    maxWidth: 'none'
}
class Todolist extends Component {
    state = {
        items: [],
        completedItems: []
    }
    componentDidMount() {
        axios.get('http://localhost:5000/api/items').then(res => {
            console.log(res.data)
            console.log("length", res.data.length)
            // res.data.forEach(element => {
            //     element["id"] = uuid()
            // });
            const completedItems = res.data.filter(item => item.completed == true)
            const items = res.data.filter(item => item.completed == false)
            console.log('not completed', items)
            console.log('completed', completedItems)
            this.setState({
                items: items,
                completedItems: completedItems
            })
        })

    }

    handleSubmit = event => {
        const whatVal = document.getElementById("whatInput").value
        const whereVal = document.getElementById("whereInput").value
        const whenVal = document.getElementById("whenInput").value

        const newItem = {
            what: whatVal,
            where: whereVal,
            when: whenVal
        }

        axios.post('http://localhost:5000/api/items', newItem)
            .then(res => {
                console.log(res)
            }).catch((error) => {
                console.log(error)
            })
    }

    render() {
        const { items } = this.state;
        return (
            <Container>
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup row>
                        <Col style={colStyle} sm={10}>
                            <Input type="text" name="what" id="whatInput" placeholder="What should we do?" />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col style={colStyle} sm={10}>
                            <Input type="text" name="where" id="whereInput" placeholder="Where should we do it?" />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col style={colStyle} sm={10}>
                            <Input type="text" name="when" id="whenInput" placeholder="When should we do it?" />
                        </Col>
                    </FormGroup>
                    <FormGroup className='text-center' check row>
                        <Col style={colStyle} sm={{ size: 10 }}>
                            <Button type="submit">Add to list!</Button>
                        </Col>
                    </FormGroup>
                </Form>
                <Row className='text-center'>
                    <Col xs="6"><h4 style={thingStyle}>Things to Do...</h4><br></br>
                        <ListGroup>
                            {items.map((item, id) => (
                                <ListGroupItem  >
                                    <ListGroupItemText><span><strong>What: </strong></span>{item.what}</ListGroupItemText><br></br>
                                    <ListGroupItemText><span><strong>Where: </strong></span>{item.where}</ListGroupItemText><br></br>
                                    <ListGroupItemText><span><strong>When: </strong></span>{item.when}</ListGroupItemText><br></br>
                                    <Button
                                        className='remove-btn'
                                        color='danger'
                                        size='md'
                                        onClick={() => {
                                            axios.delete(`http://localhost:5000/api/items/${item._id}`).then(res => {

                                                console.log(res)
                                            }).catch(err => {
                                                console.log(err)
                                            })

                                            // reload hack :(
                                            window.location.reload(true)
                                        }}
                                    >Delete
                           </Button>
                                    <Button
                                        className='check-btn'
                                        color='success'
                                        size='md'
                                        onClick={() => {
                                           axios.put(`http://localhost:5000/api/items/${item._id}`).then(res =>{
                                               console.log(res)
                                           })
                                           window.location.reload(true)
                                        }}
                                    >Done!</Button>
                                </ListGroupItem>
                            ))}
                        </ListGroup>
                    </Col>
                    <Col xs="6"><h4 className='flex-sm-nowrap' style={thingStyle}>Things we've done...</h4><br></br>
                        <ListGroup>
                            {this.state.completedItems.map((item) => (
                                <ListGroupItem>
                                    <ListGroupItemText><span><strong>What: </strong></span>{item.what}</ListGroupItemText><br></br>
                                    <ListGroupItemText><span><strong>Where: </strong></span>{item.where}</ListGroupItemText><br></br>
                                    <ListGroupItemText><span><strong>When: </strong></span>{item.when}</ListGroupItemText><br></br>
                                    <Button
                                        className='remove-btn'
                                        color='danger'
                                        size='md'
                                        className='remove-btn'
                                        color='danger'
                                        size='md'
                                        onClick={() => {
                                            axios.delete(`http://localhost:5000/api/items/${item._id}`).then(res => {
                                                console.log(res)
                                            }).catch(err => {
                                                console.log(err)
                                            })
                                            console.log("item id = ", item._id)
                                            console.log('delete clicked')
                                            window.location.reload(true)

                                        }}
                                    >Delete
                           </Button>
                                </ListGroupItem>
                            ))}
                        </ListGroup>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Todolist