"use client";
import React from "react";

const Members = () => {
  const members: string[] = [
    "เอกชัย",
    "นัตตี้",
    "Tanna",
    "oven",
    "Godji",
    "ต้าต้า",
    "แพรว",
    "Uko",
    "beam",
    "Boy",
    "สิงห์",
  ];

  // Function to generate a color based on a string
  const stringToColor = (str: string): string => {
    let hash: number = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const c: string = (hash & 0x00ffffff).toString(16).toUpperCase();
    return "#" + "00000".substring(0, 6 - c.length) + c;
  };

  return (
    <div className="flex justify-center  mt-4">
      <div className="flex">
        {members.slice(0, 8).map((member, index) => (
          <div
            key={index}
            style={{ backgroundColor: stringToColor(member) }}
            className="w-7 h-7 rounded-full flex justify-center items-center mr-1 saturate-50"
          >
            <span className="text-white">{member[0].toUpperCase()}</span>
          </div>
        ))}
        {members.length > 8 && (
          <div
            className="w-7 h-7 rounded-full flex justify-center items-center bg-[#171717] border-2 border-gray-base"
            title={`+${members.length - 8}`}
          >
            <span className="text-white text-xs">{`+${
              members.length - 8
            }`}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Members;
