import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Sun, Moon, ArrowRight, Sparkles, Zap, Users } from 'lucide-react';

const ParticleBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-6 h-6 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full opacity-20"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animation: `float ${8 + Math.random() * 12}s linear infinite`
          }}
        />
      ))}
    </div>
  );
};

const FeatureCard = ({ title, description, icon: Icon }) => {
  return (
    <div className="group relative overflow-hidden p-8 backdrop-blur-lg bg-white/10 dark:bg-gray-800/20 rounded-3xl border border-white/20 dark:border-gray-700/30 hover:shadow-2xl transition-all duration-500">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative z-10">
        <div className="mb-6 p-3 w-fit rounded-2xl bg-gradient-to-r from-blue-500/20 to-purple-500/20">
          <Icon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
        </div>
        <h3 className="font-bold text-gray-800 dark:text-white text-2xl mb-4">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className={`min-h-screen relative ${darkMode ? 'dark' : ''}`}>
      <div className="dark:bg-gray-900 min-h-screen transition-colors duration-300">
        {/* Background */}
        <div className="fixed inset-0 transition-opacity duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900" />
          <ParticleBackground />
        </div>

        {/* Navigation */}
        <nav
          className={`fixed w-full px-8 py-6 transition-all duration-300 z-50 ${
            isScrolled ? 'backdrop-blur-2xl bg-white/80 dark:bg-gray-900/80 shadow-lg' : ''
          }`}
        >
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center gap-8">
              <Image
                src="/favicon.ico"
                alt="Logo"
                width={110}
                height={100}
                className="transition-transform hover:scale-110"
              />
              <div className="hidden md:flex gap-8">
                <Link
                  href="/#"
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  Features
                </Link>
                <Link
                  href="/#"
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  Docs
                </Link>
                <Link
                  href="/#"
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  About
                </Link>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-3 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                {darkMode ? (
                  <Sun className="w-6 h-6 text-gray-300" />
                ) : (
                  <Moon className="w-6 h-6 text-gray-600" />
                )}
              </button>
              <Link
                href="/auth/login"
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all hover:scale-105 min-w-[120px] text-center"
              >
                Sign In
              </Link>
            </div>
          </div>
        </nav>

        <section className="relative pt-56 pb-20 px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Left Hero Content */}
              <div className="space-y-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border border-white/20 dark:border-gray-700/30">
                  <Sparkles className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-600 dark:text-gray-300">
                    Revolutionizing Team Collaboration
                  </span>
                </div>
                <h1 className="text-6xl lg:text-7xl font-bold leading-tight">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                    Transform
                  </span>{' '}
                  Your Workflow
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                  Experience seamless collaboration, automated workflows, and enhanced productivity
                  with SinghIT's next-generation platform.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/auth/signup"
                    className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold text-lg rounded-2xl hover:shadow-xl transform hover:-translate-y-1 transition-all group"
                  >
                    Get Started
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    href="/#"
                    className="inline-flex items-center justify-center px-8 py-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-md text-gray-800 dark:text-white font-semibold text-lg rounded-2xl hover:shadow-xl transform hover:-translate-y-1 transition-all border border-white/20 dark:border-gray-700/30"
                  >
                    Watch Demo
                  </Link>
                </div>
              </div>

              {/* Right Sticky-Notes Section */}
              <div className="relative">
                <div className="relative w-full h-[400px] sm:h-[500px] lg:h-[600px]">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl blur-xl" />
                  <div className="relative w-full h-full rounded-3xl overflow-hidden border border-white/20 dark:border-gray-700/30 p-6">
                    <div
                      className="absolute p-4 bg-white text-gray-700 rounded shadow-lg text-xl font-bold transform rotate-[-3deg]"
                      style={{ top: '30px', left: '30px' }}
                    >
                      Collaboration
                    </div>
                    <div
                      className="absolute p-3 bg-white text-gray-700 rounded shadow-lg text-2xl font-bold transform rotate-[3deg]"
                      style={{ top: '120px', left: '100px' }}
                    >
                      Workflow
                    </div>
                    <div
                      className="absolute p-5 bg-white text-gray-700 rounded shadow-lg text-3xl font-extrabold transform rotate-[-3deg]"
                      style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
                    >
                      Clocking
                    </div>
                    <div
                      className="absolute p-3 bg-white text-gray-700 rounded shadow-lg text-xl font-bold transform rotate-[-2deg]"
                      style={{ top: '60%', left: '58%' }}
                    >
                      Management
                    </div>
                    <div
                      className="absolute p-3 bg-white text-gray-700 rounded shadow-lg text-xl font-bold transform rotate-[5deg]"
                      style={{ top: '70%', left: '65%' }}
                    >
                      Projects
                    </div>
                    <div
                      className="absolute p-3 bg-white text-gray-700 rounded shadow-lg text-xl font-bold transform rotate-[2deg]"
                      style={{ top: '75%', left: '40%' }}
                    >
                      Tasks
                    </div>
                    <div
                      className="absolute p-3 bg-white text-gray-700 rounded shadow-lg text-lg font-bold transform rotate-[-4deg]"
                      style={{ top: '45%', left: '25%' }}
                    >
                      Kanban
                    </div>
                    <div
                      className="absolute p-3 bg-white text-gray-700 rounded shadow-lg text-lg font-bold transform rotate-[6deg]"
                      style={{ top: '25%', left: '65%' }}
                    >
                      Scrum
                    </div>
                    <div
                      className="absolute p-3 bg-white text-gray-700 rounded shadow-lg text-lg font-bold transform rotate-[4deg]"
                      style={{ top: '35%', left: '80%' }}
                    >
                      Timesheets
                    </div>
                    <div
                      className="absolute p-3 bg-white text-gray-700 rounded shadow-lg text-lg font-bold transform rotate-[2deg]"
                      style={{ top: '80px', right: '80px' }}
                    >
                      Agile
                    </div>
                    <div
                      className="absolute p-3 bg-white text-gray-700 rounded shadow-lg text-lg font-bold transform rotate-[2deg]"
                      style={{ top: '75%', left: '10%' }}
                    >
                      Schedules
                    </div>
                    <div
                      className="absolute p-3 bg-white text-gray-700 rounded shadow-lg text-lg font-bold transform rotate-[5deg]"
                      style={{ top: '160px', left: '50%' }}
                    >
                      Team-Issues
                    </div>
                    <div
                      className="absolute p-3 bg-white text-gray-700 rounded shadow-lg text-lg font-bold transform rotate-[1deg]"
                      style={{ top: '240px', left: '140px' }}
                    >
                      Analytics
                    </div>
                    <div
                      className="absolute p-3 bg-white text-gray-700 rounded shadow-lg text-lg font-bold transform rotate-[2deg]"
                      style={{ top: '65%', left: '80%' }}
                    >
                      Productivity
                    </div>
                    <div
                      className="absolute p-3 bg-white text-gray-700 rounded shadow-lg text-base font-bold transform rotate-[3deg]"
                      style={{ top: '70%', left: '85%' }}
                    >
                      HR
                    </div>
                    <div
                      className="absolute p-3 bg-white text-gray-700 rounded shadow-lg text-lg font-bold transform rotate-[1deg]"
                      style={{ top: '60%', left: '10%' }}
                    >
                      Chats
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* "Powerful Features" Section */}
        <section className="py-20 px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl font-bold mb-6">Powerful Features</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Everything you need to manage your team and projects effectively
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard
                title="Smart Integration"
                description="Connect and streamline all your tools and workflows in one unified platform."
                icon={Zap}
              />
              <FeatureCard
                title="Real-time Collaboration"
                description="Work together seamlessly with your team members in real-time."
                icon={Users}
              />
              <FeatureCard
                title="Intelligent Automation"
                description="Automate repetitive tasks and boost your team's productivity."
                icon={Sparkles}
              />
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { number: '50+', label: 'Active Users' },
                { number: '95%', label: 'Customer Satisfaction' },
                { number: '24/7', label: 'Support Available' }
              ].map((stat, index) => (
                <div
                  key={index}
                  className="text-center p-8 backdrop-blur-lg bg-white/10 dark:bg-gray-800/20 rounded-3xl border border-white/20 dark:border-gray-700/30"
                >
                  <div className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 dark:text-gray-300 text-lg">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-8">
          <div className="max-w-5xl mx-auto relative overflow-hidden rounded-3xl">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-90" />
            <div className="relative p-12 md:p-20 text-center text-white">
              <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Workflow?</h2>
              <p className="text-xl mb-8 text-white/90">
                Join thousands of teams already using SinghIT
              </p>
              <Link
                href="/auth/signup"
                className="inline-flex items-center px-8 py-4 bg-white text-gray-900 font-semibold rounded-xl hover:shadow-xl transform hover:-translate-y-1 transition-all"
              >
                Get Started Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="relative mt-20 pt-20 pb-10 px-8 backdrop-blur-xl bg-white/20 dark:bg-gray-800/20 border-t border-white/20 dark:border-gray-700/20">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="space-y-4">
              <Image src="/favicon.ico" alt="Logo" width={100} height={100} />
              <p className="text-gray-600 dark:text-gray-400">
                Transforming team collaboration and workflow management.
              </p>
            </div>
            {[
              {
                title: 'Product',
                links: ['Features', 'Pricing', 'Integration', 'Documentation']
              },
              {
                title: 'Company',
                links: ['About', 'Blog', 'Careers', 'Contact']
              },
              {
                title: 'Legal',
                links: ['Privacy', 'Terms', 'Security', 'Status']
              }
            ].map((column, index) => (
              <div key={index} className="space-y-4">
                <h4 className="font-semibold text-gray-900 dark:text-white">{column.title}</h4>
                <ul className="space-y-2">
                  {column.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link
                        href="#"
                        className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                      >
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700/30">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-600 dark:text-gray-400">
                © {new Date().getFullYear()} SinghIT Inc. All rights reserved.
              </p>
              <p className="text-gray-500 dark:text-gray-500 mt-4 md:mt-0">
                Developed by QuantumQuest Team
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}