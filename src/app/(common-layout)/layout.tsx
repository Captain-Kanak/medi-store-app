import Footer from "@/components/layouts/Footer";
import { Navbar } from "@/components/layouts/Navbar";

export default function CommonLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />

      <div className="container mx-auto">{children}</div>

      <Footer />
    </>
  );
}
