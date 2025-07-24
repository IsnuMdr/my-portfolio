"use client";
import { motion } from "framer-motion";
import { AnimatedSection } from "../animations/AnimatedSection";
import { Download, User, Code, Heart } from "lucide-react";

export const About = () => {
  const stats = [
    { icon: Code, label: "Projects Completed", value: "20+" },
    { icon: User, label: "Years Experience", value: "3+" },
    { icon: Heart, label: "Happy Clients", value: "15+" },
  ];

  return (
    <section id="about" className="py-20">
      <div className="container-max section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <AnimatedSection>
            <div className="relative">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="relative z-10"
              >
                <img
                  src="/api/placeholder/500/600"
                  alt="Profile"
                  className="rounded-2xl shadow-xl w-full h-[400px] object-cover"
                />
              </motion.div>
              <div className="absolute -top-4 -left-4 w-full h-full bg-primary-100 rounded-2xl -z-10"></div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
                About Me
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                I'm a passionate Software Engineer with over 3 years of
                experience creating digital solutions that make a difference. I
                specialize in full-stack development with a focus on modern web
                technologies.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                When I'm not coding, you can find me exploring new technologies,
                contributing to open-source projects, or enjoying a good cup of
                coffee while brainstorming the next big idea.
              </p>

              <div className="grid grid-cols-3 gap-6 mb-8">
                {stats.map(({ icon: Icon, label, value }, index) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="text-center"
                  >
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <Icon size={24} className="text-primary-600" />
                    </div>
                    <div className="font-bold text-2xl text-gray-900">
                      {value}
                    </div>
                    <div className="text-sm text-gray-600">{label}</div>
                  </motion.div>
                ))}
              </div>

              <motion.a
                href="/resume.pdf"
                download
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 btn-primary"
              >
                <Download size={20} />
                Download Resume
              </motion.a>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};
