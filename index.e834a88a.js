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
circleRectangleCollision(t,e){let s=t.position.x,i=t.position.y,o=e.position.x,n=e.position.y,h=e.size.width,r=e.size.height,a=s,l=i;s<o?a=o:s>o+h&&(a=o+h),i<n?l=n:i>n+r&&(l=n+r);let c=s-a,p=i-l;return Math.sqrt(c*c+p*p)<=t.size.width/2}resolveCircleRectCollision(t,e){let s=t.position.x,o=t.position.y,n=e.position.x,h=e.position.y,r=e.size.width,a=e.size.height,l=s-n,c=n+r-s,p=o-h,y=h+a-o,d=t.getComponent(i);d?l<p&&l<y&&d.x>0?(t.position.x=e.position.x-t.size.width/2,d.x=-d.x):c<p&&c<y&&d.x<0?(t.position.x=e.position.x+e.size.width+t.size.width/2,d.x=-d.x):p<l&&p<c&&d.y>0?(t.position.y=e.position.y-t.size.height/2,d.y=-d.y):y<l&&y<c&&d.y<0&&(t.position.y=e.position.y+e.size.height+t.size.height/2,d.y=-d.y):l<p&&l<y?t.position.x=e.position.x-t.size.width/2:c<p&&c<y?t.position.x=e.position.x+e.size.width+t.size.width/2:p<l&&p<c?t.position.y=e.position.y-t.size.height/2:y<l&&y<c&&(t.position.y=e.position.y+e.size.height+t.size.height/2)}}class r extends t{constructor(){super()}appliesTo(t){return t.hasComponent(i)}update(t,e,s){for(let s of t){let t=s.getComponent(i);s.position.x+=t.x*e,s.position.y+=t.y*e}}}class a{constructor(t,e){this.position=t,this.size=e,this.components=[]}distanceTo(t){return Math.sqrt(Math.pow(this.position.x-t.position.x,2)+Math.pow(this.position.y-t.position.y,2))}getComponent(t){for(let e of this.components)// @ts-ignore
if(e instanceof t)return e}addComponents(...t){for(let e of t)this.components.push(e)}hasComponent(t){for(let e of this.components)// @ts-ignore
if(e instanceof t)return!0;return!1}removeComponent(t){this.components=this.components.filter(e=>e instanceof t)}draw(t){throw Error("Not implemented yet")}}class l extends a{constructor(t,e){super(t,e)}draw(t){t.save(),t.fillStyle="#543",t.beginPath(),t.arc(this.position.x,this.position.y,this.size.width/2,0,2*Math.PI),t.fill(),t.restore()}}class c extends t{constructor(){super(),this.keys=new Set,document.addEventListener("keydown",t=>{switch(t.keyCode){case 87:this.keys.add("w");break;case 65:this.keys.add("a");break;case 83:this.keys.add("s");break;case 68:this.keys.add("d")}}),document.addEventListener("keyup",t=>{switch(t.keyCode){case 87:this.keys.delete("w");break;case 65:this.keys.delete("a");break;case 83:this.keys.delete("s");break;case 68:this.keys.delete("d")}})}appliesTo(t){return t instanceof l}update(t,e,s,i){// const playerCell = entities.find((cell) => cell.getEntity(Player1));
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
t.save(),t.fillStyle="red",t.beginPath(),t.arc(this.position.x,this.position.y,this.radius,0,2*Math.PI),t.fill(),t.restore()}}class y extends t{constructor(){super(),this.gameWidth=0,this.gameHeight=0,this.startPos=null,this.aimPos=null,this.nearestIntersection=null}appliesTo(t){return t instanceof a}update(t,e,s,h){h.gameWidth&&(this.gameWidth=h.gameWidth),h.gameHeight&&(this.gameHeight=h.gameHeight);let r=t.filter(t=>t instanceof l);// if (!players) return;
for(let e of r){let r={x:e.position.x,y:e.position.y};if(!h.mousePos)return null;if(this.startPos={x:r.x+e.size.width/2*Math.cos(this.getDegrees(e.position,h.mousePos)),y:r.y+e.size.height/2*Math.sin(this.getDegrees(e.position,h.mousePos))},!h.mousePos)return;let a={x:h.mousePos.x-e.position.x,y:h.mousePos.y-e.position.y},l=Math.sqrt(Math.pow(a.x,2)+Math.pow(a.y,2)),c={x:a.x/l,y:a.y/l},y={x:c.x*Math.sqrt(Math.pow(h.gameWidth,2)+Math.pow(h.gameHeight,2)),y:c.y*Math.sqrt(Math.pow(h.gameWidth,2)+Math.pow(h.gameHeight,2))};this.aimPos={x:this.startPos.x+y.x,y:this.startPos.y+y.y};let d=this.aimPos.x,u=this.aimPos.y,g=this.startPos.x,x=this.startPos.y,f={intersectionX:d,intersectionY:u},m=t.filter(t=>t.hasComponent(n));// points for line (controlled by mouse)
for(let t of m){let e=t.position.x,s=t.position.y,i=t.size.width,o=t.size.height,n=this.lineRect(d,u,g,x,e,s,i,o);// square position
for(let t of n){let n=t.intersectionX-g,h=t.intersectionY-x,r=Math.sqrt(Math.pow(n,2)+Math.pow(h,2)),a=f.intersectionX-g,l=f.intersectionY-x,c=Math.sqrt(Math.pow(a,2)+Math.pow(l,2));r<c&&(f={intersectionX:t.intersectionX,intersectionY:t.intersectionY,intersectedRect:{sx:e,sy:s,sw:i,sh:o}});// ctx.fillStyle = "blue";
// ctx.beginPath();
// ctx.arc(
//   intersection.intersectionX,
//   intersection.intersectionY,
//   5,
//   0,
//   2 * Math.PI
// );
// ctx.fill();
}}if(this.nearestIntersection=f,h.keys.has("leftClick")){let t=new p({x:this.startPos.x,y:this.startPos.y},5);t.addComponents(new i(1e3*c.x,1e3*c.y),new o),s.entities.push(t),h.keys.delete("leftClick")}}}draw(t){if(this.startPos&&this.aimPos){// ctx.save();
// ctx.restore();
t.fillStyle="black",t.fillRect(0,0,this.gameWidth,this.gameHeight),// ctx.save();
// ctx.translate(this.startPos.x, this.startPos.y);
// ctx.rotate(this.getDegrees(this.startPos, this.aimPos) + Math.PI / 2);
// // Create a circular clipping path
// ctx.beginPath();
// ctx.arc(0, 0, 250, 0, Math.PI * 2);
// ctx.clip();
// // draw background
// const lingrad = ctx.createLinearGradient(0, -300, 0, 0);
// lingrad.addColorStop(0, "rgba(0,0,0,1)");
// lingrad.addColorStop(0.1, "rgba(0,0,0,0.9)");
// lingrad.addColorStop(0.2, "rgba(0,0,0,0.8)");
// lingrad.addColorStop(0.3, "rgba(0,0,0,0.7)");
// lingrad.addColorStop(0.4, "rgba(0,0,0,0.6)");
// lingrad.addColorStop(0.5, "rgba(0,0,0,0.5)");
// lingrad.addColorStop(0.6, "rgba(0,0,0,0.4)");
// lingrad.addColorStop(0.7, "rgba(0,0,0,0.3)");
// lingrad.addColorStop(0.8, "rgba(0,0,0,0.2)");
// lingrad.addColorStop(0.9, "rgba(0,0,0,0.1)");
// lingrad.addColorStop(1, "rgba(0,0,0,0)");
// ctx.globalCompositeOperation = "source-in";
// ctx.fillStyle = lingrad;
// ctx.fill();
// ctx.restore();
t.save(),t.translate(this.startPos.x,this.startPos.y),t.rotate(this.getDegrees(this.startPos,this.aimPos)+Math.PI/2),t.beginPath(),t.moveTo(0,0),t.lineTo(-1600,-800),t.lineTo(1600,-800),t.clip();// draw background
let e=t.createLinearGradient(0,-800,0,0);if(e.addColorStop(0,"rgba(0,0,0,1)"),e.addColorStop(.1,"rgba(0,0,0,0.9)"),e.addColorStop(.2,"rgba(0,0,0,0.8)"),e.addColorStop(.3,"rgba(0,0,0,0.7)"),e.addColorStop(.4,"rgba(0,0,0,0.6)"),e.addColorStop(.5,"rgba(0,0,0,0.5)"),e.addColorStop(.6,"rgba(0,0,0,0.4)"),e.addColorStop(.7,"rgba(0,0,0,0.3)"),e.addColorStop(.8,"rgba(0,0,0,0.2)"),e.addColorStop(.9,"rgba(0,0,0,0.1)"),e.addColorStop(1,"rgba(0,0,0,0)"),t.globalCompositeOperation="source-in",t.fillStyle=e,t.fill(),t.restore(),t.save(),t.fillStyle="orange",t.beginPath(),t.arc(this.startPos.x,this.startPos.y,5,0,2*Math.PI),t.fill(),this.nearestIntersection){if(this.nearestIntersection.intersectedRect){let{intersectedRect:e}=this.nearestIntersection;t.fillStyle="orange",t.fillRect(e.sx,e.sy,e.sw,e.sh)}// draw the line
t.beginPath(),t.setLineDash([5,15]),t.moveTo(this.startPos.x,this.startPos.y),t.lineTo(this.nearestIntersection.intersectionX,this.nearestIntersection.intersectionY),t.stroke(),// draw intersection dot
t.fillStyle="red",t.beginPath(),t.arc(this.nearestIntersection.intersectionX,this.nearestIntersection.intersectionY,5,0,2*Math.PI),t.fill()}t.restore()}}lineRect(t,e,s,i,o,n,h,r){// check if the line has hit any of the rectangle's sides
// uses the Line/Line function below
let a=this.lineLine(t,e,s,i,o,n,o,n+r),l=this.lineLine(t,e,s,i,o+h,n,o+h,n+r),c=this.lineLine(t,e,s,i,o,n,o+h,n),p=this.lineLine(t,e,s,i,o,n+r,o+h,n+r),y=[];return a&&y.push(a),l&&y.push(l),c&&y.push(c),p&&y.push(p),y}lineLine(t,e,s,i,o,n,h,r){// calculate the direction of the lines
let a=((h-o)*(e-n)-(r-n)*(t-o))/((r-n)*(s-t)-(h-o)*(i-e)),l=((s-t)*(e-n)-(i-e)*(t-o))/((r-n)*(s-t)-(h-o)*(i-e));return(// if uA and uB are between 0-1, lines are colliding
a>=0&&a<=1&&l>=0&&l<=1?{intersectionX:t+a*(s-t),intersectionY:e+a*(i-e)}:null)}getDegrees(t,e){if(!e)throw Error("No mousePos");if(e.y>t.y){if(e.x>t.x){let s=Math.atan(Math.abs(e.y-t.y)/Math.abs(e.x-t.x));return s}{let s=Math.atan(Math.abs(e.x-t.x)/Math.abs(e.y-t.y))+Math.PI/2;return s}}if(e.x>t.x){let s=-Math.atan(Math.abs(e.y-t.y)/Math.abs(e.x-t.x));return s}{let s=-Math.atan(Math.abs(e.x-t.x)/Math.abs(e.y-t.y))-Math.PI/2;return s}}}class d extends a{constructor(t,e){super(t,e),this.components=[]}draw(t){// ctx.beginPath();
// ctx.fillStyle = "#FFF";
// ctx.fillRect(
//   this.position.x,
//   this.position.y,
//   this.size.width,
//   this.size.height
// );
// ctx.fill();
// ctx.closePath();
}}class u extends d{constructor(t,e){super(t,e)}draw(t){t.save(),t.beginPath(),t.fillStyle="#000",t.fillRect(this.position.x,this.position.y,this.size.width,this.size.height),t.fill(),t.closePath(),t.restore()}}class g extends e{constructor(){super()}}class x{constructor(t,e){this.x=t,this.y=e}}class f extends x{constructor(t,e){super(t,e),this.x=t,this.y=e}}class m{constructor(t,e,s,i){this.d=0,this.p1=new f(t,e),this.p2=new f(s,i),this.p1.segment=this,this.p2.segment=this}}class w{constructor(t,e,s,i){this.x=t,this.y=e,this.width=s,this.height=i}getCorners(){return{nw:new x(this.x,this.y),sw:new x(this.x,this.y+this.height),ne:new x(this.x+this.width,this.y),se:new x(this.x+this.width,this.y+this.height)}}getCornerSegments(){let{nw:t,sw:e,ne:s,se:i}=this.getCorners();return[new m(t.x,t.y,s.x,s.y),new m(t.x,t.y,e.x,e.y),new m(s.x,s.y,i.x,i.y),new m(e.x,e.y,i.x,i.y)]}}const b=(t,e)=>{let{x:s,y:i}=t,o=.5*(e.p1.x+e.p2.x)-s,n=.5*(e.p1.y+e.p2.y)-i;e.d=o*o+n*n,e.p1.angle=Math.atan2(e.p1.y-i,e.p1.x-s),e.p2.angle=Math.atan2(e.p2.y-i,e.p2.x-s)},S=t=>{let e=t.p2.angle-t.p1.angle;e<=-Math.PI&&(e+=2*Math.PI),e>Math.PI&&(e-=2*Math.PI),t.p1.beginsSegment=e>0,t.p2.beginsSegment=!t.p1.beginsSegment},C=(t,e)=>{for(let s of e)b(t,s),S(s);return e};function M(t,e,s,i){let o=((i.x-s.x)*(t.y-s.y)-(i.y-s.y)*(t.x-s.x))/((i.y-s.y)*(e.x-t.x)-(i.x-s.x)*(e.y-t.y));return new x(t.x+o*(e.x-t.x),t.y+o*(e.y-t.y))}function P(t,e){return t.angle>e.angle?1:t.angle<e.angle?-1:!t.beginsSegment&&e.beginsSegment?1:t.beginsSegment&&!e.beginsSegment?-1:0}const k=(t,e)=>{let s=(t.p2.x-t.p1.x)*(e.y-t.p1.y)-(t.p2.y-t.p1.y)*(e.x-t.p1.x);return s<0},v=(t,e,s)=>new x(t.x*(1-s)+e.x*s,t.y*(1-s)+e.y*s),z=(t,e,s)=>{let i=k(t,v(e.p1,e.p2,.01)),o=k(t,v(e.p2,e.p1,.01)),n=k(t,s),h=k(e,v(t.p1,t.p2,.01)),r=k(e,v(t.p2,t.p1,.01)),a=k(e,s);return h===r&&r!==a||i===o&&o===n};class I extends t{constructor(){super(),this.room=null,this.lightSource=null,this.blocks=[],this.walls=[],this.visibility=[]}appliesTo(t){return t instanceof u||t.hasComponent(g)}update(t,e,s,i){let o=t.find(t=>t instanceof l),n=t.filter(t=>t instanceof u);if(!o){this.lightSource=null;return}// Setup scene
this.room=new w(0,0,i.gameWidth,i.gameHeight),this.walls=[],this.blocks=n.map(t=>new w(t.position.x,t.position.y,t.size.width,t.size.height)),// Test lightsource middle of map
this.lightSource=new x(o.position.x,o.position.y);let h=function(t,e,s,i){let o=[];for(let e of t.getCornerSegments())o.push(e);for(let t of e)for(let e of t.getCornerSegments())o.push(e);for(let t of s)o.push(t);let n=[];for(let t of C(i,o))n.push(t.p1,t.p2);return n}(this.room,this.blocks,this.walls,this.lightSource);this.visibility=function(t,e){let s=[],i=[],o=0;e.sort(P);for(let n=0;n<2;n+=1)for(let h of e){let e=s[0];if(h.beginsSegment){let e=0,i=s[0];for(;i&&z(h.segment,i,t);)e+=1,i=s[e];i?s.splice(e,0,h.segment):s.push(h.segment)}else{let t=s.indexOf(h.segment);t>-1&&s.splice(t,1)}if(e!==s[0]){if(1===n){let s=function(t,e,s,i){let o=new x(t.x+Math.cos(e),t.y+Math.sin(e)),n=new x(0,0),h=new x(0,0);i?(n.x=i.p1.x,n.y=i.p1.y,h.x=i.p2.x,h.y=i.p2.y):(n.x=t.x+200*Math.cos(e),n.y=t.y+200*Math.sin(e),h.x=t.x+200*Math.cos(s),h.y=t.y+200*Math.sin(s));let r=M(n,h,t,o);o.x=t.x+Math.cos(s),o.y=t.y+Math.sin(s);let a=M(n,h,t,o);return[r,a]}(t,o,h.angle,e);i.push(s)}o=h.angle}}return i}(this.lightSource,h)}draw(t){if(this.lightSource&&this.room){for(let e of(this.drawVisibilityTriangles(t,"gray",this.lightSource,this.visibility),this.blocks))this.drawRectangle(t,"blue",e);for(let e of this.walls)this.drawSegment(t,"red",e)}}drawRectangle(t,e,s){t.save(),t.strokeStyle="blue",t.strokeRect(s.x,s.y,s.width,s.height),t.restore()}drawSegment(t,e,s){t.save(),t.beginPath(),t.strokeStyle="black",t.moveTo(s.p1.x,s.p1.y),t.lineTo(s.p2.x,s.p2.y),t.closePath(),t.stroke(),t.restore()}drawVisibilityTriangles(t,e,s,i){for(let e of(t.save(),t.fillStyle="black",t.fillRect(0,0,this.room.width,this.room.height),t.globalCompositeOperation="source-out",t.beginPath(),i))t.moveTo(s.x,s.y),t.lineTo(e[0].x,e[0].y),t.lineTo(e[1].x,e[1].y);t.clip(),t.fillStyle="transparent",t.fill(),t.restore()}}class T{constructor(t){this.structure=t,this.systems=[new c,new r,new h],this.shadowSystem=new I,this.ShootSystem=new y,this.entities=[],this.offsetX=0,this.offsetY=0}buildLevel(t,e){let s=[],i=this.structure[0].length,h=this.structure.length;for(let t of this.structure)if(t.length!==i)throw Error("Not all rows in level structure have the same size");let r=0;if(t/e<i/h?(r=t/i,this.offsetX=0,this.offsetY=(e-r*h)/2):(r=e/h,this.offsetX=(t-r*i)/2,this.offsetY=0),r<=0)throw Error("Cell size less than 0");this.structure.forEach((t,e)=>{t.forEach((t,i)=>{let h={x:i,y:e};switch(s.push(new d({x:r*h.x+this.offsetX,y:r*h.y+this.offsetY},{width:r,height:r})),t){case 1:{let t=new u({x:r*h.x+this.offsetX,y:r*h.y+this.offsetY},{width:r,height:r});t.addComponents(new n),s.push(t);break}case 3:{let t=new l({x:r*h.x+this.offsetX,y:r*h.y+this.offsetY},{width:r,height:r});t.addComponents(new o,new g),s.push(t)}}})}),this.entities=s}update(t,e){for(let s of[...this.systems,this.shadowSystem,this.ShootSystem]){let i=this.entities.filter(s.appliesTo);s.update(i,t,this,e)}}draw(t,e,s){for(let e of this.entities)e.draw(t);for(let e of this.systems)e.draw(t);this.shadowSystem.draw(e),this.ShootSystem.draw(s)}}class R extends T{constructor(){super([[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,1,0,0,0,1,1,1,1,1,1,0,0,0,1,0,0,0,1],[1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1],[1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1],[1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1],[1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1],[1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1],[1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1],[1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1],[1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1],[1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1],[1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1],[1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1],[1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1],[1,0,0,0,1,0,0,0,1,1,1,1,1,1,0,0,0,1,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]])}}const q=document.querySelector("#gameScreen"),X=q.getContext("2d"),Y=document.querySelector("#shadowCanvas"),L=Y.getContext("2d"),E=document.querySelector("#sightCanvas"),H=E.getContext("2d"),W=window.innerWidth,D=window.innerHeight;q.width=W,q.height=D,Y.width=W,Y.height=D,E.width=W,E.height=D;const N=new class{constructor(t,e,s,i,o){this.gameWidth=t,this.gameHeight=e,this.mainCtx=s,this.shadowCtx=i,this.sightCtx=o,this.level=new R,this.entities=[],this.keys=new Set,this.mousePos=null,document.querySelector("#gameScreen").addEventListener("click",t=>{this.keys.add("leftClick")}),// (
//   document.querySelector("#gameScreen") as HTMLCanvasElement
// ).addEventListener("mouseup", (e) => {
//   this.keys.delete("leftClick");
// });
document.querySelector("#gameScreen").addEventListener("mousemove",t=>{this.mousePos={x:t.offsetX,y:t.offsetY}}),this.start()}start(){this.level.buildLevel(this.gameWidth,this.gameHeight)}update(t){this.level.update(t,this)}draw(t,e,s){this.level.draw(t,e,s)}}(W,D,X,L,H);let O=0;requestAnimationFrame(function t(e){// dt i sekunder
let s=(e-O)/1e3;O=e,X.clearRect(0,0,W,D),L.clearRect(0,0,W,D),H.clearRect(0,0,W,D),N.update(s),N.draw(X,L,H),requestAnimationFrame(t)});