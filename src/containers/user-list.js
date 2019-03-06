import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Container, Header, List, Button, Card } from 'semantic-ui-react';

import UserForm from './user-form';
import { createList, deleteUser } from '../actions';

import "semantic-ui-css/semantic.min.css";

class UsersList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      users: [],
      showModal: false,
      user: null
    }
    this.closeModal = this.closeModal.bind(this);
    this.filterList = this.filterList.bind(this);
  }
  componentDidMount() {
    this.props.createList().then(() => {
      this.setState({ users: this.props.reducerApp.users })
    })
  }
  deleteUser(userId) {
    this.props.deleteUser(userId).then(() => {
      this.setState({ users: this.props.reducerApp.users });
    })
  }
  filterList(e) {
    this.setState({
      users: this.props.reducerApp.users.filter(a => a.name.toLowerCase().startsWith(e.toLowerCase()))
    })
  }
  editUser(user) {
    this.setState({
      showModal: true,
      user
    })
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
            <Button
              secondary
              onClick={() => this.deleteUser(user.id)}>
              Delete
            </Button>
          </div>
        </Card.Content>
      </Card>
    )
  }
  closeModal() {
    this.setState({
      showModal: false,
      user: null,
      users: this.props.reducerApp.users
    })
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
          {this.state.users.map((user, i) => this.createList(user, i))}
        </Card.Group>
        {this.state.showModal &&
          <UserForm user={this.state.user} close={this.closeModal} />
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
    deleteUser
  }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(UsersList)
