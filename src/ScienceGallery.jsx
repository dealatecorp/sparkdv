import React,{useEffect,useRef} from 'react';
import {Link,useSearchParams} from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import {ArrowLeft,ArrowUpRight} from 'lucide-react';
import content from './source-content.json';
import {LayoutGrid} from './components/ui/layout-grid';

const markdown=content['/science'].markdown;
const extract=(start,end)=>markdown.split(start)[1]?.split(end)[0]?.trim()||'';
const articles=[
 {id:'antibacterial-action',title:'Antibacterial action',category:'Inside the formulation',image:'/assets/research/nsf-antibacterial-diagram-Dp4Pyfpy.webp',body:extract('### Antibacterial Action','### Biofilm Disruption')},
 {id:'biofilm-disruption',title:'Understanding biofilm',category:'Inside the formulation',image:'/assets/research/nsf-biofilm-diagram-LxLNoosV.webp',body:extract('### Biofilm Disruption','### Remineralization Support')},
 {id:'remineralization',title:'Remineralization support',category:'Enamel & everyday care',image:'/assets/research/nsf-remineralization-diagram-wFf-cVns.webp',body:extract('### Remineralization Support','## Evidence Library')},
 {id:'evidence-library',title:'Explore the evidence library',category:'Research resources',image:'/assets/research/nsf-mechanism-diagram-DeOHIhuL.webp',body:extract('## Evidence Library','## Safety & Non-Staining Technology')},
 {id:'safety',title:'Safety & non-staining technology',category:'Product guidance',image:'/assets/research/white-spots-teeth-BQXHGZg8.webp',body:extract('## Safety & Non-Staining Technology','END_OF_ARTICLE')},
];
export default function ScienceGallery(){
 const [params,setParams]=useSearchParams();
 const cards=articles.map(a=>({id:a.id,title:a.title,category:a.category,thumbnail:a.image,content:<div className="source-article journal-body"><ReactMarkdown components={{img:()=>null,a:({href,children})=><Link to={href}>{children}</Link>}}>{a.body}</ReactMarkdown></div>}));
 return <section className="science-journal wrap"><header className="journal-heading"><h1>Blogs</h1><p>Explore the ideas, ingredients and research behind SPARK-DV.</p></header><LayoutGrid cards={cards} selectedId={params.get('article')} onSelect={id=>setParams({article:id})} onClose={()=>setParams({})}/></section>;
}
