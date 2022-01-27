module.exports.validateRegisterInput = (
    username,
    email,
    password,
    confirmPassword
) => {
    const errors = {};

    if(username.trim() === '' || username === null)
        errors.username = 'Invalid username';
    
    if(email.trim() === '' || username === null)
        errors.email = 'Invalid email address';
    else{
        const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
        if(!email.match(regEx))
            errors.email = 'Invalid email address';

    }

    if(password === '' || password === null)
        errors.password = 'Invalid password'
    else if(password !== confirmPassword)
        errors.confirmPassword = 'Passwords do not match';

    return {
        errors,
        valid: Object.keys(errors).length < 1
    };
};

module.exports.validateLoginInput = (username, password) => {
    const errors = {};

    if(username.trim() === '' || username === null)
        errors.username = 'Invalid username';

    if(password.trim() === '' || username === null)
        errors.password = 'Invalid password';

    return {
        errors,
        valid: Object.keys(errors).length < 1
    };
}
