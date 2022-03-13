import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import '../../Album/ListHT.scss';
import Truong from "./Truong";
import DiHanh from "./diHanh";
import MeiMei from "./MeiMei";
import CHoa from "./CHoa";
import TaoMeo from "./TaoMeo";
import LinhBlue from "./LinhBLue";
import HungBlue from "./HungBlue";
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
          onClick={() => toggleTab(1)}> Trường & Friend</Button>

        <Button variant="outline-info"
          className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(2)}> Hưng Jue </Button>
        <Button variant="outline-success"
          className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(3)}> Chị Hoa</Button>
        <Button variant="outline-danger"
          className={toggleState === 4 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(4)}> Mai Trương</Button>  
        <Button variant="outline-dark"
          className={toggleState === 5 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(5)}> Táo Mèo</Button>  
        <Button variant="outline-warning"
          className={toggleState === 6 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(6)}> Cô Linh</Button> 
          <Button variant="outline-secondary"
          className={toggleState === 7 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(7)}> Dì Hạnh</Button>   

        </div>
      

      <div className="content-tabs">
        <div
          className={toggleState === 1 ? "content  active-content" : "content"}>
            <div className="container"> 
            <h2>Trường & Friends</h2>
            </div> <hr />
        <Truong />
        </div>
        <div
          className={toggleState === 2 ? "content  active-content" : "content"}>
            <div className="container"> 
            <h2>Hưng Jue - Phạm Quốc Hưng </h2>
            </div> <hr />
            <HungBlue />
        </div>
        <div
          className={toggleState === 3 ? "content  active-content" : "content"}>
            <div className="container"> 
            <h2>Chị Hoa xinh gái</h2>
            </div> <hr />
            <CHoa />
        </div>
        <div
          className={toggleState === 4 ? "content  active-content" : "content"}>
            <div className="container"> 
            <h2>Hoa khôi Đại học Hà Nội</h2>
            </div> <hr />
            <MeiMei />
        </div>
        <div
          className={toggleState === 5 ? "content  active-content" : "content"}>
            <div className="container"> 
            <h2>Táo Mèo</h2>
            </div> <hr />
            <TaoMeo/>
        </div>
        <div
          className={toggleState === 6 ? "content  active-content" : "content"}>
            <div className="container"> 
            <h2>Cô giáo màu xanh</h2>
            </div> <hr />
            <LinhBlue />
        </div>
        <div
          className={toggleState === 7 ? "content  active-content" : "content"}>
            <div className="container"> 
            <h2>Dì Hạnh - Cao Phương Hạnh</h2>
            </div> <hr />
            <DiHanh />
        </div>
       

        
      </div>
    </div>
  );
}

export default ListAlbum;