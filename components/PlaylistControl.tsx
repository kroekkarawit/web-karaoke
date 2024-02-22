import React, { useState } from "react";
import { useGlobalContext } from "@/utils/globalContext";
import IconStop from "./icons/IconStop";

import IconPlay from "./icons/IconPlay";
import IconSkip from "./icons/IconSkip";
import IconVolume from "./icons/IconVolume";
import IconVolumeMute from "./icons/IconVolumeMute";
import IconSetting from "./icons/IconSetting";
const PlaylistControl = () => {
  const {
    roomId,
    isPlaying,
    setIsPlaying,
    volume,
    setVolume,
    playlist,
    setPlaylist,
    settings,
    setSettings,
  } = useGlobalContext();

  const [isShowSetting, setIsShowSetting] = useState<boolean>(false);

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
      } else {
        const data = await response.json();
      }
    } catch (error) {
      console.error("Error handling file upload:", error);
    }
  };

  const handleChangeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseFloat(e.target.value));
  };

  const handleSkip = async () => {
    if (playlist.length <= 0) return;
    await fetchUpdatePlaylist(playlist[0]._id);
    setPlaylist((prevPlaylist: any) => {
      return prevPlaylist.filter((_: any, index: any) => index !== 0);
    });
  };

  return (
    <>
      <div className="flex justify-around">
        <div
          onClick={() => {
            if (playlist.length <= 0) return;
            setIsPlaying((isPlaying: boolean) => !isPlaying);
          }}
          className={`border-2 border-gray-base rounded-full w-10 h-10 flex justify-center items-center select-none cursor-pointer`}
        >
          {isPlaying && playlist.length > 0 ? <IconStop /> : <IconPlay />}
        </div>

        <div
          onClick={async () => await handleSkip()}
          className="border-2 border-gray-base rounded-full w-10 h-10 flex justify-center items-center cursor-pointer"
        >
          <IconSkip />
        </div>
        <div className="border-2 border-gray-base rounded-full w-32 h-10 flex justify-around items-center pr-2 pl-2">
          {volume > 0 ? <IconVolume /> : <IconVolumeMute />}

          <input
            type="range"
            onChange={handleChangeVolume}
            value={volume}
            min="0.0"
            max="1.0"
            step="0.01"
            className="transparent h-[2px] w-full cursor-pointer appearance-none border-transparent accent-white bg-neutral-200 ml-0.5"
          />
        </div>
        <div
          className="border-2 border-gray-base rounded-full w-10 h-10 flex justify-center items-center cursor-pointer"
          onClick={() => setIsShowSetting((isShowSetting) => !isShowSetting)}
        >
          <IconSetting />
        </div>
      </div>
      {isShowSetting && (
        <div className="h-full w-full bg-zinc-900/75 border border-zinc-950	p-2 rounded-lg mt-2 flex flex-col">
          <div className="flex items-center mb-1">
            <input
              id="default-checkbox"
              type="checkbox"
              checked={settings.showQrCode}
              onChange={() =>
                setSettings({ ...settings, showQrCode: !settings.showQrCode })
              }
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              แสดง QR code
            </label>
          </div>
          <div className="flex items-center">
            <input
              id="default-checkbox"
              type="checkbox"
              checked={settings.AcceptMember}
              onChange={() =>
                setSettings({
                  ...settings,
                  AcceptMember: !settings.AcceptMember,
                })
              }
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              อนุญาติให้เข้าร่วม
            </label>
          </div>
        </div>
      )}
    </>
  );
};

export default PlaylistControl;
