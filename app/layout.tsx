import type { Metadata } from 'next';
import { Inter, Rajdhani, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import CustomCursor from '@/components/CustomCursor';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const rajdhani = Rajdhani({
  weight: ['500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-rajdhani',
});
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });

export const metadata: Metadata = {
  title: 'ASCEND | Autonomous Aerial Intelligence',
  description:
    'Precision drone surveying & digital twin creation. Turning physical landscapes into actionable data with LiDAR, photogrammetry, and thermal inspection.',
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
        {children}
      </body>
    </html>
  );
}
