class $9c9505e8720808bb$export$2e2bcd8739ae039 {
    constructor(){}
}


class $672468a3ab713064$export$5c761481ae48d9f2 extends (0, $9c9505e8720808bb$export$2e2bcd8739ae039) {
    constructor(){
        super();
    }
}



class $15f7d7fd7df329a4$export$2e2bcd8739ae039 extends (0, $9c9505e8720808bb$export$2e2bcd8739ae039) {
    constructor(){
        super();
    }
}






class $af912e3ba0615ac5$export$2e2bcd8739ae039 extends (0, $9c9505e8720808bb$export$2e2bcd8739ae039) {
    constructor(x, y, size, drawX, drawY){
        super();
        this.x = x;
        this.y = y;
        this.size = size;
        this.drawX = drawX;
        this.drawY = drawY;
        this.entities = [];
    }
    addEntity(entity) {
        this.entities.push(entity);
    }
}


class $d7fbcfaccb24ace6$export$e1dae5660003ffa7 {
    appliesTo(entity) {
        return false;
    }
    update(entities, dt, game) {
        throw new Error("not implemented");
    }
    draw(ctx) {}
}


class $d79790b4abe14790$export$2e2bcd8739ae039 extends (0, $d7fbcfaccb24ace6$export$e1dae5660003ffa7) {
    constructor(){
        super();
        this.keys = new Set();
        document.addEventListener("keydown", (e)=>{
            switch(e.keyCode){
                case 87:
                    this.keys.add("w");
                    break;
                case 65:
                    this.keys.add("a");
                    break;
                case 83:
                    this.keys.add("d");
                    break;
                case 68:
                    this.keys.add("s");
                    break;
            }
        });
    }
    appliesTo(entity) {
        return entity instanceof (0, $af912e3ba0615ac5$export$2e2bcd8739ae039);
    }
    update(entities, dt, game) {
        const playerCell = entities.find((cell)=>cell.entities.find((entity)=>entity instanceof (0, $672468a3ab713064$export$5c761481ae48d9f2)));
        if (!playerCell) return;
        let moveToCell = null;
        if (this.keys.has("w")) {
            moveToCell = entities.find((cell)=>cell.x === playerCell.x && cell.y === playerCell.y - 1);
            this.keys.delete("w");
        }
        if (this.keys.has("a")) {
            moveToCell = entities.find((cell)=>cell.x === playerCell.x - 1 && cell.y === playerCell.y);
            this.keys.delete("a");
        }
        if (this.keys.has("s")) {
            moveToCell = entities.find((cell)=>cell.x === playerCell.x + 1 && cell.y === playerCell.y);
            this.keys.delete("s");
        }
        if (this.keys.has("d")) {
            moveToCell = entities.find((cell)=>cell.x === playerCell.x && cell.y === playerCell.y + 1);
            this.keys.delete("d");
        }
        if (moveToCell) {
            moveToCell.addEntity(new (0, $672468a3ab713064$export$5c761481ae48d9f2)());
            playerCell.entities = playerCell.entities.filter((entity)=>!(entity instanceof (0, $672468a3ab713064$export$5c761481ae48d9f2)));
        }
    }
}



class $74593a8605e54034$export$2e2bcd8739ae039 extends (0, $9c9505e8720808bb$export$2e2bcd8739ae039) {
    constructor(startPos, endPos){
        super();
        this.startPos = startPos;
        this.endPos = endPos;
        this.lifeLength = 0.5; // seconds
    }
    draw(ctx) {
        // draw the line
        ctx.strokeStyle = "red";
        ctx.beginPath();
        ctx.moveTo(this.startPos.x, this.startPos.y);
        ctx.lineTo(this.endPos.x, this.endPos.y);
        ctx.stroke();
    }
}





class $677d93e00cc3e542$export$2e2bcd8739ae039 {
    constructor(){
        this.bullets = [];
    }
    addBullets(...bullets) {
        this.bullets.push(...bullets);
    }
    update(dt) {
        console.log(this.bullets);
        this.bullets = this.bullets.filter((bullet)=>bullet.lifeLength > 0);
        for (const bullet of this.bullets)bullet.lifeLength -= dt;
    }
    draw(ctx) {
        for (const bullet of this.bullets)bullet.draw(ctx);
    }
}



