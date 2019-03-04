import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Container, Header, List, Button, Card } from 'semantic-ui-react';

import UserForm from './user-form';
import { createList, getUser, deleteUser } from '../actions';


import "semantic-ui-css/semantic.min.css";

class UsersList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      users: [],
      showModal: false,
      user: null
    }
    this.filterList = this.filterList.bind(this);
  }
  componentDidMount() {
    this.props.createList()
      .then(() => {
        this.setState({
          users: this.props.reducerApp.users
        })
      });
  }
  filterList(e) {
    this.setState({
      users: this.props.reducerApp.users.filter(a => a.name.toLowerCase().startsWith(e.toLowerCase()))
    })
  }
  editUser(user) {
    this.props.getUser(user.id).then(
      this.setState({
        showModal: true, user
      })
    )
  }
  createList(user, i) {
    return (
      <Card key={i}>
        <Card.Content>
          <Card.Header>{user.name}</Card.Header>
          <Card.Meta>{user.username}</Card.Meta>
          <Card.Description>
            <strong>Email</strong>: {user.email}
            <br />
            <strong>City</strong>: {user.address.city}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <div>
            <Button
              primary
              onClick={() => this.editUser(user)}>
              Edit
            </Button>
            <Button secondary>
              Delete
            </Button>
          </div>
        </Card.Content>
      </Card>
    )
  }
  render() {
    return (
      <Container style={{ margin: 20 }}>

        <Header as="h3">Users List</Header>
        <Button.Group floated='right'>
          <Button
            primary
            onClick={() => this.setState({ showModal: true })}>
            Create
            </Button>
        </Button.Group>
        <List>
          <List.Item>
            <div className="ui left icon input">
              <input
                type="text"
                placeholder="Search users..."
                onChange={e => this.filterList(e.target.value)} />
              <i className="users icon"></i>
            </div>
          </List.Item>
        </List>
        <Card.Group>
          {this.state.users.map((e, i) => this.createList(e, i))}
        </Card.Group>
        {this.state.showModal &&
          <UserForm user={this.state.user} close={() => this.setState({ showModal: false, user: null })} />
        }
      </Container>
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
    createList,
    getUser,
    deleteUser
  }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(UsersList)