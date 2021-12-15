import { User } from "firebase/auth";
import Footer from "./footer";
import Header from "./header";

type Props = {
  user?: User | null
  children: React.ReactNode
}

export default function Layout({ user, children }: Props) {
  return (
    <div className="pt-16 overflow-hidden">
      <Header user={user}/>
      <main className="bg-white py-4">
        {children}
      </main>
      <Footer />
    </div>
  );
}
