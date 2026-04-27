export function Footer() {
  return (
    <footer className="bg-bg-base/90 border-t border-white py-16 text-center">
      <div className="font-serif text-3xl font-bold bg-gradient-to-br from-dusty-rose to-gold bg-clip-text text-transparent mb-4">
        Glam Studio
      </div>
      <p className="text-sm text-text-mid font-medium tracking-widest mb-8">UNISEX LUXURY BEAUTY · GROOMING · SPA</p>
      
      <div className="flex justify-center gap-6 mb-8 text-sm font-medium text-text-mid">
        <a href="#services" className="hover:text-dusty-rose">Services</a>
        <a href="#team" className="hover:text-dusty-rose">Team</a>
        <a href="#reviews" className="hover:text-dusty-rose">Reviews</a>
      </div>

      <div className="pt-8 border-t border-dusty-rose/20 max-w-xl mx-auto text-xs text-text-mid/60">
        © 2026 Glam Studio Beauty Parlour. All rights reserved. Crafted with Soft Elegance
      </div>
    </footer>
  );
}
