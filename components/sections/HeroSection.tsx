export default function HeroSection() {
  return (
    <section 
      className="relative w-full py-24 md:py-36 flex flex-col items-center justify-center text-center px-4 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: 'url("https://plazmathemes.com/modules/badhomebanner/views/img/demo_img_1.png")' }}
    >
      <h1 className="text-[32px] md:text-5xl lg:text-[54px] font-bold tracking-tight text-theme-gray-800 mb-4 w-full leading-tight flex flex-col items-center">
        <span>249+ Best PrestaShop</span>
        <span className="text-transparent bg-clip-text bg-(image:--theme-background-gradiant) mt-2 inline-block whitespace-normal md:whitespace-nowrap drop-shadow-sm">
          Themes & Templates Marketplace
        </span>
      </h1>
      
      <p className="text-theme-gray-600 mt-4 mb-8 max-w-2xl mx-auto text-base md:text-lg font-medium">
        Multi-Purpose Prestashop 1.7 & 8.X Responsive Theme!
      </p>

      <button type="button" className="bg-(image:--theme-background-gradiant) text-white px-8 py-2.5 rounded-sm font-semibold tracking-wide hover:opacity-90 transition-all shadow-md mt-2">
        See Live Demos
      </button>
    </section>
  );
}
