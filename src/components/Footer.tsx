import { Instagram, Facebook, MapPin } from 'lucide-react';

export default function Footer() {
  const footerSections = [
    {
      title: 'Shop',
      links: ['Men', 'Women', 'Unisex'],
    },
    {
      title: 'Support',
      links: ['Size Guide', 'Returns', 'FAQs'],
    },
  ];

  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="space-y-4">
            <p className="text-gray-400 text-sm">
              Redefining urban comfort with timeless, minimalist designs.
            </p>

            <div className="space-y-2">
              <p className="text-sm text-gray-400 mb-1">WhatsApp:</p>
              <a
                href="https://wa.me/254793832286"
                className="text-green-400 hover:text-green-300 transition-colors inline-block"
              >
                +254 793 832 286
              </a>
            </div>

            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <MapPin className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium mb-1">Visit Our Store:</p>
                  <p className="text-gray-400 text-sm">
                    Runda Mall, Kiambu Rd<br />
                    First Floor, Shop No. F8
                  </p>
                  <a
                    href="https://www.google.com/maps/place/RUNDA+MALL/@-1.2181615,36.8329139,17z/data=!3m1!4b1!4m6!3m5!1s0x182f172e2b70590b:0x20bdc7064aaa2d25!8m2!3d-1.2181669!4d36.8354942!16s%2Fg%2F11sw__j8tq?authuser=0&entry=ttu&g_ep=EgoyMDI1MTEwNC4xIKXMDSoASAFQAw%3D%3D"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 text-sm inline-block mt-2 transition-colors"
                  >
                    View on Google Maps →
                  </a>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4">
              {footerSections.map((section, index) => (
                <div key={index}>
                  <h4 className="font-bold mb-3 text-sm">{section.title}</h4>
                  <ul className="space-y-2">
                    {section.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <a
                          href="#"
                          className="text-gray-400 hover:text-white transition-colors text-sm"
                        >
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="h-80 lg:h-full min-h-[320px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.0646877432724!2d36.832913875573435!3d-1.2181615355648748!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f172e2b70590b%3A0x20bdc7064aaa2d25!2sRUNDA%20MALL!5e0!3m2!1sen!2ske!4v1699999999999!5m2!1sen!2ske"
              width="100%"
              height="100%"
              style={{ border: 0, borderRadius: '12px' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Runda Mall Location"
            ></iframe>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400">
            © 2025. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <p className="text-sm text-gray-400">Follow Us:</p>
            <a
              href="#"
              className="p-2 hover:bg-gray-800 rounded-full transition-colors"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="p-2 hover:bg-gray-800 rounded-full transition-colors"
            >
              <Facebook className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
