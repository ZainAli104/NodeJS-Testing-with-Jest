import {z} from "zod";
import express, {RequestHandler} from "express";

import {prismadb} from "./db";

export const app = express();

app.use(express.json());

const sumInput = z.object({
    a: z.number(),
    b: z.number()
})

const postSumHandler: RequestHandler = async (req, res) => {
    const parsedResponse = sumInput.safeParse(req.body)

    if (!parsedResponse.success) {
        res.status(411).json({
            message: "Incorrect inputs"
        });
        return;
    }

    const answer = parsedResponse.data.a + parsedResponse.data.b;

    await prismadb.sum.create({
        data: {
            a: parsedResponse.data.a,
            b: parsedResponse.data.b,
            result: answer
        }
    })

    res.json({
        answer
    });
};

const getSumHandler: RequestHandler = (req, res) => {
    const parsedResponse = sumInput.safeParse({
        a: Number(req.headers["a"]),
        b: Number(req.headers["b"])
    })

    if (!parsedResponse.success) {
        res.status(411).json({
            message: "Incorrect inputs"
        });
        return;
    }

    const answer = parsedResponse.data.a + parsedResponse.data.b;

    res.json({
        answer
    });
};

app.post("/sum", postSumHandler);
app.get("/sum", getSumHandler);