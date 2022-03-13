import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Video.scss';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import iconYoutube from '../../../assets/youtube/youtube.svg';
import ntHadong from '../../../assets/thumlbnail/8nambsa.jpg';
import Animation from '../../../assets/thumlbnail/aninimation.jpg';
import bsaTivi from '../../../assets/thumlbnail/bsatv3.jpg';
import chieuBong from '../../../assets/thumlbnail/chieubong.jpg';
import Fansipan from '../../../assets/thumlbnail/fansipan.jpg';
import khucgiangmua from '../../../assets/thumlbnail/khucgiangmua.jpg';
import Mvlaco from '../../../assets/thumlbnail/la-co.jpg';
import lhnt from '../../../assets/thumlbnail/lhntbtt.jpg';
import Maitruong from '../../../assets/thumlbnail/maitruong.jpg';
import MvNTHD from '../../../assets/thumlbnail/mvbsant.jpg';
import phimnganbtt from '../../../assets/thumlbnail/phimnganbtt.jpg';
import phimngannthd from '../../../assets/thumlbnail/phimngannthd.jpg';
import quehuongvn from '../../../assets/thumlbnail/quehuongvn.jpg';
import rainbow from '../../../assets/thumlbnail/rainbow.webp';
import hatayquelua from '../../../assets/thumlbnail/hatayquelua.jpg';


import $ from 'jquery';

class Video extends Component {
    componentDidMount(){
        $(document).ready(function () {
            $(".item").click(function () {
                let youtube_id = $(this).children("img").attr("data-id");
                // $(this).children(".youtube_icon")
                //     .addClass("active").parent()
                //     .siblings()
                //     .children(".youtube_icon")
                //     .removeClass("active")

                let newUrl = `https://www.youtube.com/embed/${youtube_id}`;
                $("#video_id").attr("src", newUrl);

            })
            //due to slow connection video is playing slow
            // you can call your playlist using youtube api
        })
      }
    render() {
        let settings = {
          dots: false,
          infinite: true,
          speed: 500,
          slidesToShow: 5,
          slidesToScroll: 1,
          initialSlide: 0,
          responsive: [
            {
              breakpoint: 1020,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                infinite: true,
                dots: false
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 2,
                initialSlide: 2,
                dots: false

              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                dots: false

              }
            }
          ]
            
          };
         
        return (
            <div className="youtube"> 
                <div className="main-video"> 
                <div className="youtube_video">
                  <iframe width="1080px" height="720px" id="video_id" src="https://www.youtube.com/embed/z0EXWNIaAYg?rel=0"
                frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen></iframe>
                     </div>

                </div>
                 <div className="section"> 
                 <Slider {...settings}>
                        <div className="gallery">
                        <div className="item">
                            <img src={Mvlaco} data-id="z0EXWNIaAYg?rel=0"/>
                            <div className="youtube_icon ">
                                <img src={iconYoutube}/>
                              </div>
                             </div>
                             </div>

                        <div className="gallery">
                        <div className="item">
                            <img src={Fansipan}  data-id="OfBf2RHf8Nk?rel=0"/>
                            <div className="youtube_icon">
                                <img src={iconYoutube}/>
                              </div>
                             </div>
                             </div>
                        <div className="gallery">
                        <div className="item">
                            <img src={ntHadong} data-id="V2dayBKIadk?rel=0"/>
                            <div className="youtube_icon">
                                <img src={iconYoutube}/>
                              </div>
                             </div>
                             </div>

                        <div className="gallery">
                        <div className="item">
                            <img src={phimnganbtt} data-id="lWWHioQOxUE?rel=0"/>
                            <div className="youtube_icon">
                                <img src={iconYoutube}/>
                              </div>
                             </div>
                           </div>

                        <div className="gallery">
                        <div className="item">
                            <img src={lhnt} data-id="6U_Ed-m9DTI?rel=0"/>
                            <div className="youtube_icon">
                                <img src={iconYoutube}/>
                              </div>
                             </div>
                             </div>
                             <div className="gallery">
                        <div className="item">
                            <img src={rainbow} data-id="SDivvPkM4SQ?rel=0"/>
                            <div className="youtube_icon">
                                <img src={iconYoutube}/>
                              </div>
                             </div>
                             </div>
                        <div className="gallery">
                        <div className="item">
                            <img src={chieuBong} data-id="wVU_8gS4sr4?rel=0"/>
                            <div className="youtube_icon">
                                <img src={iconYoutube}/>
                              </div>
                             </div>
                             </div>
                             <div className="gallery">
                        <div className="item">
                        <img src={khucgiangmua} data-id="Y2BdNo1MbXU?rel=0"/>
                            <div className="youtube_icon">
                                <img src={iconYoutube}/>
                              </div>
                             </div>
                             </div>


                             <div className="gallery">
                        <div className="item">
                            <img src={Animation} data-id="aX7v3Y45CgU?rel=0"/>
                            <div className="youtube_icon">
                                <img src={iconYoutube}/>
                              </div>
                             </div>
                             </div>
                             <div className="gallery">
                        <div className="item">
                            <img src={bsaTivi} data-id="-keJ6qfBZSQ?rel=0"/>
                            <div className="youtube_icon">
                                <img src={iconYoutube}/>
                              </div>
                             </div>
                             </div>
                             <div className="gallery">
                        <div className="item">
                            <img src={Maitruong} data-id="N4j-gFXCEpk?rel=0"/>
                            <div className="youtube_icon">
                                <img src={iconYoutube}/>
                              </div>
                             </div>
                             </div>
                             <div className="gallery">
                        <div className="item">
                            <img src={phimngannthd} data-id="_d47RmG3zXQ?rel=0"/>
                            <div className="youtube_icon">
                                <img src={iconYoutube}/>
                              </div>
                             </div>
                             </div>
                             <div className="gallery">
                        <div className="item">
                            <img src={quehuongvn} data-id="zL0Ro-zflK8?rel=0"/>
                            <div className="youtube_icon">
                                <img src={iconYoutube}/>
                              </div>
                             </div>
                             </div>
                             <div className="gallery">
                        <div className="item">
                            <img src={hatayquelua} data-id="PJT-tzs_Bq8?rel=0"/>
                            <div className="youtube_icon">
                                <img src={iconYoutube}/>
                              </div>
                             </div>
                             </div>         
                        </Slider>
                </div>
             </div>
        );
}
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Video);
