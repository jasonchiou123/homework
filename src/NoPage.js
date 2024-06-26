import logo from './logo.svg';
import './App.css';

export default function NoPage() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          404 PAGE NOT FOUND.    沒有找到這個頁面
        </p>
      </header>
    </div>
  );
}