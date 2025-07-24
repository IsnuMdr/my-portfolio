"use client";
import { motion } from "framer-motion";
import { AnimatedSection } from "../animations/AnimatedSection";
import { Calendar, MapPin } from "lucide-react";

interface Experience {
  id: string;
  company: string;
  position: string;
  description: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  location?: string;
}

export const Experience = () => {
  // This would normally come from your API
  const experiences: Experience[] = [
    {
      id: "1",
      company: "Tech Corp Inc.",
      position: "Senior Software Engineer",
      description:
        "Led development of microservices architecture, mentored junior developers, and implemented CI/CD pipelines.",
      startDate: "2022-01",
      current: true,
      location: "Remote",
    },
    {
      id: "2",
      company: "StartupXYZ",
      position: "Full Stack Developer",
      description:
        "Built and maintained web applications using React and Node.js, collaborated with design team on UX improvements.",
      startDate: "2021-01",
      endDate: "2021-12",
      current: false,
      location: "San Francisco, CA",
    },
    {
      id: "3",
      company: "Digital Solutions Ltd.",
      position: "Junior Developer",
      description:
        "Developed responsive websites, learned modern web technologies, and contributed to client projects.",
      startDate: "2020-06",
      endDate: "2020-12",
      current: false,
      location: "New York, NY",
    },
  ];

  return (
    <section id="experience" className="py-20 bg-gray-50">
      <div className="container-max section-padding">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
              Work Experience
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              My professional journey and the experiences that shaped my skills
            </p>
          </div>
        </AnimatedSection>

        <div className="max-w-4xl mx-auto">
          {experiences.map((experience, index) => (
            <AnimatedSection key={experience.id} delay={index * 0.1}>
              <motion.div
                whileHover={{ x: 10 }}
                className="flex mb-12 last:mb-0"
              >
                <div className="flex flex-col items-center mr-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: index * 0.1, type: "spring" }}
                    className="w-4 h-4 bg-primary-600 rounded-full mb-2"
                  />
                  {index !== experiences.length - 1 && (
                    <div className="w-0.5 bg-gray-300 flex-grow" />
                  )}
                </div>

                <div className="card p-6 flex-grow">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">
                        {experience.position}
                      </h3>
                      <p className="text-primary-600 font-medium">
                        {experience.company}
                      </p>
                    </div>
                    <div className="text-sm text-gray-500 mt-2 md:mt-0">
                      <div className="flex items-center gap-1 mb-1">
                        <Calendar size={16} />
                        {experience.startDate} -{" "}
                        {experience.current ? "Present" : experience.endDate}
                      </div>
                      {experience.location && (
                        <div className="flex items-center gap-1">
                          <MapPin size={16} />
                          {experience.location}
                        </div>
                      )}
                    </div>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    {experience.description}
                  </p>
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};
