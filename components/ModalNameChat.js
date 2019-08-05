import React, {  Component } from 'react';
import { Modal, Button } from 'react-bootstrap';

export default class ModalNameChat extends Component {

  state = {
    name: '',
    roomId: ''
  }


  onChange = e => {
     this.setState({
      ... this.state,      
      [e.target.name] : e.target.value
    })
  }
  
  saveRegister = () =>{
    this.props.saveregister(this.props.roomid, this.state.name);  
  }
 
  render() {
    
    let { nameroom } = this.props; 
    let { roomid } = this.props;
    
    return (
      <Modal animation={false}
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered = "true"
      >
        <Modal.Header className="modalHeader">
          <Modal.Title id="contained-modal-title-vcenter">
            { nameroom }
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="modalBody">
          <h6> Escriba su alias: </h6>
          <input name="name" onChange={this.onChange} className="form-control" />
        </Modal.Body>
        <Modal.Footer className="modalFooter">
          <Button className="btn btn-primary" onClick={this.saveRegister}>Entrar</Button>
          <Button className="btn btn-danger" onClick={this.props.onHide}>Cancelar</Button>
        </Modal.Footer>   
      </Modal>
    );
  }



  
}