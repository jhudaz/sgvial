import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Form, Header, Modal, Loader, Divider } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form'

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
      city: '',
      loading: false
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
  saveData() {
    const data = {
      name: this.state.name,
      userName: this.state.userName,
      email: this.state.email,
      city: this.state.city
    };
    this.setState({ loading: true });
    if (this.props.user !== null) {

      this.props.updateUser({ ...data, id: this.props.user.id }).then(() => {
        this.setState({ loading: false });
        this.props.close();
      });
    } else {
      this.props.createUser(data).then(() => {
        this.setState({ loading: false });
        this.props.close();
      });
    }
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

            <label htmlFor="Name">Full name</label>
            <Field
              name="Name"
              placeholder="Full name"
              component="input"
              type="text"
              onChange={e => this.setState({ name: e.target.value })}
              value={this.state.name} />
            <label htmlFor="Username">Username</label>
            <Field
              name="Username"
              placeholder="Username"
              component="input"
              type="text"
              onChange={e => this.setState({ userName: e.target.value })}
              value={this.state.userName} />
            <label htmlFor="Email">Email</label>
            <Field
              name="Email"
              placeholder="Email"
              component="input"
              type="email"
              onChange={e => this.setState({ email: e.target.value })}
              value={this.state.email} />
            <label htmlFor="City">City</label>
            <Field
              name="City"
              placeholder="City"
              component="input"
              type="text"
              onChange={e => this.setState({ city: e.target.value })}
              value={this.state.city} />

            <Divider />
            <Button.Group>
              <Button
                onClick={() => this.setState({ modalOpen: this.props.close() })}>
                Cancel
            </Button>
              <Button.Or />
              <Button
                positive
                onClick={() => this.saveData()}>
                Save
            </Button>
            </Button.Group>
            {this.state.loading && <Loader active inline='centered' size='big'>Loading</Loader>}

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
const ContactForm = reduxForm({
  // a unique name for the form
  form: 'user'
})(UserForm)

export default connect(mapStateToProps, mapDispatchToProps)(ContactForm);