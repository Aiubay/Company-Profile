import Navbar from "./navbar/navbar";
import Hero from "./hero/hero";
import Customers from "./customers/customers";
import Process from "./process/process";
import { Results } from "./results/results";
import Contact from "./contact/contact";

export default function Home() {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="min-h-screen py-12 px-4">
        <section id="hero">
          <Hero />
        </section>
        <section id="customers">
          <Customers />
        </section>
        <section id="process">
          <Process />
        </section>
        <section id="results">
          <Results/>
        </section>
        <section id="contact">
          <Contact />
        </section>
      </div>
    </div>
  );
}
