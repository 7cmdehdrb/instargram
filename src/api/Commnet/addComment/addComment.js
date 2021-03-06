import { isAuthenticate } from "../../../middlewares";
import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation: {
        addComment: async (_, args, { request }) => {
            try {
                isAuthenticate(request);
                const { text, postId } = args;
                const { user } = request;
                const comment = await prisma.createComment({
                    user: {
                        connect: {
                            id: user.id,
                        },
                    },
                    post: {
                        connect: {
                            id: postId,
                        },
                    },
                    text,
                });
                return comment;
            } catch (error) {
                return "ERROR";
            }
        },
    },
};
