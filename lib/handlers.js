var _data = require('./data');
var helpers = require('./helpers');
//an empty object of handler
var handlers = {};

//ping handler
handlers.ping = function(data, callback) {
    callback(200);
}

//defining all the handlers
// handlers.sample = function(data, callback){
//     callback(406, {'name' : 'sample handler'});
// }

// handlers.user = function(data, callback){
//     callback(406, {'name' : 'user'});
// }

//not found handler
handlers.notFound = function(data, callback){
    callback(404);
} 

handlers.users = function(data, callback) {
    var acceptableMethods = ['post', 'get', 'put', 'delete'];
    if(acceptableMethods.indexOf(data.method) > -1){
        handlers._users[data.method](data, callback);
    }
    else{
        callback(405);
    }
}

handlers._users = {};

handlers._users.post = function(data, callback) {

    //required fields are FName, LName, PhoneNo, Password, TermsOfServiceAgreement
    var firstName = typeof(data.payload.firstName) == 'string' && data.payload.firstName.trim().length > 0 ? data.payload.firstName.trim() : false;
    var lastName = typeof(data.payload.lastName) == 'string' && data.payload.lastName.trim().length > 0 ? data.payload.lastName.trim() : false;
    var phoneNo = typeof(data.payload.phoneNo) == 'string' && data.payload.phoneNo.trim().length == 10 ? data.payload.phoneNo.trim() : false;
    var password = typeof(data.payload.password) == 'string' && data.payload.password.trim().length > 0 ? data.payload.password.trim() : false;
    var termsOfServiceAgreement = typeof(data.payload.termsOfServiceAgreement) == 'boolean' && data.payload.termsOfServiceAgreement == true? true : false;

    console.log(firstName + lastName + phoneNo + password + termsOfServiceAgreement);
    if(firstName && lastName && phoneNo && password && termsOfServiceAgreement) {

        _data.read('users', phoneNo, function(data, err){

            if(!err) {
                //hashing of password
                var hashedPassword = helpers.hash(password);

                if(hashedPassword) {
               
                    var userObject = {
                        'firstName' : firstName,
                        'lastName' : lastName,
                        'phoneNo' : phoneNo,
                        'hashedPassword' : hashedPassword,
                        'termsOfServiceAgreement' : true
                    };
                    _data.create('users', phoneNo, userObject, function(err) {
                        if(!err) {
                                callback(200);
                        }
                        else{
                            console.log(err);
                            callback(500, {'error' : 'couldnot create the new user'});
                        }

                });
               
                }
            else{
                    
                    callback(500, {'error' : 'problem while hashing of the password'} );
               
                }
            
            } 
            else {
                callback(400, {'error' : 'Phone number already  exists'});
            }

        });
    }
    else {
        callback(400, {'error' : 'missing required fields'});
    }

};

handlers._users.get = function(data, callback) {
    console.log('working');
};

handlers._users.put = function(data, callback) {

};

handlers._users.delete = function(data, callback) {

};
module.exports = handlers;