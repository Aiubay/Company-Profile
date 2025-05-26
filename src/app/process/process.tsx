// components/HowItWorks.tsx
import React from "react";
import { Handshake, LeafyGreen, Package } from "lucide-react"; // More thematic icons from lucide-react

interface WorkStepProps {
  icon: React.ElementType;
  title: string;
  description: string;
}

const WorkStep: React.FC<WorkStepProps> = ({
  icon: Icon,
  title,
  description,
}) => {
  return (
    <div
      className="
        flex flex-col items-center p-6 bg-card text-card-foreground rounded-xl
        shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out
        text-center
      "
    >
      <div className="p-4 rounded-full bg-primary/10 text-primary mb-4">
        {" "}
        {/* Using primary color for icon background */}
        <Icon size={48} /> {/* Slightly larger icons */}
      </div>
      <h4 className="text-xl font-semibold mb-2 text-foreground">{title}</h4>
      <p className="text-muted-foreground text-base leading-relaxed">
        {description}
      </p>{" "}
      {/* Better readability */}
    </div>
  );
};

export function Process() {
  return (
    <section className="py-20 bg-background text-foreground">
      <div className="container mx-auto px-4 md:px-8 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-primary mb-16">
          How It Works
        </h2>{" "}
        {/* Increased mb */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {" "}
          {/* Increased gap */}
          <WorkStep
            icon={Handshake} // Partner icon
            title="Partner Collaboration"
            description="We establish strong partnerships with local communities and businesses to ensure efficient collection of plastic waste at its source."
          />
          <WorkStep
            icon={LeafyGreen} // Recycle icon - more organic feel
            title="Innovative Recycling"
            description="Our advanced sorting and processing technologies transform collected plastics into high-quality, reusable raw materials."
          />
          <WorkStep
            icon={Package} // Product icon
            title="Sustainable Products"
            description="These recycled materials are then utilized to create a diverse range of valuable, eco-friendly products, closing the loop."
          />
        </div>
      </div>
    </section>
  );
}
