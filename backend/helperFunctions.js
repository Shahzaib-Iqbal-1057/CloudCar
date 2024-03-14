import User from './models/user.js';


export default async function verifyData(data) {
    
    try {
        const existingUser = await User.findOne({ email: data.email });
        if (existingUser) {
        return 'username_already_exists';
        }
    }
    catch(error) {
        console.error(error);
        return 'could not fetch data'; 
    }
    if (data.password.length < 8) {
      return 'weak_password';
    }
    let upperCaseTest = false;
    let numberTest = false;
    for (let i = 0; i < data.password.length; i++) {
      if (data.password[i] === data.password[i].toUpperCase()) {
        upperCaseTest = true
      }
      if(!isNaN(data.password[i])){
        numberTest = true;
      }
    }

    if(!upperCaseTest || !numberTest){
        return 'weak_password';
    }

    if (data.phone_number.length !== 10) {
        return 'invalid_phone_number';    
    }
    

    let emailTest = false;
    for (let i = 0; i < data.email.length; i++) {
        if(data.email[i] === '@'){
            emailTest = true;
        }
        if(data.email[i] === '.'){
            emailTest = true;
        }
        if(data.email[i] === ' '){
            return 'invalid_email';
        }
    }

    if(!emailTest){
        return 'invalid_email';
    }
    





    return 'user_verified';
    
}