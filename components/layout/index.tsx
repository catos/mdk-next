import { User } from "firebase/auth";
import Head from "next/head";
import Footer from "./footer";
import Header from "./header";

type Props = {
  user?: User | null
  children: React.ReactNode
}

export default function Layout({ user, children }: Props) {
  return (
    <div className="pt-16 overflow-hidden">
      <Head>
        <title>MDK</title>
        <meta name="description" content="Min Digitale Kokebok" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="bg-white py-4 px-4 min-h-[80vh] sm:px-0">
        {children}
      </main>
      <Footer />
    </div>
  );
}
