import "./App.css";

const App = () => {
  //localStorage.setItem("name", "Dolly");
  //sessionStorage.setItem("name", "Mahesh");

  return (
    <div className="app">
      <div className="container">
        <div className="header">
          <h1>Storage Dashboard</h1>
          <p>Manage and view your browser storage data</p>
        </div>

        <div className="storage-container">
          <div className="storage-card local">
            <div className="storage-icon">💾</div>
            <div className="storage-type">Local Storage</div>
            <div className="storage-value">{localStorage.getItem("name")}</div>
            <div className="storage-info">
              Data persists even when the browser is closed and reopened
            </div>
          </div>

          <div className="storage-card session">
            <div className="storage-icon">⚡</div>
            <div className="storage-type">Session Storage</div>
            <div className="storage-value">
              {sessionStorage.getItem("name")}
            </div>
            <div className="storage-info">
              Data persists only for the duration of the page session
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
