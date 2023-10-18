import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { CKEditor } from '@ckeditor/ckeditor5-react'

import React, { useEffect, useState } from 'react'

const WriteArticleComponent = () => {
 
    const [data, setData]= useState("")  
    const handleChange = (e, editor) => {setData(editor.getData())}


    return (
    <div>
        <CKEditor editor={ClassicEditor}
        onChange={(e, editor) => {handleChange(e, editor)}}
        
        ></CKEditor>
        <p>{data}</p>
    </div>
  )
}

export default WriteArticleComponent