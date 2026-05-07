import Hero from "@/components/sections/Hero";
import Stats from "@/components/sections/Stats";
import About from "@/components/sections/About";
import MLExpertise from "@/components/sections/MLExpertise";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import RoleMatch from "@/components/sections/RoleMatch";
import BookSession from "@/components/sections/BookSession";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <About />
      <MLExpertise />
      <Experience />
      <Projects />
      <RoleMatch />
      <BookSession />
      <Contact />
    </>
  );
}
