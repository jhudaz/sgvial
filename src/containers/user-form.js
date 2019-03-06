import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Form, Header, Modal, Loader, Divider } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form/immutable'

import { createUser, updateUser } from '../actions';

import "semantic-ui-css/semantic.min.css";

const renderField = field => (
  <input {...field.input} placeholder={field.placeholder} autoFocus={field.autoFocus} />
)

class UserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    }
    this.saveData = this.saveData.bind(this);
  }
  componentDidMount() {
    if (this.props.user !== null) {
      const initData = {
        "name": this.props.user.name,
        "username": this.props.user.username,
        "email": this.props.user.email,
        "city": this.props.user.address.city,
      };
      this.props.initialize(initData);
    }
  }
  //to save or edit an user depending if the user-prop have data
  saveData(values) {
    //applying immutability to the store creating a new object from it
    const v = {
      name: values.get('name'),
      username: values.get('username'),
      email: values.get('email'),
      city: values.get('city')
    }
    this.setState({ loading: true });
    if (this.props.user !== null) {
      //edit
      this.props.updateUser({
        ...v,
        id: this.props.user.id > 10 ? 10 : this.props.user.id
      }, this.props.user.id).then(() => {
        this.setState({ loading: false });
        this.props.close();
      });
    } else {
      //save
      this.props.createUser(v).then(() => {
        this.setState({ loading: false });
        this.props.close();
      });
    }
  }
  render() {
    return (
      <Modal
        open={true}
        onClose={() => this.props.close()}
        basic
        size='small'
      >
        <Header icon='browser' content='User Information' />
        <Modal.Content>
          <h3>Fill the fields to save a new user</h3>
          <Form inverted onSubmit={this.props.handleSubmit(this.saveData)}>

            <label htmlFor="name">Full name</label>
            <Field
              name="name"
              component={renderField}
              type="text"
              placeholder="Full name"
              autoFocus={true}
            />
            <label htmlFor="username">Username</label>
            <Field
              name="username"
              component={renderField}
              type="text"
              placeholder="Username"
            />
            <label htmlFor="email">Email</label>
            <Field
              name="email"
              component={renderField}
              type="email"
              placeholder="Email"
            />
            <label htmlFor="city">City</label>
            <Field
              name="city"
              component={renderField}
              type="text"
              placeholder="City"
            />

            <Divider />
            <Button.Group>
              <Button
                onClick={() => this.setState({ modalOpen: this.props.close() })}>
                Cancel
            </Button>
              <Button.Or />
              <Button
                positive
                action="submit"
              >
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
function mapStateToProps(state) {
  return {
    reducerApp: state.get('reducerApp')
  }
}
//actions
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    createUser,
    updateUser
  }, dispatch)
}
//redux form 
const ContactForm = reduxForm({
  form: 'user'
})(UserForm)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactForm);
