import { Button, Form, FormGroup, Input, Label } from "reactstrap";

function FileUpload(){
    return (
            <Form>
                <FormGroup>
                    <Input type="file" name="upload_file"/>
                </FormGroup>
                <FormGroup>
                    <Button color="primary">Upload</Button>
                </FormGroup>
            </Form>
    );
}
export default FileUpload;