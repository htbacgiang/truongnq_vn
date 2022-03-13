import React, { useState } from 'react';
// Components
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';


// Hooks version of the Class below (done by me)
const WYSIWYGEditor = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const onEditorStateChange = editorState => {
    return setEditorState(editorState)
  } 

  return (
    <div className="editor">
      <Editor 
        editorState={editorState} 
        wrapperClassName="demo-wrapper"
        editorClassName="demo-editor"
        onEditorStateChange={onEditorStateChange}
      />
      {
        console.log('editorState => ', draftToHtml(convertToRaw(editorState.getCurrentContent())))
      }
    </div>
  )
}

export default WYSIWYGEditor
