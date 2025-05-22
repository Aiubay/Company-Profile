import { ImageCard } from "@/components/nativecomponent/image-card";
import { Card } from "@/components/ui/card";

export default function Customers() {
  return (
    <div>
      {/* <Card className="w-full mt-12"> */}
      <div className="flex gap-x-[10vw] justify-center mt-12">
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
              width={150}
              height={75}
            />
            <h2 className="text-lg font-bold text-primary mt-2">
              {customer.title}
            </h2>
            <p className="text-sm text-muted-foreground">{customer.desc}</p>
          </div>
        ))}
      </div>
      {/* </Card> */}
    </div>
  );
}
