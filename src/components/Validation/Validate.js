function validateInput(checkingText){
    /* reg exp để kiểm tra xem chuỗi có chỉ bao gồm 10 - 11 chữ số hay không */

    const regexp = /^\d{10}$/;
    const checkingResult = regexp.exec(checkingText);
    if (checkingResult !== null) {
        return { isInputValid: true,
                 errorMessage: ''};
    } else {
        return { isInputValid: false,
                 errorMessage: 'Phone number is incorrect'};
    }
}
export default validateInput;