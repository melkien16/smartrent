import React from 'react';
import { Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Frequent Renter',
    image: 'https://randomuser.me/api/portraits/women/1.jpg',
    content: 'I love how easy it is to find and rent items. The platform is user-friendly and the owners are always responsive.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Item Owner',
    image: 'https://randomuser.me/api/portraits/men/1.jpg',
    content: 'Renting out my camera equipment has been a great way to earn extra income. The payment system is secure and reliable.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'Frequent Renter',
    image: 'https://randomuser.me/api/portraits/women/2.jpg',
    content: 'The variety of items available is amazing. I\'ve rented everything from camping gear to party equipment.',
    rating: 4,
  },
];

const Testimonials = () => (
  <section className="py-16 px-4 sm:px-6 lg:px-8">
    <div className="container mx-auto">
      <h2 className="text-3xl font-bold text-gray-900">What Our Users Say</h2>
      <p className="mt-2 text-gray-600">Hear from our community of renters and owners</p>
      
      <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
          >
            <div className="flex items-center">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="h-12 w-12 rounded-full"
              />
              <div className="ml-4">
                <h3 className="font-medium text-gray-900">{testimonial.name}</h3>
                <p className="text-sm text-gray-500">{testimonial.role}</p>
              </div>
            </div>
            <div className="mt-4 flex">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <p className="mt-4 text-gray-600">{testimonial.content}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default React.memo(Testimonials); 