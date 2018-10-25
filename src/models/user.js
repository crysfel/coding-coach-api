import mongoose from 'mongoose';
import { bcrypt } from 'bcrypt-nodejs';
import validate from 'mongoose-validator';
import { isValidPassword } from 'mongoose-custom-validators';

const saltIndex = 10;

const emailValidator = [
  validate({
    type: String,
    validator: 'isLength',
    arguments: [4, 32],
    message: 'Name should be between 4 and 32 characters',
  }),

  validate({
    validator: 'isEmail',
    message: 'Email address invalid',
  }),
];

const passwordValidator = [
  validate({
    validator: 'isLength',
    arguments: [8, 32],
    message: 'Password needs to be between 8 to 32 characters long',
  }),

  validate({
    validator: str => isValidPassword(str, { minlength: 10 }),
    message:
      'Password must have at least: 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.',
  }),
];

const userSchema = new mongoose.Schema({
  firstName: String,

  lastName: String,

  email: {
    type: String,
    require: false,
    unique: true,
    lowercase: true,
    trim: true,
    allowNull: false,
    validate: emailValidator,
  },

  password: {
    type: String,
    require: false,
    minlength: 8,
    maxlength: 32,
    trim: true,
    validate: passwordValidator,
  },

  activationStatus: {
    default: 0,
    type: Boolean,
  },

  failedLogin: {
    lastAttempt: Date,
    numFailed: {
      type: Number,
      default: 0,
      max: 5,
    },
  },
  type: String,
});

userSchema.methods.generateHash = (password) => {
  return bcrypt.hashSync(password, saltIndex, null);
};

userSchema.methods.validPassword = (password) => {
  return bcrypt.compareSync(password, this.local.password);
};

export default mongoose.model('User', userSchema);
