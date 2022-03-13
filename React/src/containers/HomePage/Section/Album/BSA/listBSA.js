import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import '../../Album/ListHT.scss';
import BTTSlide from './BTTSlide';
import NTSlide from './NTSlide';
import BSASlide from './BSASlide';

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
          onClick={() => toggleTab(1)}> Nguyễn Trãi Hà Đông</Button>
        <Button variant="outline-success"
          className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(2)}> Bật Tanh Tách</Button>
        <Button variant="outline-danger"
          className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(3)}> BSA </Button>
        </div>

      <div className="content-tabs">
        <div
          className={toggleState === 1 ? "content  active-content" : "content"}>
            <div className="container"> 
            <h2>Nguyễn Trãi - Hà Đông</h2>
            </div> <hr />
        <BTTSlide />
        </div>
        <div
          className={toggleState === 2 ? "content  active-content" : "content"}>
            <div className="container"> 
            <h2>Bật Tanh Tách</h2>
            </div> <hr />
            <NTSlide />
        </div>
        <div
          className={toggleState === 3 ? "content  active-content" : "content"}>
            <div className="container"> 
            <h2>BSA - Hội sinh viên Bắc Giang tại Hà Nội</h2>
            </div> <hr />
            <BSASlide />
        </div>
     
      </div>
    </div>
  );
}

export default ListAlbum;