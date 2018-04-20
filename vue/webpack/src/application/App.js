import Vue from 'vue';
import Component from 'vue-class-component';
import Greeting from '../component/home/Greeting';
import GithubCorner from '../component/decorator/GithubCorner';
import { Pagination } from 'element-ui';
import 'element-ui/lib/theme-default/index.css';

import './App.scss';

@Component({
  props: {
    propMessage: String
  }
})
export default class App extends Vue {
  // initial data
  msg = 123;

  // use prop values for initial data
  helloMsg = 'Hello, ' + this.propMessage;

  // lifecycle hook
  mounted() {
    // this.greet();
  }

  // computed
  get computedMsg() {
    return 'computed ' + this.msg;
  }

  // method
  greet() {
    alert('greeting: ' + this.msg);
    this.msg = '111';
  }

  render(h) {
    return (
      <span class="my-class" on-click={this.greet}>
        <Greeting />
        <GithubCorner />
      </span>
    );
  }
}
