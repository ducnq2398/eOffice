function ValidateCompany(company){
    if(company !== ''){
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
export default ValidateCompany;