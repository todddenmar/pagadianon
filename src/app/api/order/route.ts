// src/app/api/order/email.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { SMTPClient } from 'emailjs';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log('Handler called'); // Add this line to log when the handler is called
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  console.log('POST request received'); // Log when a POST request is received

  const { email, orderLink } = req.body;

  if (!email || !orderLink) {
    res.status(400).json({ error: 'Missing email or orderLink' });
    return;
  }

  const client = new SMTPClient({
    user: process.env.NEXT_PUBLIC_EMAIL,
    password: process.env.NEXT_PUBLIC_PASSWORD,
    host: 'smtp.gmail.com',
    ssl: true,
  });

  const message: any = {
    text: 'Your order is being processed',
    from: process.env.NEXT_PUBLIC_EMAIL,
    to: email,
    subject: 'Pagadianon Order',
    attachment: [
      {
        data: `
          <html>
            <p>Hello,</p>
            <p>Your order is being processed.</p>
            <p>Please click on the link below to view your order:</p>
            <a href="${orderLink}">Order Link</a>
            <p>Thanks,</p>
            <p>Pagadianon Team</p>
          </html>
        `,
        alternative: true,
      },
    ],
  };

  try {
    await new Promise((resolve, reject) => {
      client.send(message, (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result);
      });
    });
    res.status(200).json({ message: 'Send Mail' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
