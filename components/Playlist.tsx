import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useGlobalContext } from "@/utils/globalContext";

interface IPlaylist {
  id: string;
  title: string;
}

const Playlist = () => {
  const { roomId, isPlaying, playlist, setPlaylist } = useGlobalContext();
  const [showDeleteButton, setShowDeleteButton] = useState<string | null>(null);

  const fetchPlaylistData = async (roomId: string) => {
    try {
      const response = await fetch(`/api/playlist/room/${roomId}`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "GET",
      });

      if (!response.ok) {
        setPlaylist([]);
      } else {
        const data = await response.json();
        setPlaylist(data);
      }
    } catch (error) {
      console.error("Error fetching playlist data:", error);
    }
  };

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
      }
    } catch (error) {
      console.error("Error updating playlist:", error);
    }
  };

  useEffect(() => {
    if (roomId) {
      fetchPlaylistData(roomId);
    }
  }, [roomId]);

  const handleDelete = async (id: string) => {
    if (!roomId) return; // Ensure roomId is defined

    console.log("Deleting playlist", playlist);
    console.log("Deleting playlist id", id);
    await fetchUpdatePlaylist(id);

    setPlaylist((prevPlaylist: any) =>
      prevPlaylist.filter((item: any) => item._id !== id)
    );
  };

  return (
    <div className="flex flex-col p-2 relative">
      {playlist.slice(0, 4).map((item: any, index: any) => (
        <div className="w-full flex mb-1" key={index}>
          <div className={`${index !== 0 && "brightness-50	"} w-1/12 pt-1`}>
            <Image
              src="/assets/images/vinyl.png"
              width={22}
              height={22}
              alt="vinyl"
              className={`${index === 0 && isPlaying && "animate-spin"}`}
            />
          </div>
          <div
            onClick={() => {
              console.log(item._id);
              setShowDeleteButton((prevId) =>
                prevId !== item._id ? item._id : null
              );
            }}
            className={`${
              index === 0 ? "text-white" : "text-[#B19D9D]"
            } pl-2 w-11/12 h-12 text-base line-clamp-2`}
          >
            {item.title}
          </div>
          {showDeleteButton === item._id && (
            <button
              className="bg-red-500 w-6 h-6 px-2  rounded-full flex items-center justify-center"
              onClick={async () => await handleDelete(item._id)}
            >
              <svg
                version="1.1"
                id="Capa_1"
                x="0px"
                y="0px"
                viewBox="0 0 512.021 512.021"
                width="12"
                height="12"
                fill="white"
              >
                <g>
                  <path d="M301.258,256.01L502.645,54.645c12.501-12.501,12.501-32.769,0-45.269c-12.501-12.501-32.769-12.501-45.269,0l0,0   L256.01,210.762L54.645,9.376c-12.501-12.501-32.769-12.501-45.269,0s-12.501,32.769,0,45.269L210.762,256.01L9.376,457.376   c-12.501,12.501-12.501,32.769,0,45.269s32.769,12.501,45.269,0L256.01,301.258l201.365,201.387   c12.501,12.501,32.769,12.501,45.269,0c12.501-12.501,12.501-32.769,0-45.269L301.258,256.01z" />
                </g>
              </svg>
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default Playlist;
