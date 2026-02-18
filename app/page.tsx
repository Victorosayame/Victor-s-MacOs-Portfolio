import { Dock, Navbar, Welcome } from "@/components";
import { Terminal } from "@/windows";


export default function Home() {
  return (
    <main>
      <Navbar />
      <Welcome />
      <Dock />

      <Terminal />
    </main>
  );
}
