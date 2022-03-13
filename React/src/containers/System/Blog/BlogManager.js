import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './BlogManager.scss';
import {createNewBlogService,getAllBlogs,deleteBlogService,editBlogService} from '../../../services/blogService';
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
function uploadImageCallBack(file) {
    return new Promise(
      (resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'https://api.imgur.com/3/image');
        xhr.setRequestHeader('Authorization', 'Client-ID ##clientid##');
        const data = new FormData();
        data.append('image', file);
        xhr.send(data);
        xhr.addEventListener('load', () => {
          const response = JSON.parse(xhr.responseText);
          console.log(response)
          resolve(response);
        });
        xhr.addEventListener('error', () => {
          const error = JSON.parse(xhr.responseText);
          console.log(error)
          reject(error);
        });
      }
    );
  }
class BlogManager extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name:'',
            slug:'',
            linkimage: '',
            description:'',
            thumbnail:'',
            contentHTML:'',
            preImage:'',
            editorState: '',
            arrBlogs:[],

        }
        this.onEditorStateChange = this.onEditorStateChange.bind(this);

    }
    async componentDidMount() {
        await this.getAllBlogsFromReact();
    }
    getAllBlogsFromReact = async()=>{
        let response = await getAllBlogs('ALL');
        console.log('data blogs : ', response)
        if(response && response.errCode ===0){
            this.setState({
                arrBlogs: response.blogs
            })
        }
    }


    handleDeleteBlog = async (blog)=>{
        try{
            let res = await deleteBlogService(blog.id);
            if(res && res.errCode ===0){
                toast.success('Xóa blog thành công')
                await this.getAllBlogsFromReact();
            }else{
            toast.error('Xóa blog không thành công')
            alert(res.errMessage)
            }
        }catch(e){
            console.log(e)
        }
    }
    
    onEditorStateChange(editorState) {
        this.setState({
            editorState,
            contentHTML: draftToHtml(convertToRaw(editorState.getCurrentContent()))
        });
    };
                checkValidateInput=() =>{
                    let isValid = true;
                    let arrCheck = ['name','slug','description','linkimage', 'image','contentHTML']
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
                    })

                }
            handleOnchangeImage = async (event) =>{
                let data = event.target.files;
                let file = data[0];
                if(file){
                    let  base64 = await CommonUtils.getBase64(file);
                    let objectUrl = URL.createObjectURL(file)
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
                    toast.success('Thêm blog thành công')
                    this.setState({
                        name:'',
                        slug:'',
                        description:'',
                        thumbnail:'',
                        linkimage:'',
                        contentHTML:'',
                        preImage:'',
                        editorState: ''

                    })
                }
                else {
                    toast.error('Thêm blog không thàng công')

                }
            }
    render() {
        console.log('check: ', this.state)
        const { editorState } = this.state;
        const wrapperStyle = {
            border: '1px solid #969696',
        }
        const editorStyle = {
        }
        const arrBlogs =this.state.arrBlogs
        return (
            <div className="container">
             <MetaTags>
            <title> Blog của Trường </title>
            <meta name="description" content="Some description." />
            <meta property="og:title" content="MyApp" />
             </MetaTags>
              <div className="ms-title">Quản lý Blog </div>
               <div className="row" >
                    <div className="col-3" >
                    <label> Tiêu đề  </label>
                    <input className="form-control"  type="text"
                    value={this.state.name}
                    onChange= {(event)=>{this.onChangeInput(event,'name')}}
                    /> 
                    </div>
                    <div className="col-3" >
                    <label> Slug </label>
                    <input className="form-control"  type="text"
                    value={this.state.slug}
                    onChange= {(event)=>{this.onChangeInput(event,'slug')}}
                    /> 

             </div>
              <div className="col-3" >
                    <label> Description </label>
                    <input className="form-control"  type="text"
                    value={this.state.description}
                    onChange= {(event)=>{this.onChangeInput(event,'description')}}
                    /> 
              </div>
              <div className="col-3" >
                    <label> Link Image </label>
                    <input className="form-control"  type="text"
                    value={this.state.linkimage}
                    onChange= {(event)=>{this.onChangeInput(event,'linkimage')}}
                    /> 
              </div>
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
                    inline: { inDropdown: true },
                    list: { inDropdown: true },
                    textAlign: { inDropdown: true },
                    link: { inDropdown: true },
                    history: { inDropdown: true },
                    image: { uploadCallback: uploadImageCallBack, alt: { present: true, mandatory: true } },
                }}
                />
                <br/>
             <div className="col-12 btn-save"> 
             <button type="button" className="btn btn-danger" 
                onClick={()=> this.handleSaveNewBlog()
                
                }
             
             >Save</button>
             
             </div>
                  {this.state.isOpen === true &&
                   <Lightbox
                   mainSrc={this.state.preImage}
                  onCloseRequest={() => this.setState({ isOpen: false })}
   
     
                /> }
                <div className="user-table">
                <table className="table table-dark" id="customers">
                        <thead>
                            <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Tiêu đề</th>
                            <th scope="col">Slug</th>
                            <th scope="col">Mô tả </th>
                            <th scope="col">Thumbnail </th>
                            <th scope="col">Actions </th>
                            </tr>
                        </thead>
                        <tbody>
                                {arrBlogs && arrBlogs.map((item,index)=>{
                                    return(
                             <tr key={index}>
                               <td>{item.id}</td>
                               <td>{item.name}</td>
                               <td>{item.slug}</td>
                               <td>{item.description}</td>
                               <td>{item.linkimage}</td>
                               <td>
                                <button className="btn-edit"> <i className="fas fa-edit"></i> </button>
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
