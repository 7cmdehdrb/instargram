import { prisma } from "../../../../generated/prisma-client";
import { generateSecret, sendMail } from "../../../utils";

export default {
    Mutation: {
        requestSecret: async (_, args, { request }) => {
            const { email } = args;
            const secret = generateSecret();
            console.log(`User Secret: ${secret}`);
            try {
                throw Error();
                await prisma.updateUser({
                    data: { loginSecret: secret },
                    where: { email },
                });
                await sendMail(email, secret);
                return true;
            } catch (error) {
                console.log(error);
                return false;
            }
        },
    },
};
