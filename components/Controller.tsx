"use client";
import React, { useState } from "react";
import SearchBox from "@/components/SearchBox";
import PlaylistControl from "@/components/PlaylistControl";
import Playlist from "@/components/Playlist";
import RoomQR from "./RoomQR";
import Members from "./Members";
import { useGlobalContext } from "@/utils/globalContext";

const Controller = () => {
  const [isShow, setIsShow] = useState<boolean>(true);
  const { isPlaying } = useGlobalContext();
  return (
    <div
      className={`absolute top-0 right-0 z-10 p-4 hidden md:block select-none`}
    >
      <div
        className={` ${
          isShow
            ? "w-80 h-full rounded-lg p-4 bg-black/75 ease-in duration-100 border border-zinc-900"
            : "w-16 h-16  rounded-lg  bg-black/85 ease-in duration-100 border border-zinc-800"
        }   `}
      >
        <div
          className={`absolute top-0 right-0 mr-5 mt-5 cursor-pointer text-white  ${
            !isShow && "hidden"
          } `}
          onClick={() => setIsShow((isShow) => !isShow)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            id="Capa_1"
            x="0px"
            y="0px"
            viewBox="0 0 512 512"
            width="14"
            height="14"
            fill="#b9b9b9"
          >
            <g>
              <path d="M256,0C114.615,0,0,114.615,0,256s114.615,256,256,256s256-114.615,256-256C511.847,114.678,397.322,0.153,256,0z    M341.333,311.189c8.669,7.979,9.229,21.475,1.25,30.144c-7.979,8.669-21.475,9.229-30.144,1.25c-0.434-0.399-0.85-0.816-1.25-1.25   L256,286.165l-55.168,55.168c-8.475,8.185-21.98,7.95-30.165-0.525c-7.984-8.267-7.984-21.373,0-29.64L225.835,256l-55.168-55.168   c-8.185-8.475-7.95-21.98,0.525-30.165c8.267-7.984,21.373-7.984,29.64,0L256,225.835l55.189-55.168   c7.979-8.669,21.475-9.229,30.144-1.25c8.669,7.979,9.229,21.475,1.25,30.144c-0.399,0.434-0.816,0.85-1.25,1.25L286.165,256   L341.333,311.189z" />
            </g>
          </svg>
        </div>
        <div className={`flex flex-col ${!isShow && "hidden"}`}>
          <SearchBox />
          <PlaylistControl />
          <Playlist />
          <RoomQR />
          {/*<Members /> Coming Soon */}
        </div>

        <div
          className={`flex justify-center items-center content-center h-full w-full select-none ${
            isShow && "hidden"
          }`}
          onClick={() => setIsShow((isShow) => !isShow)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            id="Layer_1"
            data-name="Layer 1"
            viewBox="0 0 24 24"
            width="32"
            height="32"
            fill="white"
            className={`self-center ${isPlaying && "blink"}`}
          >
            <path d="m12,0C5.383,0,0,5.383,0,12s5.383,12,12,12,12-5.383,12-12S18.617,0,12,0Zm0,21c-4.963,0-9-4.038-9-9S7.037,3,12,3s9,4.038,9,9-4.037,9-9,9Zm3.914-7.999l-5.202,2.85c-.766.431-1.712-.123-1.712-1.001v-5.699c0-.879.946-1.432,1.712-1.001l5.202,2.85c.781.439.781,1.563,0,2.002Z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Controller;
