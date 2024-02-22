import React, { useState, useEffect, useRef } from "react";
import useDebounce from "@/hooks/useDebounce";
import { useGlobalContext } from "@/utils/globalContext";
import Iconsearch from "./icons/IconSearch";
interface Video {
  id: string;
  title: string;
}

const SearchBox: React.FC = () => {
  const { roomId, playlist, setPlaylist } = useGlobalContext();
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState<Video[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const handleSearch = async (query: string) => {
    try {
      const response = await fetch(`/api/search?query=${query}`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      } else {
        const data: Video[] = await response.json();
        setSearchResults(data); // Set the search results in the state
        console.log("data", data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddPlaylist = async (youtubeId: string, title: string) => {
    try {
      const response = await fetch(`/api/playlist`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          room_id: roomId,
          youtube_id: youtubeId,
          title: title,
        }),
      });

      if (!response.ok) {
        return false;
      } else {
        const data = await response.json();
        return data;
      }
    } catch (error) {
      console.error(error);
      return false;
    }
  };
  useEffect(() => {
    let timer = setTimeout(() => {
      if (search) handleSearch(search);
    }, 1000);

    return () => clearTimeout(timer);
  }, [search]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearch(value);
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target as Node)
    ) {
      setSearchResults([]);
      setSelectedItems([]);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-wrap border-2 border-gray-base rounded-full w-full relative h-15 bg-transparent items-center mb-4">
      <input
        className="flex-shrink flex-grow leading-normal w-px flex-1 placeholder:text-white bg-transparent text-white border-0 h-10 px-3 relative self-center outline-none"
        placeholder="ค้นหาเพลง"
        onChange={handleChange}
      />

      <div className="flex -mr-px">
        <span className="flex items-center leading-normal bg-transparent rounded rounded-l-none border-0 px-3 whitespace-no-wrap text-gray-600">
          <Iconsearch />
        </span>
      </div>
      {searchResults.length > 0 && search.length > 0 && (
        <div
          ref={dropdownRef}
          className="w-full absolute bg-white shadow-md p-2 rounded-md z-50"
          style={{ top: "calc(100% + 2px)", right: 0, left: 0 }}
        >
          {searchResults.map((i, index) => (
            <div
              key={index}
              className={`border-b-2 border-gray-100 text-sm line-clamp-1 mb-1 ${
                selectedItems.includes(i.id) ? "text-green-500" : ""
              }`}
              onClick={async () => {
                const newSelectedItems = [...selectedItems];
                const itemIndex = newSelectedItems.indexOf(i.id);
                if (itemIndex !== -1) {
                  newSelectedItems.splice(itemIndex, 1);
                } else {
                  newSelectedItems.push(i.id);
                }
                const res = await handleAddPlaylist(i.id, i.title);
                if (res) {
                  setSelectedItems(newSelectedItems);
                  setPlaylist(res);
                }
              }}
            >
              {i.title}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBox;
