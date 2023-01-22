import React, {Component} from 'react'; // we need this to make JSX compile

// the clock's state has one field: The current time, based upon the
// JavaScript class Date
type ClockState = {
  time: Date
}



// Clock has no properties, but the current state is of type ClockState
// The generic parameters in the Component typing allow to pass props
// and state. Since we don't have props, we pass an empty object.
export class TxComp extends Component<{txs:any}, ClockState> {


  // constructor(props) { // ️⚡️ does not compile in strict mode
  //   super(props)
  // }
  // console.log(this.props)
  //   console.log(this.props.txs)

    // The tick function sets the current state. TypeScript will let us know
    // which ones we are allowed to set.
  tick() {
    this.setState({
      time: new Date()
    });
  }

  // Before the component mounts, we initialise our state
  UNSAFE_componentWillMount() {
    this.tick();

    // console.log(this.props)
    // console.log(this.props.txs)
  }

  // After the component did mount, we set the state each second.
  componentDidMount() {
    setInterval(() => this.tick(), 1000);
    console.log(this.props)
  }

  // render will know everything!
  render() {
    return <div>
      <p>The current time is {this.state.time.toLocaleTimeString()}</p>
      <p>Props: {this.props.txs}</p>
      </div>
  }
}
