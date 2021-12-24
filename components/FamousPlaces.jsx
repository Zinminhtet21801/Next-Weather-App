import Link from "next/link";
import Image from "next/image";

import LondonImage from "../public/images/london.jpg";
import ParisImage from "../public/images/paris.jpg";
import TokyoImage from "../public/images/tokyo.jpg";
import NewYorkImage from "../public/images/new-york.jpg";

const places = [
  {
    name: "London",
    image: LondonImage,
    url: "/location/london-2643743",
  },
  {
    name: "Paris",
    image: ParisImage,
    url: "/location/paris-2968815",
  },
  {
    name: "Tokyo",
    image: TokyoImage,
    url: "/location/tokyo-1850147",
  },
  {
    name: "New York",
    image: NewYorkImage,
    url: "/location/new-york-city-5128581",
  },
];

const FamousPlaces = () => {
  return (
    <div className="flex items-center justify-between flex-wrap mx-auto max-w-[800px] mt-5  ">
      {places.map((place, index) => (
        <Link href={place.url} passHref key={index}>
          <div className="  dark:text-white  cursor-pointer group p-2 ">
            <Image
              src={place.image}
              width={170}
              height={212.5}
              alt=""
              className="object-cover rounded-xl group-hover:opacity-80 transition-opacity  "
            />
            <p className="font-bold text-[#121212] dark:text-[#D1CDC7] opacity-90 ">
              {place.name}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default FamousPlaces;
