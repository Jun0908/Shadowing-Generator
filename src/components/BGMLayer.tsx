import React from "react";
import { Audio, interpolate, staticFile, useVideoConfig } from "remotion";

export const BGMLayer: React.FC = () => {
  const { durationInFrames } = useVideoConfig();
  const bgmVolume = parseFloat(process.env.BGM_VOLUME ?? "0.15");
  const fadeFrames = 30;

  return (
    <Audio
      src={staticFile("bgm.mp3")}
      volume={(frame) =>
        interpolate(
          frame,
          [0, fadeFrames, durationInFrames - fadeFrames, durationInFrames],
          [0, bgmVolume, bgmVolume, 0],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        )
      }
      loop
    />
  );
};
