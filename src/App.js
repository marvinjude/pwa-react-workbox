import React from "react";
import brandImg from "./hashtag.gif";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }

  getInitialState = () => ({
    online: navigator.onLine,
    users: [
      {
        name: "Agboola Jude",
        bio: "Software Engineer @charisol",
        image: "https://imgur.com/gallery/PQZFoZ1"
      },
      {
        name: "Agboola Jude",
        bio: "Software Engineer @charisol",
        image: "https://imgur.com/gallery/PQZFoZ1"
      },
      {
        name: "Agboola Jude",
        bio: "Software Engineer @charisol",
        image: "https://imgur.com/gallery/PQZFoZ1"
      }
    ],
    fetching: true
  });

  componentDidMount() {
    //Reister Listener for online/offline state
    window.addEventListener("online", () => {
      this.setState({ online: true });
    });
    window.addEventListener("offline", () => {
      this.setState({ online: false });
    });

    fetch("https://my-json-server.typicode.com/marvinjude/json-api/speakers/")
      .then(response => response.json())
      .then(users => {
        this.setState({ users, fetching: false });
      })
      .catch(error => {
        console.log("An error occured");
        this.setState({ fetching: false });
      });
  }

  componentWillUnmount() {
    window.removeEventListener("online");
    window.removeEventListener("offline");
  }

  render() {
    return (
      <div>
        <header style={styles.header}>
          <img alt="brand" src={brandImg} style={styles.logo} />
        </header>
        <div
          style={
            this.state.online
              ? styles.networkStat__online
              : styles.networkStat__offline
          }
        >
          {this.state.online ? "Online" : "Offline"}
        </div>
        <div style={styles.container}>
          {!this.state.fetching &&
            this.state.users.map(({ name, bio }) => (
              <div key={name} style={styles.card}>
                <div style={styles.circle} />
                <div>
                  <h3>{name}</h3>
                  <p>{bio}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  }
}

//Styles
const networkStat = {
  padding: "10px",
  position: "absolute",
  bottom: "0",
  fontWeight: "bold",
  left: "0",
  width: "100%",
  color: "white"
};

const styles = {
  logo: {
    height: "100%"
  },
  header: {
    height: "50px",
    width: "100%",
    backgroundColor: "white",
    boxShadow: "0 3px 5px rgba(57, 63, 72, 0.3)",
    display: "flex",
    justifyContent: "center"
  },
  networkStat__online: { ...networkStat, backgroundColor: "green" },
  networkStat__offline: { ...networkStat, backgroundColor: "#db3236" },
  circle: {
    width: "3rem",
    backgroundColor: "gold",
    height: "3rem",
    borderRadius: "50%",
    marginRight: "10px"
  },
  container: { display: "flex", flexDirection: "column" },
  card: {
    margin: "5px",
    backgroundColor: "white",
    padding: "10px",
    borderRadius: "5px",
    display: "flex"
  }
};
export default App;
