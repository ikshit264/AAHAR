import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground mt-12 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-xl font-bold">Our Restaurant</h2>
            <p className="mt-2">123 Foodie Street, Tasty Town</p>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-secondary transition-colors">
              <FaFacebook className="h-6 w-6" />
            </a>
            <a href="#" className="hover:text-secondary transition-colors">
              <FaInstagram className="h-6 w-6" />
            </a>
            <a href="#" className="hover:text-secondary transition-colors">
              <FaTwitter className="h-6 w-6" />
            </a>
          </div>
        </div>
        <div className="mt-8 text-center text-sm">
          <p>&copy; 2023 Our Restaurant. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
