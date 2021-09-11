import { useEffect, useRef, useState } from "react";
import { BlockItem } from "./yard.d";
import { randomNumber } from "../../utils/common";
import "./yard.scss";
import { useStore } from "react-redux";

let gameInterval: any;

export default function Yard() {
  const state = useStore().getState();
  const gameConfig = state.gameConfigReducer;

  /** 院子对象 */
  const yardRef = useRef<HTMLDivElement>(null);

  const [blockMap, setBlockMap] = useState(
    Array(Math.pow(gameConfig.yardSize, 2))
      .fill("")
      .map((_item, index) => {
        if (isEdgeIndex(gameConfig.yardSize, index)) return { id: index, type: "edge" };
        return { id: index, type: "default" };
      }) as BlockItem[]
  );

  const [snakeInfo, setSnakeInfo] = useState({
    name: "Hoovy",
    position: [gameConfig.yardSize, gameConfig.yardSize + 1, gameConfig.yardSize + 2],
  });

  const [direction, setDirection] = useState("right");

  const [score, setScore] = useState(0);

  useEffect(() => {
    goSnakeGo();
    setGameInterval();
    // eslint-disable-next-line
  }, [direction]);

  useEffect(() => {
    yardRef.current!.focus();
    setFood();
    setGameInterval();
    // eslint-disable-next-line
  }, []);

  const setGameInterval = () => {
    clearGameInterval();
    gameInterval = setInterval(() => {
      goSnakeGo();
    }, gameConfig.gameSpeed);
  };

  const clearGameInterval = () => {
    if (!gameInterval) return;
    clearInterval(gameInterval);
    gameInterval = null;
  };

  const goSnakeGo = (growing?: boolean) => {
    const handleMove = (position: number) => {
      let info = { ...snakeInfo };

      if (blockMap[position].type === "edge" || info.position.includes(position)) {
        gameover();
        return;
      }
      if (!growing) info.position.splice(0, 1);
      info.position.push(position);

      setSnakeInfo(info);
    };

    const eatFood = () => {
      clearGameInterval();
      setScore(score + 1);
      setFood();
      goSnakeGo(true);
      setGameInterval();
    };

    switch (direction) {
      case "left":
        const leftHead = snakeInfo.position[snakeInfo.position.length - 1] - 1;
        if (blockMap[leftHead].type === "food") eatFood();
        else handleMove(leftHead);
        break;
      case "right":
        const rightHead = snakeInfo.position[snakeInfo.position.length - 1] + 1;
        if (blockMap[rightHead].type === "food") eatFood();
        else handleMove(rightHead);
        break;
      case "up":
        const upHead = snakeInfo.position[snakeInfo.position.length - 1] - gameConfig.yardSize;
        if (blockMap[upHead].type === "food") eatFood();
        else handleMove(upHead);
        break;
      case "down":
        const downHead = snakeInfo.position[snakeInfo.position.length - 1] + gameConfig.yardSize;
        if (blockMap[downHead].type === "food") eatFood();
        else handleMove(downHead);
        break;
    }
  };

  const setFood = () => {
    let map = [...blockMap];

    const getPosition = (): number => {
      const number = randomNumber(0, Math.pow(gameConfig.yardSize, 2));
      if (snakeInfo.position.includes(number) || map[number].type === "edge") return getPosition();
      else return number;
    };

    let foodBlock = map.find((item) => item.type === "food");
    if (foodBlock) foodBlock.type = "default";
    const position = getPosition();
    map[position].type = "food";
    setBlockMap(map);
  };

  const onkeydown = (e: any) => {
    switch (e.key) {
      case "ArrowUp":
        if (direction !== "down") setDirection("up");
        break;
      case "ArrowLeft":
        if (direction !== "right") setDirection("left");
        break;
      case "ArrowRight":
        if (direction !== "left") setDirection("right");
        break;
      case "ArrowDown":
        if (direction !== "up") setDirection("down");
        break;
    }
  };

  const gameover = () => {
    clearGameInterval();
  };

  const renderBlockItem = () => {
    return blockMap.map((item: BlockItem, index) => {
      return <div key={item.id} className={`block-item ${snakeInfo.position.includes(index) ? "filled" : ""} ${index === snakeInfo.position[snakeInfo.position.length - 1] ? "head" : ""} type-${item.type}`}></div>;
    });
  };

  return (
    <div className="yard" ref={yardRef} tabIndex={0} onKeyDown={(e) => onkeydown(e)}>
      <div className="block-container flex-row">{renderBlockItem()}</div>
      <div className="info-block flex-row">
        <div className="score">积分：{score}</div>
      </div>
    </div>
  );
}

function isEdgeIndex(yardSize: number, index: number): boolean {
  let isEdge = false;
  if (index + 1 <= yardSize || index + 1 >= yardSize * (yardSize - 1)) isEdge = true;
  for (let i = 1; i <= yardSize; i++) {
    if (index === i * yardSize - yardSize || index === i * yardSize - 1) isEdge = true;
  }
  return isEdge;
}
