import { Dock, Navbar, Welcome } from "@/components";
import { Safari, Terminal, Resume, Finder, Text, Image, Contact } from "@/windows";


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
    </main>
  );
}
