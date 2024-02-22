"use client";
import React from "react";
import Image from "next/image";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getCookie, setCookie } from "cookies-next";

const Home = () => {
  const router = useRouter();
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        const response = await fetch(`/api/user/new`, {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        } else {
          const data: string = await response.json();
          setAccessToken(data);
          setCookie("access_token", data, { secure: true });
        }
      } catch (error) {
        console.error(error);
      }
    };

    const accessToken = getCookie("access_token");
    if (!accessToken) {
      fetchAccessToken();
    } else {
      setAccessToken(accessToken);
    }
  }, []);

  const handleCreateRoom = async () => {
    try {
      const response = await fetch(`/api/room/new`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ accessToken }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      } else {
        const data: any = await response.json();
        router.push(`/room/${data.code}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const [showMainButton, setMainButton] = useState<boolean>(true);
  const [showRoomInput, setShowRoomInput] = useState<boolean>(false);
  const [roomId, setRoomId] = useState<string>("");
  const toggleEnterRoom = () => {
    setMainButton((showMainButton) => !showMainButton);
    setShowRoomInput((showRoomInput) => !showRoomInput);
  };

  return (
    <>
      <Navbar />

      <div className="flex flex-col items-center justify-center h-screen">
        <div className="w-full md:flex hidden">
          <Image
            src="/assets/images/main-logo-full.png"
            width="30000"
            height="10000"
            alt="main-logo"
          />
        </div>
        <div className="w-full md:hidden">
          <Image
            src="/assets/images/main-logo-mini.png"
            width="30000"
            height="10000"
            alt="main-logo"
          />
        </div>
        {showMainButton && (
          <div className="flex w-full justify-center mt-16 flex-col md:flex-row text-center p-10 ">
            <div
              className="hover:cursor-pointer hover:text-slate-300 hover:shadow-lg rounded-full border-2 border-[#B7B1B1] bg-black text-white pr-4 pl-4 pt-2 pb-2 mr-0 md:mr-12 mb-8 md:mb-0"
              onClick={handleCreateRoom}
            >
              สร้างห้อง
            </div>
            <div
              className="hover:cursor-pointer hover:border-[#887e7e] hover:shadow-lg rounded-full border-2 border-[#B7B1B1] text-black pr-4 pl-4 pt-2 pb-2"
              onClick={toggleEnterRoom}
            >
              เข้าห้อง
            </div>
          </div>
        )}
        {showRoomInput && (
          <div className="flex flex-col justify-center mt-16 md:flex-row text-center p-10  ease-in duration-300">
            <div className="flex flex-col mt-4 md:mt-0 md:mr-4">
              <input
                type="text"
                onChange={(e) => setRoomId(e.target.value)}
                className="rounded-full border-2 border-[#B7B1B1] px-2 py-2"
              />
            </div>
            <div className="flex">
              <div
                className="hover:cursor-pointer hover:border-[#887e7e] hover:shadow-lg rounded-full border-2 border-[#B7B1B1] bg-black text-white pr-4 pl-4 pt-2 pb-2 mr-2"
                onClick={() => router.push(`/room/${roomId}`)}
              >
                ไป
              </div>
              <div
                className="hover:cursor-pointer  items-center hover:border-[#887e7e] hover:shadow-lg rounded-full border-2 border-[#B7B1B1]  text-white pr-4 pl-4 pt-2 pb-2"
                onClick={toggleEnterRoom}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  version="1.1"
                  id="Capa_1"
                  x="0px"
                  y="0px"
                  viewBox="0 0 512.021 512.021"
                  width="22"
                  height="22"
                  className="w-4 h-4 fill-black self-center mt-1"
                >
                  <g>
                    <path d="M301.258,256.01L502.645,54.645c12.501-12.501,12.501-32.769,0-45.269c-12.501-12.501-32.769-12.501-45.269,0l0,0   L256.01,210.762L54.645,9.376c-12.501-12.501-32.769-12.501-45.269,0s-12.501,32.769,0,45.269L210.762,256.01L9.376,457.376   c-12.501,12.501-12.501,32.769,0,45.269s32.769,12.501,45.269,0L256.01,301.258l201.365,201.387   c12.501,12.501,32.769,12.501,45.269,0c12.501-12.501,12.501-32.769,0-45.269L301.258,256.01z" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
