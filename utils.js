import { adj, noun } from "./words";

export const generateSecret = () => {
    const randomNumber1 = Math.floor(Math.random() * adj.length);
    const randomNumber2 = Math.floor(Math.random() * noun.length);
    return `${adj[randomNumber1]} ${noun[randomNumber2]}`;
}