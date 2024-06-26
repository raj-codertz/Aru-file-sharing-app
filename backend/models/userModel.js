import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: { 
        type: String
    },
    lastName: {
        type: String
    },
    email: { 
        type: String 
    },
    password: { 
        type: String
    },
    role: { 
        type: String,
        enum: ['Admin', 'secretary', 'hod', 'dean', 'dvs'] }
  });
  

// using instance method approach that remove password when we return user's details from get current users' controller and come up with any name but i chose toJSON
userSchema.methods.toJSON = function () {
    // transform user into old js object
    let obj = this.toObject()
    delete obj.password
    return obj
}
export default mongoose.model('User', userSchema)