// ★ このファイルだけを編集してスクリプトを管理する
// npm run voices を実行すると public/voices/{id}.mp3 が生成され
// durationInFrames が src/data/durations.json に自動保存される

export interface ScriptLine {
  /** mp3ファイル名になる（例: "ch1" → public/voices/ch1.mp3）*/
  id: string;
  /** チャプター見出し（任意） */
  chapter?: string;
  /** 字幕として表示されるテキスト */
  text: string;
  /** ナレーション音声に使うテキスト（省略時は text を使用）*/
  narration?: string;
  /** フォールバック値。npm run voices 後は durations.json が優先される */
  durationInFrames: number;
  /** 発話後の無音ポーズ（フレーム数、30fps基準） */
  pauseAfter?: number;
  /** 絶対開始フレーム（指定するとこのフレームから音声・字幕が始まる） */
  startFrame?: number;
}

export const RAW_SCRIPT: ScriptLine[] = [
  {
    id: "ch1",
    text: "Login: Scan QR → Sign on mobile",
    narration: "First, we connect a wallet and sign in securely.",
    durationInFrames: 83,
    startFrame: 0,      // 0秒から開始
  },
  {
    id: "ch2",
    text: "Buy coverage in a few clicks",
    narration: "Next, we purchase coverage in just a few clicks.",
    durationInFrames: 81,
    startFrame: 360,    // 12秒から開始（ここを変えてずらす）
  },
  {
    id: "ch3",
    text: "Verifying automatically…",
    narration: "Then verification runs automatically in the background.",
    durationInFrames: 85,
    startFrame: 840,    // 28秒から開始（ここを変えてずらす）
  },
  {
    id: "ch4",
    text: "Submitted → Generate proof",
    narration: "Once it's submitted, we generate a proof for the next step.",
    durationInFrames: 95,
    startFrame: 1260,   // 42秒から開始（ここを変えてずらす）
  },
];
