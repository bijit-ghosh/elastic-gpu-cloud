
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';

const testimonials = [
  {
    quote: "EGS has transformed our AI workflow. We've reduced GPU costs by 45% while improving model training times.",
    author: "Sarah Chen",
    title: "CTO at DataMind AI",
    avatar: "/placeholder.svg"
  },
  {
    quote: "The precision-aware GPU provisioning is game-changing for our MoE models. We're seeing 3x better performance.",
    author: "Michael Rodriguez",
    title: "ML Lead at ScaleAI Labs",
    avatar: "/placeholder.svg"
  },
  {
    quote: "On-demand GPU activation has cut our inference costs down by 60%. The observability tools are best-in-class.",
    author: "Aisha Johnson",
    title: "Director of AI at Quantum Tech",
    avatar: "/placeholder.svg"
  }
];

const TestimonialSection = () => {
  return (
    <section id="testimonials" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Trusted by <span className="text-gradient">Industry Leaders</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Hear from AI teams who have transformed their machine learning operations with our Elastic GPU Service.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-8 h-full flex flex-col justify-between border border-gray-200 dark:border-gray-700">
              <div>
                <div className="mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="inline-block w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-lg italic mb-6">"{testimonial.quote}"</p>
              </div>
              
              <div className="flex items-center mt-4">
                <Avatar className="h-12 w-12 mr-4">
                  <AvatarImage src={testimonial.avatar} alt={testimonial.author} />
                  <AvatarFallback>{testimonial.author[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-semibold">{testimonial.author}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.title}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
