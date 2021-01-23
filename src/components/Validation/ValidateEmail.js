function ValidateEmail(params) {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(regex.exec(params)!== null){
        return({
            isValid: true,
            isInValid: false
        })
    }else{
        return({
            isValid: false,
            isInValid: true
        })         
    }
    
}
export default ValidateEmail;