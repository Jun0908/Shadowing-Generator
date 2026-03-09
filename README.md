# Shadowing Generator

このプロジェクトは、1本の英語動画からシャドーイング練習用動画を作るツールです。  
コマンド1つで、次の4つのパートを自動で作って連結します。

1. 元動画 + 元音声（字幕なし）
2. 画面 + 元音声（字幕なし）
3. 黒画面 + TTS音声（英語/日本語字幕あり）
4. 黒画面 + 元音声（英語/日本語字幕あり）

---

## 1. 最初に必要なもの

- Node.js（推奨: 20以上）
- `ffmpeg` と `ffprobe`（PATHが通っていること）
- OpenAI APIキー（文字起こし・翻訳用）
- ElevenLabs APIキー（音声生成用）

---

## 2. セットアップ

### 2-1. 依存パッケージを入れる

```bash
npm install
```

### 2-2. `.env` を作る

`.env.example` をコピーして `.env` を作成してください。

```bash
cp .env.example .env
```

Windows PowerShell の場合:

```powershell
Copy-Item .env.example .env
```

### 2-3. `.env` を編集する

最低限、次の2つは必須です。

```env
OPENAI_API_KEY=あなたのOpenAIキー
ELEVENLABS_API_KEY=あなたのElevenLabsキー
```

よく使う設定:

```env
ELEVENLABS_VOICE_ID=21m00Tcm4TlvDq8ikWAM
PASS3_TTS_SPEED=0.8
```

`PASS3_TTS_SPEED=0.8` にすると、3回目の女性音声がゆっくりになります（約0.8倍速）。

---

## 3. 動画を作る

入力動画は `public/demo.mp4` を使います。  mp4の動画をpublicフォルダにいれてください。
実行コマンド:

```bash
npm run shadow:mvp -- --input public/demo.mp4 --segment 30 --output shadowing.mp4
```

成功すると、出力は `out/shadowing.mp4` に保存されます。

---

## 4. よく変える値

- `--segment 30`
  - 1セグメントの秒数です。  
  - 数字を大きくすると、1回の字幕量が増えます。
- `PASS3_TTS_SPEED`
  - 3回目のTTS速度です。
  - `1.0` が通常、`0.8` がゆっくりです。
  - 有効範囲は `0.5` 〜 `2.0`。

例（3回目をゆっくりにする）:

```env
PASS3_TTS_SPEED=0.8
```

---

## 5. よくあるエラー

- `ffmpeg` が見つからない
  - `ffmpeg` / `ffprobe` をインストールして、ターミナルを再起動してください。
  - Mac の入れ方（Homebrew）:

    ```bash
    brew install ffmpeg
    ffmpeg -version
    ffprobe -version
    ```

  - Windows の入れ方（PowerShell）:

    ```powershell
    winget install -e --id Gyan.FFmpeg
    ffmpeg -version
    ffprobe -version
    ```

  - まだ見つからない場合:
    - `ffmpeg.exe` があるフォルダ（例: `C:\ffmpeg\bin`）を PATH に追加してください。
- `OPENAI_API_KEY is required`
  - `.env` に `OPENAI_API_KEY` を設定してください。
  - 取得リンク: https://platform.openai.com/api-keys
- `ELEVENLABS_API_KEY is required`
  - `.env` に `ELEVENLABS_API_KEY` を設定してください。
  - 取得リンク: https://elevenlabs.io/app/settings/api-keys

---

## 6. 補足

- 字幕フォントを指定したい場合は `.env` に `SUBTITLE_FONT_FILE` を設定できます。
