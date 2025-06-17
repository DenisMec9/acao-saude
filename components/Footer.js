
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:justify-between">
          <div className="mb-8 md:mb-0">
            <div className="flex-shrink-0 flex items-center">
              <img src="/imagens/Coração Laranja.png" alt="Ação Saúde Logo" className="h-12" />
              <span className="text-xl font-bold ml-2">Ação Saúde</span>
              <span className="ml-2 text-sm text-[#ff7415]">Eu faço o bem</span>
            </div>
            <p className="text-gray-400 max-w-xs mt-4">
              Levar acesso à saúde integralmente à quem precisa é nossa missão.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-[#ff7415] font-bold mb-4">Links</h3>
              <ul className="space-y-2">
                <li><a href="#quem-somos" className="text-gray-400 hover:text-white transition duration-300">Quem Somos</a></li>
                <li><a href="#atuacao" className="text-gray-400 hover:text-white transition duration-300">Áreas de Atuação</a></li>
                <li><a href="#doacao" className="text-gray-400 hover:text-white transition duration-300">Doação</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-[#ff7415] font-bold mb-4">Contato</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-start"><i className="fas fa-map-marker-alt text-[#ff7415] mr-2 mt-1"></i><span>Recife, PE - Brasil</span></li>
                <li className="flex items-start"><i className="fas fa-envelope text-[#ff7415] mr-2 mt-1"></i><span>contato@acaosaude.org</span></li>
                <li className="flex items-start"><i className="fas fa-phone text-[#ff7415] mr-2 mt-1"></i><span>(81) 98745-5207</span></li>
              </ul>
            </div>
            <div>
              <h3 className="text-[#ff7415] font-bold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Termos de Uso</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Política de Privacidade</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Transparência</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 mb-4 md:mb-0">&copy; 2025 Ação Saúde. Todos os direitos reservados.</p>
          <div className="flex space-x-4">
            <a href="https://www.facebook.com/acaosaudeeufacoobem?locale=pt_BR" className="text-[#ff7415] hover:text-[#e5670d] text-2xl" target="_blank"><i className="fab fa-facebook"></i></a>
            <a href="https://www.instagram.com/acaosaude_/" className="text-[#ff7415] hover:text-[#e5670d] text-2xl" target="_blank"><i className="fab fa-instagram"></i></a>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
