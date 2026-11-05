'use strict';
/* Dibujos originales de construcciones geométricas; todas las coordenadas son esquemáticas. */
const G={
 svg:s=>`<svg viewBox="0 0 640 340" role="img" aria-label="Construcción geométrica explicada por etapas"><rect width="640" height="340" fill="#f8fbfc"/>${s}</svg>`,
 c:(x,y,r,k='geo')=>`<circle cx="${x}" cy="${y}" r="${r}" class="${k}"/>`,
 l:(x,y,X,Y,k='mainline')=>`<line x1="${x}" y1="${y}" x2="${X}" y2="${Y}" class="${k}"/>`,
 p:(x,y,n,dx=9,dy=-10)=>`<circle cx="${x}" cy="${y}" r="3.8" class="spot"/><text x="${x+dx}" y="${y+dy}">${n}</text>`,
 txt:(x,y,s)=>`<text x="${x}" y="${y}">${s}</text>`,
 arc:(cx,cy,r,x1,y1,x2,y2,large=0)=>{let a=Math.atan2(y1-cy,x1-cx),b=Math.atan2(y2-cy,x2-cx);let delta=(b-a+2*Math.PI)%(2*Math.PI);return `<path d="M${x1},${y1} A${r},${r} 0 ${large} ${delta>Math.PI?0:1} ${x2},${y2}" class="answerline"/>`},
 lineThrough:(x,y,dx,dy,k='answerline')=>{let s=300/Math.max(Math.abs(dx),Math.abs(dy));return G.l(x-dx*s,y-dy*s,x+dx*s,y+dy*s,k)},
 label:(x,y,t)=>`<text x="${x}" y="${y}" font-size="12">${t}</text>`
};
const piece=(...arr)=>arr.join('');
const power=(()=>{let O=[225,175],P=[500,175],r=95,d=275,T=[225+r*r/d,175-Math.sqrt(r*r-(r*r/d)**2)],M=[362.5,175];return [
 ['Dados: circunferencia, centro O y punto P exterior.',()=>piece(G.c(...O,r),G.p(...O,'O'),G.p(...P,'P'))],
 ['Une O con P y construye su punto medio M.',()=>piece(G.l(...O,...P,'aux'),G.p(...M,'M'))],
 ['Traza la circunferencia de diámetro OP (Tales).',()=>G.c(...M,d/2,'aux')],
 ['Localiza la intersección superior T; hay otra simétrica.',()=>piece(G.p(...T,'T'),G.l(...O,...T,'aux'))],
 ['Une P con T: OT y PT son perpendiculares. PT²=PO²−r².',()=>piece(G.l(...P,...T,'answerline'),G.txt(405,103,'PT tangente'))]
]})();
const radical=(()=>{let o1=[230,180],o2=[410,180],r1=110,r2=100,d=180,x=o1[0]+(d*d+r1*r1-r2*r2)/(2*d),h=Math.sqrt(r1*r1-(x-o1[0])**2);return [
 ['Dibuja dos circunferencias secantes con centros O₁ y O₂.',()=>piece(G.c(...o1,r1),G.c(...o2,r2),G.p(...o1,'O₁'),G.p(...o2,'O₂'))],
 ['Une los centros: el eje radical será perpendicular a esta dirección.',()=>G.l(...o1,...o2,'aux')],
 ['Localiza los dos puntos comunes A y B.',()=>piece(G.p(x,180-h,'A'),G.p(x,180+h,'B'))],
 ['La recta AB es el eje radical: potencia igual respecto a ambas circunferencias.',()=>piece(G.l(x,34,x,320,'answerline'),G.txt(x+12,38,'eje radical'))]
]})();
const radical3=(()=>{let circles=[{x:205,y:160,r:88},{x:425,y:175,r:103},{x:315,y:285,r:74}];let axes=[];for(let [i,j] of [[0,1],[1,2],[0,2]]){let a=circles[i],b=circles[j];let nx=2*(b.x-a.x),ny=2*(b.y-a.y),rhs=b.x*b.x+b.y*b.y-b.r*b.r-(a.x*a.x+a.y*a.y-a.r*a.r),div=nx*nx+ny*ny;axes.push({x:nx*rhs/div,y:ny*rhs/div,dx:-ny,dy:nx,nx,ny,rhs})}let a=axes[0],b=axes[1],det=a.nx*b.ny-b.nx*a.ny,kx=(a.rhs*b.ny-b.rhs*a.ny)/det,ky=(a.nx*b.rhs-b.nx*a.rhs)/det;return [
 ['Considera tres circunferencias con centros no alineados.',()=>circles.map((c,i)=>G.c(c.x,c.y,c.r)+G.p(c.x,c.y,'O'+(i+1))).join('')],
 ['Traza el eje radical de las circunferencias 1 y 2.',()=>G.lineThrough(axes[0].x,axes[0].y,axes[0].dx,axes[0].dy,'aux')],
 ['Traza el eje radical de 2 y 3. La intersección es K.',()=>piece(G.lineThrough(axes[1].x,axes[1].y,axes[1].dx,axes[1].dy,'aux'),G.p(kx,ky,'K'))],
 ['El eje de 1 y 3 también pasa por K: centro radical.',()=>G.lineThrough(axes[2].x,axes[2].y,axes[2].dx,axes[2].dy,'answerline')]
]})();
const linkAngle=[
 ['Datos: dos rectas perpendiculares.',()=>piece(G.l(185,25,185,310),G.l(55,265,580,265),G.p(185,265,'V'))],
 ['Dibuja paralelas interiores a distancia R=65 (esquema).',()=>piece(G.l(250,25,250,310,'aux'),G.l(55,200,580,200,'aux'))],
 ['La intersección determina O. Proyecta perpendicularmente sobre las rectas.',()=>piece(G.p(250,200,'O'),G.l(250,200,185,200,'aux'),G.l(250,200,250,265,'aux'),G.p(185,200,'T₁',-32,-10),G.p(250,265,'T₂'))],
 ['El arco de radio R enlaza rectas en T₁ y T₂.',()=>`<path d="M185 200 A65 65 0 0 0 250 265" class="answerline"/>`]
];
const linkCircles=(()=>{let a={x:195,y:195,r:44},b={x:425,y:195,r:58},R=105,ra=R+a.r,rb=R+b.r,d=b.x-a.x,x=(d*d+ra*ra-rb*rb)/(2*d),h=Math.sqrt(ra*ra-x*x),cx=a.x+x,cy=a.y-h;
 let t1=[a.x+(cx-a.x)*a.r/ra,a.y+(cy-a.y)*a.r/ra],t2=[b.x+(cx-b.x)*b.r/rb,b.y+(cy-b.y)*b.r/rb];
 let aa=Math.atan2(t1[1]-cy,t1[0]-cx),ab=Math.atan2(t2[1]-cy,t2[0]-cx),delta=(ab-aa+2*Math.PI)%(2*Math.PI),sweep=delta<Math.PI?1:0;
 return [
 ['Datos: dos circunferencias y radio R del enlace exterior.',()=>piece(G.c(a.x,a.y,a.r),G.c(b.x,b.y,b.r),G.p(a.x,a.y,'O₁'),G.p(b.x,b.y,'O₂'))],
 ['Traza auxiliares de radios R+r₁ y R+r₂.',()=>piece(G.c(a.x,a.y,ra,'aux'),G.c(b.x,b.y,rb,'aux'))],
 ['Las intersecciones de auxiliares son posibles centros C.',()=>G.p(cx,cy,'C')],
 ['Une C con O₁ y O₂ para determinar los contactos.',()=>piece(G.l(a.x,a.y,cx,cy,'aux'),G.l(b.x,b.y,cx,cy,'aux'),G.p(...t1,'T₁'),G.p(...t2,'T₂'))],
 ['Con centro C y radio R traza el arco útil entre los contactos.',()=>`<path d="M${t1.join(' ')} A${R} ${R} 0 ${delta>Math.PI?1:0} ${sweep} ${t2.join(' ')}" class="answerline"/>`]
 ]
})();
const ellipse=(()=>{let f1=[235,190],f2=[405,190],t=[320,95];let v1=[f1[0]-t[0],f1[1]-t[1]],v2=[f2[0]-t[0],f2[1]-t[1]];let n1=Math.hypot(...v1),n2=Math.hypot(...v2),nx=v1[0]/n1+v2[0]/n2,ny=v1[1]/n1+v2[1]/n2;let norm=Math.hypot(nx,ny);nx/=norm;ny/=norm;let dx=-ny,dy=nx;let a=(n1+n2)/2,c=85,b=Math.sqrt(a*a-c*c);return [
 ['Datos: elipse con focos F₁ y F₂ y punto T de la curva.',()=>piece(`<ellipse cx="320" cy="190" rx="${a}" ry="${b}" class="geo"/>`,G.p(...f1,'F₁'),G.p(...f2,'F₂'),G.p(...t,'T'))],
 ['Une T con los focos.',()=>piece(G.l(...f1,...t,'aux'),G.l(...f2,...t,'aux'))],
 ['La bisectriz interior de los radios focales es la normal.',()=>G.lineThrough(...t,nx,ny,'aux')],
 ['La perpendicular por T a la normal es la tangente.',()=>G.lineThrough(...t,dx,dy,'answerline')]
]})();
const parabola=(()=>{let F=[350,180],directrixX=190,y=100,x=(F[0]*F[0]-directrixX*directrixX+(y-F[1])**2)/(2*(F[0]-directrixX)),T=[x,y],D=[directrixX,y],M=[(F[0]+D[0])/2,(F[1]+D[1])/2];let dx=-(F[1]-D[1]),dy=F[0]-D[0];return [
 ['Datos: foco F, directriz d y punto T de la parábola.',()=>piece(G.l(directrixX,20,directrixX,318),G.p(...F,'F'),G.p(...T,'T'),G.txt(directrixX-22,25,'d'))],
 ['Proyecta T perpendicularmente sobre d para obtener D.',()=>piece(G.l(...T,...D,'aux'),G.p(...D,'D',-21,-12))],
 ['Une F con D y determina su punto medio M.',()=>piece(G.l(...F,...D,'aux'),G.p(...M,'M'))],
 ['La mediatriz de FD pasa por T y es tangente a la parábola.',()=>G.lineThrough(...M,dx,dy,'answerline')]
]})();
const advDemos={'power':power,'radical':radical,'radical3':radical3,'link-angle':linkAngle,'link-circles':linkCircles,'ellipse':ellipse,'parabola':parabola};
function mountAdv(root){let name=root.dataset.advancedDiagram,steps=advDemos[name];if(!steps)return;let wrap=root.closest('.adv-diagram'),index=0;
 if(!wrap){root.innerHTML=G.svg(steps.map(s=>s[1]()).join(''));return}
 let prev=wrap.querySelector('[data-adv-prev]'),next=wrap.querySelector('[data-adv-next]'),reset=wrap.querySelector('[data-adv-reset]'),count=wrap.querySelector('.adv-step-count'),expl=wrap.querySelector('.adv-explain');
 function render(){root.innerHTML=G.svg(steps.slice(0,index+1).map(s=>s[1]()).join(''));count.textContent=`Paso ${index+1} de ${steps.length}`;expl.textContent=steps[index][0];prev.disabled=index===0;next.disabled=index===steps.length-1;next.textContent=index===steps.length-1?'Solución completa ✓':'Siguiente paso →'}
 prev.addEventListener('click',()=>{index=Math.max(0,index-1);render()});next.addEventListener('click',()=>{index=Math.min(steps.length-1,index+1);render()});reset.addEventListener('click',()=>{index=0;render()});render()
}
document.querySelectorAll('[data-advanced-diagram]').forEach(mountAdv);
document.querySelectorAll('[data-quick-answer]').forEach(button=>button.addEventListener('click',()=>{let key=button.dataset.quickAnswer,fb=document.querySelector(`[data-quick-feedback="${key}"]`),correct=button.dataset.choice===button.dataset.correct;fb.textContent=correct?'✓ Correcto: PT=√(50²−30²)=40 mm.':'Revisa Pitágoras: PT²=PO²−r², no PO−r.'}));
let level=document.getElementById('levelFilter'),topic=document.getElementById('topicFilter');
if(level&&topic){let all=[...document.querySelectorAll('.adv-exercise')],counter=document.getElementById('problemCount');function filter(){let n=0;all.forEach(item=>{let visible=(level.value==='todos'||level.value===item.dataset.level)&&(topic.value==='todos'||topic.value===item.dataset.topic);item.hidden=!visible;if(visible)n++});counter.textContent=`${n} de ${all.length} ejercicios`;}level.addEventListener('change',filter);topic.addEventListener('change',filter);filter()}
