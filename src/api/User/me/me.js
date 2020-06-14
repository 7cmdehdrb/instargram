import { prisma } from "../../../../generated/prisma-client";
import { USER_FRAGMENT } from "../../../fragments";
import { isAuthenticate } from "../../../middlewares";

export default {
    Query: {
        me: async (_, args, { request }) => {
            try {
                isAuthenticate(request);
                const { user } = request;
                const me = await prisma.user({
                    id: user.id,
                });
                const posts = await prisma
                    .user({
                        id: user.id,
                    })
                    .posts();
                return {
                    user: me,
                    posts: posts,
                };
            } catch (error) {
                console.log(error);
                console.log("HERE!");
                return null;
            }
        },
    },
};
