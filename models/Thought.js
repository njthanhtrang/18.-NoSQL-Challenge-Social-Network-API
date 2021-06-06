// const { Schema, model } = require("mongoose");
// const dateFormat = require("../utils/dateFormat");
// const reactionSchema = require("./Reaction");

// const ThoughtSchema = new Schema(
//   {
//     thoughtText: {
//       type: String,
//       required: "Your thought must be between 1 and 280 characters!",
//       minLength: 1,
//       maxLength: 280,
//     },
//     createdAt: {
//       type: Date,
//       default: Date.now,
//       get: (createdAtVal) => dateFormat(createdAtVal),
//     },
//     username: {
//       type: String,
//       required: true,
//     },
//     // arr of nested documents created with reactionSchema
//     reactions: [
//       {
//         type: reactionSchema,
//       },
//     ],
//   },
//   {
//     toJSON: {
//       virtuals: true,
//     },
//     id: false,
//   }
// );

// ThoughtSchema.virtual("reactionCount").get(function () {
//   return this.reactions.length;
// });

// const Thought = model("Thought", ThoughtSchema);

// module.exports = Thought;

const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const dateFormat = require('../utils/dateFormat');
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: 'You need to leave a thought!',
      minlength: 1,
      maxlength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp)
    },
    username: {
      type: String,
      required: true
    },
    reactions: [reactionSchema]
  },
  {
    toJSON: {
      getters: true
    },
    id: false
  }
);
thoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});
const Thought = model('Thought', thoughtSchema);
module.exports = Thought;


