import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './VideoManager.scss';
import {createNewVideoService,} from '../../../services/videoService';
import { emitter } from '../../../utils/emitter';
import MetaTags from 'react-meta-tags';
import {CRUD_ACTION, CommonUtils} from '../../../utils';
import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app
import Lightbox from 'react-image-lightbox';
import {toast} from "react-toastify";
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import htmlToDraft from 'html-to-draftjs';
class VideoManager extends Component {

    constructor(props) {
        super(props);
        this.state = {
            youtubeId:'',
            nameVideo:'',
            thumbnail:'',
            contentHTML:'',
            isOpen:false,
        }
        this.onEditorStateChange = this.onEditorStateChange.bind(this);

    }
    async componentDidMount() {
        // await this.getAllBlogsFromReact();
    }
    
    onEditorStateChange(editorState) {
        this.setState({
            editorState,
            contentHTML: draftToHtml(convertToRaw(editorState.getCurrentContent()))
        });
    };
//     getAllBlogsFromReact = async()=>{
//         let response = await getBlogs('ALL');
//         console.log('data', response)
//         if(response && response.errCode ===0){
//             this.setState({
//                 arrBlogs: response.blogs
//             })
//         }
//     }
//     handleAddNewBlog = ()=>{
//         this.setState({
//             isOpenModalBlog:true,
//         })
//     }
//     toggleBlogModel=()=>{
//         this.setState({
//             isOpenModalBlog: !this.state.isOpenModalBlog,
//         })
//     }
//     toggleEditBlogModel=()=>{
//         this.setState({
//             isOpenModalEditBlog: !this.state.isOpenModalEditBlog,
//         })
// } 
//     createNewBlog = async (data)=>{
//         try{
//         let response = await  createNewBlogService(data);
//         if(response && response.errCode !==0){
//             alert(response.errMessage)
//         }else{
//             await this.getAllBlogsFromReact()
//             this.setState({
//                 isOpenModalBlog: false
//             })
//             emitter.emit('EVENT_CLEAR_MODAL')
//         }
//         }catch(e){
//             console.log(e)
//         }
//     }
//     handleDeleteBlog = async (blog)=>{
//         try{
//             let res = await deleteBlogService(blog.id);
//             if(res && res.errCode ===0){
//                 await this.getAllBlogsFromReact();
//             }else{
//             alert(res.errMessage)

//             }
//         }catch(e){
//             console.log(e)
//         }
//     }
//     handleEditBlog = async (blog)=>{
//         console.log('Edit', blog)
//         this.setState({
//             isOpenModalEditblog: true,
//             blogEdit: blog
//         })
//     }
//     doEditBlog = async (blog) => {
//     try{
//         let res = await editBlogService(blog);
//         if(res && res.errCode === 0){
//             this.setState({
//             isOpenModalEditblog: false
//             })
//             await this.getAllBlogsFromReact()
//         }else{
//             alert(res.errCode)
//         }
//     }catch(e){
//         console.log(e)
//     }
// }
                checkValidateInput=() =>{
                    let isValid = true;
                    let arrCheck = ['nameVideo','youtubeId','image']
                    for (let i=0; i < arrCheck.length; i++){
                        if(!this.state[arrCheck[i]]){
                            isValid=false;
                            alert('Nhập thiếu '+ arrCheck[i])
                            break;
                        }
                    
                    }  return{
                        isValid
                    }
                }
                onChangeInput =(event,id)=>{
                    let copyState = { ...this.state}
                    copyState[id]=event.target.value
                    this.setState({
                        ...copyState
                    },()=>{
                        console.log('truongnq',this.state)
                    })

                }
            handleOnchangeImage = async (event) =>{
                let data = event.target.files;
                let file = data[0];
                if(file){
                    let  base64 = await CommonUtils.getBase64(file);
                    console.log('img',base64)
                    let objectUrl = URL.createObjectURL(file)
                console.log('1', objectUrl)
                this.setState({
                    preImage: objectUrl,
                    thumbnail:base64
                })
                }
            }
            openReviewImage= () =>{
                if(!this.state.preImage) return;
                this.setState({
                    isOpen:true
                })
            }

            handleSaveNewVideo= async()=>{
                let res = await createNewVideoService(this.state)
                if(res && res.errCode ===0){
                    toast.success('Thêm video thành công')
                    this.setState({
                        youtubeId:'',
                        nameVideo:'',
                        thumbnail:'',
                    })

                }
                else {
                    toast.error('Thêm video không thàng công')
                    console.log('add video', res)

                }
            }
    render() {
        const { editorState } = this.state;
        const wrapperStyle = {
            border: '1px solid #969696',
        }
        const editorStyle = {
            height:'10rem',
            padding:'1rem'
        }
        return (
            <div className="container">
             <MetaTags>
            <title> Video của Trường </title>
            <meta name="description" content="Some description." />
            <meta property="og:title" content="MyApp" />
            <meta property="og:image" content="path/to/image.jpg" />
            
             </MetaTags>
              <div className="ms-title">Quản lý video </div>
               <div className="row" >
                    <div className="col-3" >
                    <label> Tên Video  </label>
                    <input className="form-control"  type="text"
                    value={this.state.nameVideo}
                    onChange= {(event)=>{this.onChangeInput(event,'nameVideo')}}
                    /> 

                    </div>
                    <div className="col-3" >
                    <label> Id Youtube </label>
                    <input className="form-control"  type="text"
                    value={this.state.youtubeId}
                    onChange= {(event)=>{this.onChangeInput(event,'youtubeId')}}
                    /> 

             </div>
             <div className="col-4" >
                    <div> Thumb Nail </div>

                            <div className="preImg-container">
                            <input id="preImg" type="file" hidden
                            onChange={(event) => this.handleOnchangeImage(event)}
                            
                            />  
                             <label  className="labal-upload" htmlFor="preImg"> Tải ảnh <i class="fas fa-cloud-upload-alt"></i></label>
                               <div className="preview-image"
                               style={{backgroundImage:`url(${this.state.preImage})`}}
                               onClick={()=>this.openReviewImage()}
                               > 

                                  </div>      
                            </div>   
                    </div>
             </div>
             <Editor
                editorState={editorState}
                wrapperClassName="demo-wrapper"
                editorClassName="demo-editor"
                wrapperStyle={wrapperStyle}
                editorStyle={editorStyle}
                onEditorStateChange={this.onEditorStateChange}
                value={this.state.contentHTML}
                toolbar={{
                    image: {
                         urlEnabled: true,
                         uploadCallback: this.uploadCallback,
                         alt: {
                                present: true,
                                mandatory: true
                              }
                    }
                }}
                />
             <div className="col-12 btn-save"> 
             <button type="button" class="btn btn-danger" 
                onClick={()=> this.handleSaveNewVideo()
                
                }
             
             >Save</button>
             
             </div>
                  {this.state.isOpen === true &&
                   <Lightbox
                   mainSrc={this.state.preImage}
                  onCloseRequest={() => this.setState({ isOpen: false })}
   
     
                /> }
             </div>

        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(VideoManager);
