import React, { Component } from 'react';
import { Container, Row, Col, ListGroup, ListGroupItem, ListGroupItemText,ModalFooter, Button, Form, FormGroup,Input} from 'reactstrap';
import axios from 'axios';

const thingStyle = {
    fontSize: '2.5rem',
    fontFamily:"'Permanent Marker', cursive",
    borderBottom:"solid black .2rem"
}
const thingStyle1 = {
    fontSize: '2.5rem',
    fontFamily:"'Permanent Marker', cursive",
    borderBottom:"solid black .2rem",
    color:"green"
}
const thingStyle2 = {
    fontSize: '2.5rem',
    fontFamily:"'Permanent Marker', cursive",
    borderBottom:"solid black .2rem",
    color:"rgb(234, 234, 0)"
}
const colStyle = {
    flex: 'none',
    maxWidth: 'none'
}
const smallStyle1 ={
    fontSize:"1.5rem",
    fontFamily:"'Indie Flower', cursive",
    color:"green"
}
const smallStyle2 ={
    fontSize:"1.5rem",
    fontFamily:"'Indie Flower', cursive",
    color:"rgb(234, 234, 0)"
}
const smallStyle3 ={
    fontSize:"1.5rem",
    fontFamily:"'Indie Flower', cursive",
    color:"red"
}
const itemStyle ={
    fontSize:"1.25rem",
    fontFamily:"'Indie Flower', cursive",
    margin:'0',
    wordBreak:'break-word'
}
const itemStyle1 ={
    fontSize:"1.25rem",
    fontFamily:"'Indie Flower', cursive",
    margin:'0',
    wordBreak:'break-word',
    color:"red"
}
const itemStyle2 ={
    fontSize:"1.25rem",
    fontFamily:"'Indie Flower', cursive",
    margin:'0',
    wordBreak:'break-word',
    color:"rgb(234, 234, 0)"
}
const itemStyle3 ={
    fontSize:"1.25rem",
    fontFamily:"'Indie Flower', cursive",
    margin:'0',
    wordBreak:'break-word',
    color:'green'
}
const containerStyle = {
   
}
const formStyle = {
    padding:"2rem"
}
const commentBoxStyle = {
    marginTop: "1rem"
}
const buttonStyle ={
    background:"black",
    fontFamily:"'Indie Flower', cursive"

}
const listGroupItemTextStyle ={
    margin:'0'
}
class Todolist extends Component {
    state = {
        items: [],
        completedItems: []
    }
    componentDidMount() {
        axios.get('/api/items').then(res => {
            console.log(res.data)
            console.log("length", res.data.length)
            // res.data.forEach(element => {
            //     element["id"] = uuid()
            // });
            const completedItems = res.data.filter(item => item.completed === true)
            const items = res.data.filter(item => item.completed === false)
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

        axios.post('/api/items', newItem)
            .then(res => {
                console.log(res)
            }).catch((error) => {
                console.log(error)
            })
    }

    render() {
        const { items } = this.state;
        return (
            <Container style={containerStyle}>
                <Form style={formStyle} onSubmit={this.handleSubmit}>
                    <FormGroup row>
                        <Col style={colStyle} sm={10}>
                            <Input style={smallStyle1} type="text" name="what" id="whatInput" placeholder="What should we do?" />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col style={colStyle} sm={10}>
                            <Input style={smallStyle2} type="text" name="where" id="whereInput" placeholder="Where should we do it?" />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col style={colStyle} sm={10}>
                            <Input style={smallStyle3} type="text" name="when" id="whenInput" placeholder="When should we do it?" />
                        </Col>
                    </FormGroup>
                    <FormGroup className='text-center' check row>
                        <Col style={colStyle} sm={{ size: 10 }}>
                            <Button style={buttonStyle} type="submit">Add to list!</Button>
                        </Col>
                    </FormGroup>
                </Form>
                <Row className='text-center'>
                    <Col xs="6"><h4 style={thingStyle1}>Things to Do...</h4><br></br>
                        <ListGroup>
                            {items.map((item, id) => (
                                <ListGroupItem  >
                                    <ListGroupItemText style={itemStyle1} ><span><strong>What: </strong></span >{item.what}</ListGroupItemText><br></br>
                                    <ListGroupItemText style={itemStyle2}><span><strong>Where: </strong></span>{item.where}</ListGroupItemText><br></br>
                                    <ListGroupItemText style={itemStyle3}><span><strong>When: </strong></span>{item.when}</ListGroupItemText><br></br>
                                    <ListGroupItemText style={itemStyle}><span><strong></strong></span>{item.comment}</ListGroupItemText><br></br>

                                    <Button
                                        className='remove-btn'
                                        color='danger'
                                        size='md'
                                        onClick={() => {
                                            axios.delete(`/api/items/${item._id}`).then(res => {

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
                                           axios.put(`/api/items/${item._id}`).then(res =>{
                                               console.log(res)
                                               
                                           })
                                           window.location.reload(true)
                                        }}
                                    >Done!</Button><br></br>
                                    <Form onSubmit={this.onSubmit}>
                                        <FormGroup>
                                            <Input style={commentBoxStyle} id={item._id} type="textarea" />
                                            <ModalFooter>
                                                <Button style={buttonStyle} onClick={() => {
                                                    
                                                   
                                                    let comment = document.getElementById(`${item._id}`).value;
                                                    console.log(comment)
                                                    axios.put(`/api/items/comment/${comment}/${item._id}`).then(res => {
                                                        console.log(res)
                                                      
                                                    })
                                                    window.location.reload(true)
                                                }}

                                                >Submit Comment!</Button>
                                            </ModalFooter>
                                        </FormGroup>
                                    </Form>
                                </ListGroupItem>
                            ))}
                        </ListGroup>
                    </Col>
                    <Col xs="6"><h4 className='flex-sm-nowrap' style={thingStyle2}>Things we've done...</h4><br></br>
                        <ListGroup>
                            {this.state.completedItems.map((item) => (
                                <ListGroupItem>
                                    <ListGroupItemText style={itemStyle1}><span><strong>What: </strong></span>{item.what}</ListGroupItemText><br></br>
                                    <ListGroupItemText style={itemStyle2}><span><strong>Where: </strong></span>{item.where}</ListGroupItemText><br></br>
                                    <ListGroupItemText style={itemStyle3}><span><strong>When: </strong></span>{item.when}</ListGroupItemText><br></br>
                                    <ListGroupItemText style={itemStyle}><span><strong></strong></span>{item.comment}</ListGroupItemText><br></br>
                                    <Button
                                        className='remove-btn'
                                        color='danger'
                                        size='md'
                                        onClick={() => {
                                            axios.delete(`/api/items/${item._id}`).then(res => {
                                                console.log(res)
                                            }).catch(err => {
                                                console.log(err)
                                            })
                                            console.log("item id = ", item._id)
                                            console.log('delete clicked')
                                            window.location.reload(true)
                                        }}
                                    >Delete
                                </Button><br></br>
                                <Form onSubmit={this.onSubmit}>
                                        <FormGroup>
                                            <Input style ={commentBoxStyle} id={item._id} type="textarea" />
                                            <ModalFooter>
                                                <Button style={buttonStyle}  onClick={() => {
                                                    
                                                   
                                                    let comment = document.getElementById(`${item._id}`).value;
                                                    console.log(comment)
                                                    axios.put(`/api/items/comment/${comment}/${item._id}`).then(res => {
                                                        console.log(res)
                                                      
                                                    })
                                                    window.location.reload(true)
                                                }}

                                                >Submit Comment!</Button>
                                            </ModalFooter>
                                        </FormGroup>
                                    </Form>
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