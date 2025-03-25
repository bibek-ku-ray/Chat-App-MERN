import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { asyncHandler } from "../utils/asyncHandler.util.js";
import { errorHandler } from "../utils/errorHandler.util.js";

export const sendMessage = asyncHandler(async (req, res, next) => {
    /**
     * 
     * * get sendId receiverId and message
     * * find Conversation already exits or not -> if not then create
     * * create message
     * * push messageid in with sendId receiverId and message in Conversation
     * * send response
     * 
     * TODO: socket implementation
     *
     */

    const senderId = req.user.id
    const receiverId = req.params.receiverId
    const message = req.body.message

    if (!senderId || !receiverId || !message) {
        next(new errorHandler("All Message field required!", 400))
    }

    const conversation = await Conversation.findOne({
        participants: { $all: [senderId, receiverId] }
    });

    if (!conversation) {
        await Conversation.create({
            participants:[senderId, receiverId]
        });
    }
    
    const newMessage = await Message.create({
        senderId,
        receiverId,
        message
    })

    if (newMessage) {
        await conversation.messages.push(newMessage._id)
        await conversation.save()
    }

    return res.status(200).json({
        success: true,
        message: "Message sent.",
        data: newMessage

    })
})

// get message between two users
export const getMessage = asyncHandler(async (req, res, next) => {
    const myId = req.user.id
    const otherParticipantId = req.params.otherParticipantId;
    
    if (!myId || !otherParticipantId) {
        next(new errorHandler("All field required!", 400));
    }
    
    console.log(myId, otherParticipantId)
    let conversation = await Conversation.findOne({
        participants: { $all: [myId, otherParticipantId] },
    }).populate("messages");

    console.log("conversation: ", conversation);

    return res.status(200).json({
        success: true,
        message: "Message Fetched.",
        data: conversation,
    });


})