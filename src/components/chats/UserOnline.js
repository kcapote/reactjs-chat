import React, {Fragment} from 'react';

const UserOnline = ({user, handlerClick }) => {    

    return (
      <Fragment>
        <img  className="rounded" alt='' />
        <li onDoubleClick={ () => handlerClick( user ) }
            className="list-group-item puntero">{`${user.firstName} ${user.lastName}`}</li>
      </Fragment>    
    )
}



export default UserOnline;

