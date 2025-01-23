import { Toaster } from '@/components/ui/toaster';
import Footer from './components/shared/Footer';
import Navbar from './components/shared/Navbar';

const layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto min-h-[50vh] bg-white px-4 shadow-md">{children}</main>
      <Footer />
      <Toaster />
    </>
  );
};

export default layout;
