import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Form, Header, Modal } from 'semantic-ui-react';

import { createUser, updateUser } from '../actions';

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
  componentDidMount() {
    if (this.props.user !== null) {
      this.setState({
        name: this.props.user.name,
        userName: this.props.user.username,
        email: this.props.user.email,
        city: this.props.user.address.city
      })
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
    this.setState({ modalOpen: this.props.close()})
  }
  editUser() {
    this.props.updateUser(
      this.props.user.id,
      this.state.name,
      this.state.userName,
      this.state.email,
      this.state.city
    )
    this.setState({ modalOpen: this.props.close()})
  }
  render() {
    return (
      <Modal
        open={this.state.modalOpen}
        onClose={() => this.props.close()}
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
                onChange={e => this.setState({ name: e.target.value })}
                value={this.state.name} />
              <Form.Input
                fluid label='User name'
                placeholder='Last name'
                onChange={e => this.setState({ userName: e.target.value })}
                value={this.state.userName} />
              <Form.Input
                fluid label='Email'
                placeholder='Email'
                onChange={e => this.setState({ email: e.target.value })}
                value={this.state.email} />
              <Form.Input
                fluid label='City'
                placeholder='City'
                onChange={e => this.setState({ city: e.target.value })}
                value={this.state.city} />
            </Form.Group>
            <Button.Group>
              <Button
                onClick={() => this.setState({ modalOpen: this.props.close() })}>
                Cancel
            </Button>
              <Button.Or />
              <Button
                positive
                onClick={() => {
                  if (this.props.user !== null) {
                    this.editUser();
                  } else {
                    this.saveUser();
                  }
                }}>
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
    createUser,
    updateUser
  }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(UserForm);