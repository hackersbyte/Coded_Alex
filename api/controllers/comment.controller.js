import { populate } from 'dotenv';
import Comment from '../models/comment.model.js';

// Create a new comment
export const createComment = async (req, res, next) => {
    try {
        const { content, postId, userId, parentId } = req.body;

        if (userId !== req.user.id) {
            return next(
                errorHandler(403, 'You are not authorized to make this comment')
            );
        }

        const newComment = new Comment({ content, postId, userId });

        if (parentId) {
            const parentComment = await Comment.findById(parentId);

            if (!parentComment) {
                return next(errorHandler(422, "The parent comment does not exist"));
            }

            parentComment.replies.push(newComment);
            await parentComment.save();
            newComment.parentComment = parentComment;
        } else {
            await newComment.save();
        }

        res.status(201).json(newComment);
    } catch (error) {
        next(error);
    }
};

// Get comments for a specific post
export const getPostComments = async (req, res, next) => {
    try {
        const postId = req.params.id;

        const comments = await Comment.find({ postId, parentCommentId: null })
            .sort({ createdAt: -1 })
            .populate({
                path: 'replies',
                populate: {
                    path: 'replies',
                }
            });
        res.status(200).json(comments);
    } catch (error) {
        next(error);
    }
};

// Edit a comment
export const editComment = async (req, res, next) => {
    try {
        const comment = await Comment.findById(req.params.commentId);

        if (!comment) {
            return next(
                errorHandler(404, 'No such comment exists!')
            );
        }

        if (comment.userId !== req.user.id && req.user.role !== 'admin' && !comment.replies.includes(req.user.id)) {
            return next(
                errorHandler(403, 'You do not have permission to perform this action')
            );
        }

        const editedComment = await Comment.findByIdAndUpdate(req.params.commentId, {
            content: req.body.content
        }, { new: true });

        res.status(200).json(editedComment);
    } catch (error) {
        next(error);
    }
};

// Get comments with pagination and additional information
export const getcomments = async (req, res, next) => {
    if (!req.user.isAdmin)
        return next(errorHandler(403, 'Unauthorized access'));
    try {
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 9;
        const sortDirection = req.query.direction === "desc" ? -1 : 1;
        const comments = await Comment.find()
            .skip(startIndex)
            .limit(limit)
            .sort({ createdAt: sortDirection })
            .populate('replies');

        const totalComments = await Comment.find().countDocuments();
        const now = new Date();
        const oneMonthAgo = new Date(
            now.getFullYear(),
            now.getMonth() - 1,
            now.getDate()
        );

        const lastMonthComments = await Comment.countDocuments({ createdAt: { $lt: oneMonthAgo } });

        res.status(200).json({
            comments,
            totalComments,
            lastMonthComments
        });
    } catch (err) {
        next(err);
    }
};

// Delete a comment and its replies recursively
export const deleteComment = async (req, res, next) => {
    try {
        const comment = await Comment.findById(req.params.commentId);

        if (!comment) {
            return next(errorHandler(404, 'No such comment exists'));
        }

        if (comment.userId !== req.user.id && req.user.role !== 'admin') {
            return next(errorHandler(403, 'You do not have permission to delete this comment'));
        }

        // Delete replies recursively
        const deleteReplies = async (commentId) => {
            const replies = await Comment.find({ parentCommentId: commentId });
            for (const reply of replies) {
                await deleteReplies(reply._id); // Recursive call
                await Comment.findByIdAndDelete(reply._id);
            }
        };

        await deleteReplies(comment._id); // Start recursive deletion
        await Comment.findByIdAndDelete(comment._id);

        res.status(200).json({ message: 'Deleted successfully' });
    } catch (error) {
        next(error);
    }
};

// Like a comment
export const likeComment = async (req, res, next) => {
    try {
        const comment = await Comment.findById(req.params.commentId);

        if (!comment) {
            return next(errorHandler(404, 'No comment found'));
        }

        const userIndex = comment.likes.indexOf(req.user.id);

        if (userIndex === -1) {
            comment.numberOfLikes += 1;
            comment.likes.push(req.user.id);
        }

        await comment.save();
        res.status(200).json(comment);

    } catch (error) {
        next(error);
    }
};

// Unlike a comment
export const unlikeComment = async (req, res, next) => {
    try {
        const comment = await Comment.findById(req.params.commentId);

        if (!comment) {
            return next(errorHandler(404, 'No comment found'));
        }

        const userIndex = comment.likes.indexOf(req.user.id);

        if (userIndex !== -1) {
            comment.numberOfLikes -= 1;
            comment.likes.splice(userIndex, 1);
        }

        await comment.save();
        res.status(200).json(comment);

    } catch (error) {
        next(error);
    }
};
