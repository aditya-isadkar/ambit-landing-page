"use client";

import { Quote, MapPin, Star } from "lucide-react";
import Image from "next/image";
import ScrollAnimation from "./ScrollAnimation";
import customerImage1 from "@/assets/1735034480602.jpeg";
import customerImage2 from "@/assets/1735034548667.jpeg";
import customerImage3 from "@/assets/1735034626284.jpeg";

export default function CustomerStories() {
  const testimonials = [
    {
      location: "Jaipur-based customer",
      sector: "Paints and Varnishes sector",
      comment: "Dealing with Ambit Finvest's highly professional yet customer-focused team was a great experience. With their funding, we were able to expand capacity to 20,000 tons from the earlier 16,000 tons.",
      city: "Jaipur",
      image: customerImage1,
    },
    {
      location: "Mumbai-based customer",
      sector: "Advertising and Marketing sector",
      comment: "Having dealt with other loan providers, what impressed us about Ambit Finvest was the personalized attention that the staff was giving to our application",
      city: "Mumbai",
      image: customerImage2,
    },
    {
      location: "Delhi-based customer",
      sector: "Education sector",
      comment: "Dealing with Ambit Finvest's highly professional yet customer-focused team was a great experience. With their funding, we were able to expand capacity to 20,000 tons from the earlier 16,000 tons.",
      city: "Delhi",
      image: customerImage3,
    },
  ];

  return (
    <section className="py-12 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <ScrollAnimation direction="up">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-secondary-burgundy rounded-xl mb-4 shadow-lg">
              <Quote className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Customer Stories
            </h2>
            <p className="text-sm text-gray-600 max-w-xl mx-auto">
              Real experiences from businesses that have grown with us
            </p>
          </div>
        </ScrollAnimation>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {testimonials.map((testimonial, index) => (
              <ScrollAnimation key={index} direction="up" delay={index * 0.1}>
                <div className="group relative bg-white rounded-lg border border-gray-200 hover:border-primary hover:shadow-lg transition-all duration-300 p-4 h-full flex flex-col">
                  <div className="flex items-start gap-4">
                    {/* Small Circular Image - Left Corner */}
                    <div className="flex-shrink-0 relative">
                      <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-primary">
                        <Image
                          src={testimonial.image}
                          alt={testimonial.location}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="flex-1 min-w-0 flex flex-col">
                      {/* Rating */}
                      <div className="flex items-center gap-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 text-secondary-orange fill-current" />
                        ))}
                      </div>

                      {/* Quote Text */}
                      <div className="flex-1 mb-3">
                        <p className="text-xs text-gray-600 leading-relaxed line-clamp-4">
                          "{testimonial.comment}"
                        </p>
                      </div>

                      {/* Customer Info */}
                      <div className="border-t border-gray-100 pt-3">
                        <div className="flex items-center gap-2 mb-1">
                          <MapPin className="w-3 h-3 text-gray-400" />
                          <span className="text-xs text-gray-500">{testimonial.city}</span>
                        </div>
                        <p className="text-sm font-bold text-gray-900 mb-1">{testimonial.location}</p>
                        <p className="text-xs text-gray-500">{testimonial.sector}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

