import { useState } from "react";
import {Document, Page, pdfjs} from 'react-pdf';
import { Button } from "reactstrap";
import next from '../../images/next.png';
import back from '../../images/back.png';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function PDF({pdf}){
    const [numPages, setNumPages] = useState('');
    const [pageNumber, setPageNumber] = useState(1);
    function onDocumentLoadSuccess({numPages}){
        setNumPages(numPages);
        setPageNumber(1);
    }

    function changPage(offset){
        setPageNumber(prev => prev +offset);
    }
    function previousPage() {
        changPage(-1);
    }
    
    function nextPage() {
        changPage(1);
    }
    
    return(
        <div>
            <Document 
                file={pdf}
                onLoadSuccess={onDocumentLoadSuccess}
            >
            <Page pageNumber={pageNumber} />
            </Document>
            <div>
                <p hidden={pageNumber===0} style={{fontWeight:'bold'}}>
                    Page {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
                </p>
                <Button hidden={pageNumber===0} type="button" color="link"  disabled={pageNumber <= 1} onClick={previousPage}>
                    <img src={back} alt="back" width="15px" height="15px"/>
                </Button> {' '}
                <Button
                hidden={pageNumber===0}
                type="button" color="link"
                disabled={pageNumber >= numPages}
                onClick={nextPage}
                >
                <img src={next} width="15px" height="15px" alt="next"/>
                </Button>
            </div>
        </div>
    );
}
export default PDF;