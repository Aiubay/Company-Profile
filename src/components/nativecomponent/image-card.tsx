import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import Image from "next/image";
import { ReactNode } from "react";

interface ImageCardProps {
  src?: string; // optional image path
  alt?: string;
  title?: string;
  description?: string;
  width?: number;
  height?: number;
  rounded?: boolean;
  svg?: ReactNode;
}

export function ImageCard({
  src,
  alt = "image",
  title,
  description,
  width = 400,
  height = 300,
  rounded = true,
  svg,
}: ImageCardProps) {
  return (
    <Card className="w-fit">
      {title && (
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
      )}
      <CardContent>
        {svg ? (
          <div className="w-[300px] h-[150px] text-green-600 dark:text-green-400">
            {svg}
          </div>
        ) : (
          src && (
            <Image
              src={src}
              alt={alt}
              width={width}
              height={height}
              className={rounded ? "rounded-xl" : ""}
              style={{ aspectRatio: "1/1", }}
            />
          )
        )}
      </CardContent>
    </Card>
  );
}
