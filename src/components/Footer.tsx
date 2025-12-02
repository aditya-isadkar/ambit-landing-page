import { Phone, Mail, MapPin, Clock } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Contact Us */}
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Phone className="w-5 h-5" />
              Contact Us
            </h3>
            <div className="space-y-3">
              <a
                href="tel:+919876543210"
                className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4" />
                +91 98765 43210
              </a>
              <a
                href="mailto:info@ambitfinvest.com"
                className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4" />
                info@ambitfinvest.com
              </a>
              <div className="flex items-center gap-2 text-gray-300">
                <MapPin className="w-4 h-4" />
                Mumbai, Maharashtra
              </div>
            </div>
          </div>

          {/* Business Hours */}
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Business Hours
            </h3>
            <div className="space-y-2 text-gray-300">
              <div>Mon - Fri: 9:00 AM - 7:00 PM</div>
              <div>Sat: 9:00 AM - 5:00 PM</div>
              <div>Sun: Closed</div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Ambit Finvest. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

