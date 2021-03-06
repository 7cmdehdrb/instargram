import { isAuthenticate } from "../../../middlewares";
import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation: {
        editUser: async (_, args, { request }) => {
            try {
                isAuthenticate(request);
                const { username, email, firstName, lastName, bio } = args;
                const { user } = request;
                return prisma.updateUser({
                    where: {
                        id: user.id,
                    },
                    data: {
                        username,
                        email,
                        firstName,
                        lastName,
                        bio,
                    },
                });
            } catch (error) {
                console.log(error);
                return null;
            }
        },
    },
};
