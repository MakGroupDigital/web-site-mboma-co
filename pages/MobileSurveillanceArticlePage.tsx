import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import articleMarkdown from '../content/espionnage-camera-micro-telephone.md?raw';

const ARTICLE_PATH = '/articles/espionnage-camera-micro-telephone';
const ARTICLE_URL = `https://www.mboma.org${ARTICLE_PATH}`;
const ARTICLE_TITLE = 'Peut-on être espionné à travers la caméra ou le micro de son téléphone ?';
const ARTICLE_DESCRIPTION = 'Caméra, microphone, applications malveillantes, spywares et Pegasus : comprendre les risques réels de surveillance mobile et protéger son smartphone.';

type ArticleBlock =
  | { type: 'heading'; level: number; text: string; id: string }
  | { type: 'paragraph'; text: string }
  | { type: 'list'; ordered: boolean; items: string[] }
  | { type: 'divider' };

const slugify = (value: string) => value
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-|-$/g, '');

const parseArticle = (markdown: string): ArticleBlock[] => {
  const lines = markdown.replace(/\r/g, '').split('\n');
  const blocks: ArticleBlock[] = [];
  const ids = new Map<string, number>();
  let index = 0;

  while (index < lines.length) {
    const line = lines[index].trim();
    if (!line) {
      index += 1;
      continue;
    }

    if (line === '---') {
      blocks.push({ type: 'divider' });
      index += 1;
      continue;
    }

    const heading = line.match(/^(#{1,6})\s+(.+)$/);
    if (heading) {
      const text = heading[2].trim();
      const baseId = slugify(text);
      const occurrence = ids.get(baseId) ?? 0;
      ids.set(baseId, occurrence + 1);
      blocks.push({
        type: 'heading',
        level: heading[1].length,
        text,
        id: occurrence ? `${baseId}-${occurrence + 1}` : baseId,
      });
      index += 1;
      continue;
    }

    const unordered = line.match(/^\*\s+(.+)$/);
    const ordered = line.match(/^\d+\.\s+(.+)$/);
    if (unordered || ordered) {
      const isOrdered = Boolean(ordered);
      const items: string[] = [];
      while (index < lines.length) {
        const itemLine = lines[index].trim();
        const item = itemLine.match(isOrdered ? /^\d+\.\s+(.+)$/ : /^\*\s+(.+)$/);
        if (!item) break;
        items.push(item[1]);
        index += 1;
      }
      blocks.push({ type: 'list', ordered: isOrdered, items });
      continue;
    }

    const paragraph: string[] = [];
    while (index < lines.length) {
      const paragraphLine = lines[index].trim();
      if (!paragraphLine || paragraphLine === '---' || /^(#{1,6})\s+/.test(paragraphLine) || /^\*\s+/.test(paragraphLine) || /^\d+\.\s+/.test(paragraphLine)) break;
      paragraph.push(paragraphLine);
      index += 1;
    }
    blocks.push({ type: 'paragraph', text: paragraph.join('\n') });
  }

  return blocks.filter((block, blockIndex) => {
    if (block.type !== 'heading') return true;
    return blockIndex > 1 && block.text !== ARTICLE_TITLE && block.text !== 'Étude complète';
  });
};

const renderInline = (text: string) => text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g).map((part, index) => {
  if (part.startsWith('**') && part.endsWith('**')) return <strong key={index}>{part.slice(2, -2)}</strong>;
  if (part.startsWith('*') && part.endsWith('*')) return <em key={index}>{part.slice(1, -1)}</em>;
  return <React.Fragment key={index}>{part}</React.Fragment>;
});

const sources = [
  {
    name: 'Android Help — Gérer les permissions depuis le tableau de bord de confidentialité',
    url: 'https://support.google.com/android/answer/13530434?hl=fr',
  },
  {
    name: 'Android Help — Modifier les autorisations des applications',
    url: 'https://support.google.com/android/answer/9431959?hl=fr',
  },
  {
    name: 'Apple Support — Contrôler l’accès à la caméra et au microphone sur iPhone',
    url: 'https://support.apple.com/fr-fr/guide/iphone/iph168c4bbd5/ios',
  },
  {
    name: 'CISA — Mobile Communications Best Practice',
    url: 'https://www.cisa.gov/sites/default/files/2024-12/guidance-mobile-communications-best-practices.pdf',
  },
  {
    name: 'NIST SP 800-124 Rev. 2 — Guidelines for Managing the Security of Mobile Devices',
    url: 'https://csrc.nist.gov/pubs/sp/800/124/r2/final',
  },
  {
    name: 'Amnesty International Security Lab — The Pegasus Project',
    url: 'https://securitylab.amnesty.org/case-study-the-pegasus-project/',
  },
];

const MobileSurveillanceArticlePage: React.FC = () => {
  const blocks = useMemo(() => parseArticle(articleMarkdown), []);
  const headings = blocks.filter((block): block is Extract<ArticleBlock, { type: 'heading' }> =>
    block.type === 'heading' && (block.level === 1 || block.text === 'Introduction' || block.text === 'Conclusion' || block.text === 'À retenir'));
  const [shareFeedback, setShareFeedback] = useState('');

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title: ARTICLE_TITLE, text: ARTICLE_DESCRIPTION, url: ARTICLE_URL });
        setShareFeedback('Article partagé');
      } else {
        await navigator.clipboard.writeText(ARTICLE_URL);
        setShareFeedback('Lien copié');
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') return;
      setShareFeedback('Copiez le lien dans la barre d’adresse');
    }
    window.setTimeout(() => setShareFeedback(''), 3000);
  };

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: ARTICLE_TITLE,
    description: ARTICLE_DESCRIPTION,
    image: 'https://www.mboma.org/articleimage.png',
    datePublished: '2026-08-21',
    dateModified: '2026-08-21',
    inLanguage: 'fr-FR',
    mainEntityOfPage: { '@type': 'WebPage', '@id': ARTICLE_URL },
    articleSection: 'Cybersécurité',
    keywords: ['cybersécurité mobile', 'caméra téléphone', 'microphone téléphone', 'spyware', 'Pegasus', 'vie privée'],
    author: { '@type': 'Organization', name: 'MboMa & Co.', url: 'https://www.mboma.org' },
    publisher: {
      '@type': 'Organization',
      name: 'MboMa & Co.',
      url: 'https://www.mboma.org',
      logo: { '@type': 'ImageObject', url: 'https://www.mboma.org/logo-og.png' },
    },
  };

  return (
    <motion.article initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="bg-[#f7f8f5]">
      <Helmet>
        <meta property="article:published_time" content="2026-08-21T00:00:00+01:00" />
        <meta property="article:modified_time" content="2026-08-21T00:00:00+01:00" />
        <meta property="article:section" content="Cybersécurité" />
        <meta property="article:author" content="MboMa & Co." />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      <header className="relative overflow-hidden bg-institutional-grey pt-32 text-white lg:pt-40">
        <div className="absolute inset-0 opacity-10" aria-hidden="true">
          <div className="absolute -right-40 -top-52 h-[38rem] w-[38rem] rounded-full border border-white" />
          <div className="absolute -right-16 -top-24 h-[24rem] w-[24rem] rounded-full border border-institutional-lightGreen" />
        </div>
        <div className="container relative z-10 mx-auto px-6 pb-16 lg:px-12 lg:pb-24">
          <nav aria-label="Fil d’Ariane" className="mb-10 flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-white/45">
            <Link to="/" className="transition hover:text-institutional-lightGreen">Accueil</Link>
            <span aria-hidden="true">/</span>
            <span className="text-white/75">Études</span>
            <span aria-hidden="true">/</span>
            <span className="hidden text-white/75 sm:inline">Cybersécurité mobile</span>
          </nav>

          <div className="grid items-center gap-12 lg:grid-cols-[1.08fr_.72fr] lg:gap-20">
            <div>
              <div className="mb-7 flex flex-wrap items-center gap-3 text-[10px] font-bold uppercase tracking-[0.24em]">
                <span className="bg-institutional-green px-3 py-2 text-white">Étude complète</span>
                <span className="text-institutional-lightGreen">Cybersécurité · Vie privée · Smartphones</span>
              </div>
              <h1 className="max-w-4xl text-4xl font-light leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
                Peut-on être espionné à travers la <span className="font-bold text-institutional-lightGreen">caméra ou le micro</span> de son téléphone ?
              </h1>
              <p className="mt-8 max-w-3xl font-serif text-lg leading-relaxed text-white/68 lg:text-xl">
                Une analyse claire des risques réels, des mécanismes de surveillance mobile et des mesures concrètes pour protéger son appareil.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-white/50">
                <span>Par MboMa &amp; Co.</span>
                <span aria-hidden="true" className="h-1 w-1 rounded-full bg-institutional-orange" />
                <time dateTime="2026-08-21">21 août 2026</time>
                <span aria-hidden="true" className="h-1 w-1 rounded-full bg-institutional-orange" />
                <span>19 min de lecture</span>
              </div>
            </div>

            <figure className="relative mx-auto w-full max-w-xl lg:max-w-none">
              <div className="absolute -inset-3 translate-x-3 translate-y-3 border border-institutional-lightGreen/30" aria-hidden="true" />
              <img
                src="/articleimage.png"
                alt="Téléphone protégé illustrant les risques d’espionnage par la caméra et le microphone"
                width="1146"
                height="1148"
                fetchPriority="high"
                className="relative aspect-square w-full object-cover shadow-2xl"
              />
            </figure>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-16 lg:px-12 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[minmax(0,1fr)_19rem] lg:gap-20">
          <main className="min-w-0 rounded-sm bg-white px-6 py-10 shadow-sm sm:px-10 lg:px-14 lg:py-16">
            {blocks.map((block, index) => {
              if (block.type === 'divider') return <hr key={index} className="my-12 border-institutional-grey/10" />;
              if (block.type === 'heading') {
                if (block.level === 1) return <h2 key={block.id} id={block.id} className="scroll-mt-28 pt-4 text-2xl font-bold leading-tight text-institutional-grey sm:text-3xl">{renderInline(block.text)}</h2>;
                return <h3 key={block.id} id={block.id} className="scroll-mt-28 pt-3 text-xl font-bold leading-snug text-institutional-green sm:text-2xl">{renderInline(block.text)}</h3>;
              }
              if (block.type === 'list') {
                const List = block.ordered ? 'ol' : 'ul';
                return (
                  <List key={index} className={`${block.ordered ? 'list-decimal' : 'list-disc'} my-6 space-y-2.5 pl-6 text-[16px] leading-8 text-institutional-grey/75 marker:font-bold marker:text-institutional-green`}>
                    {block.items.map((item) => <li key={item}>{renderInline(item)}</li>)}
                  </List>
                );
              }
              const isEmphasis = /^\*\*.+\*\*$/.test(block.text);
              return (
                <p key={index} className={isEmphasis
                  ? 'my-8 border-l-4 border-institutional-orange bg-[#f8f5ef] px-6 py-5 font-serif text-lg font-bold leading-8 text-institutional-grey'
                  : 'my-5 whitespace-pre-line font-serif text-[16px] leading-8 text-institutional-grey/75 sm:text-[17px]'}>
                  {renderInline(block.text)}
                </p>
              );
            })}

            <section aria-labelledby="sources-title" className="mt-16 border-t border-institutional-grey/10 pt-12">
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.25em] text-institutional-orange">Références vérifiées</p>
              <h2 id="sources-title" className="text-3xl font-bold text-institutional-grey">Sources officielles</h2>
              <ol className="mt-7 space-y-4">
                {sources.map((source, index) => (
                  <li key={source.url} className="flex gap-4 text-sm leading-relaxed text-institutional-grey/65">
                    <span className="font-mono text-institutional-green">{String(index + 1).padStart(2, '0')}</span>
                    <a href={source.url} target="_blank" rel="noreferrer" className="underline decoration-institutional-green/30 underline-offset-4 transition hover:text-institutional-green">
                      {source.name}
                    </a>
                  </li>
                ))}
              </ol>
            </section>
          </main>

          <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            <details open className="border border-institutional-grey/10 bg-white p-6 shadow-sm">
              <summary className="cursor-pointer text-xs font-bold uppercase tracking-[0.22em] text-institutional-green">Sommaire de l’étude</summary>
              <nav aria-label="Sommaire de l’article" className="mt-6 max-h-[60vh] overflow-y-auto pr-2">
                <ol className="space-y-3">
                  {headings.map((heading) => (
                    <li key={heading.id}>
                      <a href={`#${heading.id}`} className="block text-xs leading-relaxed text-institutional-grey/55 transition hover:translate-x-1 hover:text-institutional-green">
                        {heading.text}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </details>

            <div className="bg-institutional-green p-6 text-white">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/60">Partager cette étude</p>
              <button type="button" onClick={handleShare} className="mt-5 w-full border border-white/35 px-4 py-3 text-xs font-bold uppercase tracking-[0.18em] transition hover:bg-white hover:text-institutional-green">
                Partager l’article
              </button>
              <p aria-live="polite" className="mt-3 min-h-4 text-xs text-white/70">{shareFeedback}</p>
            </div>

            <div className="border-l-4 border-institutional-orange bg-institutional-grey p-6 text-white">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-institutional-lightGreen">Besoin d’un diagnostic ?</p>
              <p className="mt-4 text-sm leading-relaxed text-white/65">Évaluez la sécurité numérique de votre organisation avec MboMa &amp; Co.</p>
              <Link to="/audit-technologique" className="mt-5 inline-block text-xs font-bold uppercase tracking-[0.18em] text-institutional-orange hover:text-white">Découvrir l’audit →</Link>
            </div>
          </aside>
        </div>
      </div>
    </motion.article>
  );
};

export default MobileSurveillanceArticlePage;
