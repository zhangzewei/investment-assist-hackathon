import type { Metadata } from "next";
import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { RiskPreferenceStoreProvider } from "@/providers/RiskPreferenceProvider";

export const metadata: Metadata = {
  title: "investment-assist",
  description: "web3 investment assistant",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className='antialiased'
      >
        <SidebarProvider>
          <AppSidebar />
          <main className="w-full">
            <SidebarTrigger />
            <RiskPreferenceStoreProvider>
              {children}
            </RiskPreferenceStoreProvider>
          </main>
        </SidebarProvider>
      </body>
    </html>
  );
}
