const { Schema, model } = require("mongoose");
const Thought = require("./Thought");

const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: "You need to provide a username!",
            trim: true
        },
        email: {
            type: String,
            unique: true,
            required: "You need to provide a username!",
            trim: true,
            match: [/.+@.+\..+/, 'Please enter a valid e-mail address']
        },
        // array of _id values ref Thought model
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: "Thought",
            },
        ],
        // array of _id values ref User model (self ref)
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            }
        ],
        toJSON: {
            virtuals: true
        }
    
})

// BONUS
UserSchema.pre("deleteOne", { document: false, query: true }, async function() {
    const doc = await this.model.findOne(this.getFilter());
    await Thought.deleteMany({ userId: doc._id });
})

UserSchema.virtual("friendCount").get(function() {
    return this.friends.length;
})

const User = model("User", UserSchema);

module.exports = User;