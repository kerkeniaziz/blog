import SideBar from "@/components/sideBar";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      >
        
        {children}
        <SideBar />
        
      </body>
    </html>
  );
}
