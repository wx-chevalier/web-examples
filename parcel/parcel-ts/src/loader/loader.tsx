import { mount } from "react-cosmos-loader/dom";
import { CallSuperHeroButton } from "../components/CallSuperHeroButton/CallSuperHeroButton";

mount({
  proxies: [],
  fixtures: {
    CallSuperHeroButton: {
      Batman: {
        component: CallSuperHeroButton,
        props: {
          name: "Batman",
          color: "yellow",
          background: "#000"
        }
      },
      Superman: {
        component: CallSuperHeroButton,
        props: {
          name: "Superman",
          color: "#fff",
          background: "red"
        }
      },
      Hulk: {
        component: CallSuperHeroButton,
        props: {
          name: "Hulk",
          color: "#fff",
          background: "green"
        }
      }
    }
  }
});
