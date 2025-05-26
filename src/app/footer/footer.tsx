// components/Footer.tsx
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-card text-card-foreground py-12">
      {" "}
      {/* bg-card and text-card-foreground adapt */}
      <div className="container mx-auto px-4 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 lg:gap-16">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-foreground">
              <Link
                href="#"
                className="hover:text-muted-foreground transition-colors duration-200"
              >
                Contact
              </Link>
            </h3>
          </div>

          {/* Customer Service Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-foreground">
              <Link
                href="#"
                className="hover:text-muted-foreground transition-colors duration-200"
              >
                Email
              </Link>
            </h3>
            {/* <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link
                  href="#"
                  className="hover:text-foreground transition-colors duration-200"
                >
                  Prices and Payments
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-foreground transition-colors duration-200"
                >
                  Shipping
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-foreground transition-colors duration-200"
                >
                  Return Policy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-foreground transition-colors duration-200"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-foreground transition-colors duration-200"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul> */}
          </div>

          {/* Social Media Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-foreground">
              <Link
                href="#"
                className="hover:text-muted-foreground transition-colors duration-200"
              >
                Whatsapp
              </Link>
            </h3>
            {/* <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link
                  href="#"
                  className="hover:text-foreground transition-colors duration-200"
                >
                  Instagram
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-foreground transition-colors duration-200"
                >
                  Facebook
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-foreground transition-colors duration-200"
                >
                  LinkedIn
                </Link>
              </li>
            </ul> */}
          </div>

          {/* Logo Section */}
          <div className="flex items-center justify-start md:justify-end mt-8 md:mt-0">
            <span className="text-4xl font-bold tracking-tight uppercase text-foreground">
              EcoCycle
            </span>
          </div>
        </div>
      </div>
      <div className="mt-12 pt-8 border-t border-border text-center text-xs text-muted-foreground">
        &copy; {new Date().getFullYear()} EcoCycle Solutions. All rights
        reserved.
      </div>
    </footer>
  );
}
