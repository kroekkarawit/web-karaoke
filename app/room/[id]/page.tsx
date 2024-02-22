"use client";
import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Controller from "@/components/Controller";
import { useGlobalContext } from "@/utils/globalContext";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false });
const Room = ({ params }: { params: { id: string } }) => {
  const router = useRouter();

  const [fetchData, setFetchData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const {
    roomId,
    setRoomId,
    isPlaying,
    setIsPlaying,
    playlist,
    setPlaylist,
    volume,
  } = useGlobalContext();
  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        const response = await fetch(`/api/room/${params.id}`, {
          headers: {
            "Content-Type": "application/json",
          },
          method: "GET",
        });

        if (!response.ok) {
          setIsLoading(false);
        } else {
          const data = await response.json();
          setIsLoading(false);
          setRoomId(data.code);
        }
      } catch (error) {
        console.error("Error", error);
      }
    };

    fetchRoomData();
  }, []);

  const fetchUpdatePlaylist = async (id: string) => {
    try {
      const response = await fetch(`/api/playlist`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "PATCH",
        body: JSON.stringify({
          room_id: roomId,
          playlist_id: id,
        }),
      });

      if (!response.ok) {
        console.error("Error updating playlist");
      } else {
        const data = await response.json();
        // Handle response data if needed
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  const handleSkip = async () => {
    if (!roomId) return; // Ensure roomId is defined
    await fetchUpdatePlaylist(playlist[0]._id);
    setPlaylist((prevPlaylist: any) => prevPlaylist.slice(1));
  };

  const handleVideoEnded = async (indexToRemove: number) => {
    if (!roomId) return; // Ensure roomId is defined
    await fetchUpdatePlaylist(playlist[0]._id);
    setPlaylist((prevPlaylist: any) =>
      prevPlaylist.filter((_: any, index: any) => index !== indexToRemove)
    );
  };

  return (
    <>
      <div className="relative">
        <div className="fixed top-0 left-0 w-screen h-screen flex justify-center mt-16 md:mt-0 md:items-center bg-black">
          <div className="max-w-full max-h-full content-center">
            {playlist.length > 0 ? (
              <>
                <ReactPlayer
                  key={playlist[0].youtube_id}
                  width="100%"
                  height="100%"
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                  url={`http://localhost:3000/api/stream/${playlist[0].youtube_id}`}
                  controls={false}
                  playing={isPlaying}
                  onEnded={async () => {
                    await handleVideoEnded(0);
                    if (playlist.length <= 1 && isPlaying) {
                      setIsPlaying(false);
                    }
                  }}
                  onError={() => {
                    handleSkip();
                  }}
                  //onProgress={handleProgress}
                />
                <ReactPlayer
                  className="audio-player"
                  url={`http://localhost:3000/api/audio/${playlist[0].youtube_id}`}
                  controls={false}
                  playing={isPlaying}
                  volume={volume}
                  onError={() => {
                    handleSkip();
                  }}
                />
              </>
            ) : (
              <Image
                className="object-contain"
                src="/assets/images/room-image-1.jpg"
                alt="room"
                width={5760}
                height={3240}
              />
            )}
          </div>
        </div>
        <div
          className={`absolute top-0 left-0 z-10 p-4 hidden md:block select-none`}
        >
          <div className="flex justify-start" onClick={() => router.push(`/`)}>
            <div className="w-4 h-4 mr-4 hidden md:flex">
              <Image
                src="/assets/images/logo.png"
                width={30}
                height={30}
                alt="logo"
              />
            </div>

            <div className="text-sm font-semibold text-white">WEB-KARAOKE</div>
          </div>
        </div>
        <Controller />
      </div>
    </>
  );
};

export default Room;
