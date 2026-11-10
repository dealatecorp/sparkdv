import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

// Measured reference geometry normalized to its 1368 x 600 photo board.
const destinations = [
  [.125,.829,.15,.342], [.16,.232,.12,.364], [.46,.032,.14,.425],
  [.42,.5,.20,.278], [.58,.952,.12,.364], [.71,.102,.12,.364],
  [.71,.56,.14,.319], [.77,.947,.12,.274], [.92,.512,.12,.364],
];
export function init(root) {
  if (!root) return () => {};
  let disposed = false;
  const mm = gsap.matchMedia();
  const context = gsap.context(() => {
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const sequence = root.querySelector('.about-manifesto');
      const lines = [...root.querySelectorAll('.about-statement-line')];
      const dots = [...root.querySelectorAll('.about-sequence-progress i')];
      const stage = root.querySelector('.about-manifesto-stage');
      let selected = -1;
      // Clear the CSS pixel offset before applying percentage translation.
      // Otherwise hidden lines retain a second 100% offset and never enter view.
      gsap.set(lines, { y: 0, yPercent: i => i === 0 ? 0 : 100 });
      const show = next => {
        if (selected === next) return;
        selected = next;
        // 20% longer than reference; same measured normalized easing curve.
        gsap.to(lines, { yPercent: i => i < next ? -100 : i === next ? 0 : 100, duration: .6, ease: 'power1.out', overwrite: true });
        gsap.to(stage, { backgroundColor: ['#073763','#63218b','#24496b'][next], duration: .6, overwrite: true });
        dots.forEach((dot,i)=>dot.classList.toggle('is-active', i===next));
      };
      ScrollTrigger.create({ trigger: sequence, start:'top top+=88', end:'bottom bottom', onUpdate: self => show(self.progress < .18 ? 0 : self.progress < .62 ? 1 : 2), onRefresh: self => show(self.progress < .18 ? 0 : self.progress < .62 ? 1 : 2) });
      show(0);
    });
    mm.add('(min-width: 761px) and (prefers-reduced-motion: no-preference)', () => {
      const board = root.querySelector('.about-photo-board');
      const photos = [...board.querySelectorAll('[data-motion-item]')];
      gsap.set(photos, { xPercent:-50, yPercent:-50, left:'50%', top:'50%' });
      gsap.to(photos, {
        x: i => (destinations[i][0]-.5)*board.clientWidth,
        y: i => (destinations[i][1]-.5)*board.clientHeight,
        ease:'power1.out',
        scrollTrigger:{trigger:board,start:'top bottom',end:'top 25%',scrub:1.5,invalidateOnRefresh:true},
      });
    });
  }, root);
  const refresh = () => { if (!disposed) ScrollTrigger.refresh(); };
  document.fonts?.ready.then(refresh);
  const images = [...root.querySelectorAll('img')];
  images.forEach(img=>img.addEventListener('load',refresh));
  return () => { disposed=true; images.forEach(img=>img.removeEventListener('load',refresh)); mm.revert(); context.revert(); };
}
export function destroy(cleanup) { cleanup?.(); }
