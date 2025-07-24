"use client";
import { motion } from "framer-motion";
import { AnimatedSection } from "../animations/AnimatedSection";

interface Skill {
  id: string;
  name: string;
  category: string;
  level: number;
  icon?: string;
}

export const Skills = () => {
  // This would normally come from your API
  const skills: Skill[] = [
    { id: "1", name: "JavaScript", category: "Frontend", level: 5 },
    { id: "2", name: "TypeScript", category: "Frontend", level: 4 },
    { id: "3", name: "React", category: "Frontend", level: 5 },
    { id: "4", name: "Next.js", category: "Frontend", level: 4 },
    { id: "5", name: "Node.js", category: "Backend", level: 4 },
    { id: "6", name: "PostgreSQL", category: "Database", level: 4 },
    { id: "7", name: "Docker", category: "DevOps", level: 3 },
    { id: "8", name: "AWS", category: "Cloud", level: 3 },
  ];

  const categories = [...new Set(skills.map((skill) => skill.category))];

  return (
    <section id="skills" className="py-20">
      <div className="container-max section-padding">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
              Skills & Technologies
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Technologies and tools I work with to bring ideas to life
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, categoryIndex) => (
            <AnimatedSection key={category} delay={categoryIndex * 0.1}>
              <div className="card p-6">
                <h3 className="text-xl font-bold mb-4 text-center">
                  {category}
                </h3>
                <div className="space-y-4">
                  {skills
                    .filter((skill) => skill.category === category)
                    .map((skill, skillIndex) => (
                      <motion.div
                        key={skill.id}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: skillIndex * 0.1 }}
                        className="space-y-2"
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{skill.name}</span>
                          <span className="text-sm text-gray-500">
                            {skill.level}/5
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <motion.div
                            className="bg-primary-600 h-2 rounded-full"
                            initial={{ width: 0 }}
                            whileInView={{
                              width: `${(skill.level / 5) * 100}%`,
                            }}
                            transition={{
                              duration: 1,
                              delay: skillIndex * 0.1,
                            }}
                          />
                        </div>
                      </motion.div>
                    ))}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};
