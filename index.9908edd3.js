class t{appliesTo(t){return!1}update(t,e,s,i){throw Error("not implemented")}draw(t){}}class e{constructor(){}}class s extends e{constructor(t){super(),this.shape=t}}class i extends e{constructor(t,e){super(),this.x=t,this.y=e}magnitude(){return Math.sqrt(Math.pow(this.x,2)+Math.pow(this.y,2))}dot(t){return this.x*t.x+this.y*t.y}norm(){return{x:this.x/this.magnitude(),y:this.y/this.magnitude()}}normalize(){let t=this.norm();return new i(t.x,t.y)}}class o extends t{constructor(){super()}appliesTo(t){return t.hasComponent(s)}update(t,e,i){for(let e of t)for(let i of t){if(e===i)continue;let t=e.getComponent(s),o=i.getComponent(s),n=t.shape,h=o.shape;if("point"===n&&"rectangle"===h||"rectangle"===n&&"point"===h){let s="point"===t.shape?e:"point"===o.shape?i:null,n="rectangle"===t.shape?e:"rectangle"===o.shape?i:null;if(!s||!n)throw Error("Not exactly one point- and one rectangle shaped entity hitbox (should not happen)");let h=this.pointRectangleCollision(s,n);console.log(h),h&&this.resolvePointRectangleCollision(s,n)}}}pointRectangleCollision(t,e){// console.log(pointEntity);
// console.log(rectEntity);
let s=t.position.x,i=t.position.y,o=e.position.x,n=e.position.y,h=e.size.width,r=e.size.height;// point position
return s>=o&&// right of the left edge AND
s<=o+h&&// left of the right edge AND
i>=n&&// below the top AND
i<=n+r}resolvePointRectangleCollision(t,e){t.position.x,t.position.y,e.position.x,e.position.y,e.size.width,e.size.height;let s=t.getComponent(i);s&&(console.log("vector"),// if (
//   (leftOffset < topOffset && leftOffset < bottomOffset) ||
//   (rightOffset < topOffset && rightOffset < bottomOffset)
// ) {
s.x=-1*s.x,// } else {
s.y=-1*s.y)}}class n extends t{constructor(){super()}appliesTo(t){return t.hasComponent(i)}update(t,e,s){for(let s of t){let t=s.getComponent(i);console.log(t.x),s.position.x+=t.x*e,s.position.y+=t.y*e}}}class h{constructor(t,e){this.position=t,this.size=e,this.components=[]}distanceTo(t){return Math.sqrt(Math.pow(this.position.x-t.position.x,2)+Math.pow(this.position.y-t.position.y,2))}getComponent(t){for(let e of this.components)// @ts-ignore
if(e instanceof t)return e}addComponents(...t){for(let e of t)this.components.push(e)}hasComponent(t){for(let e of this.components)// @ts-ignore
if(e instanceof t)return!0;return!1}removeComponent(t){this.components=this.components.filter(e=>e instanceof t)}draw(t){throw Error("Not implemented yet")}}class r extends h{constructor(t,e){super(t,e)}draw(t){t.beginPath(),t.fillStyle="#543",t.fillRect(this.position.x,this.position.y,this.size.width,this.size.height),t.fill(),t.closePath()}}class a extends t{constructor(){super(),this.keys=new Set,document.addEventListener("keydown",t=>{switch(t.keyCode){case 87:this.keys.add("w");break;case 65:this.keys.add("a");break;case 83:this.keys.add("s");break;case 68:this.keys.add("d")}}),document.addEventListener("keyup",t=>{switch(t.keyCode){case 87:this.keys.delete("w");break;case 65:this.keys.delete("a");break;case 83:this.keys.delete("s");break;case 68:this.keys.delete("d")}})}appliesTo(t){return t instanceof r}update(t,e,s){// const playerCell = entities.find((cell) => cell.getEntity(Player1));
// if (!playerCell) return;
// let moveToCell: Cell | undefined | null = null;
for(let e of t)this.keys.has("w")&&(e.position.y-=10),this.keys.has("a")&&(e.position.x-=10),this.keys.has("s")&&(e.position.y+=10),this.keys.has("d")&&(e.position.x+=10);// if (this.keys.has("w")) {
//   moveToCell = entities.find(
//     (cell) => cell.x === playerCell.x && cell.y === playerCell.y - 1
//   );
//   this.keys.delete("w");
// }
// if (this.keys.has("a")) {
//   moveToCell = entities.find(
//     (cell) => cell.x === playerCell.x - 1 && cell.y === playerCell.y
//   );
//   this.keys.delete("a");
// }
// if (this.keys.has("s")) {
//   moveToCell = entities.find(
//     (cell) => cell.x === playerCell.x + 1 && cell.y === playerCell.y
//   );
//   this.keys.delete("s");
// }
// if (this.keys.has("d")) {
//   moveToCell = entities.find(
//     (cell) => cell.x === playerCell.x && cell.y === playerCell.y + 1
//   );
//   this.keys.delete("d");
// }
// if (moveToCell) {
//   // @ts-ignore
//   const player = playerCell.getEntity(Player1);
//   if (!player) return;
//   const newPlayerInstance = new Player1();
//   moveToCell.addEntitys(newPlayerInstance);
//   // @ts-ignore
//   playerCell.removeEntity(Player1);
// }
}}class l extends h{constructor(t,e){super(t,e),this.lifeLength=5}draw(t){// draw intersection dot
t.fillStyle="red",t.beginPath(),t.arc(this.position.x,this.position.y,this.size.width/2,0,2*Math.PI),t.fill()}}class c extends t{constructor(){super(),this.keys=new Set,this.mousePos=null,this.startPos=null,this.aimPos=null,this.nearestIntersection=null,document.querySelector("#gameScreen").addEventListener("click",t=>{this.keys.add("leftClick")}),document.querySelector("#gameScreen").addEventListener("mousemove",t=>{this.mousePos={x:t.offsetX,y:t.offsetY}})}appliesTo(t){return t instanceof r}update(t,e,o,n){// const playerCell = entities.find((cell) =>
//   cell.entities.find((entity) => entity instanceof Player1)
// );
// if (!playerCell) return;
for(let e of t){if(this.startPos={x:e.position.x+e.size.width/2,y:e.position.y+e.size.height/2},!this.mousePos)return;let h={x:this.mousePos.x-(e.position.x+e.size.width/2),y:this.mousePos.y-(e.position.y+e.size.height/2)},r=Math.sqrt(Math.pow(h.x,2)+Math.pow(h.y,2)),a={x:h.x/r,y:h.y/r},c={x:a.x*Math.sqrt(Math.pow(n.gameWidth,2)+Math.pow(n.gameHeight,2)),y:a.y*Math.sqrt(Math.pow(n.gameWidth,2)+Math.pow(n.gameHeight,2))};this.aimPos={x:this.startPos.x+c.x,y:this.startPos.y+c.y};let p=this.aimPos.x,d=this.aimPos.y,u=this.startPos.x,f=this.startPos.y,y={intersectionX:p,intersectionY:d},w=t.filter(t=>t.hasComponent(s));// points for line (controlled by mouse)
for(let t of w){let e=t.position.x,s=t.position.y,i=t.size.width,o=t.size.height,n=this.lineRect(p,d,u,f,e,s,i,o);// square position
for(let t of n){let n=t.intersectionX-u,h=t.intersectionY-f,r=Math.sqrt(Math.pow(n,2)+Math.pow(h,2)),a=y.intersectionX-u,l=y.intersectionY-f,c=Math.sqrt(Math.pow(a,2)+Math.pow(l,2));r<c&&(y={intersectionX:t.intersectionX,intersectionY:t.intersectionY,intersectedRect:{sx:e,sy:s,sw:i,sh:o}});// ctx.fillStyle = "blue";
// ctx.beginPath();
// ctx.arc(
//   intersection.intersectionX,
//   intersection.intersectionY,
//   5,
//   0,
//   2 * Math.PI
// );
// ctx.fill();
}}if(this.nearestIntersection=y,this.keys.has("leftClick")){let t=new l({x:this.startPos.x,y:this.startPos.y},{width:10,height:10});t.addComponents(new i(1e3*a.x,1e3*a.y),new s("point")),o.entities.push(t),this.keys.delete("leftClick")}}}draw(t){if(this.startPos&&this.aimPos&&(t.fillStyle="orange",t.beginPath(),t.arc(this.startPos.x,this.startPos.y,5,0,2*Math.PI),t.fill(),this.nearestIntersection)){if(this.nearestIntersection.intersectedRect){let{intersectedRect:e}=this.nearestIntersection;t.fillStyle="orange",t.fillRect(e.sx,e.sy,e.sw,e.sh)}t.save(),// draw the line
t.beginPath(),t.setLineDash([5,15]),t.moveTo(this.startPos.x,this.startPos.y),t.lineTo(this.nearestIntersection.intersectionX,this.nearestIntersection.intersectionY),t.stroke(),t.restore(),// draw intersection dot
t.fillStyle="red",t.beginPath(),t.arc(this.nearestIntersection.intersectionX,this.nearestIntersection.intersectionY,5,0,2*Math.PI),t.fill()}}lineRect(t,e,s,i,o,n,h,r){// check if the line has hit any of the rectangle's sides
// uses the Line/Line function below
let a=this.lineLine(t,e,s,i,o,n,o,n+r),l=this.lineLine(t,e,s,i,o+h,n,o+h,n+r),c=this.lineLine(t,e,s,i,o,n,o+h,n),p=this.lineLine(t,e,s,i,o,n+r,o+h,n+r),d=[];return a&&d.push(a),l&&d.push(l),c&&d.push(c),p&&d.push(p),d}lineLine(t,e,s,i,o,n,h,r){// calculate the direction of the lines
let a=((h-o)*(e-n)-(r-n)*(t-o))/((r-n)*(s-t)-(h-o)*(i-e)),l=((s-t)*(e-n)-(i-e)*(t-o))/((r-n)*(s-t)-(h-o)*(i-e));return(// if uA and uB are between 0-1, lines are colliding
a>=0&&a<=1&&l>=0&&l<=1?{intersectionX:t+a*(s-t),intersectionY:e+a*(i-e)}:null)}}class p extends h{constructor(t,e){super(t,e),this.components=[]}draw(t){t.beginPath(),t.strokeStyle="#000",t.strokeRect(this.position.x,this.position.y,this.size.width,this.size.height),t.stroke(),t.closePath()}}class d extends p{constructor(t,e){super(t,e)}draw(t){t.beginPath(),t.fillStyle="#000",t.fillRect(this.position.x,this.position.y,this.size.width,this.size.height),t.fill(),t.closePath()}}class u{constructor(t){this.structure=t,this.systems=[new c,new o,new a,new n],this.entities=[],this.offsetX=0,this.offsetY=0}buildLevel(t,e){let i=[],o=this.structure[0].length,n=this.structure.length;for(let t of this.structure)if(t.length!==o)throw Error("Not all rows in level structure have the same size");let h=0;if(t/e<o/n?(h=t/o,this.offsetX=0,this.offsetY=(e-h*n)/2):(h=e/n,this.offsetX=(t-h*o)/2,this.offsetY=0),h<=0)throw Error("Cell size less than 0");this.structure.forEach((t,e)=>{t.forEach((t,o)=>{let n={x:o,y:e};// if (cellEntities !== null) {
//   for (const cellEntity of cellEntities) {
switch(i.push(new p({x:h*n.x+this.offsetX,y:h*n.y+this.offsetY},{width:h,height:h})),t){case 2:{let t=new d({x:h*n.x+this.offsetX,y:h*n.y+this.offsetY},{width:h,height:h});t.addComponents(new s("rectangle")),i.push(t);break}case 3:i.push(new r({x:h*n.x+this.offsetX,y:h*n.y+this.offsetY},{width:h,height:h}))}//   }
// }
})}),this.entities=i}update(t,e){for(let s of this.systems){let i=this.entities.filter(s.appliesTo);s.update(i,t,this,e)}}draw(t){for(let e of this.entities)e.draw(t);for(let e of this.systems)e.draw(t)}}class f extends u{constructor(){super([[1,0,1,0,0,0,0,0,1,0,1],[0,0,0,0,1,0,1,0,0,2,0],[1,0,1,0,0,3,0,0,1,0,1],[0,0,0,0,1,0,1,0,0,0,0],[1,0,1,0,0,0,0,0,1,0,1]])}}const y=document.querySelector("#gameScreen"),w=y.getContext("2d"),x=window.innerWidth,m=window.innerHeight;y.width=x,y.height=m;const g=new class{constructor(t,e,s){this.gameWidth=t,this.gameHeight=e,this.ctx=s,this.level=new f,this.entities=[],this.start()}start(){this.level.buildLevel(this.gameWidth,this.gameHeight)}draw(t){this.level.draw(t)}update(t){this.level.update(t,this)}}(x,m,w);let P=0;requestAnimationFrame(function t(e){// dt i sekunder
let s=(e-P)/1e3;P=e,w.clearRect(0,0,x,m),g.update(s),g.draw(w),requestAnimationFrame(t)});