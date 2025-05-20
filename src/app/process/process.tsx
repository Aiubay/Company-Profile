import { ImageCard } from "@/components/nativecomponent/image-card";
import { Card } from "@/components/ui/card";

export default function Process() {
  return (
    <>
      <Card className="w-full mt-12">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold text-primary text-center">
            How it works
          </h1>
        </div>
        <div className="py-12 px-4">
          <div className="flex gap-x-[10vw] justify-center">
            {[
              {
                img: "/file.svg",
                alt: "Customer 1",
                title: "Customer 1",
                desc: "Description for customer 1.",
              },
              {
                img: "/file.svg",
                alt: "Customer 2",
                title: "Customer 2",
                desc: "Description for customer 2.",
              },
              {
                img: "/file.svg",
                alt: "Customer 3",
                title: "Customer 3",
                desc: "Description for customer 3.",
              },
            ].map((customer, idx) => (
              <div className="text-center" key={idx}>
                <ImageCard
                  key={idx}
                  src={customer.img}
                  alt={customer.alt}
                  width={300}
                  height={200}
                />
                <h2 className="text-lg font-bold text-primary mt-2">
                  {customer.title}
                </h2>
                <p className="text-sm text-muted-foreground">{customer.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </>
  );
}
