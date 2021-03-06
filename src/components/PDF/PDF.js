import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Pagination from "@material-ui/lab/Pagination";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function PDF({ pdf }) {
  const [numPages, setNumPages] = useState("");
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  const handleChange = (event, value) => {
    setPageNumber(value);
  };
  return (
    <div>
      <Paper elevation={4}>
        <Document file={pdf} onLoadSuccess={onDocumentLoadSuccess}>
          <Page pageNumber={pageNumber} />
        </Document>
      </Paper>
      <Typography
        style={{
          marginTop: "5px",
        }}
      >
        Page: {pageNumber}/{numPages}
      </Typography>
      <div style={{ marginLeft: "40%" }}>
        <Pagination
          variant="outlined"
          count={numPages}
          page={pageNumber}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}
export default PDF;
