export default function BrandPartners() {
  return (
    <section className="py-12 border-y bg-gray-50/50">
      <p className="text-center text-sm font-medium text-muted-foreground mb-8 uppercase tracking-widest">
        Authorized Retailer of Leading Brands
      </p>
      <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all">
        {/* Replace with actual logos */}
        <div className="text-2xl font-bold">SQUARE</div>
        <div className="text-2xl font-bold">BEXIMCO</div>
        <div className="text-2xl font-bold">INCEPTA</div>
        <div className="text-2xl font-bold">ESKAYEF</div>
        <div className="text-2xl font-bold">RENATA</div>
      </div>
    </section>
  );
}
