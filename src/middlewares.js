export const isAuthenticate = (req) => {
    if (!req.user) {
        throw Error("You need to log in");
    }
    return;
};
