function ValidateAddress(address) {
    if(address !== ''){
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
export default ValidateAddress;