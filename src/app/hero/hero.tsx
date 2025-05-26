import { ImageCard } from "@/components/nativecomponent/image-card";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LucideRocket } from "lucide-react";

export default function Hero() {
  return (
    <section
      className="relative flex items-center justify-center min-h-[70vh] overflow-hidden p-8 md:p-16"
      style={{
        background: "linear-gradient(135deg, #2E7D7D 0%, #1A4D4D 100%)",
      }}
      data-theme-dark-style={{
        background: "linear-gradient(135deg, #1A4D4D 0%, #0F2A2A 100%)",
      }}
    >
      <div
        className="absolute top-0 left-0 w-64 h-64 bg-green-400 dark:bg-green-700 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"
        style={{ transform: "translate(-50%, -50%)" }}
      ></div>
      <div
        className="absolute bottom-0 right-0 w-96 h-96 bg-teal-300 dark:bg-teal-600 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"
        style={{ transform: "translate(50%, 50%)" }}
      ></div>
      <div
        className="absolute top-1/2 left-1/2 w-72 h-72 bg-blue-300 dark:bg-blue-600 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"
        style={{ transform: "translate(-50%, -50%)" }}
      ></div>

      <div className="relative z-10 text-center flex flex-col items-center justify-center space-y-6 max-w-4xl mx-auto text-white dark:text-gray-100">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold leading-tight tracking-tight drop-shadow-lg">
          EcoCycle Solutions
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl max-w-2xl font-light opacity-90">
          Transforming plastic waste into valuable resources for a sustainable
          future.
        </p>
        <Button
          className="mt-8 px-10 py-7 text-lg md:text-xl shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-400 focus:ring-opacity-75"
          variant="default"
        >
          Contact Us
        </Button>
      </div>
    </section>
    // <Card className="w-full">
    //   <div className="flex items-center w-full p-8">
    //     <ImageCard src="/file.svg" width={300} height={200} />
    //     <div className="flex-1 ml-8">
    //       <h1 className="text-4xl font-bold text-primary text-left">
    //         Welcome to EcoCycle Solutions
    //       </h1>
    //       <p className="mt-4 text-lg text-left">
    //         Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorem
    //         qui veritatis exercitationem, neque incidunt ut minus praesentium
    //         alias unde ullam possimus assumenda corrupti, hic ab distinctio
    //         voluptate recusandae cupiditate. Enim.
    //       </p>
    //       <p className="mt-4 text-lg text-left">
    //         Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni fuga
    //         dolore consectetur, nesciunt eos reiciendis culpa repellat
    //         consequuntur quam sequi laboriosam? Perspiciatis iusto odio autem et
    //         recusandae architecto nobis hic?
    //       </p>
    //       <div className="flex justify-center mt-8">
    //         <Button variant="default" size="lg">
    //           <LucideRocket className="mr-2 h-5 w-5" />
    //           Cycle now
    //         </Button>
    //       </div>
    //     </div>
    //   </div>
    // </Card>
  );
}
