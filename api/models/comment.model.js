import mongoose from "mongoose";

const commentSchema  = new mongoose.Schema(
    {
        content: {
            type: String,
            required: true
        },
        postId: {
            type: String,
            required: true,
        },
        userId: {
            type : String,
            required : true
        },
        likes: {
            type: Array,
            default :  []
        },
        numberOfLikes: {
            type : Number,
            default :  0
        },
        replies: [ // Add a new array to store replies
            {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment', // Reference itself for nested replies
            },
        ],
    },
  {timestamps:true}
);

const  Comment = mongoose.model("Comment", commentSchema  );

export default Comment ;

