function validateInput(checkingText){
    /* reg exp để kiểm tra xem chuỗi có chỉ bao gồm 10 - 11 chữ số hay không */

    const regexp = /^\d{10}$/;
    const checkingResult = regexp.exec(checkingText);
    if (checkingResult !== null) {
        return { isInputValid: true,
                 errorMessage: false};
    } else {
        return { isInputValid: false,
                 errorMessage: true};
    }
}
export default validateInput;