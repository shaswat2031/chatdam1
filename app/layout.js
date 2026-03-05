import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./context/ThemeContext";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "DamChat — Dam Safety AI Assistant",
  description: "AI-powered assistants for dam safety, regulations, and water resource management — built on official CWC documents and government publications.",
  keywords: "dam safety, CWC, dam safety act 2021, water resources, DamChat, AI assistant",
  openGraph: {
    title: "DamChat — Dam Safety AI Assistant",
    description: "AI-powered assistants for dam safety, regulations, and water resource management.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable}`}
        style={{ fontFamily: "Inter, var(--font-geist-sans), system-ui, sans-serif", margin: 0, padding: 0, minHeight: "100vh" }}
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
