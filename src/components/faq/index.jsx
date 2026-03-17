export default function FAQComponent() {
  return (
    <section className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-4">General Questions</h2>
          
            <div className="border-b border-gray-200 pb-4 mb-4">
              <p className="py-2 font-semibold">Who is Surgi Makers?</p>
              <p className="pt-2 text-gray-600">Surgi Makers is a premium manufacturer of surgical, dental, and beauty instruments based in Dallas, Texas. We combine cutting-edge technology with unparalleled craftsmanship to produce the finest medical instruments that meet global quality standards including ISO 13485 certification.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}