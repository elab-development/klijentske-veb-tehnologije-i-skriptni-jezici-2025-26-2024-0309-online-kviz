import type { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import '../css/Layout.css';

interface LayoutProps {
  children: ReactNode;
  username?: string;
}

export default function Layout({ children, username }: LayoutProps) {
  return (
    <>
      <Navbar username={username} />
      <main className="layout-main">
        {children}
      </main>
      <Footer />
    </>
  );
}
