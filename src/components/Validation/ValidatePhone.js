function ValidatePhone(phone){
        const regexp = /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/;
        if(regexp.exec(phone)!== null){
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
export default ValidatePhone;

