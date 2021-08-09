import Image from "next/image";
import {
  SearchIcon,
  GlobeAltIcon,
  MenuIcon,
  UserCircleIcon,
  UserIcon,
} from "@heroicons/react/solid";
import { useState } from "react";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker } from "react-date-range";
import { useRouter } from 'next/dist/client/router'

function Header({searchPlaceholder}) {
  const [searchInput, setsearchInput] = useState("");
  const [startDate, setstartDate] = useState(new Date());
  const [endDate, setendDate] = useState(new Date());
  const [noOfGuests, setnoOfGuests] = useState(1);

  const router = useRouter()

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };

  const selectHandler = (ranges) => {
    console.log(ranges);
    setstartDate(ranges.selection.startDate);
    setendDate(ranges.selection.endDate);
  };

  const searchHandler = () => {

    const searhVal = searchInput;
    setsearchInput('');

    router.push({
      pathname:'/search',
      query: {
        location: searhVal || 'India',
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        guests: noOfGuests
      }
    })
  }

  return (
    <header className="sticky top-0 z-50 grid grid-cols-3 bg-white shadow-md p-5 md:px-10">
      {/* Left - Logo */}
      <div onClick={()=>router.push('/')} className="relative flex items-center cursor-pointer h-10 my-auto">
        <Image
          src="https://links.papareact.com/qd3"
          layout="fill"
          objectFit="contain"
          objectPosition="left"
        />
      </div>

      {/* Middle - Search */}
      <div className="flex items-center md:shadow-sm md:border-2 py-2 rounded-full md:hover:shadow-md">
        <input
          type="text"
          placeholder={searchPlaceholder || "Start your search"}
          value={searchInput}
          onChange={(e) => setsearchInput(e.target.value)}
          className="pl-5 flex-grow bg-transparent outline-none text-sm text-gray-600 placeholder-gray-400"
        />
        <SearchIcon onClick={searchHandler} className="hidden md:mx-2 md:inline-flex h-8 bg-red-400 text-white rounded-full p-2 cursor-pointer" />
      </div>

      {/* Right */}
      <div className="flex items-center justify-end space-x-4 text-gray-500">
        <p className="hidden md:inline cursor-pointer md:rounded-full md:hover:bg-gray-100 md:p-2">
          Become a host
        </p>
        <GlobeAltIcon className="hidden md:inline h-10 cursor-pointer rounded-full hover:bg-gray-100 p-2" />

        <div className="flex items-center space-x-2 border-2 p-2 rounded-full hover:shadow-md cursor-pointer">
          <MenuIcon className="h-6" />
          <UserCircleIcon className="h-6" />
        </div>
      </div>

      {searchInput && (
        <div className="flex flex-col col-span-3 shadow-md mx-auto mt-5">
          <DateRangePicker
            ranges={[selectionRange]}
            minDate={new Date()}
            rangeColors={["#FD5B61"]}
            onChange={selectHandler}
          />

          <div className="flex items-center p-2 mb-4">
            <h2 className="text-2xl flex-grow font-semibold">
              Number of Guests
            </h2>
            <UserIcon className="h-5" />
            <input
              type="number"
              className="w-12 pl-2 text-lg outline-none text-red-400"
              value={noOfGuests}
              min="1"
              onChange={(e) => setnoOfGuests(e.target.value)}
            />
          </div>
          <div className="flex p-2">
            <button
              className="flex-grow text-gray-500"
              onClick={() => setsearchInput("")}
            >
              Cancel
            </button>
            <button onClick={searchHandler} className="flex-grow text-red-400">Search</button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
