import React from "react";
import { motion } from "framer-motion";

const Section = (props) => {
  const { children } = props;
  return (
    <motion.section
      className="w-screen h-screen p-30 max-w-screen-2xl mx-auto flex flex-col items-start justify-center"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: { duration: 1, delay: 0.5 },
      }}
    >
      {children}
    </motion.section>
  );
};

const Interface = () => {
  return (
    <div className="flex flex-col items-center w-screen">
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
    </div>
  );
};

const AboutSection = () => {
  return (
    <Section>
      <h1 className="text-6xl font-extrabold leading-snug">
        Hi, I'm
        <br />
        <span className="bg-white rounded-bl-2xl px-1 italic">
          Abhay Dandge
        </span>
      </h1>
      <motion.p
        className="text-lg text-gray-600 mt-4"
        initial={{ opacity: 0, y: 25 }}
        whileInView={{
          opacity: 1,
          y: 0,
          transition: { duration: 1, delay: 1.5 },
        }}
      >
        A passionate web developer with a knack
        <br />
        for creating dynamic and responsive
        <br />
        web applications.
      </motion.p>
      <motion.button
        className="bg-[#cea51ec3] text-white py-4 px-8 rounded-lg font-bold text-lg mt-16"
        initial={{ opacity: 0, y: 25 }}
        whileInView={{
          opacity: 1,
          y: 0,
          transition: { duration: 1, delay: 2 },
        }}
      >
        Contact Me
      </motion.button>
    </Section>
  );
};

const skills = [
  { title: "HTML", level: 99 },
  { title: "CSS", level: 90 },
  { title: "JavaScript", level: 90 },
  { title: "React", level: 90 },
  { title: "Three.js", level: 85 },
  { title: "React Three Fiber", level: 80 },
  { title: "MongoDB", level: 80 },
  { title: "Express.js", level: 80 },
  { title: "Node.js", level: 90 },
  { title: "Tailwind CSS", level: 90 },
  { title: "Next.js", level: 80 },
  { title: "Git", level: 85 },
  { title: "GitHub", level: 85 },
  { title: "Blender", level: 50 },
];

const languages = [
  { title: "English", level: 95, flag: "https://flagcdn.com/us.svg" },
  { title: "Hindi", level: 100, flag: "https://flagcdn.com/in.svg" },
  { title: "Marathi", level: 100, flag: "https://flagcdn.com/in.svg" },
  { title: "Japanese", level: 50, flag: "https://flagcdn.com/jp.svg" },
];

