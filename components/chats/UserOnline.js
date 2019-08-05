import React, {Fragment} from 'react';

const UserOnline = ({user, handlerClick }) => {    

    return (
      <Fragment>
        <img  className="rounded" />
        <li onDoubleClick={ () => handlerClick( user ) }
            class="list-group-item puntero">{user.name}</li>
      </Fragment>    
    )

}

export default UserOnline;

