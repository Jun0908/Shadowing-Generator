import React from "react";
import {
  AbsoluteFill,
  Audio,
  Sequence,
  Video,
  staticFile,
  useVideoConfig,
} from "remotion";
import { SCRIPT } from "../data/script";
import { getLineStartFrame } from "../utils/getDuration";
import { SubtitleOverlay } from "../components/SubtitleOverlay";
import { BGMLayer } from "../components/BGMLayer";

export const MainVideo: React.FC = () => {
  const { durationInFrames } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      {/* 背景動画: public/demo.mp4 を配置してください */}
      <Sequence from={0} durationInFrames={durationInFrames}>
        <Video
          src={staticFile("demo.mp4")}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          volume={0}
          loop
        />
      </Sequence>

      {/* BGM: public/bgm.mp3 を配置すると有効になります */}
      <BGMLayer />

      {/* 各行のナレーション音声 + 字幕 */}
      {SCRIPT.map((line, index) => {
        const from = getLineStartFrame(index);
        const totalLineDuration =
          line.durationInFrames + (line.pauseAfter ?? 0);

        return (
          <Sequence key={line.id} from={from} durationInFrames={totalLineDuration}>
            {/* 音声は durationInFrames のみ（pauseAfter 中は無音）*/}
            <Sequence from={0} durationInFrames={line.durationInFrames}>
              <Audio src={staticFile(`voices/${line.id}.mp3`)} />
            </Sequence>

            {/* 字幕も durationInFrames のみ表示 */}
            <Sequence from={0} durationInFrames={line.durationInFrames}>
              <SubtitleOverlay line={line} />
            </Sequence>
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
