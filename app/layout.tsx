import type { Metadata } from 'next';
import { Inter, Rajdhani, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import CustomCursor from '@/components/CustomCursor';
import Navbar from '@/components/Navbar';
import ScrollProgress from '@/components/ScrollProgress';

import PageTransition from '@/components/PageTransition';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const rajdhani = Rajdhani({
  weight: ['500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-rajdhani',
});
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });

export const metadata: Metadata = {
  title: 'IIC SIT Lonavala | 3-Day Drone Workshop',
  description:
    'Join the IIC SIT Lonavala Drone Workshop. A 3-day hands-on experience in drone assembly, basics, and flight training. Build your own drone and master the skies.',
  keywords: [
    'Drone Workshop',
    'IIC SIT Lonavala',
    'Drone Assembly',
    'Flight Training',
    'Robotics Workshop',
    'Hands-on Learning',
  ],
  authors: [{ name: 'IIC SIT Lonavala' }],
  metadataBase: new URL('https://iicsit.in'),
  icons: {
    icon: '/iic.png',
    apple: '/iic.png',
  },
  openGraph: {
    title: 'IIC SIT Lonavala | 3-Day Drone Workshop',
    description:
      'Master drone assembly and flying in just 3 days. Hands-on workshop at STES Campus, Lonavala.',
    url: 'https://iicsit.in',
    siteName: 'IIC SIT Drone Workshop',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/iic.png',
        width: 800,
        height: 800,
        alt: 'IIC SIT Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IIC SIT Lonavala | 3-Day Drone Workshop',
    description:
      'Learn to build and fly drones at SIT Lonavala. Limited seats available!',
    images: ['/iic.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${rajdhani.variable} ${mono.variable}`}
    >
      <body className="bg-slate-950 selection:bg-cyan-500/30 selection:text-cyan-100">
        <CustomCursor />
        <ScrollProgress />
        <Navbar />
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}
