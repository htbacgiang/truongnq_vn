import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import '../../Album/ListHT.scss';
import Bus06Slide from './Bus06Slide';
import BusHNSlide from './BusHNSlide';


function ListAlbum() {
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  return (

    <div>
        <div className="list-album">
        <Button variant="outline-primary"
          className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(1)}> Thợ săn ảnh xe bus 06</Button>
        <Button variant="outline-success"
          className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(2)}> Bus Hà Nội</Button>

        </div>
      

      <div className="content-tabs">
        <div
          className={toggleState === 1 ? "content  active-content" : "content"}>
            <div className="container"> 
            <h2>Thợ săn ảnh xe bus 06</h2>
            </div> <hr />
        <Bus06Slide />
        </div>
        <div
          className={toggleState === 2 ? "content  active-content" : "content"}>
            <div className="container"> 
            <h2>Xe bus Hà Nội</h2>
            </div> <hr />
            <BusHNSlide />
        </div>
     
       

        
      </div>
    </div>
  );
}

export default ListAlbum;