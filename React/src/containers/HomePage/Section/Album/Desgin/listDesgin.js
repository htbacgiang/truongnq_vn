import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import '../../Album/ListHT.scss';
import DesginImage from './DesginImage';

function ListAlbum() {
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  return (

    <div>
        <div className="list-album">
     
        </div>
      

      <div className="content-tabs">
        <div
          className={toggleState === 1 ? "content  active-content" : "content"}>
            <div className="container"> 
            </div> <hr />
          <DesginImage />
        </div>
  

       

        
      </div>
    </div>
  );
}

export default ListAlbum;