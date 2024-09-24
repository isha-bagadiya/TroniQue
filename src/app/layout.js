import "./globals.css";
import { CreditsProvider } from "./components/CreditsContext";
import {TronLinkProvider} from "./providers"

export const metadata = {
  title: "Tronique",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <TronLinkProvider>
          <CreditsProvider>{children}</CreditsProvider>
          </TronLinkProvider>
      </body>
    </html>
  );
}
