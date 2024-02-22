import React, { useRef, useEffect } from "react";
import { useGlobalContext } from "@/utils/globalContext";
import QrCodeWithLogo from "qrcode-with-logos";
import IconCopy from "./icons/IconCopy";

const RoomQR = () => {
  const { roomId, settings } = useGlobalContext();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    const qrcode = new QrCodeWithLogo({
      canvas: canvasRef.current,
      content: `${process.env.NEXT_PUBLIC_BASE_URL}/room/${roomId}`,
      width: 196,

      logo: {
        src: "/assets/images/logo.png",
      },
    });
  }, [roomId]);

  return (
    <div className="flex flex-col justify-center items-center mt-6">
      {settings.showQrCode && (
        <>
          <canvas ref={canvasRef} className="w-48	h-48 rounded-lg"></canvas>

          <div
            className="flex w-full justify-center items-center mt-2 select-none"
            onClick={() => {
              navigator.clipboard.writeText(roomId);
            }}
          >
            <div className="flex flex-wrap border-2 border-gray-base rounded  w-48	relative h-6 bg-transparent items-center ">
              <input
                className="flex-shrink flex-grow leading-normal w-px flex-1 -mt-0.5 text-gray-base bg-transparent font-sm border-0 px-2 relative self-center outline-none"
                value={roomId}
                disabled={true}
              />
              <div className="flex -mr-px">
                <span className="flex items-center leading-normal bg-transparent rounded rounded-l-none border-0 px-3 whitespace-no-wrap text-gray-600">
                  <IconCopy />
                </span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default RoomQR;
