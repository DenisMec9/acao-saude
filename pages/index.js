import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import QuemSomos from '../components/QuemSomos';
import NossaHistoria from '../components/NossaHistoria';
import AreasAtuacao from '../components/AreasAtuacao';
import DoacaoContatoFooter from '../components/DoacaoContatoFooter';

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <QuemSomos />
      <NossaHistoria />
      <AreasAtuacao />
      <DoacaoContatoFooter />
    </>
  );
}
