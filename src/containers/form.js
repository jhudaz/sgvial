import React, { Component } from 'react'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      modalOpen: false 
    }
  }
  componentDidMount(){
    this.setState({ modalOpen: true })
  }

  handleClose = () => this.setState({ modalOpen: false })

  render() {
    return (
      <div>
      {/* <Button onClick={this.setState({modalOpen:true})}>Modal</Button> */}
      <Modal
        open={this.state.modalOpen}
        onClose={this.handleClose}
        basic
        size='small'
      >
        <Header icon='browser' content='Cookies policy' />
        <Modal.Content>
          <h3>This website uses cookies to ensure the best user experience.</h3>
        </Modal.Content>
        <Modal.Actions>
          <Button color='green' onClick={this.handleClose} inverted>
            <Icon name='checkmark' /> Got it
          </Button>
        </Modal.Actions>
      </Modal>
      </div>
    )
  }
}
export default Form;