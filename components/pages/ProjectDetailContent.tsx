"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  ArrowLeft,
  ExternalLink,
  Github,
  Calendar,
  Clock,
  User,
  Users,
  ChevronLeft,
  ChevronRight,
  Star,
  Check,
  Share2,
} from "lucide-react";
import Link from "next/link";
import { AnimatedSection } from "../animations/AnimatedSection";
import { TechIcons } from "../ui/TechIcons";
import { Project } from "@/types/project";
import { OptimizedImage } from "../ui/OptimizedImage";

interface ProjectDetailContentProps {
  project: Project;
  completedAtFormatted: string;
}

export const ProjectDetailContent = ({
  project,
  completedAtFormatted,
}: ProjectDetailContentProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showFullImage, setShowFullImage] = useState(false);

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === project.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? project.images.length - 1 : prev - 1
    );
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: project.title,
          text: project.description,
          url: window.location.href,
        });
      } catch (error) {
        // User cancelled sharing
        console.log("User cancelled sharing:", error);
      }
    } else {
      // Fallback - copy to clipboard
      await navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div className="pt-20 min-h-screen">
      {/* Back Navigation */}
      <section className="py-6 bg-white/50 backdrop-blur-sm border-b border-white/20">
        <div className="container-elegant">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium transition-colors duration-300 group"
          >
            <ArrowLeft
              size={20}
              className="group-hover:-translate-x-1 transition-transform"
            />
            Back to Projects
          </Link>
        </div>
      </section>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <div className="container-elegant">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Project Info */}
            <AnimatedSection>
              <div>
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                      {project.title}
                    </h1>
                  </div>
                  <div className="flex items-center gap-4">
                    {project.featured && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3, type: "spring" }}
                        className="flex items-center px-3 py-1 bg-accent-500 text-white text-sm font-medium rounded-full shadow-soft"
                      >
                        <Star size={16} className="inline mr-1" />
                        Featured
                      </motion.span>
                    )}
                    <button
                      onClick={handleShare}
                      className="p-3 bg-white/80 backdrop-blur-sm rounded-xl border border-white/50 shadow-soft hover:shadow-medium transition-all duration-300"
                      title="Share Project"
                    >
                      <Share2 size={20} className="text-gray-600" />
                    </button>
                  </div>
                </div>

                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  {project.description}
                </p>

                {/* Project Meta Grid */}
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                      <Calendar size={20} className="text-primary-600" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">Completed</div>
                      <div className="text-gray-600">
                        {completedAtFormatted}
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                      <Clock size={20} className="text-green-600" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">Duration</div>
                      <div className="text-gray-600">{project.duration}</div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <User size={20} className="text-blue-600" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">Role</div>
                      <div className="text-gray-600">{project.role}</div>
                    </div>
                  </motion.div>

                  {project.teamSize && (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                        <Users size={20} className="text-purple-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">
                          Team Size
                        </div>
                        <div className="text-gray-600">
                          {project.teamSize}{" "}
                          {project.teamSize === 1 ? "person" : "people"}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Action Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  {project.demoUrl && (
                    <motion.a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="btn-primary-elegant group flex items-center"
                    >
                      <ExternalLink
                        size={20}
                        className="mr-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                      />
                      Live Demo
                    </motion.a>
                  )}

                  {project.githubUrl && (
                    <motion.a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="btn-secondary-elegant group flex items-center"
                    >
                      <Github
                        size={20}
                        className="mr-2 group-hover:rotate-12 transition-transform"
                      />
                      Source Code
                    </motion.a>
                  )}
                </motion.div>
              </div>
            </AnimatedSection>

            {/* Image Gallery */}
            <AnimatedSection delay={0.2}>
              <div>
                {/* Main Image */}
                <div className="relative aspect-project rounded-2xl overflow-hidden shadow-large mb-4">
                  <motion.img
                    key={currentImageIndex}
                    src={project.images[currentImageIndex].imageUrl}
                    alt={`${project.title} - Image ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover cursor-zoom-in"
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    onClick={() => setShowFullImage(true)}
                  />

                  {/* Navigation Arrows */}
                  {project.images && project.images.length > 1 && (
                    <>
                      <motion.button
                        onClick={prevImage}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-medium hover:bg-white transition-all duration-300"
                      >
                        <ChevronLeft size={24} />
                      </motion.button>

                      <motion.button
                        onClick={nextImage}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-medium hover:bg-white transition-all duration-300"
                      >
                        <ChevronRight size={24} />
                      </motion.button>
                    </>
                  )}

                  {/* Image Counter */}
                  {project.images && project.images.length > 1 && (
                    <div className="absolute top-4 right-4 px-3 py-1 bg-black/50 backdrop-blur-sm text-white text-sm rounded-full">
                      {currentImageIndex + 1} / {project.images.length}
                    </div>
                  )}

                  {/* Image Indicators */}
                  {project.images && project.images.length > 1 && (
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                      {project.images.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`w-3 h-3 rounded-full transition-all duration-300 ${
                            index === currentImageIndex
                              ? "bg-white shadow-medium scale-125"
                              : "bg-white/50 hover:bg-white/80"
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Thumbnail Navigation */}
                {project.images && project.images.length > 1 && (
                  <div className="grid grid-cols-4 gap-2">
                    {project.images.map((image, index) => (
                      <motion.button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`aspect-square rounded-lg overflow-hidden transition-all duration-300 ${
                          index === currentImageIndex
                            ? "ring-2 ring-primary-500 opacity-100"
                            : "opacity-70 hover:opacity-100"
                        }`}
                      >
                        <OptimizedImage
                          src={image.imageUrl}
                          width={50}
                          height={50}
                          alt={`${project.title} thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                          lazy={true}
                        />
                      </motion.button>
                    ))}
                  </div>
                )}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-16 bg-white">
        <div className="container-elegant">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Technologies Used
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                The powerful tech stack that brought this project to life
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              {project.technologies.map((tech, index) => (
                <motion.div
                  key={tech}
                  initial={{ opacity: 0, scale: 0, rotate: -180 }}
                  whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{
                    delay: index * 0.1,
                    duration: 0.5,
                    type: "spring",
                  }}
                  whileHover={{ scale: 1.1, y: -5, rotate: 5 }}
                  className="flex items-center gap-3 px-6 py-4 bg-gradient-card rounded-xl shadow-soft hover:shadow-medium transition-all duration-300 group"
                >
                  <TechIcons name={tech} size={32} />
                  <span className="font-semibold text-gray-800 group-hover:text-primary-600 transition-colors">
                    {tech}
                  </span>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Project Details */}
      <section className="py-16 bg-gradient-section">
        <div className="container-elegant">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Challenge & Solution */}
            <div className="space-y-12">
              <AnimatedSection>
                <div className="card-elegant p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                      <span className="text-red-600 text-xl font-bold">⚠️</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      The Challenge
                    </h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    {project.challenge}
                  </p>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.2}>
                <div className="card-elegant p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                      <span className="text-green-600 text-xl font-bold">
                        💡
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      The Solution
                    </h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    {project.solution}
                  </p>
                </div>
              </AnimatedSection>
            </div>

            {/* Features & Results */}
            <div className="space-y-12">
              <AnimatedSection delay={0.1}>
                <div className="card-elegant p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <span className="text-blue-600 text-xl font-bold">
                        ⚡
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      Key Features
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {project.features.map((feature, index) => (
                      <motion.div
                        key={feature}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05, duration: 0.4 }}
                        className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-300"
                      >
                        <Check
                          size={16}
                          className="text-blue-600 flex-shrink-0"
                        />
                        <span className="text-gray-700 font-medium">
                          {feature}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.3}>
                <div className="card-elegant p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                      <span className="text-green-600 text-xl font-bold">
                        📈
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      Results & Impact
                    </h3>
                  </div>
                  <div className="space-y-4">
                    {project.results.map((result, index) => (
                      <motion.div
                        key={result}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1, duration: 0.4 }}
                        whileHover={{ scale: 1.02 }}
                        className="flex items-center gap-4 p-4 bg-green-50 rounded-xl border border-green-200 hover:bg-green-100 transition-all duration-300"
                      >
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <Check size={18} className="text-white" />
                        </div>
                        <span className="text-gray-800 font-medium text-lg">
                          {result}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      {/* {project.testimonial.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container-elegant">
            <AnimatedSection>
              <div className="max-w-4xl mx-auto text-center">
                <Quote size={64} className="text-primary-200 mx-auto mb-8" />
                <blockquote className="text-2xl md:text-3xl font-light text-gray-800 mb-8 leading-relaxed italic">
                  &quot;{project.testimonial.quote}&quot;
                </blockquote>
                <div className="flex items-center justify-center gap-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-accent-100 rounded-full flex items-center justify-center">
                    <User size={28} className="text-primary-600" />
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-xl text-gray-900">
                      {project.testimonial.author}
                    </div>
                    <div className="text-gray-600">
                      {project.testimonial.position} at{" "}
                      {project.testimonial.company}
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>
      )} */}

      {/* Project Overview */}
      <section className="py-16 bg-gradient-section">
        <div className="container-elegant">
          <AnimatedSection>
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                Project Overview
              </h2>
              <div className="card-elegant p-8">
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-600 leading-relaxed text-lg first-letter:text-4xl first-letter:font-bold first-letter:text-primary-600 first-letter:float-left first-letter:mr-2 first-letter:mt-1">
                    {project.longDescription}
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Related Projects / CTA */}
      <section className="py-16 bg-white">
        <div className="container-elegant">
          <AnimatedSection>
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Interested in Working Together?
              </h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                I&apos;m always excited to work on new projects and bring
                innovative ideas to life. Let&apos;s discuss how we can create
                something amazing together.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/projects" className="btn-secondary-elegant">
                  View More Projects
                </Link>
                <Link href="/#contact" className="btn-primary-elegant">
                  Get In Touch
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Full Screen Image Modal */}
      {showFullImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setShowFullImage(false)}
        >
          <motion.div
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.5 }}
            className="relative max-w-7xl max-h-full"
          >
            {project.images && (
              <OptimizedImage
                src={project.images[currentImageIndex].imageUrl}
                width={600}
                height={400}
                alt={`${project.title} - Full size`}
                className="max-w-full max-h-full object-contain rounded-lg"
                lazy={true}
              />
            )}

            <button
              onClick={() => setShowFullImage(false)}
              className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all duration-300"
            >
              ✕
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};
