import ProtectedRoute from "@/components/protectedRoute";
import SideBar from "@/components/sideBar";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProtectedRoute>
    <div className="flex">
      <SideBar />
      <main className="flex-1">{children}</main>
    </div>
    </ProtectedRoute>
  );
}
