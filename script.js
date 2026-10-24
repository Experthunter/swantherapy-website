(function(){
var NS='http://www.w3.org/2000/svg';
var KEEP={viewBox:1,preserveAspectRatio:1};
function kebab(k){return k.replace(/[A-Z]/g,function(c){return '-'+c.toLowerCase();});}
function h(tag,props){var el=document.createElementNS(NS,tag);props=props||{};
for(var k in props){if(k==='key')continue;var v=props[k];
if(k==='style'){for(var s in v)el.style.setProperty(kebab(s),v[s]);}
else el.setAttribute(KEEP[k]?k:kebab(k),v);}
var kids=[].slice.call(arguments,2);(function add(list){list.forEach(function(c){if(c==null||c===false)return;if(Array.isArray(c))add(c);else el.appendChild(typeof c==='object'?c:document.createTextNode(c));});})(kids);
return el;}
var React={createElement:h};
function cluster(seed, n, opts = {}) {
    const W = opts.w ?? 400, H = opts.h ?? 400, h = React.createElement, kids = [];
    let s = seed;
    const r = () => (s = (s * 16807) % 2147483647) / 2147483647;
    const greens = opts.dark ? ['#a3cccc', '#b8cfb4'] : ['#7f9c7a', '#9bb39a', '#8aa8a0'];
    const blooms = opts.dark ? ['#a3cccc', '#c9bfe6', '#e9bcc7', '#b9cbe3'] : ['#6f8fb3', '#9a8bbf', '#d49aaa', '#a3cccc', '#b7a6d6'];
    for (let i = 0; i < n; i++) {
      const x0 = W * (0.08 + 0.84 * r()), yTop = H * (0.08 + 0.55 * r());
      const lean = (r() - 0.5) * 120, x1 = x0 + lean;
      const g = greens[i % greens.length], c = blooms[Math.floor(r() * blooms.length)];
      const parts = [h('path', { key: 's', d: `M${x0} ${H} Q${x0 + lean * 0.1} ${(H + yTop) / 2} ${x1} ${yTop}`, stroke: g, strokeWidth: 1.2, fill: 'none', strokeLinecap: 'round' })];
      const ly = yTop + (H - yTop) * (0.45 + r() * 0.3), lx = x0 + lean * (1 - (ly - yTop) / (H - yTop)) * 0.6;
      parts.push(h('path', { key: 'l', d: `M${lx} ${ly} q${r() > 0.5 ? 14 : -14} -10 ${r() > 0.5 ? 26 : -26} -6`, stroke: g, strokeWidth: 1, fill: 'none', opacity: 0.8 }));
      const type = Math.floor(r() * 4);
      if (type === 0) {
        const pr = 5 + r() * 4;
        for (let k = 0; k < 6; k++) parts.push(h('ellipse', { key: 'p' + k, cx: x1, cy: yTop - pr, rx: pr * 0.38, ry: pr, fill: c, opacity: 0.72, transform: `rotate(${k * 60} ${x1} ${yTop})` }));
        parts.push(h('circle', { key: 'c', cx: x1, cy: yTop, r: 2.2, fill: '#e8d9a8' }));
      } else if (type === 1) {
        for (let k = 0; k < 8; k++) parts.push(h('ellipse', { key: 'p' + k, cx: x1 + (k % 2 ? 2.5 : -2.5), cy: yTop - k * 6, rx: 2.2, ry: 3.6, fill: c, opacity: 0.55 + k * 0.04 }));
      } else if (type === 2) {
        for (let k = 0; k < 9; k++) {
          const a = (-150 + k * 15) * Math.PI / 180, L = 14 + r() * 8, ex = x1 + Math.cos(a) * L, ey = yTop + Math.sin(a) * L;
          parts.push(h('line', { key: 'r' + k, x1, y1: yTop, x2: ex, y2: ey, stroke: g, strokeWidth: 0.7 }));
          parts.push(h('circle', { key: 'd' + k, cx: ex, cy: ey, r: 1.6, fill: c, opacity: 0.8 }));
        }
      } else parts.push(h('ellipse', { key: 'b', cx: x1, cy: yTop - 4, rx: 3.2, ry: 6, fill: c, opacity: 0.7 }));
      kids.push(h('g', { key: i, style: { transformOrigin: `${x0}px ${H}px`, transformBox: 'view-box', animation: `sway ${5 + r() * 4}s ease-in-out ${-r() * 6}s infinite` } }, parts));
    }
    return h('svg', { viewBox: `0 0 ${W} ${H}`, width: '100%', height: '100%', preserveAspectRatio: opts.slice ? 'xMidYMax slice' : 'xMidYMax meet', style: { display: 'block', overflow: 'visible' } }, kids);
  }
var sw={ bc: cluster(137, 10, { dark: true }), a1: cluster(11, 14), a2: cluster(73, 14), b: cluster(29, 18, { slice: true }), v: cluster(41, 10, { dark: true }), f: cluster(103, 10, { dark: true }), th: cluster(57, 7, { w: 400, h: 100 }), br: cluster(83, 9, { w: 600, h: 90 }), al: cluster(19, 8, { w: 400, h: 150 }), s1: cluster(61, 4, { w: 200, h: 100 }), s2: cluster(97, 4, { w: 200, h: 100 }) };
document.querySelectorAll('[data-sway]').forEach(function(n){var s=sw[n.getAttribute('data-sway')];if(s)n.replaceWith(s);});
})();
