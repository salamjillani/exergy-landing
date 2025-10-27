"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Menu, Linkedin, HardHat, X } from "lucide-react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import emailjs from "@emailjs/browser";
import { toast } from "sonner";

export default function SolutionsPage() {
  const pathname = usePathname();
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    emailjs.init("s_9t3BpECERoZ008T");
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await emailjs.sendForm(
        "service_88mykdn",
        "template_ob6vjap",
        e.currentTarget,
        "s_9t3BpECERoZ008T"
      );

      if (result.status === 200) {
        toast.success("Message sent successfully! We&apos;ll get back to you soon.");
        setFormData({
          name: "",
          company: "",
          phone: "",
          email: "",
          message: "",
        });
      }
    } catch (error) {
      console.error("EmailJS error:", error);
      toast.error(
        "Failed to send message. Please try again or contact us directly."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToContact = (e) => {
    e.preventDefault();
    document
      .getElementById("contact-form")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/95 backdrop-blur-sm border-b border-zinc-800/50">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between px-4 sm:px-8 py-5">
          <div className="flex items-center space-x-3">
            <Link href="/" className="flex items-center space-x-3">
              <img
                src="/exergy-logo-symbol.png"
                alt="Exergy Logo"
                className="h-8 w-auto"
              />
              <span className="text-2xl font-semibold">Exergy</span>
            </Link>
          </div>

          <div className="hidden lg:flex items-center space-x-10 text-[15px] font-medium">
            <a
              href="/"
              className={`transition-colors ${pathname === '/' ? 'text-white' : 'text-zinc-400 hover:text-white'}`}
            >
              Platform Overview
            </a>
            <a
              href="/solutions"
              className={`transition-colors ${pathname === '/solutions' ? 'text-white' : 'text-zinc-400 hover:text-white'}`}
            >
              Solutions
            </a>
            <a
              href="/documentation"
              className={`transition-colors ${pathname === '/documentation' ? 'text-white' : 'text-zinc-400 hover:text-white'}`}
            >
              Documentation
            </a>
            <a
              href="/company"
              className={`transition-colors ${pathname === '/company' ? 'text-white' : 'text-zinc-400 hover:text-white'}`}
            >
              Company
            </a>
          </div>

          <div className="flex items-center space-x-4 sm:space-x-6 relative">
            <a
              href="https://www.linkedin.com/company/exergysoftware"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:block"
            >
              <Linkedin className="w-5 h-5 text-zinc-400 cursor-pointer hover:text-white transition-colors" />
            </a>
            <button
              className="text-white hover:opacity-90 font-medium px-4 sm:px-6 py-2 rounded-md text-sm hidden md:inline-flex items-center justify-center transition-opacity"
              style={{ backgroundColor: "#1B9ED9" }}
              onClick={scrollToContact}
            >
              Contact Us
            </button>
            <button
              className="lg:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black flex flex-col items-center justify-center space-y-8 pt-20">
          <button
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-5 right-5 text-white"
          >
            <X className="w-6 h-6" />
          </button>
          <Link
            href="/platform-overview"
            className={`text-xl transition-colors ${pathname === '/platform-overview' ? 'text-white' : 'text-zinc-400 hover:text-white'}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Platform Overview
          </Link>
          <Link
            href="/solutions"
            className={`text-xl transition-colors ${pathname === '/solutions' ? 'text-white' : 'text-zinc-400 hover:text-white'}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Solutions
          </Link>
          <Link
            href="/documentation"
            className={`text-xl transition-colors ${pathname === '/documentation' ? 'text-white' : 'text-zinc-400 hover:text-white'}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Documentation
          </Link>
          <Link
            href="/company"
            className={`text-xl transition-colors ${pathname === '/company' ? 'text-white' : 'text-zinc-400 hover:text-white'}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Company
          </Link>
          <hr className="w-1/2 border-zinc-600 my-4" />
          <a
            href="https://www.linkedin.com/company/exergysoftware"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl text-zinc-400 hover:text-white flex items-center space-x-2 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            <Linkedin className="w-6 h-6" />
            <span>LinkedIn</span>
          </a>
          <button
            onClick={(e) => {
              scrollToContact(e);
              setIsMenuOpen(false);
            }}
            className="text-white font-medium px-6 py-3 text-base rounded-md transition-opacity"
            style={{ backgroundColor: "#1B9ED9" }}
          >
            Contact Us
          </button>
        </div>
      )}

      {/* Placeholder Section */}
      <section className="relative pt-20 sm:pt-40 pb-16 px-4 sm:px-8 overflow-hidden flex items-center justify-center min-h-[calc(100vh-10rem)]">
        <div className="max-w-[1400px] mx-auto text-center">
          <HardHat className="w-16 h-16 sm:w-24 sm:h-24 mx-auto mb-8 text-zinc-500" />
          <h1 className="text-[36px] sm:text-[48px] md:text-[64px] font-bold leading-tight mb-6 text-zinc-300">
            Solutions
          </h1>
          <p className="text-lg sm:text-xl text-zinc-400 mb-12 max-w-2xl mx-auto">
            We&apos;re working on it! This site is currently under construction.
            Please check back soon.
          </p>
          <div className="flex justify-center">
            <Link href="/">
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white/10 px-6 py-3"
              >
                ← Home
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section with Contact Form */}
      <section
        id="contact-form"
        className="py-20 sm:py-32 px-4 sm:px-8 relative overflow-hidden"
      >
        <div
          className="absolute inset-0 bg-[url('/ctabg.jpg')] bg-cover bg-center opacity-10"
          style={{ zIndex: 1 }}
        />
        <div className="max-w-[1200px] mx-auto relative z-10">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-[40px] sm:text-[52px] md:text-[64px] font-bold mb-6 leading-tight text-white drop-shadow-lg">
              Ready to transform
              <br />
              your processes?
            </h2>
            <p className="text-zinc-200 text-lg sm:text-xl mb-10 leading-relaxed max-w-3xl mx-auto drop-shadow-md">
              Discover how Exergy&apos;s AI solutions can optimize your operations
              and drive sustainable impact
            </p>
          </div>

          <div className="max-w-2xl mx-auto bg-white/95 backdrop-blur-sm p-6 sm:p-8 rounded-3xl shadow-lg border border-white/20">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-zinc-700 mb-2"
                  >
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-zinc-300 text-zinc-900 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label
                    htmlFor="company"
                    className="block text-sm font-medium text-zinc-700 mb-2"
                  >
                    Company <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    required
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-zinc-300 text-zinc-900 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    placeholder="Example Corp"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-zinc-700 mb-2"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-zinc-300 text-zinc-900 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    placeholder="+31 6 12345678"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-zinc-700 mb-2"
                  >
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-zinc-300 text-zinc-900 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-zinc-700 mb-2"
                >
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={5}
                  className="w-full px-4 py-3 border border-zinc-300 text-zinc-900 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                  placeholder="Tell us about your project..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full text-white hover:opacity-90 px-8 py-4 text-base font-medium rounded-full transition-opacity disabled:opacity-50"
                style={{ backgroundColor: "#1B9ED9" }}
              >
                {isSubmitting ? "Sending..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 sm:py-20 px-4 sm:px-8 bg-black border-t border-zinc-900">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-6 gap-8 sm:gap-12 mb-12 sm:mb-16">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <Link href="/" className="flex items-center space-x-3">
                  <img
                    src="/exergy-logo-symbol.png"
                    alt="Exergy Logo"
                    className="h-8 w-auto"
                  />
                  <span className="text-2xl font-semibold">Exergy</span>
                </Link>
              </div>
              <p className="text-zinc-400 text-sm leading-relaxed max-w-xs">
                Advanced AI solutions for process modeling and control in the
                chemical and food industry
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-6 text-sm">SOLUTIONS</h4>
              <ul className="space-y-4 text-sm text-zinc-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Process Modeling
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Control Systems
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Analytics
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Enterprise
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-6 text-sm">INDUSTRIES</h4>
              <ul className="space-y-4 text-sm text-zinc-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Food & Beverage
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Chemical Processing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Pharmaceuticals
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Petrochemicals
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-6 text-sm">COMPANY</h4>
              <ul className="space-y-4 text-sm text-zinc-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Support
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-6 text-sm">RESOURCES</h4>
              <ul className="space-y-4 text-sm text-zinc-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Case Studies
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-zinc-900 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-zinc-400">
            <p>&copy; 2025 Exergy. All rights reserved.</p>
            <div className="flex gap-8 mt-6 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Cookie Settings
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}