const isEmail = (email) => {
    const regExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(email.match(regExp)) return true;
    else return false;
};

const isEmpty = (string) => {
    if (string.trim() === '') return true;
    else return false;
};

exports.validateSignupData = (newUser) => {
    let errors = {};

    //set error message if email value is empty or invalid
    if(isEmpty(newUser.email)) {
        errors.email = 'Must not be empty'
    } else if(!isEmail(newUser.email)) {
        errors.email = 'Must be a valid email address'
    }

    //set error message if password and handle is empty, or password not match
    if(isEmpty(newUser.password)) errors.password = 'Must not be empty'
    if(newUser.password !== newUser.confirmPassword) errors.confirmPassword = 'Password must match'
    if(isEmpty(newUser.handle)) errors.handle = 'Must not be empty'

    //if there is error(s): return that error(s)
    return {
        errors,
        valid: Object.keys(errors).length === 0 ? true : false
    }
};

exports.validateLoginData = (user) => {
    let errors = {};

    //make sure input is not empty
    if(isEmpty(user.email)) errors.email = 'Must not be empty';
    if(isEmpty(user.password)) errors.password = 'Must not be empty';

    //throw if any errors exist
    return {
        errors,
        valid: Object.keys(errors).length === 0 ? true : false
    }
};

exports.reduceUserDetails = (data) => {
    let userDetails = {};

    if(!isEmpty(data.bio.trim())) {
        userDetails.bio = data.bio;
    }
    if(!isEmpty(data.website.trim())) {
        if(data.website.trim().substring(0,4) !== 'http') {
            userDetails.website = `http://${data.website.trim()}`;
        } else {
            userDetails.website = data.website;
        }
    }

    if(!isEmpty(data.location.trim())) {
        userDetails.location = data.location;
    }

    return userDetails;
};