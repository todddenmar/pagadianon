import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from '@/components/Header';
import { ClerkProvider } from '@clerk/nextjs';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import FirebaseProvider from '@/components/providers/FirebaseProvider';
import { auth, currentUser } from '@clerk/nextjs/server';
import { dbGetRootSettings, dbGetUserData } from '@/helpers/firebaseHelpers';
import { SyncActiveOrganization } from '@/components/SyncActiveOrganization';
import { UserType } from '@/typings';
import Footer from '@/components/Footer';
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Pagadianon',
  description:
    'Pagadianon, your online resource for navigating and thriving in our vibrant city',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { sessionClaims } = auth();
  let userEmail: any = null;
  let dbSettings: any = null;
  let dbUserData: UserType | null = null;
  const user = await currentUser();

  interface EmailAddress {
    id: string;
    emailAddress: string;
  }
  if (user && user.emailAddresses && user.primaryEmailAddressId) {
    const foundEmail = user.emailAddresses.find(
      (item: EmailAddress) => item.id === user.primaryEmailAddressId
    );
    userEmail = foundEmail ? foundEmail.emailAddress : ''; // Assign emailAddress if found, otherwise assign an empty string
    const userResultData = await dbGetUserData(userEmail);
    if (userResultData.status === 'success') {
      dbUserData = userResultData.data;
    } else {
      console.log(userResultData.error);
    }
  }
  const res: any = await dbGetRootSettings();
  if (res.status === 'success') {
    dbSettings = res.data;
  }
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <FirebaseProvider dbSettings={dbSettings} dbUserData={dbUserData} />
            <SyncActiveOrganization membership={sessionClaims?.membership} />
            <Header />
            {children}
            <Toaster />
            <Footer />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
