import React, {useState} from "react";
import axios from "axios";

function Upload(){
const [file, setFile] = useState();
const [loader, setLoader] = useState(false)

const updateFile = e => {
    setFile(e.target.files[0])
}

const checkLogs =async e =>{
    e.preventDefault();
    setLoader(true)
    const url = '/log/check';
    const formData = new FormData();
    formData.append('file', file);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
        'Access-Control-Allow-Origin': '*'
      },
    };
    
    await axios.post(url, formData, config).then((response) => {
        setLoader(false)
        const link = document.createElement("a");
        link.target = "_blank";
        link.download = "logparser"
        link.href = URL.createObjectURL(
            new Blob([JSON.stringify(response.data.result)], { type: "application/json" })
          );
          link.click();
    }).catch(error=>{
        setLoader(false)
        alert(error.response.data)
        
    })
}

  return(
    <div>
        <h1>Log Parser</h1>
        <div className="container">
            <form className="container" onSubmit={checkLogs}>
                <div className="mb-3">
                <input className="form-control" type="file" id="formFile" onChange={updateFile}/>
                </div>
                {loader? (
                    <div className="spinner-border" role="status">
                        <span className="sr-only"></span>
                    </div>
                ) :(
                    <button className="btn btn-primary">Upload</button>
                )}
          
             </form>
        </div>

    </div>
  )
}


export default Upload;