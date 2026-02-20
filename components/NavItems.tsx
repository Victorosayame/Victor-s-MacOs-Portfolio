//step3 create a client component nav items
"use client"

import { navIcons, navLinks } from "@/constants";
import useWindowStore, { WindowKey } from "@/store/window";
import dayjs from "dayjs";
import Image from "next/image";
import { useEffect, useState } from "react";

//TODO:Wrk on the light and dark mode toggle


const NavItems = () => {
   // STEP 24: Add Quick Navigation to Windows via Navbar Links
  // Integrating useWindowStore to provide one-click access to main sections
  // Users can click navigation items to directly open windows instead of using dock
  const { openWindow } = useWindowStore();

  const [time, setTime] = useState(dayjs());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(dayjs());
    }, 1000); // updates every second

    return () => clearInterval(interval);
  }, []);
  return (
    <>
    <div>
        <Image 
          src="/images/logo.svg"
          alt="logo"
          width={14}
          height={14}
        />
        <p className="font-bold">Victor's Portfolio</p>
        
        <ul>
           {navLinks.map(({ id, name, type }) => (
            <li key={id} onClick={() => openWindow(type as WindowKey)}>
              <p>{name}</p>
            </li>
          ))}
        </ul>
      </div>

       <div>
        <ul className="max-xl:ml-4">
          {navIcons.map(({ id, img }) => (
            <li key={id}>
              <Image src={img} alt={`icon-${id}`} width={14} height={14} className="icon-hover" />
            </li>
          ))}
        </ul>

        
    <time className="max-xl:text-xs">
      {time.format("ddd MMM D h:mm A")}
    </time>
      </div>
    </>
  )
}

export default NavItems