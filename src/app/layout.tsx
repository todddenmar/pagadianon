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
import { dark } from '@clerk/themes';

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
  let dbSettings: any = null;
  let dbUserData: UserType | null = null;
  const user = await currentUser();
  let userResultData = null;
  if (user && user.emailAddresses && user.primaryEmailAddressId) {
    const userEmail = user.primaryEmailAddress?.emailAddress;
    if (userEmail) {
      userResultData = await dbGetUserData(userEmail);
      if (userResultData.status === 'success') {
        dbUserData = userResultData.data;
      } else {
        console.log(userResultData.error);
      }
    }
  }
  const res: any = await dbGetRootSettings();
  if (res.status === 'success') {
    dbSettings = res.data;
  }
  return (
    <ClerkProvider>
      <SyncActiveOrganization membership={sessionClaims?.membership} />
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <FirebaseProvider dbSettings={dbSettings} dbUserData={dbUserData} />
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
