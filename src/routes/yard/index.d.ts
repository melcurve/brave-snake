export interface YardState {
  /** 蛇信息 */
  snakeInfo: SnakeInfo;
  /** 格子列表 */
  blockMap: BlockItem[];
  /** 游戏速度 */
  speed: number;
  /** 游戏分数 */
  score: number;
}

export interface SnakeInfo {
  /** 名字 */
  name: string;
  /** 位置（即所占方格） */
  position: number[];
  /** 运动方向 */
  direction: 'up' | 'down' | 'right' | 'left';
}

export interface BlockItem {
  id: number;
  /** 格子类型 */
  type: BlockType;
}

export type BlockType = 'default' | 'edge' | 'food';