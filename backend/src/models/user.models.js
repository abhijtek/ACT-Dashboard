import mongoose, {Schema} from "mongoose";
import bcrypt from "bcrypt" 
import crypto from "crypto"
import jwt from "jsonwebtoken"

const USERNAME_REGEX = /^[a-z0-9_]+$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const userSchema = new Schema({

    avatar:{ // properties of avatar
        type: {
            url: String,
            localPath: String,
        },
        default: {
            url: `https://placehold.co/200x200`,
            localPath : "",
        }
    },
    username:{
        type: String,
        required : [true, "Username is required"],
        unique: true,
        lowercase : true,
        trim : true, // spaces are gone
        index : true,
        minlength: [3, "Username must be at least 3 characters long"],
        maxlength: [30, "Username must be at most 30 characters long"],
        match: [USERNAME_REGEX, "Username can only contain lowercase letters, numbers, and underscores"],
    },
    email :{
        type : String,
        required : [true, "Email is required"],
        unique : true,
        lowercase : true,
        trim: true,
        match: [EMAIL_REGEX, "Please provide a valid email address"],

    },
    fullName :{
        type : String,
        trim : true,

    },
    password :{
        type : String ,
        required : [true, "Password is required"], // custom error is passed if no password
        minlength: [8, "Password must be at least 8 characters long"],

    },
    isEmailVerified :{
         type : Boolean,
         default : false,
    },
    refreshToken : {
        type : String,

    },
    forgotPasswordToken: {
        type : String,
    },
    forgotPasswordExpiry : {
        type : Date,
        
    },
    emailVerificationToken : {
        type : String,
    },
    emailVerificationExpiry: {
        type : Date ,
    },
},
{ // second object as parameter
   timestamps : true,
},
);

// since its a hook it will run every save operation or change operation to prevent that some additional 

userSchema.pre("save", async function(next){
   if( !this.isModified("password"))return next() // safegaurd func to prevent rehashing whenver we change anything other than passowrd 
    this.password = await bcrypt.hash(this.password,10) // 10 is the rounds of encryptoin 
    next();
})
// created a model for user functionality will be added lec- 113, next we write methods and attatch to it , hooks as well


// methods attatched to shcema lec-115

userSchema.methods.isPasswordCorrect = async function(password){
   return await bcrypt.compare(password, this.password);
};

// JWT token 
// hEADER, Pyload ,  signature
userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id : this._id,
            email : this.email,
            username : this.username,
        },
        process.env.ACCESS_TOKEN_SECRET,
         {expiresIn : process.env.ACCESS_TOKEN_EXPIRY},
    );
};
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email : this.email,
            username : this.username,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        },

    );
};
// without data token
userSchema.methods.generateTemporaryToken = function(){
   const unHashedToken =  crypto.randomBytes(20).toString("hex")

    const hashedToken = crypto
    .createHash("sha256")
    .update(unHashedToken)
    .digest("hex")

    const tokenExpiry  = Date.now() + (20*6*1000) // 20mins
    return {unHashedToken,hashedToken,tokenExpiry}
};
export const User = mongoose.model("User",userSchema)