const AdminAuth = (req, res, next) => { 
    console.log("admin auth is getting checked !!");

    //logic of checking if the request is authorized 
    const token = "xyz";
    const IsAdminAuthorized = token == "xyz";  // if the token is not valid in that case we are nott send data get back

    if(!IsAdminAuthorized){
        res.status(401).send("UnAuthorized Request");   // http status codee 
    }
    else{
        next();
    }
};

//user authentication
const UserAuth = (req, res, next) => { 
    console.log("user auth is getting checked !!");
    
    //logic of checking if the request is authorized 
    const token = "xyz";
    const IsAdminAuthorized = token == "xyz";  // if the token is not valid in that case we are nott send data get back

    if(!IsAdminAuthorized){
        res.status(401).send("UnAuthorized Request");   // http status codee 
    }
    else{
        next();
    }
};

//exports
module.exports = {
    AdminAuth,
    UserAuth,
};