class $e8851826ea668830$export$ca8fcbfa0c11ecda extends (0, $d7fbcfaccb24ace6$export$e1dae5660003ffa7) {
    constructor(){
        super();
        this.keys = new Set();
        this.mousePos = null;
        this.startPos = null;
        this.aimPos = null;
        this.nearestIntersection = null;
        this.bulletSystem = new (0, $677d93e00cc3e542$export$2e2bcd8739ae039)();
        document.querySelector("#gameScreen").addEventListener("click", (e)=>{
            this.keys.add("leftClick");
        });
        document.querySelector("#gameScreen").addEventListener("mousemove", (e)=>{
            this.mousePos = {
                x: e.offsetX,
                y: e.offsetY
            };
        });
    }
    appliesTo(entity) {
        return entity instanceof (0, $af912e3ba0615ac5$export$2e2bcd8739ae039) && Boolean(entity.entities.find((entity)=>entity instanceof (0, $15f7d7fd7df329a4$export$2e2bcd8739ae039) || entity instanceof (0, $672468a3ab713064$export$5c761481ae48d9f2)));
    }
    update(entities, dt, game) {
        const playerCell = entities.find((cell)=>cell.entities.find((entity)=>entity instanceof (0, $672468a3ab713064$export$5c761481ae48d9f2)));
        if (!playerCell) return;
        this.startPos = {
            x: playerCell.drawX + playerCell.size / 2,
            y: playerCell.drawY + playerCell.size / 2
        };
        if (!this.mousePos) return;
        const vector = {
            x: this.mousePos.x - (playerCell.drawX + playerCell.size / 2),
            y: this.mousePos.y - (playerCell.drawY + playerCell.size / 2)
        };
        const mousePosBasedMagnitude = Math.sqrt(Math.pow(vector.x, 2) + Math.pow(vector.y, 2));
        const norm = {
            x: vector.x / mousePosBasedMagnitude,
            y: vector.y / mousePosBasedMagnitude
        };
        const magnitude = {
            x: norm.x * Math.sqrt(Math.pow(game.gameWidth, 2) + Math.pow(game.gameHeight, 2)),
            y: norm.y * Math.sqrt(Math.pow(game.gameWidth, 2) + Math.pow(game.gameHeight, 2))
        };
        this.aimPos = {
            x: this.startPos.x + magnitude.x,
            y: this.startPos.y + magnitude.y
        };
        const x1 = this.aimPos.x; // points for line (controlled by mouse)
        const y1 = this.aimPos.y;
        const x2 = this.startPos.x; // static point
        const y2 = this.startPos.y;
        let nearestIntersection = {
            intersectionX: x1,
            intersectionY: y1
        };
        const obstacleCells = entities.filter((cell)=>cell.entities.find((entity)=>entity instanceof (0, $15f7d7fd7df329a4$export$2e2bcd8739ae039)));
        for (const cell of obstacleCells){
            const sx = cell.drawX; // square position
            const sy = cell.drawY;
            const sw = cell.size; // and size
            const sh = cell.size;
            // check if line has hit the square
            // if so, change the fill color
            const intersections = this.lineRect(x1, y1, x2, y2, sx, sy, sw, sh);
            for (const intersection of intersections){
                const intersectionDistanceX = intersection.intersectionX - x2;
                const intersectionDistanceY = intersection.intersectionY - y2;
                const intersectionDistance = Math.sqrt(Math.pow(intersectionDistanceX, 2) + Math.pow(intersectionDistanceY, 2));
                const nearestIntersectionDistanceX = nearestIntersection.intersectionX - x2;
                const nearestIntersectionDistanceY = nearestIntersection.intersectionY - y2;
                const nearestIntersectionDistance = Math.sqrt(Math.pow(nearestIntersectionDistanceX, 2) + Math.pow(nearestIntersectionDistanceY, 2));
                if (intersectionDistance < nearestIntersectionDistance) nearestIntersection = {
                    intersectionX: intersection.intersectionX,
                    intersectionY: intersection.intersectionY,
                    intersectedRect: {
                        sx: sx,
                        sy: sy,
                        sw: sw,
                        sh: sh
                    }
                };
            // ctx.fillStyle = "blue";
            // ctx.beginPath();
            // ctx.arc(
            //   intersection.intersectionX,
            //   intersection.intersectionY,
            //   5,
            //   0,
            //   2 * Math.PI
            // );
            // ctx.fill();
            }
        }
        this.nearestIntersection = nearestIntersection;
        if (this.keys.has("leftClick")) {
            this.bulletSystem.addBullets(new (0, $74593a8605e54034$export$2e2bcd8739ae039)({
                x: this.startPos.x,
                y: this.startPos.y
            }, {
                x: this.nearestIntersection.intersectionX,
                y: this.nearestIntersection.intersectionY
            }));
            this.keys.delete("leftClick");
        }
        this.bulletSystem.update(dt);
    }
    draw(ctx) {
        if (this.startPos && this.aimPos) {
            ctx.fillStyle = "orange";
            ctx.beginPath();
            ctx.arc(this.startPos.x, this.startPos.y, 5, 0, 2 * Math.PI);
            ctx.fill();
            if (this.nearestIntersection) {
                if (this.nearestIntersection.intersectedRect) {
                    const { intersectedRect: intersectedRect } = this.nearestIntersection;
                    ctx.fillStyle = "orange";
                    ctx.fillRect(intersectedRect.sx, intersectedRect.sy, intersectedRect.sw, intersectedRect.sh);
                }
                ctx.save();
                // draw the line
                ctx.beginPath();
                ctx.setLineDash([
                    5,
                    15
                ]);
                ctx.moveTo(this.startPos.x, this.startPos.y);
                ctx.lineTo(this.nearestIntersection.intersectionX, this.nearestIntersection.intersectionY);
                ctx.stroke();
                ctx.restore();
                // draw intersection dot
                ctx.fillStyle = "red";
                ctx.beginPath();
                ctx.arc(this.nearestIntersection.intersectionX, this.nearestIntersection.intersectionY, 5, 0, 2 * Math.PI);
                ctx.fill();
            }
        }
        this.bulletSystem.draw(ctx);
    }
    lineRect(x1, y1, x2, y2, rx, ry, rw, rh) {
        // check if the line has hit any of the rectangle's sides
        // uses the Line/Line function below
        const left = this.lineLine(x1, y1, x2, y2, rx, ry, rx, ry + rh);
        const right = this.lineLine(x1, y1, x2, y2, rx + rw, ry, rx + rw, ry + rh);
        const top = this.lineLine(x1, y1, x2, y2, rx, ry, rx + rw, ry);
        const bottom = this.lineLine(x1, y1, x2, y2, rx, ry + rh, rx + rw, ry + rh);
        const intersections = [];
        if (left) intersections.push(left);
        if (right) intersections.push(right);
        if (top) intersections.push(top);
        if (bottom) intersections.push(bottom);
        return intersections;
    }
    lineLine(x1, y1, x2, y2, x3, y3, x4, y4) {
        // calculate the direction of the lines
        const uA = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));
        const uB = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));
        // if uA and uB are between 0-1, lines are colliding
        if (uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1) {
            // where the lines meet
            const intersectionX = x1 + uA * (x2 - x1);
            const intersectionY = y1 + uA * (y2 - y1);
            return {
                intersectionX: intersectionX,
                intersectionY: intersectionY
            };
        }
        return null;
    }
}



