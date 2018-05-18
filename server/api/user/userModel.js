var mongoose = require('mongoose');
var bcrypt = require('bcrypt')
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
});

UserSchema.pre('save',function(next)  {
    if (!this.isModified('password')) return next();

    this.password = this.encryptPassword(this.password);
    next();
});

UserSchema.methods = {
    //check the passwords on sign in
    authenticate(plainTextPword){
        return bcrypt.compareSync(plainTextPword,this.password);        
    },
    encryptPassword(plainTextPword){
        if(!plainTextPword){
            return '';
        }
        else{
            var salt = bcrypt.genSaltSync(10);
            return bcrypt.hashSync(plainTextPword,salt);
        }
    },
    toJson(){
        //This method removes the db document methods and all that comes from Mongoose and normalizes 
        //this to regular json object then password is delted before sending further
        var obj = this.toObject();
        delete obj.password;
        return obj;
    }
}


module.exports = mongoose.model('user',UserSchema);