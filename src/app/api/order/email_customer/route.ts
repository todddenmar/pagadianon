import { SMTPClient } from 'emailjs';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const res = await request.json();
  const { email, orderLink } = res;
  if (!email || !orderLink) {
    res.status(400).json({ error: 'Missing email or orderLink' });
    return;
  }
  const client = new SMTPClient({
    user: process.env.NEXT_PUBLIC_EMAIL,
    password: 'jick njrz ovmb ktjo',
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
    return NextResponse.json({ message: 'Send Mail' });
  } catch (error) {
    return NextResponse.json({ error: error });
  }

  //   const client = new SMTPClient({
  //     user: 'user',
  //     password: 'password',
  //     host: 'smtp.your-email.com',
  //     ssl: true,
  //   });

  //   const message = {
  //     text: 'i hope this works',
  //     from: 'you <username@your-email.com>',
  //     to: 'someone <someone@your-email.com>, another <another@your-email.com>',
  //     cc: 'else <else@your-email.com>',
  //     subject: 'testing emailjs',
  //     attachment: [
  //       { data: '<html>i <i>hope</i> this works!</html>', alternative: true },
  //       {
  //         path: 'path/to/file.zip',
  //         type: 'application/zip',
  //         name: 'renamed.zip',
  //       },
  //     ],
  //   };

  //   // send the message and get a callback with an error or details of the message that was sent
  //   client.send(message, function (err, message) {
  //     console.log(err || message);
  //   });
}
