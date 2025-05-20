import { ImageCard } from "@/components/nativecomponent/image-card";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LucideRocket } from "lucide-react";

export default function Hero() {
  return (
    <Card className="w-full">
      <div className="flex items-center w-full p-8">
        <ImageCard src="/file.svg" width={300} height={200} />
        <div className="flex-1 ml-8">
          <h1 className="text-4xl font-bold text-primary text-left">
            Welcome to EcoCycle Solutions
          </h1>
          <p className="mt-4 text-lg text-left">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorem
            qui veritatis exercitationem, neque incidunt ut minus praesentium
            alias unde ullam possimus assumenda corrupti, hic ab distinctio
            voluptate recusandae cupiditate. Enim.
          </p>
          <p className="mt-4 text-lg text-left">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni fuga
            dolore consectetur, nesciunt eos reiciendis culpa repellat
            consequuntur quam sequi laboriosam? Perspiciatis iusto odio autem et
            recusandae architecto nobis hic?
          </p>
          <div className="flex justify-center mt-8">
            <Button variant="default" size="lg" className="text-foreground">
              <LucideRocket className="mr-2 h-5 w-5" />
              Cycle now
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
