import React, { useState }  from 'react';
import logo from './logo.svg';
import './App.css'; // スタイルを読み込む

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <LikeButton />
      </header>
    </div>
  );
}

function LikeButton() {
  // useStateで関数コンポーネントに状態を持たせる
  // useStateの戻り値をcountとsetCountの2つの変数に代入
  // countには999、setCountにはcountの値を変更する関数が代入される
  const [count, setCount] = useState(999);
  const handleClick = () => {
    setCount(count + 1);
  };
  return (
    <span className="likeButton" onClick={handleClick}>
      ♥ {count}
    </span>
  );
}

export default App;
