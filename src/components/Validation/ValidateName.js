function ValidateName(name){
    const regex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
    if(regex.exec(name)!==null){
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
export default ValidateName;