const SkillsSection = () => {
  // Split skills into two columns
  const mid = Math.ceil(skills.length / 2);
  const skillsColumns = [skills.slice(0, mid), skills.slice(mid)];

  return (
    <Section>
      <motion.div whileInView={"visible"}>
        <h2 className="text-4xl font-bold">Skills</h2>
        <div className="mt-8 flex gap-8">
          {skillsColumns.map((column, colIdx) => (
            <div key={colIdx} className="space-y-4">
              {column.map((skill, index) => (
                <div key={skill.title} className="w-64">
                  <motion.h3
                    className="text-l font-bold text-gray-800"
                    initial={{ opacity: 0 }}
                    variants={{
                      visible: {
                        opacity: 1,
                        transition: { duration: 1, delay: 1 + index * 0.2 },
                      },
                    }}
                  >
                    {skill.title}
                  </motion.h3>
                  <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700 mt-2">
                    <motion.div
                      className="bg-[#cea51ec3] h-full rounded-full"
                      style={{ width: `${skill.level}%` }}
                      initial={{ scaleX: 0, originX: 0 }}
                      variants={{
                        visible: {
                          scaleX: 1,
                          transition: { duration: 1, delay: 1 + index * 0.2 },
                        },
                      }}
                    ></motion.div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div>
          <h2 className="text-4xl font-bold mt-8">Languages</h2>
          <div className="mt-8 space-y-4">
            {languages.map((language, index) => (
              <div key={language.title} className="w-64">
                <motion.div
                  className="flex items-center gap-2"
                  initial={{ opacity: 0 }}
                  variants={{
                    visible: {
                      opacity: 1,
                      transition: { duration: 1, delay: 2 + index * 0.2 },
                    },
                  }}
                >
                  <img
                    src={language.flag}
                    alt={`${language.title} flag`}
                    className="w-6 h-4 rounded-sm object-cover"
                  />
                  <h3 className="text-xl font-bold text-gray-800">
                    {language.title}
                  </h3>
                </motion.div>
                <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700 mt-2">
                  <motion.div
                    className="bg-[#cea51ec3] h-full rounded-full"
                    style={{ width: `${language.level}%` }}
                    initial={{ scaleX: 0, originX: 0 }}
                    variants={{
                      visible: {
                        scaleX: 1,
                        transition: { duration: 1, delay: 2 + index * 0.2 },
                      },
                    }}
                  ></motion.div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </Section>
  );
};
const ProjectsSection = () => {
  return (
    <Section>
      <h1>Projects</h1>
    </Section>
  );
};
const ContactSection = () => {
  return (
    <Section>
      <div className="w-full max-w-lg bg-white/80 rounded-2xl shadow-xl p-10 flex flex-col gap-6">
        <h2 className="text-4xl font-bold mb-2 text-[#cea51e]">Contact Me</h2>
        <p className="text-gray-600 mb-4">
          Interested in working together or have a question? <br />
          Fill out the form below or email me at{" "}
          <a
            href="mailto:abhaydandge333@gmail.com"
            className="text-[#cea51e] hover:underline"
          >
            abhaydandge333@gmail.com
          </a>
        </p>
        <form
          className="flex flex-col gap-4"
          action="https://formspree.io/f/xayrjvwj"
          method="POST"
          target="_blank"
        >
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            required
            className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#cea51e]"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            required
            className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#cea51e]"
          />
          <textarea
            name="message"
            placeholder="Your Message"
            rows={5}
            required
            className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#cea51e] resize-none"
          />
          <button
            type="submit"
            className="bg-[#cea51e] hover:bg-[#b48f1a] text-white font-bold py-3 px-8 rounded-lg transition-colors duration-200 mt-2"
          >
            Send Message
          </button>
        </form>
        <div className="flex gap-4 mt-4">
          <a
            href="https://github.com/abhay333d"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 hover:text-[#cea51e] text-2xl"
            aria-label="GitHub"
          >
            <svg fill="currentColor" viewBox="0 0 24 24" className="w-7 h-7">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.263.82-.582 0-.288-.012-1.243-.017-2.252-3.338.726-4.042-1.415-4.042-1.415-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.606-2.665-.304-5.466-1.332-5.466-5.931 0-1.31.468-2.381 1.236-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23.957-.266 1.984-.399 3.003-.404 1.018.005 2.046.138 3.006.404 2.289-1.552 3.295-1.23 3.295-1.23.654 1.653.243 2.873.12 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.805 5.625-5.476 5.921.43.372.823 1.102.823 2.222 0 1.606-.015 2.898-.015 3.293 0 .322.216.699.825.58C20.565 21.796 24 17.297 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/in/abhay-dandge-a16082257/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 hover:text-[#cea51e] text-2xl"
            aria-label="LinkedIn"
          >
            <svg fill="currentColor" viewBox="0 0 24 24" className="w-7 h-7">
              <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11.75 20h-3v-11h3v11zm-1.5-12.27c-.97 0-1.75-.79-1.75-1.76s.78-1.76 1.75-1.76c.97 0 1.75.79 1.75 1.76s-.78 1.76-1.75 1.76zm15.25 12.27h-3v-5.6c0-1.34-.03-3.07-1.87-3.07-1.87 0-2.16 1.46-2.16 2.97v5.7h-3v-11h2.88v1.5h.04c.4-.75 1.38-1.54 2.85-1.54 3.05 0 3.61 2.01 3.61 4.62v6.42z" />
            </svg>
          </a>
          <a
            href="https://www.instagram.com/_abhay_dandge_/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 hover:text-[#cea51e] text-2xl"
            aria-label="Instagram"
          >
            {/* SVG from https://www.svgrepo.com/show/504487/instagram.svg */}
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
              <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zm4.25 3.25a5.25 5.25 0 1 1 0 10.5 5.25 5.25 0 0 1 0-10.5zm0 1.5a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5zm5.5.75a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
            </svg>
          </a>
        </div>
      </div>
    </Section>
  );
};

export default Interface;
