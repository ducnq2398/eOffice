import React, { useState } from 'react';
import { Viewer} from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';


function PreviewLocalFile(){
    const [url, setUrl] = useState('');

    function onChange(e){
        const file = e.target.files;
        const reader = new FileReader()
        reader.readAsDataURL(file[0]);
        reader.onload = (e) =>{
            console.log("data", e.target.result)
        } 
    };
    console.log(url)
    return (
        <div>
            <input type="file" accept=".pdf" onChange={onChange} />

            {/* <div className="mt4" style={{ height: '750px' }}>
                {
                    url
                        ? (
                            <div
                                style={{
                                    border: '1px solid rgba(0, 0, 0, 0.3)',
                                    height: '100%',
                                }}
                            >
                                <Viewer fileUrl={url} />
                            </div>
                        )
                        : (
                            <div
                                style={{
                                    alignItems: 'center',
                                    border: '2px dashed rgba(0, 0, 0, .3)',
                                    display: 'flex',
                                    fontSize: '2rem',
                                    height: '100%',
                                    justifyContent: 'center',
                                    width: '100%',
                                }}
                            >
                                Preview area
                            </div>
                        )
                }
            </div> */}
        </div>
    );
};

export default PreviewLocalFile;
