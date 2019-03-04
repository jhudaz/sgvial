import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Form, Header, Modal } from 'semantic-ui-react';

import { createUser } from '../actions';

import "semantic-ui-css/semantic.min.css";

class UserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: true,
      name: '',
      userName: '',
      email: '',
      city: ''
    }
  }

  //to save an user
  saveUser() {
    this.props.createUser(
      this.state.name,
      this.state.userName,
      this.state.email,
      this.state.city
    )
    
  }
  render() {
    return (
      <Modal
        open={this.state.modalOpen}
        //onClose={this.setState({modalOpen: !this.state.modalOpen})}
        basic
        size='small'
      >
        <Header icon='browser' content='User Information' />
        <Modal.Content>
          <h3>Fill the fields to save a new user</h3>
          <Form inverted>
            <Form.Group widths='equal'>
              <Form.Input
                fluid label='Full name'
                placeholder='First name'
                onChange={e => this.setState({ name: e.target.value })} />
              <Form.Input
                fluid label='User name'
                placeholder='Last name'
                onChange={e => this.setState({ userName: e.target.value })} />
              <Form.Input
                fluid label='Email'
                placeholder='Email'
                onChange={e => this.setState({ email: e.target.value })} />
              <Form.Input
                fluid label='City'
                placeholder='City'
                onChange={e => this.setState({ city: e.target.value })} />
            </Form.Group>
            <Button.Group>
              <Button
                onClick={() => this.setState({modalOpen: this.props.close})}>
                Cancel
            </Button>
              <Button.Or />
              <Button
                positive
                onClick={() => this.saveUser()}>
                Save
            </Button>
            </Button.Group>
          </Form>
        </Modal.Content>
      </Modal>


    )
  }
}
//reducer
function mapStateToProps({ reducerApp }) {
  return {
    reducerApp
  }
}
//actions
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    createUser
  }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(UserForm);