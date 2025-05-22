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
} from "@/types/unsplash/unsplash"; // Adjust path as needed


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
          "plastic"
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
    return <div className="mt-12 text-center">Loading photos...</div>;
  }

  if (error) {
    return (
      <div className="mt-12 text-center text-red-500">
        Error: {error.message || "An unexpected error occurred."}
        <br />
        Please check your Unsplash API key and network connection.
      </div>
    );
  }

  if (photos.length === 0) {
    return <div className="mt-12 text-center">No photos found.</div>;
  }

  return (
    <div className="mt-12">
      <div>
        <div className="flex items-center justify-center mb-8">
          <h1 className="text-3xl text-primary font-bold">Results</h1>
        </div>
        <Carousel className="w-full max-w-[800px] sm:max-w-[900px] md:max-w-[800px] lg:max-w-[1500px] mx-auto">
          <CarouselContent>
            {photos.map(
              (
                photo: UnsplashPhoto // Explicitly type 'photo' in map callback
              ) => (
                <CarouselItem
                  key={photo.id}
                  className="md:basis-1/2 lg:basis-1/3"
                >
                  <div className="p-1 h-full">
                  <Card className="w-full h-full overflow-hidden rounded-lg py-0">
                    <CardContent className="flex items-center justify-center p-0 w-full h-full">
                    {photo.urls && photo.urls.small ? (
                      <img
                      src={photo.urls.small}
                      alt={
                        photo.alt_description ||
                        `Unsplash photo by ${photo.user?.name || "unknown"}`
                      }
                      className="object-cover w-full h-full rounded-lg"
                      style={{ aspectRatio: "4/3", width: "100%", height: "100%" }}
                      />
                    ) : (
                      <div className="flex items-center justify-center w-full h-full bg-gray-200 text-gray-500">
                      Image not available
                      </div>
                    )}
                    </CardContent>
                  </Card>
                  </div>
                </CarouselItem>
              )
            )}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
}
