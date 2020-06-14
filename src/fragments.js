export const COMMENT_FRAGMENT = `
    fragment CommentParts on Commnet{
        id
        text
        user{
            id
            username
            email
            firstName
            lastName
            bio
        }
    }
`;
