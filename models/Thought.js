const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");
const reactionSchema = require("./Reaction");

const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: "Your text must be between 1 and 280 characters!",
            minLength: 1,
            maxLength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        },
        username: {
            type: String,
            required: true
        },
        userId: {
            types: Schema.Types.ObjectId,
            ref: "User"
        },
        // arr of nested documents created with reactionSchema
        reactions: [{
            type: reactionSchema,
        }]
    }
)

ThoughtSchema.virtual("reactionCount").get(function() {
    return this.reactions.length;
});

const Thought = model("Thought", ThoughtSchema);

module.exports = Thought;