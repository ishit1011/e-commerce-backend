
const admin = require('../utils/firebase');
const Approved = require('../models/ApprovedEmails');
const User = require('../models/User')

// Client Error Status codes
// 400 Bad Request
// 401 Unauthorized
// 402 Payment Required
// 403 Forbidden
// 404 Page not found


// Authenticate user
const authenticate = async(req,res,next)=>{
    const token = req.headers.authorization.split(" ")[1];

    // 1. Token invalid
    if(!token){
        res.status(401).json('Invalid Token');
        return;
    }

    try{
        const decoded = await admin.auth().verifyIdToken(token);
        const approved = await Approved.findOne({email: decoded.email});
        if(!approved){
            res.status(401).status('Email not approved');
            return;
        }
        let user = await User.findOne({email: decoded.email});
        if(!user){
            user = await User.create({email: decoded.email, name: decoded.name});
        }
        // Add new request property "req.user"
        req.user = user;
        next();
    }
    catch(err){
        res.status(401).json('Invalid token');
        return;
    }
}

// Check Rider
const isRider = async(req,res,next)=>{
    if(req.user.role !== 'rider'){
        res.status(403).json('You are not a Rider');
        return;
    }
    next();
}


// Check Admin
const isAdmin = async(req,res,next)=>{
    if(req.user.role !== 'admin'){
        res.status(403).json('You are not the Admin');
        return;
    }
    next();
}

// export default authMiddleWares = {authenticate,isAdmin,isRider};
/*
    ES Modules (ESM) js: 
    Uses export and import syntax
    Supported natively in modern Node.js (with "type": "module" in package.json)
*/

module.exports  = {authenticate,isAdmin,isRider}; // Common js (CJS)