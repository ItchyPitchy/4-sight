class t{appliesTo(t){return!1}update(t,e,s,i){throw Error("not implemented")}draw(t){}}class e{constructor(){}}class s extends e{constructor(){super()}}class i extends e{constructor(t,e){super(),this.x=t,this.y=e}magnitude(){return Math.sqrt(Math.pow(this.x,2)+Math.pow(this.y,2))}dot(t){return this.x*t.x+this.y*t.y}norm(){return{x:this.x/this.magnitude(),y:this.y/this.magnitude()}}normalize(){let t=this.norm();return new i(t.x,t.y)}}class o extends s{constructor(){super()}}class n extends s{constructor(){super()}}class h extends t{constructor(){super()}appliesTo(t){return t.hasComponent(s)}update(t,e,s){for(let e of t)for(let s of t)if(e!==s&&(e.hasComponent(o)&&s.hasComponent(n)||e.hasComponent(n)&&s.hasComponent(o))){let t=e.hasComponent(o)?e:s.hasComponent(o)?s:null,i=e.hasComponent(n)?e:s.hasComponent(n)?s:null;if(!t||!i)throw Error("Not exactly one point- and one rectangle shaped entity hitbox (should not happen)");let h=this.circleRectangleCollision(t,i);h&&(console.log(h),this.resolveCircleRectCollision(t,i))}}// pointRectangleCollision(circleEntity: Entity, rectEntity: Entity) {
//   const cx = circleEntity.position.x; // point position
//   const cy = circleEntity.position.y;
//   const rx = rectEntity.position.x; // rectangle position
//   const ry = rectEntity.position.y;
//   const rw = rectEntity.size.width; // and dimensions
//   const rh = rectEntity.size.height;
//   // is the point inside the rectangle's bounds?
//   if (
//     cx >= rx && // left edge
//     cx <= rx + rw && // right edge
//     cy >= ry && // top edge
//     cy <= ry + rh // bottom edge
//   ) {
//     return true;
//   }
//   return false;
// }
// resolvePointRectangleCollision(pointEntity: Entity, rectEntity: Entity) {
//   const px = pointEntity.position.x; // point position
//   const py = pointEntity.position.y;
//   const rx = rectEntity.position.x; // rectangle position
//   const ry = rectEntity.position.y;
//   const rw = rectEntity.size.width; // and dimensions
//   const rh = rectEntity.size.height;
//   // Expects that point entity has vector but not rectangle entity
//   const leftOffset = px - rx;
//   const rightOffset = rx + rw - px;
//   const topOffset = py - ry;
//   const bottomOffset = ry + rh - py;
//   const pointEntityVector = pointEntity.getComponent(Vector) as Vector;
//   if (pointEntityVector) {
//     if (leftOffset < topOffset && leftOffset < bottomOffset && pointEntityVector.x > 0) {
//       pointEntityVector.x = -pointEntityVector.x
//     } else if (rightOffset < topOffset && rightOffset < bottomOffset && pointEntityVector.x < 0) {
//       pointEntityVector.y = -pointEntityVector.x
//     } else if (topOffset < leftOffset && topOffset < rightOffset && pointEntityVector.y > 0) {
//       pointEntityVector.y = -pointEntityVector.y
//     } else if (bottomOffset < leftOffset && bottomOffset < rightOffset && pointEntityVector.y < 0) {
//       pointEntityVector.y = -pointEntityVector.y
//     }
//   }
// }
circleRectangleCollision(t,e){let s=t.position.x,i=t.position.y,o=e.position.x,n=e.position.y,h=e.size.width,r=e.size.height,a=s,l=i;s<o?a=o:s>o+h&&(a=o+h),i<n?l=n:i>n+r&&(l=n+r);let c=s-a,p=i-l;return Math.sqrt(c*c+p*p)<=t.size.width/2}resolveCircleRectCollision(t,e){let s=t.position.x,o=t.position.y,n=e.position.x,h=e.position.y,r=e.size.width,a=e.size.height,l=s-n,c=n+r-s,p=o-h,u=h+a-o,d=t.getComponent(i);d?l<p&&l<u&&d.x>0?(t.position.x=e.position.x-t.size.width/2,d.x=-d.x):c<p&&c<u&&d.x<0?(t.position.x=e.position.x+e.size.width+t.size.width/2,d.x=-d.x):p<l&&p<c&&d.y>0?(t.position.y=e.position.y-t.size.height/2,d.y=-d.y):u<l&&u<c&&d.y<0&&(t.position.y=e.position.y+e.size.height+t.size.height/2,d.y=-d.y):l<p&&l<u?t.position.x=e.position.x-t.size.width/2:c<p&&c<u?t.position.x=e.position.x+e.size.width+t.size.width/2:p<l&&p<c?t.position.y=e.position.y-t.size.height/2:u<l&&u<c&&(t.position.y=e.position.y+e.size.height+t.size.height/2)}}class r extends t{constructor(){super()}appliesTo(t){return t.hasComponent(i)}update(t,e,s){for(let s of t){let t=s.getComponent(i);s.position.x+=t.x*e,s.position.y+=t.y*e}}}class a{constructor(t,e){this.position=t,this.size=e,this.components=[]}distanceTo(t){return Math.sqrt(Math.pow(this.position.x-t.position.x,2)+Math.pow(this.position.y-t.position.y,2))}getComponent(t){for(let e of this.components)// @ts-ignore
if(e instanceof t)return e}addComponents(...t){for(let e of t)this.components.push(e)}hasComponent(t){for(let e of this.components)// @ts-ignore
if(e instanceof t)return!0;return!1}removeComponent(t){this.components=this.components.filter(e=>e instanceof t)}draw(t){throw Error("Not implemented yet")}}class l extends a{constructor(t,e){super(t,e)}draw(t){t.fillStyle="#543",t.beginPath(),t.arc(this.position.x,this.position.y,this.size.width/2,0,2*Math.PI),t.fill()}}class c extends t{constructor(){super(),this.keys=new Set,document.addEventListener("keydown",t=>{switch(t.keyCode){case 87:this.keys.add("w");break;case 65:this.keys.add("a");break;case 83:this.keys.add("s");break;case 68:this.keys.add("d")}}),document.addEventListener("keyup",t=>{switch(t.keyCode){case 87:this.keys.delete("w");break;case 65:this.keys.delete("a");break;case 83:this.keys.delete("s");break;case 68:this.keys.delete("d")}})}appliesTo(t){return t instanceof l}update(t,e,s){// const playerCell = entities.find((cell) => cell.getEntity(Player1));
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
}}class p extends a{constructor(t,e){super(t,{width:2*e,height:2*e}),this.radius=e,this.lifeLength=5}draw(t){// draw intersection dot
t.fillStyle="red",t.beginPath(),t.arc(this.position.x,this.position.y,this.radius,0,2*Math.PI),t.fill()}}class u extends t{constructor(){super(),this.keys=new Set,this.mousePos=null,this.startPos=null,this.aimPos=null,this.nearestIntersection=null,document.querySelector("#gameScreen").addEventListener("click",t=>{this.keys.add("leftClick")}),// (
//   document.querySelector("#gameScreen") as HTMLCanvasElement
// ).addEventListener("mouseup", (e) => {
//   this.keys.delete("leftClick");
// });
document.querySelector("#gameScreen").addEventListener("mousemove",t=>{this.mousePos={x:t.offsetX,y:t.offsetY}})}appliesTo(t){return t instanceof a}update(t,e,s,h){let r=t.filter(t=>t instanceof l);// if (!players) return;
for(let e of r){let r={x:e.position.x,y:e.position.y};if(!this.mousePos)return null;if(this.startPos={x:r.x+e.size.width/2*Math.cos(this.getDegrees(e)),y:r.y+e.size.height/2*Math.sin(this.getDegrees(e))},!this.mousePos)return;let a={x:this.mousePos.x-e.position.x,y:this.mousePos.y-e.position.y},l=Math.sqrt(Math.pow(a.x,2)+Math.pow(a.y,2)),c={x:a.x/l,y:a.y/l},u={x:c.x*Math.sqrt(Math.pow(h.gameWidth,2)+Math.pow(h.gameHeight,2)),y:c.y*Math.sqrt(Math.pow(h.gameWidth,2)+Math.pow(h.gameHeight,2))};this.aimPos={x:this.startPos.x+u.x,y:this.startPos.y+u.y};let d=this.aimPos.x,y=this.aimPos.y,f=this.startPos.x,x=this.startPos.y,m={intersectionX:d,intersectionY:y},w=t.filter(t=>t.hasComponent(n));// points for line (controlled by mouse)
for(let t of w){let e=t.position.x,s=t.position.y,i=t.size.width,o=t.size.height,n=this.lineRect(d,y,f,x,e,s,i,o);// square position
for(let t of n){let n=t.intersectionX-f,h=t.intersectionY-x,r=Math.sqrt(Math.pow(n,2)+Math.pow(h,2)),a=m.intersectionX-f,l=m.intersectionY-x,c=Math.sqrt(Math.pow(a,2)+Math.pow(l,2));r<c&&(m={intersectionX:t.intersectionX,intersectionY:t.intersectionY,intersectedRect:{sx:e,sy:s,sw:i,sh:o}});// ctx.fillStyle = "blue";
// ctx.beginPath();
// ctx.arc(
//   intersection.intersectionX,
//   intersection.intersectionY,
//   5,
//   0,
//   2 * Math.PI
// );
// ctx.fill();
}}if(this.nearestIntersection=m,this.keys.has("leftClick")){let t=new p({x:this.startPos.x,y:this.startPos.y},5);t.addComponents(new i(1e3*c.x,1e3*c.y),new o),s.entities.push(t),this.keys.delete("leftClick")}}}draw(t){if(this.startPos&&this.aimPos&&(t.fillStyle="orange",t.beginPath(),t.arc(this.startPos.x,this.startPos.y,5,0,2*Math.PI),t.fill(),this.nearestIntersection)){if(this.nearestIntersection.intersectedRect){let{intersectedRect:e}=this.nearestIntersection;t.fillStyle="orange",t.fillRect(e.sx,e.sy,e.sw,e.sh)}t.save(),// draw the line
t.beginPath(),t.setLineDash([5,15]),t.moveTo(this.startPos.x,this.startPos.y),t.lineTo(this.nearestIntersection.intersectionX,this.nearestIntersection.intersectionY),t.stroke(),t.restore(),// draw intersection dot
t.fillStyle="red",t.beginPath(),t.arc(this.nearestIntersection.intersectionX,this.nearestIntersection.intersectionY,5,0,2*Math.PI),t.fill()}}lineRect(t,e,s,i,o,n,h,r){// check if the line has hit any of the rectangle's sides
// uses the Line/Line function below
let a=this.lineLine(t,e,s,i,o,n,o,n+r),l=this.lineLine(t,e,s,i,o+h,n,o+h,n+r),c=this.lineLine(t,e,s,i,o,n,o+h,n),p=this.lineLine(t,e,s,i,o,n+r,o+h,n+r),u=[];return a&&u.push(a),l&&u.push(l),c&&u.push(c),p&&u.push(p),u}lineLine(t,e,s,i,o,n,h,r){// calculate the direction of the lines
let a=((h-o)*(e-n)-(r-n)*(t-o))/((r-n)*(s-t)-(h-o)*(i-e)),l=((s-t)*(e-n)-(i-e)*(t-o))/((r-n)*(s-t)-(h-o)*(i-e));return(// if uA and uB are between 0-1, lines are colliding
a>=0&&a<=1&&l>=0&&l<=1?{intersectionX:t+a*(s-t),intersectionY:e+a*(i-e)}:null)}getDegrees(t){if(!this.mousePos)throw Error("No mousePos");if(this.mousePos.y>t.position.y){if(this.mousePos.x>t.position.x){let e=Math.atan(Math.abs(this.mousePos.y-t.position.y)/Math.abs(this.mousePos.x-t.position.x));return e}{let e=Math.atan(Math.abs(this.mousePos.x-t.position.x)/Math.abs(this.mousePos.y-t.position.y))+Math.PI/2;return e}}if(this.mousePos.x>t.position.x){let e=-Math.atan(Math.abs(this.mousePos.y-t.position.y)/Math.abs(this.mousePos.x-t.position.x));return e}{let e=-Math.atan(Math.abs(this.mousePos.x-t.position.x)/Math.abs(this.mousePos.y-t.position.y))-Math.PI/2;return e}}}class d extends a{constructor(t,e){super(t,e),this.components=[]}draw(t){t.beginPath(),t.fillStyle="#FFF",t.fillRect(this.position.x,this.position.y,this.size.width,this.size.height),t.fill(),t.closePath()}}class y extends d{constructor(t,e){super(t,e)}draw(t){t.beginPath(),t.fillStyle="#000",t.fillRect(this.position.x,this.position.y,this.size.width,this.size.height),t.fill(),t.closePath()}}class f{constructor(t){this.structure=t,this.systems=[new u,new c,new r,new h],this.entities=[],this.offsetX=0,this.offsetY=0}buildLevel(t,e){let s=[],i=this.structure[0].length,h=this.structure.length;for(let t of this.structure)if(t.length!==i)throw Error("Not all rows in level structure have the same size");let r=0;if(t/e<i/h?(r=t/i,this.offsetX=0,this.offsetY=(e-r*h)/2):(r=e/h,this.offsetX=(t-r*i)/2,this.offsetY=0),r<=0)throw Error("Cell size less than 0");this.structure.forEach((t,e)=>{t.forEach((t,i)=>{let h={x:i,y:e};switch(s.push(new d({x:r*h.x+this.offsetX,y:r*h.y+this.offsetY},{width:r,height:r})),t){case 1:{let t=new y({x:r*h.x+this.offsetX,y:r*h.y+this.offsetY},{width:r,height:r});t.addComponents(new n),s.push(t);break}case 3:{let t=new l({x:r*h.x+this.offsetX,y:r*h.y+this.offsetY},{width:r,height:r});t.addComponents(new o),s.push(t)}}})}),this.entities=s}update(t,e){for(let s of this.systems){let i=this.entities.filter(s.appliesTo);s.update(i,t,this,e)}}draw(t){for(let e of this.entities)e.draw(t);for(let e of this.systems)e.draw(t)}}class x extends f{constructor(){super([[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,1,0,0,0,1,1,1,1,1,1,0,0,0,1,0,0,0,1],[1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1],[1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1],[1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1],[1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1],[1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1],[1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1],[1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1],[1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1],[1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1],[1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1],[1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1],[1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1],[1,0,0,0,1,0,0,0,1,1,1,1,1,1,0,0,0,1,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]])}}const m=document.querySelector("#gameScreen"),w=m.getContext("2d"),g=window.innerWidth,P=window.innerHeight;m.width=g,m.height=P;const M=new class{constructor(t,e,s){this.gameWidth=t,this.gameHeight=e,this.ctx=s,this.level=new x,this.entities=[],this.start()}start(){this.level.buildLevel(this.gameWidth,this.gameHeight)}draw(t){this.level.draw(t)}update(t){this.level.update(t,this)}}(g,P,w);let k=0;requestAnimationFrame(function t(e){// dt i sekunder
let s=(e-k)/1e3;k=e,w.clearRect(0,0,g,P),M.update(s),M.draw(w),requestAnimationFrame(t)});