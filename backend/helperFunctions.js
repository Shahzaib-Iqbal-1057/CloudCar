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
        return "weak_password";
    }

    if (data.phone.length !== 10) {
        return "invalid_phone_number_length";    
    }

    if (!/^\d+$/.test(data.phone)) {
        console.log("Phone type incorrect:", data.phone);
        return "invalid_phone_number_type";
    }
    
    // let phoneNumber = parseInt(data.phone); // Parse phone number string into an integer

    // if (phoneNumber.toString().length !== 10) {
    //     console.log("Phone type or length incorrect:", data.phone);
    //     return "invalid_phone_number_length";
    // }

    // if (isNaN(phoneNumber))
    // {
    //     console.log("Phone number ki type kharab hai", phoneNumber);
    //     return "invalid_phone_number_type";
    // }

    // if (!/^\d+$/.test(data.phone)) {
    //     console.log("Phone format incorrect:", data.phone);
    //     return "invalid_phone_number_type";
    // }


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