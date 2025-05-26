"use client";
import * as React from "react";
import { useState, useEffect } from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import {
  fetchRandomUnsplashPhotos,
  UnsplashPhoto,
} from "@/service/unsplash/unsplash"; 
import Image from "next/image";

export function Results() {
  const [photos, setPhotos] = useState<UnsplashPhoto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadPhotos = async () => {
      try {
        setLoading(true); 
        const fetchedPhotos = await fetchRandomUnsplashPhotos(
          5,
          "eco-friendly products"
        );
        setPhotos(fetchedPhotos);
      } catch (err: any) {
        console.error("Error in Results component:", err);
        if (err instanceof Error) {
          setError(err);
        } else {
          setError(new Error(String(err)));
        }
      } finally {
        setLoading(false); // Always set loading to false when done
      }
    };

    loadPhotos();
  }, []); // Run once on mount

  if (loading) {
    return (
      <section className="py-20 bg-muted text-foreground">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-16">Our Results</h2>
          <div className="text-lg text-muted-foreground">
            Loading impactful photos...
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-muted text-foreground">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-16">Our Results</h2>
          <div className="text-lg text-destructive">
            Error loading photos:{" "}
            {error.message || "An unexpected error occurred."}
            <br />
            Please ensure your Unsplash API key is valid and configured
            correctly.
          </div>
        </div>
      </section>
    );
  }

  if (photos.length === 0) {
    return (
      <section className="py-20 bg-muted text-foreground">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-16">Our Results</h2>
          <div className="text-lg text-muted-foreground">
            No relevant photos found at this time.
          </div>
        </div>
      </section>
    );
  }

  return (
    <div className="mt-12">
      <div>
        <div className="flex items-center justify-center mb-8">
          <h1 className="text-5xl text-primary font-bold">Our Results</h1>
        </div>
        <Carousel className="w-full max-w-[800px] sm:max-w-[900px] md:max-w-[800px] lg:max-w-[1500px] mx-auto">
          <CarouselContent>
            {photos.map((photo: UnsplashPhoto) => (
              <CarouselItem
                key={photo.id}
                className="md:basis-1/2 lg:basis-1/3"
              >
                <div className="p-1 h-full">
                  <Card className="w-full h-full overflow-hidden rounded-lg py-0 ">
                    <CardContent className="flex items-center justify-center p-0 w-full h-full shadow-lg">
                      {photo.urls && photo.urls.small ? (
                        <>
                          <Image
                            src={photo.urls.small}
                            alt={
                              photo.alt_description ||
                              `Unsplash photo by ${
                                photo.user?.name || "unknown"
                              }`
                            }
                            width={photo.width}
                            height={photo.height}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500 ease-in-out"
                            style={{
                              aspectRatio: "4/3",
                              width: "100%",
                              height: "100%",
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <p className="text-white text-sm font-medium line-clamp-2">
                              {photo.alt_description ||
                                `Photo by ${photo.user?.name || "Unsplash"}`}
                            </p>
                          </div>
                        </>
                      ) : (
                        <div className="flex items-center justify-center w-full h-full bg-gray-200 text-gray-500">
                          Image not available
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
}
