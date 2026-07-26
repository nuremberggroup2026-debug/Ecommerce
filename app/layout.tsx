
import { cn } from "@/lib/utils";
import Footer from "@/widgets/Footer";
import "./globals.css";
import { StoreProvider } from "@/providers/StoreProvider";
import {Navbar} from "@/widgets/navbar/index"



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
    >
      <StoreProvider>
      <body className="min-h-full flex flex-col">
              <Navbar  />
{children}
<Footer/>

</body>
</StoreProvider>
    </html>
  );
}
