import React from "react";
import { BlockItem, YardState } from ".";
import { randomNumber } from "../../utils/common";
import "./yard.scss";

export default class Yard extends React.Component {
  constructor(props) {
    super(props);
  }

  yardRef: any;

  yardSize: number = 50;

  state: YardState = {
    blockMap: Array(Math.pow(this.yardSize, 2))
      .fill("")
      .map((_item, index) => {
        if (this.isEdgeIndex(index)) return { id: index, type: "edge" };
        return { id: index, type: "default" };
      }),
    snakeInfo: {
      name: "Hoovy",
      position: [this.yardSize, this.yardSize + 1, this.yardSize + 2],
      direction: "right",
    },
    speed: 100,
    score: 0,
  };

  gameInterval: any;

  get blockMap() {
    return this.state.blockMap;
  }

  get snakeInfo() {
    return this.state.snakeInfo;
  }

  render() {
    const renderBlockItem = () => {
      return this.blockMap.map((item: BlockItem, index) => {
        return <div key={item.id} className={`block-item ${this.snakeInfo.position.includes(index) ? "filled" : ""} ${index == this.snakeInfo.position[this.snakeInfo.position.length - 1] ? "head" : ""} type-${item.type}`}></div>;
      });
    };

    return (
      <div className="yard" ref={(e) => (this.yardRef = e)} tabIndex={0} onKeyDown={(e) => this.onkeydown(e)}>
        <div className="block-container flex-row">{renderBlockItem()}</div>
        <div className="info-block flex-row">
          <div className="score">积分：{this.state.score}</div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.yardRef.focus();
    this.setFood();
    this.setGameInterval();
  }

  isEdgeIndex(index: number): boolean {
    let isEdge = false;
    if (index + 1 <= this.yardSize || index + 1 >= this.yardSize * (this.yardSize - 1)) isEdge = true;
    for (let i = 1; i <= this.yardSize; i++) {
      if (index == i * this.yardSize - this.yardSize || index == i * this.yardSize - 1) isEdge = true;
    }
    return isEdge;
  }

  setGameInterval() {
    this.clearGameInterval();
    this.gameInterval = setInterval(() => {
      this.goSnakeGo();
    }, this.state.speed);
  }

  clearGameInterval() {
    if (!this.gameInterval) return;
    clearInterval(this.gameInterval);
    this.gameInterval = null;
  }

  goSnakeGo() {
    let snakeInfo = this.snakeInfo;
    let position = snakeInfo.position;
    switch (this.snakeInfo.direction) {
      case "left":
        const leftHead = position[position.length - 1] - 1;
        this.handleMove(leftHead);
        if (this.blockMap[leftHead].type == "food") {
          position.push(leftHead - 1);
          this.addScore();
          this.setFood();
        }
        break;
      case "right":
        const rightHeight = position[position.length - 1] + 1;
        this.handleMove(rightHeight);
        if (this.blockMap[rightHeight].type == "food") {
          position.push(rightHeight + 1);
          this.addScore();
          this.setFood();
        }
        break;
      case "up":
        const upHead = position[position.length - 1] - this.yardSize;
        this.handleMove(upHead);
        if (this.blockMap[upHead].type == "food") {
          position.push(upHead - this.yardSize);
          this.addScore();
          this.setFood();
        }
        break;
      case "down":
        const downHead = position[position.length - 1] + this.yardSize;
        this.handleMove(downHead);
        if (this.blockMap[downHead].type == "food") {
          position.push(downHead + this.yardSize);
          this.addScore();
          this.setFood();
        }
        break;
    }
    this.setState({
      snakeInfo,
    });
  }

  handleMove(position: number) {
    if (this.blockMap[position].type == "edge" || this.snakeInfo.position.includes(position)) {
      this.gameover();
      return;
    }
    this.snakeInfo.position.splice(0, 1);
    this.snakeInfo.position.push(position);
  }

  addScore() {
    this.state.score++;
  }

  setFood() {
    const getPosition = (): number => {
      const number = randomNumber(0, Math.pow(this.yardSize, 2));
      if (this.snakeInfo.position.includes(number) || this.blockMap[number].type == "edge") return getPosition();
      else return number;
    };

    let blockMap = this.blockMap;
    let foodBlock = blockMap.find((item) => item.type == "food");
    if (foodBlock) foodBlock.type = "default";
    const position = getPosition();
    blockMap[position].type = "food";
    this.setState({ blockMap });
  }

  onkeydown(e: any) {
    switch (e.key) {
      case "ArrowUp":
        if (this.snakeInfo.direction != "down") this.snakeInfo.direction = "up";
        break;
      case "ArrowLeft":
        if (this.snakeInfo.direction != "right") this.snakeInfo.direction = "left";
        break;
      case "ArrowRight":
        if (this.snakeInfo.direction != "left") this.snakeInfo.direction = "right";
        break;
      case "ArrowDown":
        if (this.snakeInfo.direction != "up") this.snakeInfo.direction = "down";
        break;
    }
  }

  gameover() {
    this.clearGameInterval();
  }
}
