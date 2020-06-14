import { isAuthenticate } from "../../../middlewares";
import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation: {
        followUser: async (_, args, { request }) => {
            try {
                isAuthenticate(request);
                const { id } = args;
                const { user } = request;
                await prisma.updateUser({
                    where: {
                        id: user.id,
                    },
                    data: {
                        following: {
                            connect: {
                                id,
                            },
                        },
                    },
                });
                return true;
            } catch (error) {
                console.log(error);
                return false;
            }
        },
    },
};
