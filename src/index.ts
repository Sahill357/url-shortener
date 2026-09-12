import express from 'express';
import {prismaClient} from '@prisma/client';
import {nanoid} from 'nanoid';
import extension = require('@prisma/client/extension');

const app = express();
const prisma = new extension.PrismaClient();

app.use(express.json());

// 1. create a short URL 
app.post(`shorten`, async (req, res) => {
    const {originalUrl} = req.body;
    

    if (!originalUrl) {
        return res.status(400).json({error:'URL is required'});
    }

    const shortCode = nanoid(8);

    const url = await prisma.url.create({
        data: {originalUrl, shortCode}
    });
    res.json({shortUrl:`http//localhost:3000/${shortCode}`});
});

// 2. redirect and track clicks
