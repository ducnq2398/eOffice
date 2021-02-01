import { useState } from "react";
import {Document, Page, pdfjs} from 'react-pdf';
import { Button } from "reactstrap";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function PDF(props){
    const [numPages, setNumPages] = useState('');
    const [pageNumber, setPageNumber] = useState(0);
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
    
    const {pdf} = props;
    return(
        <div>
            <Document 
                file={pdf}
                onLoadSuccess={onDocumentLoadSuccess}
            >
                <Page pageNumber={pageNumber} />
            </Document>
            <div>
                <p hidden={pageNumber===0}>
                    Page {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
                </p>
                <Button hidden={pageNumber===0} type="button" color="primary" size="sm" outline disabled={pageNumber <= 1} onClick={previousPage}>
                Prev
                </Button> {' '}
                <Button
                hidden={pageNumber===0}
                type="button" outline color="primary" size="sm"
                disabled={pageNumber >= numPages}
                onClick={nextPage}
                >
                Next
                </Button>
            </div>
        </div>
    );
}
export default PDF;