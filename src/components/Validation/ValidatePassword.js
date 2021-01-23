function ValidatePassword(params) {
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/;
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
export default ValidatePassword;