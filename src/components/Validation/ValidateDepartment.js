function ValidateDepartment(Department) {
    if(Department !==''){
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
export default ValidateDepartment;