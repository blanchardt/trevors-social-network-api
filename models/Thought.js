const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

//Schema to create a thought model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      max_length: 280,
      minlength: 1,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    username: {
      type: String,
      default: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

//Create a virtual property that returns the amount of reactoins the thought has.
postSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

const Course = model('thought', courseSchema);

module.exports = Course;
