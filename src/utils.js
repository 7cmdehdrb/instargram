import { adj, noun } from "./words";
import nodemailer from "nodemailer";
import smtpTransport from "nodemailer-smtp-transport";
import jwt from "jsonwebtoken";

export const generateSecret = () => {
    const randomNumber1 = Math.floor(Math.random() * adj.length);
    const randomNumber2 = Math.floor(Math.random() * noun.length);
    return `${adj[randomNumber1]} ${noun[randomNumber2]}`;
};

export const sendMail = (address, secret) => {
    const transporter = nodemailer.createTransport(
        smtpTransport({
            service: "gmail",
            host: "smtp.gmail.com",
            auth: {
                user: process.env.EMAIL_ADDRESS,
                pass: process.env.EMAIL_PASSWORD,
            },
        })
    );

    transporter.sendMail(
        {
            from: process.env.EMAIL_ADDRESS,
            to: address,
            subject: "Instargram Secret Key",
            html: `
        <span style="font-size: xx-large;">
        <p>YOUR SECRET: <strong>${secret}</strong><p>
        <p>Please Input This Key into App or Web!</p>
        </span>`,
        },
        (err, info) => {
            if (err) {
                console.log(err);
            } else {
                console.log(info);
            }
        }
    );
};

export const generateToken = (id) => {
    return jwt.sign({ id }, process.env.PASSPORT_SECRET);
};
