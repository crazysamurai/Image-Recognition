import React, { Component } from "react";
import "./App.css";
import Navigation from "./components/Navigation/Navigation.jsx";
import Logo from "./components/Logo/logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Signin from "./components/signin/signin";
import Particles from "react-particles-js";
import Clarifai from "clarifai";
import Register from "./components/register/register";
const app = new Clarifai.App({
  apiKey: "60f55ed2fdc64f07b08c23b312ceeb01",
});
class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imageUrl: "",
      box: {},
      route: "signin", //to show the sign in page by default
      isSignedIn: false,
      user: {
        id: "",
        name: "",
        email: "",
        entries: 0,
        joined: "",
      },
    };
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        email: data.email,
        name: data.name,
        entries: data.entries,
        joined: data.joined,
      },
    });
  };

  calculateFaceLocation = (data) => {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
    };
  };

  displayFaceBox = (box) => {
    this.setState({ box: box });
  };

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input });

    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, this.state.input) //this.state.input and not imageUrl because it will give an error "bad request"
      .then((response) =>
        this.displayFaceBox(this.calculateFaceLocation(response))
      )
      .catch((err) => console.log(err));
    // console.log(
    //   response.outputs[0].data.regions[0].region_info.bounding_box
    // );
  };

  onRouteChange = (route) => {
    if (route === "signout") {
      this.setState({ isSignedIn: false });
    } else if (route === "home") {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  };

  render() {
    return (
      <div className="App">
        <Particles
          className="particles"
          params={{
            particles: {
              number: { value: 35, density: { enable: true, value_area: 800 } },
              color: { value: "#000000" },
              shape: {
                type: "circle",
                stroke: { width: 0, color: "#000000" },
                polygon: { nb_sides: 5 },
                image: { src: "img/github.svg", width: 100, height: 100 },
              },
              opacity: {
                value: 0.5,
                random: false,
                anim: {
                  enable: false,
                  speed: 1,
                  opacity_min: 0.1,
                  sync: false,
                },
              },
              size: {
                value: 3,
                random: true,
                anim: { enable: false, speed: 40, size_min: 0.1, sync: false },
              },
              line_linked: {
                enable: true,
                distance: 150,
                color: "#111111",
                opacity: 0.4,
                width: 1,
              },
              move: {
                enable: true,
                speed: 0.5,
                direction: "none",
                random: false,
                straight: false,
                out_mode: "out",
                bounce: false,
                attract: { enable: false, rotateX: 600, rotateY: 1200 },
              },
            },
            // interactivity: {
            //   detect_on: "canvas",
            //   events: {
            //     onhover: { enable: true, mode: "repulse" },
            //     onclick: { enable: true, mode: "push" },
            //     resize: true,
            //   },
            //   modes: {
            //     grab: { distance: 400, line_linked: { opacity: 1 } },
            //     bubble: {
            //       distance: 400,
            //       size: 40,
            //       duration: 2,
            //       opacity: 8,
            //       speed: 3,
            //     },
            //     repulse: { distance: 200, duration: 0.4 },
            //     push: { particles_nb: 4 },
            //     remove: { particles_nb: 2 },
            //   },
            // },
            retina_detect: true,
          }}
        />
        {/* since we have to return multiple statements we have to wrap them in a div below. */}
        <Navigation
          isSignedIn={this.state.isSignedIn}
          onRouteChange={this.onRouteChange}
        />
        {this.state.route === "home" ? (
          <div>
            <Logo />
            <Rank />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit}
            />
            <FaceRecognition
              box={this.state.box}
              imageUrl={this.state.imageUrl}
            />
          </div>
        ) : this.state.route === "signin" ? (
          <Signin onRouteChange={this.onRouteChange} />
        ) : (
          <Register
            loadUser={this.loadUser}
            onRouteChange={this.onRouteChange}
          />
        )}
      </div>
    );
  }
}

export default App;
