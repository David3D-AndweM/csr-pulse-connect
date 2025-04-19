import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import logo from '../assets/logo.svg';

export default function Landing() {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero section */}
      <header className="bg-gradient-to-r from-primary to-primary/80 text-white">
        <nav className="container mx-auto py-4 px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img 
              src={logo} 
              alt="Clareo Non Profit" 
              className="h-10 w-10 rounded-full" 
              onError={(e) => {
                e.currentTarget.src = 'https://via.placeholder.com/40';
              }}
            />
            <h1 className="text-xl font-bold">Clareo Non Profit</h1>
          </div>
          <div>
            {user ? (
              <Button 
                variant="outline" 
                onClick={() => navigate('/dashboard')}
                className="text-white border-white hover:bg-white hover:text-primary"
              >
                Dashboard
              </Button>
            ) : (
              <Button 
                variant="outline" 
                onClick={() => navigate('/login')}
                className="text-white border-white hover:bg-white hover:text-primary"
              >
                Sign In
              </Button>
            )}
          </div>
        </nav>

        <div className="container mx-auto px-6 py-20 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Empowering Communities Through Strategic CSR
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Streamlining Corporate Social Responsibility initiatives to create lasting positive impacts across communities.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              size="lg" 
              onClick={() => navigate(user ? '/dashboard' : '/login')}
              className="bg-white text-csr-dark hover:bg-gray-100"
            >
              {user ? 'Go to Dashboard' : 'Get Started'}
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => navigate('/blog')}
              className="border-white text-white hover:bg-white hover:text-csr-dark"
            >
              Learn More
            </Button>
          </div>
        </div>
      </header>

      {/* Impact section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Our Impact</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="bg-csr-light inline-flex p-4 rounded-full text-csr-primary mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v8"></path>
                  <circle cx="12" cy="14" r="8"></circle>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">35+ Projects</h3>
              <p className="text-gray-600">Successfully completed CSR initiatives across multiple regions.</p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="bg-csr-light inline-flex p-4 rounded-full text-csr-primary mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M22 21v-2a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">10,000+ Lives Impacted</h3>
              <p className="text-gray-600">Direct positive impact on communities through our various programs.</p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="bg-csr-light inline-flex p-4 rounded-full text-csr-primary mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">15+ Partner Organizations</h3>
              <p className="text-gray-600">Collaborative efforts with like-minded organizations for greater impact.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured projects */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Projects</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="border rounded-lg overflow-hidden">
              <div className="h-48 bg-gray-300"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Clean Water Initiative</h3>
                <p className="text-gray-600 mb-4">Providing clean water access to rural communities.</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-csr-primary">Eastern Region</span>
                  <span className="bg-green-100 text-green-800 text-xs rounded px-2 py-1">Completed</span>
                </div>
              </div>
            </div>
            
            <div className="border rounded-lg overflow-hidden">
              <div className="h-48 bg-gray-300"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Education for All</h3>
                <p className="text-gray-600 mb-4">Building schools and providing educational materials.</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-csr-primary">Northern Region</span>
                  <span className="bg-blue-100 text-blue-800 text-xs rounded px-2 py-1">In Progress</span>
                </div>
              </div>
            </div>
            
            <div className="border rounded-lg overflow-hidden">
              <div className="h-48 bg-gray-300"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Green Energy Initiative</h3>
                <p className="text-gray-600 mb-4">Installing solar panels in community buildings.</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-csr-primary">Western Region</span>
                  <span className="bg-yellow-100 text-yellow-800 text-xs rounded px-2 py-1">Planned</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-10">
            <Button onClick={() => navigate('/blog')}>
              View All Projects
            </Button>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-16 bg-csr-primary text-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Testimonials</h2>
          
          <div className="max-w-3xl mx-auto">
            <blockquote className="text-center">
              <p className="text-xl italic mb-4">
                "The Clean Water Initiative has transformed our community. We now have reliable access to clean water, which has improved health outcomes and quality of life for everyone."
              </p>
              <cite className="not-italic font-medium">
                — Sarah Johnson, Community Leader
              </cite>
            </blockquote>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-6 md:mb-0">
              <h3 className="text-xl font-bold mb-4">Clareo Non Profit</h3>
              <p className="max-w-xs">Empowering communities through strategic CSR initiatives and sustainable development projects.</p>
            </div>
            
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
              <div>
                <h4 className="font-semibold mb-4">About</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="hover:underline">Our Mission</a></li>
                  <li><a href="#" className="hover:underline">Our Team</a></li>
                  <li><a href="#" className="hover:underline">Partners</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Projects</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="hover:underline">Current Projects</a></li>
                  <li><a href="#" className="hover:underline">Past Projects</a></li>
                  <li><a href="#" className="hover:underline">Impact Reports</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Contact</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="hover:underline">Contact Us</a></li>
                  <li><a href="#" className="hover:underline">Support</a></li>
                  <li><a href="#" className="hover:underline">Donate</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <hr className="border-gray-700 my-8" />
          
          <div className="text-center text-sm">
            <p>&copy; {new Date().getFullYear()} Clareo Non Profit. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
