import type { ReactNode } from 'react';
import './brand-wordmark.css';

const source = '/images/spark-dv-wordmark.png';
const wordmarkPattern = /(\bSPARK[ \u00a0\u2010-\u2015-]*DV\b(?!@|\.[a-z]{2,}\b))/gi;

export function BrandWordmark({ label = 'SPARK-DV' }: { label?: string }) {
  return <img className="brand-wordmark" src={source} width={418} height={77} alt={label} />;
}

export function brandText(content: ReactNode): ReactNode {
  if (typeof content !== 'string') return content;
  const parts = content.split(wordmarkPattern);
  return parts.length === 1 ? content : parts.map((part, index) => (
    index % 2 ? <BrandWordmark key={index} label={part} /> : part
  ));
}

type MarkdownNode = { type: string; tagName?: string; value?: string; children?: MarkdownNode[]; properties?: object };

export function rehypeBrandWordmarks() {
  function replaceWordmarks(node: MarkdownNode) {
    if (!node.children || node.tagName === 'code' || node.tagName === 'pre') return;
    node.children = node.children.flatMap(child => {
      if (child.type !== 'text' || !child.value) {
        replaceWordmarks(child);
        return child;
      }
      return child.value.split(wordmarkPattern).flatMap<MarkdownNode>((part, index) => {
        if (!part) return [];
        return index % 2 ? {
          type: 'element', tagName: 'img', children: [],
          properties: { className: ['brand-wordmark'], src: source, width: 418, height: 77, alt: part },
        } : { type: 'text', value: part };
      });
    });
  }
  return replaceWordmarks;
}
