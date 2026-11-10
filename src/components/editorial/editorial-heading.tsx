const pages: Record<string, {number: string; label: string; title: string; intro: string}> = {
  '/science': {
    number: '01', label: 'Blogs', title: 'Blogs',
    intro: 'Explore the materials and research behind SPARK-DV’s approach to pediatric and preventive dentistry.',
  },
  '/dentists': {
    number: '02', label: 'For dentists', title: 'Precision in practice.',
    intro: 'Clinical protocols, product information and professional support, brought together for your practice.',
  },
  '/parents': {
    number: '03', label: 'For parents', title: 'Little routines.\nLifelong care.',
    intro: 'Clear information to help you make confident oral care decisions for your family. Every smile deserves attention.',
  },
  '/school-program': {
    number: '04', label: 'School program', title: 'Healthy habits.\nShared futures.',
    intro: 'A preventive dental health initiative connecting schools, families and dental professionals.',
  },
  '/about': {
    number: '05', label: 'About SPARK-DV', title: 'Ideas shaped\nby science.',
    intro: 'Innovation-led dental products for pediatric and preventive dentistry. Made in India, with a research-driven outlook.',
  },
};

export default function EditorialHeading({path}: {path: string}) {
  const page = pages[path];
  return <header className="editorial-heading editorial-opening wrap">
    <p className="editorial-eyebrow"><span>{page.number} / SPARK-DV journal</span>{page.label}</p>
    <div className="editorial-opening-grid"><h1>{page.title}</h1><p>{page.intro}</p></div>
  </header>;
}
