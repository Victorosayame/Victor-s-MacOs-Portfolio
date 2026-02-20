import { Dock, HomePage, Navbar, Welcome } from "@/components";
import { Safari, Terminal, Resume, Finder, Text, Image, Contact, Photo } from "@/windows";


export default function Home() {
  return (
    <main>
      <Navbar />
      <Welcome />
      <Dock />

      <Terminal />
      <Safari />
      <Resume />
      <Finder />
      <Text />
      <Image />
      <Contact />
      <Photo />

      
      <HomePage />
    </main>
  );
}
