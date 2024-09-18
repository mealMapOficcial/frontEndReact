import "@/app/ui/global.css"
import { montserrat } from "./ui/fonts";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${montserrat.className} antialiased`}>
          {children}
          <footer className="py-10 flex justify-center items-center"> {/*dependiendo donde ponga las etiquetas y la info, van a quedar en esa posicion dentro de las paginas*/}
            Hecho con ♥ por la gente de vercel
          </footer>
      </body>
    </html>
  );
}
