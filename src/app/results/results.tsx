import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function Results() {
  return (
    <div className="mt-12">
      <div>
        <Card className="flex items-center justify-center">
        <div className="flex items-center justify-center mb-8">
          <h1 className="text-3xl text-primary font-bold">Results</h1>
        </div>
          <Carousel className="w-full max-w-[800px] sm:max-w-[600px] md:max-w-[800px] lg:max-w-[1200px] mx-auto">
            <CarouselContent>
              {Array.from({ length: 5 }).map((_, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <Card>
                      <CardContent className="flex aspect-square items-center justify-center p-6">
                        <img
                          src="/window.svg"
                          alt="Result"
                          className="object-cover w-full h-full"
                        />
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </Card>
      </div>
    </div>
  );
}
