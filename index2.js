class APP extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeCharacter: [],
      result: 0,
      display: []
    };
    this.setDisplay = this.setDisplay.bind(this);
    this.setResult = this.setResult.bind(this);
    this.clear = this.clear.bind(this)
  }

  setDisplay = (symbol) => {
    if (this.state.display.includes("=") && (symbol !== "+" && symbol !== "-" && symbol !== "/" && symbol !== "x")) {
      this.setState({
        display: [symbol],
        activeCharacter: [symbol]
      });
      console.log("The display includes =")
    } else if (symbol === "+" || symbol === "/" || symbol === "x") {
      if (this.state.display.length > 0) {
        if (
          (this.state.display.indexOf("+") > 0 ||
            this.state.display.indexOf("-") > 0 ||
            this.state.display.indexOf("/") > 0 ||
            this.state.display.indexOf("x") > 0) &&
          (this.state.display[this.state.display.length - 1] != "+" &&
            this.state.display[this.state.display.length - 1] != "-" &&
            this.state.display[this.state.display.length - 1] != "/" &&
            this.state.display[this.state.display.length - 1] != "x")
        ) {
          let result = this.setResult();
          this.setState({
            display: [result, symbol],
            activeCharacter: [symbol]
          });
        } else if (
          (this.state.display[this.state.display.length - 1] === "+" ||
          this.state.display[this.state.display.length - 1] === "-" ||
          this.state.display[this.state.display.length - 1] === "/" ||
          this.state.display[this.state.display.length - 1] === "x")
        ) {
          let newDisplayArr = [...this.state.display];
          if ((this.state.display[this.state.display.length - 1] === "-") && (this.state.display[this.state.display.length - 2] === "+" ||
          this.state.display[this.state.display.length - 2] === "-" ||
          this.state.display[this.state.display.length - 2] === "/" ||
          this.state.display[this.state.display.length - 2] === "x")) {
            newDisplayArr.splice(newDisplayArr.length - 2, 2)
          } else {
            newDisplayArr.pop()
          }
          this.setState({
            display: [...newDisplayArr, symbol],
            activeCharacter: [symbol]
          });
        } else {
          this.setState({
            display: [...this.state.display, symbol],
            activeCharacter: [symbol]
          });
        }
      }
    } else if (symbol == "-") {
      if (
        (this.state.display.includes("+") ||
          this.state.display.includes("-") ||
          this.state.display.includes("/") ||
          this.state.display.includes("x")) &&
        (this.state.display[this.state.display.length - 1] != "+" &&
          this.state.display[this.state.display.length - 1] != "-" &&
          this.state.display[this.state.display.length - 1] != "/" &&
          this.state.display[this.state.display.length - 1] != "x")
      ) {
        let result = this.setResult();
        this.setState({
          display: [result, symbol],
          activeCharacter: [symbol]
        });
      } else {
        this.setState({
          display: [...this.state.display, symbol],
          activeCharacter: [symbol]
        });
      }
    } else if (
        this.state.activeCharacter[0] === "+" ||
        this.state.activeCharacter[0] === "/" ||
        this.state.activeCharacter[0] === "x"
      ) {
        this.setState({
          display: [...this.state.display, symbol],
          activeCharacter: [symbol]
        });
    } else if(symbol == ".") {
      if (this.state.activeCharacter.includes(".") == false) {
        this.setState({
          display: [...this.state.display, symbol],
          activeCharacter: [...this.state.activeCharacter, symbol]
        });
      }
    } else if (symbol == 0) {
      if (this.state.activeCharacter[0] != 0) {
        this.setState({
          display: [...this.state.display, symbol],
          activeCharacter: [...this.state.activeCharacter, symbol]
        });
      }
    } else if (this.state.display.includes("=") == false) {
      this.setState({
        display: [...this.state.display, symbol],
        activeCharacter: [...this.state.activeCharacter, symbol]
      });
    }
  };

  setResult = () => {
    let displayArr = [...this.state.display];
    let result = 0;
    if (displayArr.indexOf("/") >= 0) {
      let value1 = [];
      let value2 = [];
      for (let i = displayArr.indexOf("/") - 1; i >= 0; i--) {
        value1.unshift(displayArr[i]);
      }
      for (let i = displayArr.indexOf("/") + 1; i <= displayArr.length; i++) {
        value2.push(displayArr[i])
      }
      console.log("1 " + value1)
      console.log("2 " + value2)
      let value1Str = value1.join("")
      let value2Str = value2.join("")
      result = parseFloat(value1Str) / parseFloat(value2Str)
    } else if (displayArr.indexOf("x") >= 0) {
      let value1 = [];
      let value2 = [];
      for (let i = displayArr.indexOf("x") - 1; i >= 0; i--) {
        value1.unshift(displayArr[i]);
      }
      for (let i = displayArr.indexOf("x") + 1; i <= displayArr.length; i++) {
        value2.push(displayArr[i])
      }
      console.log("1 " + value1)
      console.log("2 " + value2)
      let value1Str = value1.join("")
      let value2Str = value2.join("")
      result = parseFloat(value1Str) * parseFloat(value2Str)
    } else if (displayArr.indexOf("+") >= 0) {
      let value1 = [];
      let value2 = [];
      for (let i = displayArr.indexOf("+") - 1; i >= 0; i--) {
        value1.unshift(displayArr[i]);
      }
      for (let i = displayArr.indexOf("+") + 1; i <= displayArr.length - 1; i++) {
        value2.push(displayArr[i])
      }
      console.log("1 " + value1)
      console.log("2 " + value2)
      let value1Str = value1.join("")
      let value2Str = value2.join("")
      result = parseFloat(value1Str) + parseFloat(value2Str)
      console.log(result)
    } else if (displayArr.indexOf("-") >= 0) {
      let value1 = [];
      let value2 = [];
      for (let i = displayArr.indexOf("-") - 1; i >= 0; i--) {
        value1.unshift(displayArr[i]);
      }
      for (let i = displayArr.indexOf("-") + 1; i <= displayArr.length; i++) {
        value2.push(displayArr[i])
      }
      console.log("1 " + value1)
      console.log("2 " + value2)
      let value1Str = value1.join("")
      let value2Str = value2.join("")
      result = parseFloat(value1Str) - parseFloat(value2Str)
    }
    let rounded = result.toFixed(5)
    rounded = parseFloat(rounded)
    return rounded;
  };

  setEqual = () => {
    let result = this.setResult()
    this.setState ({
      display: [...this.state.display, "=", result],
      activeCharacter: [result]
    })
  }

  clear = () => {
    this.setState({
      display: [],
      activeCharacter: []
    })
  }

  
  render() {
    return (
      <div className="container">
        <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
          <div className="myCalculator">
            <div className="display">
              {this.state.activeCharacter != "" && <div id="history">{this.state.display.join("")}</div>}
              {this.state.activeCharacter == "" && <div id="history">0</div>}
              {this.state.activeCharacter != "" && <div id="display">{this.state.activeCharacter}</div>}
              {this.state.activeCharacter == "" && <div id="display">0</div>}
            </div>
            <div className="button-row">
              <button id="clear" onClick={() => this.clear()}>AC</button>
              <button id="divide" onClick={() => this.setDisplay("/")}>/</button>
              <button id="multiply" onClick={() => this.setDisplay("x")}>x</button>
            </div>
            <div className="button-row">
              <button id="seven" onClick={() => this.setDisplay(7)}>7</button>
              <button id="eight" onClick={() => this.setDisplay(8)}>8</button>
              <button id="nine" onClick={() => this.setDisplay(9)}>9</button>
              <button id="subtract" onClick={() => this.setDisplay("-")}>-</button>
            </div>
            <div className="button-row">
              <button id="four" onClick={() => this.setDisplay(4)}>4</button>
              <button id="five" onClick={() => this.setDisplay(5)}>5</button>
              <button id="six" onClick={() => this.setDisplay(6)}>6</button>
              <button id="add" onClick={() => this.setDisplay("+")}>+</button>
            </div>
            <div className="button-row">
              <button id="one" onClick={() => this.setDisplay(1)}>1</button>
              <button id="two" onClick={() => this.setDisplay(2)}>2</button>
              <button id="three" onClick={() => this.setDisplay(3)}>3</button>
              <button id="zero" onClick={() => this.setDisplay(0)}>0</button>
            </div>
            <div className="button-row">
              <button id="decimal" onClick={() => this.setDisplay(".")}>.</button>
              <button id="equals" onClick={() => this.setEqual()}>=</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}  

ReactDOM.render(<APP />, document.getElementById("root"));