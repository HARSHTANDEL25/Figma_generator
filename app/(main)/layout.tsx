import Header from "../_shared/Header";
import Hero from "../_shared/Hero";

export default function MainLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Header />
      <Hero />
      {children}
    </>
  );
}