class $74392df343e4f163$export$ca664994d1d54bff {
    constructor(structure){
        this.structure = structure;
        this.systems = [
            new (0, $e8851826ea668830$export$ca8fcbfa0c11ecda)(),
            new (0, $d79790b4abe14790$export$2e2bcd8739ae039)()
        ];
        this.board = null;
        this.offsetX = 0;
        this.offsetY = 0;
    }
    buildLevel(gameWidth, gameHeight) {
        const generatedBoard = [];
        this.structure.forEach((row, rowIndex)=>{
            const generatedRow = [];
            row.forEach((obstacle, obstacleIndex)=>{
                const position = {
                    x: obstacleIndex,
                    y: rowIndex
                };
                const minimumGameSizeAxis = gameWidth < gameHeight ? "x" : "y";
                const minimumGameSize = minimumGameSizeAxis === "x" ? gameWidth : gameHeight;
                const maximumBoardSizeAxis = "x";
                const maximumBoardSize = 15; // Don't hardcode this!!!
                const maximumCellSize = minimumGameSize / maximumBoardSize;
                const cell = new (0, $af912e3ba0615ac5$export$2e2bcd8739ae039)(position.x, position.y, maximumCellSize, maximumCellSize * position.x, maximumCellSize * position.y);
                if (obstacle !== null) cell.entities = [
                    ...cell.entities,
                    ...obstacle
                ];
                generatedRow.push(cell);
            });
            generatedBoard.push(generatedRow);
        });
        this.board = generatedBoard;
    }
    update(dt, game) {
        if (!this.board) return;
        for (const system of this.systems){
            const filteredEntities = this.board.flat().filter(system.appliesTo);
            system.update(filteredEntities, dt, game);
        }
    }
    draw(ctx) {
        if (!this.board) return;
        for (const row of this.board)for (const cell of row){
            const drawPosition = {
                x: cell.drawX,
                y: cell.drawY
            };
            ctx.beginPath();
            if (cell.entities.find((entity)=>entity instanceof (0, $15f7d7fd7df329a4$export$2e2bcd8739ae039))) {
                ctx.fillStyle = "#000";
                ctx.fillRect(drawPosition.x, drawPosition.y, cell.size, cell.size);
                ctx.fill();
            } else if (cell.entities.find((entity)=>entity instanceof (0, $672468a3ab713064$export$5c761481ae48d9f2))) {
                ctx.fillStyle = "#543";
                ctx.fillRect(drawPosition.x, drawPosition.y, cell.size, cell.size);
                ctx.fill();
            } else {
                ctx.strokeStyle = "#000";
                ctx.strokeRect(drawPosition.x, drawPosition.y, cell.size, cell.size);
                ctx.stroke();
            }
            ctx.closePath();
        }
        for (const system of this.systems)system.draw(ctx);
    }
}


