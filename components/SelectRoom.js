import React, {Component} from 'react';
import HeaderRooms from './HeaderRooms';
import ModalNameChat from './ModalNameChat';
//import swal from 'sweetalert';
import CardRoom from './CardRoom';
import { connect } from 'react-redux';
import { listRooms, roomIn } from '../actions/roomActions';
import  Spinner  from './layout/Spinner';
import { compose } from 'redux'; 

class SelectRoom extends Component {

  state = {
    sw: [],
    nameRoom: '',
    modalShow: false,
    roomId: ''
  };


//  handlerClick = async (idx, roomId) => {
//    this.setState({
//      ... this.state,
//      nameRoom: this.state.rooms[idx].name,
//      modalShow: true,
//      roomId: roomId
//      });
//  }

  componentDidMount(){
    this.loadRooms();
  }


  loadRooms = async() =>{
    await this.props.listRooms();
    console.log('select room',this.props);
  }

  componentWillUnmount(){
		//let ref = this.db.collection('users');
		//ref.doc.update()
	//	console.log('room componentWillUnmount-------------------------')
	}

  handlerClick = async ( room ) => {


    await this.props.roomIn(room);
    console.log(this.props);
    this.props.history.push({
                              pathname:'/chat',
                            });
  }


  render() {
    
    if(this.props.rooms.length < 1){
      return (<Spinner/>);
    }
    let modalClose = () => this.setState( { modalShow: false } );
    const { rooms } = this.props;
    const { auth } = this.props;

    return (
      <div className="mx-3 ">       
        <HeaderRooms/>
        <div className="card-columns">
          { rooms.list.map( (room, idx) => (
            <CardRoom key={room} 
                      room={ room }
                      handlerClick = { this.handlerClick } 
                      />
          ))}
          {/*<ModalNameChat
                show = { this.state.modalShow }
                onHide = { modalClose }
                nameroom = { this.state.nameRoom }
                roomid = { this.state.roomId }
                saveregister = { this.saveRegister }
              />
              */}
        </div>
      </div>

    )    
  }

}

const mapStateToProps = state => ({
  rooms: state.roomsReducer.rooms,
  auth: state.authReducer.auth

})

export default connect( mapStateToProps,{ listRooms, roomIn })(SelectRoom);
//export default SelectRoom;