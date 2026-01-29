import { Navbar } from "@/components/Navbar";

export default function CommonLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <div className="container mx-auto">{children}</div>
    </>
  );
}
