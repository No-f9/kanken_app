# かんじ れんしゅうちょう（漢検10級）

小学1年の80字を、iPadで毎日少しずつ覚えるためのWebアプリです。
問題データ（80字分の読み・書き取り・筆順・画数・成り立ち）は入っています。

## ファイル

| ファイル | 役割 |
| --- | --- |
| index.html | アプリ本体（問題データ・筆順データ・フォント・スケジュール計算をすべて内蔵） |
| sw.js | オフラインで動かすための Service Worker |
| manifest.webmanifest | ホーム画面に追加したときの名前・アイコン |
| icon-180.png / icon-192.png / icon-512.png | アイコン |

## 公開のしかた（GitHub Pages）

1. GitHub で新しいリポジトリを作る（例：`kanji-renshu`）
2. 「Add file」→「Upload files」で、上の6ファイルをまとめてドラッグして「Commit changes」
3. 「Settings」→「Pages」→ Branch を `main` / `(root)` にして「Save」
4. 1〜2分後に表示される URL（`https://ユーザー名.github.io/kanji-renshu/`）を iPad の Safari で開く

## iPad での使い方

1. Safari で URL を開き、共有ボタン →「ホーム画面に追加」
2. ホーム画面のアイコンから起動する（全画面になり、記録も安定して残ります）
3. 一度開けば、そのあとはネットにつながっていなくても使えます

## おうちの方へ

- ホーム画面右下の「おうちの かたへ」を長押しすると設定が開きます
- 受検日（初期値：2026年11月6日）、1日の学習時間、仕上げ期間を変えられます
- 学習記録はこの iPad の中だけに保存されます。週に1回「記録を書き出す」でバックアップしてください
- 書き取りは本人の自己採点です。設定画面の「書き取りの記録」で、書いた字と採点を見返せます

## しくみ

- 受検日までの日数から、1日に出す新しい漢字の数を自動で決めます（最後の3日は復習だけ）
- 答えた結果から、FSRS（間隔反復）で次に出す日を決めます
- まちがえた問題は、その日のうちに数問あとでもう一度出ます
- 覚えた度合いに応じて、図鑑の漢字が「かげ → であった → れんしゅう → ★ → ★★ → ★★★」と育ちます

## クレジット

- 筆順データ：[KanjiVG](https://kanjivg.tagaini.net/)（© Ulrich Apel, CC BY-SA 3.0）
- フォント：[Klee One](https://fonts.google.com/specimen/Klee+One)（Fontworks, SIL Open Font License）
- スケジュール計算：[ts-fsrs](https://github.com/open-spaced-repetition/ts-fsrs)（MIT License）
- 問題文はこのアプリ用に作成したもので、漢検の過去問ではありません
