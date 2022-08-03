import React, { SyntheticEvent } from 'react';
import './timer.sass';
type Props = {
  value: number;
  stopGame: () => void;
};

type State = {
  time: number;
  timerInProgress: boolean;
  timerFinished: boolean;
  animDuration: string;
  timerID: NodeJS.Timer | null;
};

export class Timer extends React.Component<Props, State> {
  timerID!: NodeJS.Timer;
  constructor(props: Props) {
    super(props);
    this.state = {
      time: props.value,
      timerInProgress: false,
      timerFinished: false,
      animDuration: '0s',
      timerID: null,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.startTimer();
  }

  componentWillUnmount() {
    this.stopTimer();
    this.props.stopGame();
  }

  startTimer() {
    if (this.state.timerInProgress === false) {
      this.setState({
        timerInProgress: true,
        animDuration: this.state.time + 's',
      });

      this.timerID = setInterval(() => this.tick(), 1000);
    }
  }

  stopTimer() {
    clearInterval(this.timerID);
    // this.timerID = null;
    this.setState({
      timerInProgress: false,
    });
    this.props.stopGame();
  }

  tick() {
    if (this.state.time > 0) {
      this.setState({
        time: this.state.time - 1,
        timerFinished: false,
      });
    } else {
      this.setState({
        timerFinished: true,
      });
      this.stopTimer();
    }
  }

  handleClick(e: SyntheticEvent) {
    e.preventDefault();
    this.startTimer();
  }

  render() {
    return (
      <div className={this.state.timerInProgress ? 'timer countingDown' : 'timer'}>
        <p>{this.state.time}</p>
        <svg>
          <circle
            r="40"
            cx="50"
            cy="50"
            style={{ animationDuration: this.state.animDuration }}
          ></circle>
        </svg>
      </div>
    );
  }
}
