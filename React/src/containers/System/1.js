import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import { getBlogs,createNewBlogService,deleteBlogService,editBlogService} from '../../services/blogService';
import ModalBlog from './ModalBlog';
import ModalEditBlog from './ModalEditBlog';
import { emitter } from '../../utils/emitter';
import MetaTags from 'react-meta-tags';
import {CRUD_ACTION, CommonUtils} from '../../utils';
import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app
import Lightbox from 'react-image-lightbox';
import {toast} from "react-toastify";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKFinder } from "@ckeditor/ckeditor5-ckfinder";
import Base64UploadAdapter from '@ckeditor/ckeditor5-upload/src/base64uploadadapter';
import $ from 'jquery';

class BlogManager extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrBlogs:[],
            isOpenModalBlog:false,
            isOpenModalEditBlog:false,
            blogEdit:{},
            thumbnail:'',
            isOpen:false,

        }
    }
    async componentDidMount() {
        await this.getAllBlogsFromReact();
    }
    getAllBlogsFromReact = async()=>{
        let response = await getBlogs('ALL');
        console.log('data', response)
        if(response && response.errCode ===0){
            this.setState({
                arrBlogs: response.blogs
            })
        }
    }
    handleAddNewBlog = ()=>{
        this.setState({
            isOpenModalBlog:true,
        })
    }
    toggleBlogModel=()=>{
        this.setState({
            isOpenModalBlog: !this.state.isOpenModalBlog,
        })
    }
    toggleEditBlogModel=()=>{
        this.setState({
            isOpenModalEditBlog: !this.state.isOpenModalEditBlog,
        })
} 
    createNewBlog = async (data)=>{
        try{
        let response = await  createNewBlogService(data);
        if(response && response.errCode !==0){
            alert(response.errMessage)
        }else{
            await this.getAllBlogsFromReact()
            this.setState({
                isOpenModalBlog: false
            })
            emitter.emit('EVENT_CLEAR_MODAL')
        }
        }catch(e){
            console.log(e)
        }
    }
    handleDeleteBlog = async (blog)=>{
        try{
            let res = await deleteBlogService(blog.id);
            if(res && res.errCode ===0){
                await this.getAllBlogsFromReact();
            }else{
            alert(res.errMessage)

            }
        }catch(e){
            console.log(e)
        }
    }
    handleEditBlog = async (blog)=>{
        console.log('Edit', blog)
        this.setState({
            isOpenModalEditblog: true,
            blogEdit: blog
        })
    }
    doEditBlog = async (blog) => {
    try{
        let res = await editBlogService(blog);
        if(res && res.errCode === 0){
            this.setState({
            isOpenModalEditblog: false
            })
            await this.getAllBlogsFromReact()
        }else{
            alert(res.errCode)
        }
    }catch(e){
        console.log(e)
    }
}
                checkValidateInput=() =>{
                    let isValid = true;
                    let arrCheck = ['title','slug','description','image']
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

                handleSaveNewBlog= async()=>{
                let res = await createNewBlogService(this.state)
                if(res && res.errCode ===0){
                    toast.success('Thêm video thành công')
                    this.setState({
                        title:'',
                        slug:'',
                        description:'',
                        thumbnail:'',
                    })

                }
                else {
                    toast.error('Thêm video không thàng công')
                    console.log('add video', res)

                }
                }
                onEditorStateChange = (editorState) => {
                    this.setState({
                      editorState,
                    });
                  };

                  uploadCallback(file) {
                    var formData = new FormData();
                    formData.append('file', file);
                
                    return Promise.resolve($.ajax({
                      url: '/api/v1/images',
                      type: 'POST',
                      data: formData,
                      cache: false,
                      contentType: false,
                      processData: false,
                    }));
                  }
    render() {
        let arrBlogs =this.state.arrBlogs;
        return (
            <div className="container">
                       <MetaTags>
            <title> Blog của Trường </title>
            <meta name="description" content="Some description." />
            <meta property="og:title" content="MyApp" />
            <meta property="og:image" content="path/to/image.jpg" />
            
             </MetaTags>
       
                <div className="title text-center">BLOG TABLE</div>
                <div> 
                <div className="row" >
                    <div className="col-3" >
                    <label> Title  </label>
                    <input className="form-control"  type="text"
                    value={this.state.nameVideo}
                    onChange= {(event)=>{this.onChangeInput(event,'nameVideo')}}
                    /> 

                    </div>
                    <div className="col-3" >
                    <label> Slug </label>
                    <input className="form-control"  type="text"
                    value={this.state.youtubeId}
                    onChange= {(event)=>{this.onChangeInput(event,'youtubeId')}}
                    /> 

                    </div>

                    <span className="col-3" >
                    <label> Disciption </label>
                    <input className="form-control"  type="text"
                    value={this.state.youtubeId}
                    onChange= {(event)=>{this.onChangeInput(event,'youtubeId')}}
                    /> 

                  </span>
                  <div className="col-3" >
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
                    {this.state.isOpen === true &&
                   <Lightbox
                   mainSrc={this.state.preImage}
                  onCloseRequest={() => this.setState({ isOpen: false })}
   
     
                /> }
                </div>
               
                <CKEditor
                    editor={ ClassicEditor }
                    data="<p>Hello from CKEditor 5!</p>"
                    onInit={ editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log( 'Editor is ready to use!', editor );
                    } }
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        console.log( { event, editor, data } );
                    } }
                    onBlur={ editor => {
                        console.log( 'Blur.', editor );
                    } }
                    onFocus={ editor => {
                        console.log( 'Focus.', editor );
                    } }
                />
            <div className="col-12 btn-save"> 
                        <button type="button" class="btn btn-danger" 
                            onClick={()=> this.handleSaveNewBlog()
                            
                            }
                        
                        >Save</button>
                        </div>
                </div>
                
                <div className="user-table">
                <table className="table table-dark" id="customers">
                        <thead>
                            <tr>
                            <th scope="col">Id</th>
                            <th scope="col"> Title</th>
                            <th scope="col"> Slug</th>
                            <th scope="col"> Mô tả</th>
                            <th scope="col"> Actions</th>

                            
                            </tr>
                        </thead>
                        <tbody>
                                {arrBlogs && arrBlogs.map((item,index)=>{
                                    return(
                             <tr key={index}>
                               <td>{item.id}</td>
                               <td>{item.title}</td>
                               <td>{item.slug}</td>
                               <td>{item.description}</td>

                               



                            <td>
                                <button className="btn-edit" onClick={()=> this.handleEditBlog(item)}> <i className="fas fa-edit"></i> </button>
                                <button className="btn-delete" onClick={()=> this.handleDeleteBlog(item)}> <i className="fas fa-trash"></i> </button>

                            </td> 
                            </tr>

                                )
                                })
                                }
                        
                       
                        
                        </tbody>
                        </table>
                </div>


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

export default connect(mapStateToProps, mapDispatchToProps)(BlogManager);