class $ac5a63403cc782b1$export$2e720d0366b6ecb3 extends (0, $74392df343e4f163$export$ca664994d1d54bff) {
    constructor(){
        const structure = [
            [
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null
            ],
            [
                null,
                null,
                [
                    new (0, $15f7d7fd7df329a4$export$2e2bcd8739ae039)()
                ],
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                [
                    new (0, $15f7d7fd7df329a4$export$2e2bcd8739ae039)()
                ],
                null,
                null
            ],
            [
                null,
                null,
                [
                    new (0, $15f7d7fd7df329a4$export$2e2bcd8739ae039)()
                ],
                null,
                null,
                [
                    new (0, $15f7d7fd7df329a4$export$2e2bcd8739ae039)()
                ],
                [
                    new (0, $15f7d7fd7df329a4$export$2e2bcd8739ae039)()
                ],
                [
                    new (0, $15f7d7fd7df329a4$export$2e2bcd8739ae039)()
                ],
                [
                    new (0, $15f7d7fd7df329a4$export$2e2bcd8739ae039)()
                ],
                [
                    new (0, $15f7d7fd7df329a4$export$2e2bcd8739ae039)()
                ],
                null,
                null,
                [
                    new (0, $15f7d7fd7df329a4$export$2e2bcd8739ae039)()
                ],
                null,
                null
            ],
            [
                null,
                null,
                [
                    new (0, $15f7d7fd7df329a4$export$2e2bcd8739ae039)()
                ],
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                [
                    new (0, $15f7d7fd7df329a4$export$2e2bcd8739ae039)()
                ],
                null,
                null
            ],
            [
                null,
                null,
                [
                    new (0, $15f7d7fd7df329a4$export$2e2bcd8739ae039)()
                ],
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                [
                    new (0, $15f7d7fd7df329a4$export$2e2bcd8739ae039)()
                ],
                null,
                null
            ],
            [
                null,
                null,
                [
                    new (0, $15f7d7fd7df329a4$export$2e2bcd8739ae039)()
                ],
                null,
                null,
                [
                    new (0, $15f7d7fd7df329a4$export$2e2bcd8739ae039)()
                ],
                [
                    new (0, $15f7d7fd7df329a4$export$2e2bcd8739ae039)()
                ],
                [
                    new (0, $15f7d7fd7df329a4$export$2e2bcd8739ae039)()
                ],
                [
                    new (0, $15f7d7fd7df329a4$export$2e2bcd8739ae039)()
                ],
                [
                    new (0, $15f7d7fd7df329a4$export$2e2bcd8739ae039)()
                ],
                null,
                null,
                [
                    new (0, $15f7d7fd7df329a4$export$2e2bcd8739ae039)()
                ],
                null,
                null
            ],
            [
                null,
                null,
                [
                    new (0, $15f7d7fd7df329a4$export$2e2bcd8739ae039)()
                ],
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                [
                    new (0, $15f7d7fd7df329a4$export$2e2bcd8739ae039)()
                ],
                null,
                null
            ],
            [
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                [
                    new (0, $672468a3ab713064$export$5c761481ae48d9f2)()
                ],
                null,
                null,
                null,
                null,
                null,
                null,
                null
            ]
        ];
        super(structure);
    }
}


