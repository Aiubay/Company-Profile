import * as React from "react";
import { Handshake, RefreshCw, Box} from "lucide-react"; 

export default function Customers() {
  const pillarItems = [
    
    {
      icon: Handshake, 
      title: "Partnership", 
      desc: "We build strong collaborations with communities and industries to foster sustainable practices.",
    },
    {
      icon: RefreshCw, 
      title: "Innovation", 
      desc: "Utilizing cutting-edge technology, we transform waste into valuable resources efficiently.",
    },
    {
      icon: Box, 
      title: "Impact", 
      desc: "Delivering eco-friendly products and solutions that contribute to a circular economy.",
    },
  ];

  return (
    <section className="py-12 bg-background text-primary">
      {" "}
    
      <div className="container mx-auto px-4 md:px-8 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-12">
          Our Core Pillars
        </h2>{" "}
      
        <div className="flex flex-col md:flex-row gap-8 justify-center mt-8">
          {" "}
          {pillarItems.map((item, idx) => (
            <div
              className="flex flex-col items-center text-center p-4"
              key={idx}
            >
              <div className="p-4 rounded-full bg-primary/10 text-primary mb-4 flex items-center justify-center">
                <item.icon size={80} />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-1">
                {item.title}
              </h3>
              <p className="text-sm text-muted-foreground max-w-xs">
                {item.desc}
              </p>{" "}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
