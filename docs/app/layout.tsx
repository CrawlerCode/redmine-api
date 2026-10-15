import { Inter, JetBrains_Mono } from "next/font/google";
import type { Metadata } from "next";
import { Provider } from "@/components/provider";
import { appName } from "@/lib/shared";
import "./global.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: { template: `%s | ${appName}`, default: appName },
  description: "TypeScript client, React Query integration and OpenAPI reference for the Redmine REST API",
};

export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable} font-sans`} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
