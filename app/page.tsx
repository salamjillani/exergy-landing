"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Menu, Linkedin, X } from "lucide-react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import emailjs from "@emailjs/browser";
import { toast } from "sonner";

export default function HomePage() {
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
        toast.success("Message sent successfully! We'll get back to you soon.");
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
              href="/platform-overview"
              className={`transition-colors ${pathname === '/platform-overview' ? 'text-white' : 'text-zinc-400 hover:text-white'}`}
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

      {/* Hero Section */}
      <section className="relative pt-20 sm:pt-40 pb-16 px-4 sm:px-8 overflow-hidden">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-[48px] sm:text-[60px] md:text-[72px] lg:text-[88px] xl:text-[104px] font-bold leading-[0.95] mb-8 tracking-tight">
              Process Learning Engine
              <br />
              for Food Production
            </h1>
            <p className="text-lg sm:text-xl text-zinc-300 mb-12 max-w-3xl mx-auto">
              A system that captures, analyzes, and learns from each production
              run.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                className="text-white hover:opacity-90 font-medium px-6 sm:px-8 py-3 text-base rounded-full transition-opacity inline-flex items-center w-full sm:w-auto justify-center"
                style={{ backgroundColor: "#1B9ED9" }}
                onClick={() =>
                  window.open(
                    "https://calendly.com/jose-exergytech/30min",
                    "_blank"
                  )
                }
              >
                Book a Demo <ArrowRight className="ml-2 w-4 h-4" />
              </button>
              <button
                className="text-white hover:opacity-90 font-medium px-6 sm:px-8 py-3 text-base rounded-full transition-opacity inline-flex items-center border border-zinc-700 w-full sm:w-auto justify-center"
                onClick={scrollToContact}
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do Section - Features Style */}
      <section className="py-12 sm:py-20 px-4 sm:px-8">
        <div className="max-w-[1200px] mx-auto space-y-16 sm:space-y-32">
          {/* Feature 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-20 items-center">
            <div>
              <h3 className="text-[32px] sm:text-[42px] md:text-[48px] font-bold mb-6 leading-tight">
                Data → Insights
              </h3>
              <p className="text-zinc-300 text-base sm:text-lg leading-relaxed">
                Your industrial systems generate massive amounts of data every
                day. Exergy transforms it into actionable insights and
                recommendations, giving engineers and decision-makers the
                clarity they need to improve performance and reliability.
              </p>
            </div>
            <div className="relative h-[300px] sm:h-[450px] rounded-3xl overflow-hidden">
              <img
                src="/data-insights.jpg"
                alt="Data to Insights"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Feature 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-20 items-center">
            <div className="order-2 md:order-1 relative h-[300px] sm:h-[450px] rounded-3xl overflow-hidden">
              <img
                src="/aipowered.jpg"
                alt="AI-Powered Efficiency"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="order-1 md:order-2">
              <h3 className="text-[32px] sm:text-[42px] md:text-[48px] font-bold mb-6 leading-tight">
                AI-Powered
                <br />
                Efficiency
              </h3>
              <p className="text-zinc-300 text-base sm:text-lg leading-relaxed">
                Discover the sweet spot for your process. Our tool pinpoints the
                optimal operating parameters to ensure consistent yield —
                removing guesswork and eliminating operator trial-and-error.
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-20 items-center">
            <div>
              <h3 className="text-[32px] sm:text-[42px] md:text-[48px] font-bold mb-6 leading-tight">
                Sustainable
                <br />
                Operations
              </h3>
              <p className="text-zinc-300 text-base sm:text-lg leading-relaxed">
                Exergy&apos;s solutions are designed not only for productivity but
                also for impact. By reducing waste, energy consumption, and
                material intensity, we help companies move toward more
                sustainable and resource-efficient industrial processes.
              </p>
            </div>
            <div className="relative h-[300px] sm:h-[450px] rounded-3xl overflow-hidden">
              <img
                src="/sustainableoperations.jpg"
                alt="Sustainable Operations"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* What Sets Us Apart Section - Use Cases Style */}
      <section className="py-12 sm:py-20 px-4 sm:px-8">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-[32px] sm:text-[42px] font-bold mb-4">What Sets Us Apart</h2>
            <p className="text-zinc-300 text-base sm:text-lg">
              Unique expertise and technology that delivers measurable results
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            <div className="relative h-[250px] sm:h-[400px] rounded-2xl overflow-hidden group cursor-pointer">
              <img
                src="/combinedexpertise.jpg"
                alt="Combined Expertise"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold mb-2">
                  Combined Expertise
                </h3>
                <p className="text-zinc-200 text-xs sm:text-sm">
                  Our unique strength lies in combining deep process engineering
                  knowledge with advanced data science capabilities. This dual
                  expertise enables us to create AI solutions that truly
                  understand industrial processes and deliver practical,
                  implementable results.
                </p>
              </div>
            </div>

            <div className="relative h-[250px] sm:h-[400px] rounded-2xl overflow-hidden group cursor-pointer">
              <img
                src="/hybridmodeling.jpg"
                alt="Hybrid Modeling Approach"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold mb-2">
                  Hybrid Modeling Approach
                </h3>
                <p className="text-zinc-200 text-xs sm:text-sm">
                  We use cutting-edge hybrid modeling that combines
                  physics-based knowledge with machine learning. Our iterative
                  system continuously learns and improves as you feed it more
                  data, becoming smarter and more accurate over time.
                </p>
              </div>
            </div>

            <div className="relative h-[250px] sm:h-[400px] rounded-2xl overflow-hidden group cursor-pointer">
              <img
                src="/provenroi.jpg"
                alt="Proven ROI"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold mb-2">Proven ROI</h3>
                <p className="text-zinc-200 text-xs sm:text-sm">
                  We aim for a minimum of 10x return on investment for our
                  clients. Our solutions enable both sustainability and
                  efficiency, delivering measurable outcomes in reduced waste,
                  energy savings, and improved productivity that directly impact
                  your bottom line.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-12 sm:py-20 px-4 sm:px-8">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-12 sm:mb-20">
            <h2 className="text-[32px] sm:text-[42px] font-bold mb-6 leading-tight">
              Projects & Partnerships
              <br />
              That Drive Impact
            </h2>
            <p className="text-zinc-300 text-lg sm:text-xl max-w-4xl mx-auto leading-relaxed">
              Whether you are a research institution or an industrial company,
              Exergy offers the expertise and technology to turn collaboration
              into results. From co-developing innovative methodologies to
              deploying scalable AI-driven solutions, we&apos;re ready to create
              impact together.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="relative h-[400px] sm:h-[500px] rounded-3xl overflow-hidden group cursor-pointer">
              <img
                src="/aidriven.jpg"
                alt="AI-Assisted Packaging Recycling in Food Industry"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
                <h3 className="text-xl sm:text-3xl font-bold mb-4">
                  AI-Driven Packaging Recycling for the Food Industry
                </h3>
                <p className="text-zinc-200 text-base sm:text-lg mb-6 leading-relaxed">
                  Developing advanced AI models to optimize packaging recycling
                  processes in the food industry. Our solution enables food
                  manufacturers to reduce packaging waste, improve circular
                  economy practices, and meet sustainability targets while
                  maintaining product safety and quality standards.
                </p>
                <Button
                  variant="ghost"
                  className="text-white hover:bg-white/10 p-0 text-base font-medium"
                >
                  Learn More →
                </Button>
              </div>
            </div>

            <div className="relative h-[400px] sm:h-[500px] rounded-3xl overflow-hidden group cursor-pointer">
              <img
                src="/shapingfuture.jpg"
                alt="AI-Assisted Food Production Process Modeling"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
                <h3 className="text-xl sm:text-3xl font-bold mb-4">
                  Shaping the Future of Food Production with AI-Assisted Process
                  Modeling
                </h3>
                <p className="text-zinc-200 text-base sm:text-lg mb-6 leading-relaxed">
                  Revolutionizing food production through advanced AI-driven
                  process modeling that optimizes quality, safety, and
                  efficiency while reducing environmental impact.
                </p>
                <Button
                  variant="ghost"
                  className="text-white hover:bg-white/10 p-0 text-base font-medium"
                >
                  Learn More →
                </Button>
              </div>
            </div>
          </div>

          <div className="text-center mt-12 sm:mt-16">
            <p className="text-zinc-300 text-base sm:text-lg mb-8">
              Get in touch to explore how we can collaborate.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                className="text-white hover:opacity-90 font-medium px-6 sm:px-8 py-3 text-base rounded-full transition-opacity inline-flex items-center w-full sm:w-auto justify-center"
                style={{ backgroundColor: "#1B9ED9" }}
                onClick={() =>
                  window.open(
                    "https://calendly.com/raquel-exergytech/30min",
                    "_blank"
                  )
                }
              >
                Book a Demo
              </button>
              <button
                className="text-white hover:opacity-90 font-medium px-6 sm:px-8 py-3 text-base rounded-full transition-opacity inline-flex items-center border border-zinc-700 w-full sm:w-auto justify-center"
                onClick={scrollToContact}
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="py-12 sm:py-20 px-4 sm:px-8 bg-zinc-950">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-12 sm:mb-20">
            <h2 className="text-[32px] sm:text-[42px] font-bold mb-6">Our Core Solutions</h2>
            <p className="text-zinc-300 text-lg sm:text-xl">
              Advanced AI models tailored for industrial process optimization
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl overflow-hidden hover:border-zinc-700 transition-colors">
              <div
                className="relative h-[150px] sm:h-[180px] w-full"
                style={{ backgroundColor: "#FC494C" }}
              >
                <img
                  src="/processmodeling.png"
                  alt="Process Modeling AI"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="px-6 sm:px-10 pb-10 pt-6">
                <h3 className="text-xl sm:text-2xl font-bold mb-3">Process Modeling AI</h3>
                <p className="text-zinc-300 text-sm sm:text-base mb-6">
                  Advanced models for complex chemical and food processing
                  systems
                </p>
                <div className="space-y-3 text-xs sm:text-sm">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: "#1B9ED9" }}
                    ></div>
                    <span className="text-zinc-200">
                      Real-time process simulation
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: "#1B9ED9" }}
                    ></div>
                    <span className="text-zinc-200">
                      Predictive maintenance
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: "#1B9ED9" }}
                    ></div>
                    <span className="text-zinc-200">Quality optimization</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl overflow-hidden hover:border-zinc-700 transition-colors">
              <div
                className="relative h-[150px] sm:h-[180px] w-full"
                style={{ backgroundColor: "#81DFFB" }}
              >
                <img
                  src="/controlsystem.png"
                  alt="Control Systems AI"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="px-6 sm:px-10 pb-10 pt-6">
                <h3 className="text-xl sm:text-2xl font-bold mb-3">Control Systems AI</h3>
                <p className="text-zinc-300 text-sm sm:text-base mb-6">
                  Intelligent control systems that adapt to changing conditions
                </p>
                <div className="space-y-3 text-xs sm:text-sm">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: "#1B9ED9" }}
                    ></div>
                    <span className="text-zinc-200">
                      Adaptive control algorithms
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: "#1B9ED9" }}
                    ></div>
                    <span className="text-zinc-200">Energy optimization</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: "#1B9ED9" }}
                    ></div>
                    <span className="text-zinc-200">Safety monitoring</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl overflow-hidden hover:border-zinc-700 transition-colors">
              <div
                className="relative h-[150px] sm:h-[180px] w-full"
                style={{ backgroundColor: "#A4E7BE" }}
              >
                <img
                  src="/analyticsplatform.png"
                  alt="Analytics Platform"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="px-6 sm:px-10 pb-10 pt-6">
                <h3 className="text-xl sm:text-2xl font-bold mb-3">Analytics Platform</h3>
                <p className="text-zinc-300 text-sm sm:text-base mb-6">
                  Comprehensive analytics for process insights and optimization
                </p>
                <div className="space-y-3 text-xs sm:text-sm">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: "#1B9ED9" }}
                    ></div>
                    <span className="text-zinc-200">
                      Performance dashboards
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: "#1B9ED9" }}
                    ></div>
                    <span className="text-zinc-200">Anomaly detection</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: "#1B9ED9" }}
                    ></div>
                    <span className="text-zinc-200">Compliance reporting</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Profile Section */}
      <section className="py-12 sm:py-20 px-4 sm:px-8">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-12 sm:mb-20">
            <h2 className="text-[32px] sm:text-[42px] font-bold mb-6">Meet Our Team</h2>
            <p className="text-zinc-300 text-lg sm:text-xl">
              Expert process engineers and data scientists driving innovation
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            <a
              href="https://www.linkedin.com/in/jotriso"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-6 sm:p-10 text-center hover:border-zinc-700 transition-colors"
            >
              <div
                className="w-24 h-24 sm:w-32 sm:h-32 rounded-full mx-auto mb-6 flex items-center justify-center"
                style={{ backgroundColor: "rgba(27, 158, 217, 0.2)" }}
              >
                <span
                  className="text-2xl sm:text-4xl font-bold"
                  style={{ color: "#1B9ED9" }}
                >
                  JT
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-2">Jose Trigueros</h3>
              <p className="text-zinc-300 text-base sm:text-lg">Executive Manager</p>
            </a>

            <a
              href="https://www.linkedin.com/in/raquel-sabater-canovas"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-6 sm:p-10 text-center hover:border-zinc-700 transition-colors"
            >
              <div
                className="w-24 h-24 sm:w-32 sm:h-32 rounded-full mx-auto mb-6 flex items-center justify-center"
                style={{ backgroundColor: "rgba(220, 38, 127, 0.2)" }}
              >
                <span
                  className="text-2xl sm:text-4xl font-bold"
                  style={{ color: "#DC267F" }}
                >
                  RS
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-2">Raquel Sabater</h3>
              <p className="text-zinc-300 text-base sm:text-lg">Process Engineer</p>
            </a>

            <a
              href="https://www.linkedin.com/in/jairo-madrigal-montes-15380a30"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-6 sm:p-10 text-center hover:border-zinc-700 transition-colors"
            >
              <div
                className="w-24 h-24 sm:w-32 sm:h-32 rounded-full mx-auto mb-6 flex items-center justify-center"
                style={{ backgroundColor: "rgba(254, 97, 0, 0.2)" }}
              >
                <span
                  className="text-2xl sm:text-4xl font-bold"
                  style={{ color: "#FE6100" }}
                >
                  JM
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-2">Jairo Madrigal</h3>
              <p className="text-zinc-300 text-base sm:text-lg">Financial Manager</p>
            </a>

            <a
              href="https://www.linkedin.com/in/iason-kolokythas-188661334"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-6 sm:p-10 text-center hover:border-zinc-700 transition-colors"
            >
              <div
                className="w-24 h-24 sm:w-32 sm:h-32 rounded-full mx-auto mb-6 flex items-center justify-center"
                style={{ backgroundColor: "rgba(255, 184, 28, 0.2)" }}
              >
                <span
                  className="text-2xl sm:text-4xl font-bold"
                  style={{ color: "#FFB81C" }}
                >
                  JK
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-2">Jason Kolokythas</h3>
              <p className="text-zinc-300 text-base sm:text-lg">Data Scientist</p>
            </a>
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