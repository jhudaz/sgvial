import React, { Component } from 'react'
import { Button, Form, Segment } from 'semantic-ui-react'

import "semantic-ui-css/semantic.min.css";

class UserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <Segment inverted>
        <Form inverted>
          <Form.Group widths='equal'>
            <Form.Input fluid label='Full name' placeholder='First name' />
            <Form.Input fluid label='User name' placeholder='Last name' />
            <Form.Input fluid label='Email' placeholder='Email' />
            <Form.Input fluid label='City' placeholder='City' />
          </Form.Group>
          <Button.Group>
            <Button>Cancel</Button>
            <Button.Or />
            <Button positive>Save</Button>
          </Button.Group>
        </Form>
      </Segment>
    )
  }
}
export default UserForm;