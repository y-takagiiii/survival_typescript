import { GetServerSideProps, NextPage } from "next";
import { useState } from "react";
import styles from "./index.module.css";

// getServerSidePropsから渡されるpropsの型
type Props = {
  initialImageUrl: string;
};

// ページコンポーネントにpropsを受け取る引数を追加する
// Props型のNextPage変数を宣言
const IndexPage: NextPage<Props> = ({ initialImageUrl }) => {
  // useStateを使って状態を定義する
  // 状態変数imageUrl、その状態を更新するための関数setImageUrl
  // initialImageUrlが初期値としてuseStateに渡され、受け取った初期値をimageUrlとして使用する
  // useStateは配列を返すため、分割代入を使用してそれぞれの要素を取得
  const [imageUrl, setImageUrl] = useState(initialImageUrl);
  const [loading, setLoading] = useState(false);
  // ボタンをクリックしたときに画像を読み込む処理
  const handleClick = async () => {
    setLoading(true); // 読み込み中フラグを立てる
    const newImage = await fetchImage();
    setImageUrl(newImage.url); // 画像URLの状態を更新する
    setLoading(false); // 読み込み中フラグを倒す
  };
  // ローディンク中でなければ画像を表示する
  return (
    <div>
      <button
        onClick={handleClick}
        style={{
          backgroundColor: "#319795",
          border: "none",
          borderRadius: "4px",
          color: "white",
          padding: "4px 8px"
        }}
      >
        きょうのにゃんこ🐱
      </button>
      <div style={{ marginTop: 8, maxWidth: 500 }}>
        <img src="{catImageUrl}" width="100%" height="auto" alt="猫" />
      </div>
    </div>
  );
};

export default IndexPage;

// サーバーサイドで実行する処理
export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const image = await fetchImage();
  return {
    props: {
      initialImageUrl: image.url,
    },
  };
};

// 型をImageとして定義
type Image = { url: string; };
const fetchImage = async (): Promise<Image> => {
  //                         ^^^^^^^^^^^^^^ 型注釈
  const res = await fetch("https://api.thecatapi.com/v1/images/search");
  const images = await res.json();
  console.log(images);
  return images[0];
};
