module.exports = {
    formErrors: (errors) => {
        let organizedErrors = {};
        for (let error of errors){
            if (error.path === 'username'){
                organizedErrors.username = 'Invalid Username';
            } else if (error.path === 'email'){
                organizedErrors.email = 'Invalid Email';
            } else if (error.path === 'password'){
                organizedErrors.password = 'Invalid Password';
            } else if (error.path === 'message') {
                organizedErrors.body = 'Invalid Comment';
            }
        }
        return organizedErrors;
    }
};