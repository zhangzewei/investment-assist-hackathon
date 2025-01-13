import './style.css';
export default function Loading({ text = 'Loading' }) {
  return <div className="loading-container">
    <div className="loading"></div>
    <div className="loading-text">{text}</div>
  </div>
}