class $d37edd9d94fb6d42$export$2e2bcd8739ae039 {
    constructor(gameWidth, gameHeight, ctx){
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.ctx = ctx;
        this.level = new (0, $ac5a63403cc782b1$export$2e720d0366b6ecb3)();
        this.systems = [];
        this.entities = [];
        this.start();
    }
    start() {
        this.level.buildLevel(this.gameWidth, this.gameHeight);
    }
    draw(ctx) {
        this.level.draw(ctx);
        for (const system of this.systems)system.draw(ctx);
    }
    update(dt) {
        if (this.level.board) this.level.update(dt, this);
        for (const system of this.systems){
            const filteredEntities = this.entities.filter(system.appliesTo);
            system.update(filteredEntities, dt, this);
        }
    }
}


const $a6a6b7402a65131a$var$canvas = document.querySelector("#gameScreen");
const $a6a6b7402a65131a$var$ctx = $a6a6b7402a65131a$var$canvas.getContext("2d");
// ctx.imageSmoothingEnabled = true;
// ctx.imageSmoothingQuality = "high";
const $a6a6b7402a65131a$var$GAME_WIDTH = 800;
const $a6a6b7402a65131a$var$GAME_HEIGHT = 800;
const $a6a6b7402a65131a$var$game = new (0, $d37edd9d94fb6d42$export$2e2bcd8739ae039)($a6a6b7402a65131a$var$GAME_WIDTH, $a6a6b7402a65131a$var$GAME_HEIGHT, $a6a6b7402a65131a$var$ctx);
let $a6a6b7402a65131a$var$oldTimeStamp = 0;
function $a6a6b7402a65131a$var$gameLoop(timestamp) {
    // dt i sekunder
    let dt = (timestamp - $a6a6b7402a65131a$var$oldTimeStamp) / 1000;
    $a6a6b7402a65131a$var$oldTimeStamp = timestamp;
    $a6a6b7402a65131a$var$ctx.clearRect(0, 0, $a6a6b7402a65131a$var$GAME_WIDTH, $a6a6b7402a65131a$var$GAME_HEIGHT);
    $a6a6b7402a65131a$var$game.update(dt);
    $a6a6b7402a65131a$var$game.draw($a6a6b7402a65131a$var$ctx);
    requestAnimationFrame($a6a6b7402a65131a$var$gameLoop);
}
requestAnimationFrame($a6a6b7402a65131a$var$gameLoop);


//# sourceMappingURL=main.js.map
