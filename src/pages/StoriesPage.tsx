import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { BASELINE_STORIES, StoryItem } from '../data/foundationData';
import { fetchPublishedPosts, mergeStoriesWithBaseline } from '../lib/convexClient';
import { useSubpageChoreography } from '../lib/motion';

interface StoriesPageProps {
  onNavigate: (path: string, hash?: string) => void;
}

export const StoriesPage: React.FC<StoriesPageProps> = ({ onNavigate }) => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  useSubpageChoreography(rootRef);

  const [stories, setStories] = useState<StoryItem[]>(BASELINE_STORIES);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    let active = true;
    fetchPublishedPosts().then((posts) => {
      if (!active || !posts.length) return;
      setStories(mergeStoriesWithBaseline(posts, BASELINE_STORIES));
    });
    return () => {
      active = false;
    };
  }, []);

  const categories = useMemo(() => {
    const unique = Array.from(new Set(stories.map((s) => s.category)));
    return ['All', ...unique];
  }, [stories]);

  const visibleStories = useMemo(() => {
    if (selectedCategory === 'All') return stories;
    return stories.filter((s) => s.category === selectedCategory);
  }, [selectedCategory, stories]);

  return (
    <div ref={rootRef}>
      <section className="subpage-hero">
        <div className="frame">
          <div className="subpage-hero-grid">
            <h1 className="display-headline subpage-hero-title" data-subpage-hero>
              Stories of transformation from the field.
            </h1>
            <p className="subpage-hero-desc" data-subpage-hero>
              Real widows, real setbacks, and durable second chances across Enugu, Ogun, Anambra, Lagos, and Edo State.
            </p>
          </div>
        </div>
      </section>

      <section style={{ paddingBlock: 'var(--section-gap)' }}>
        <div className="frame">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginBottom: '2.75rem' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`story-filter-btn ${selectedCategory === cat ? 'is-active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="story-ledger-col" style={{ gridColumn: '1 / 13' }} data-reveal-group>
            {visibleStories.map((story) => (
              <article key={story.slug} className="story-ledger-row" data-reveal-item>
                <a
                  href={`/stories/${encodeURIComponent(story.slug)}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate(`/stories/${encodeURIComponent(story.slug)}`);
                  }}
                >
                  <div className="story-ledger-copy">
                    <h2 className="story-ledger-title">{story.title}</h2>
                    <p className="story-ledger-excerpt">{story.excerpt}</p>
                    <span className="story-meta-action">
                      {story.category} · Read Full Story <ArrowRight size={15} aria-hidden="true" />
                    </span>
                  </div>
                  <div className="story-ledger-thumb">
                    <img src={story.imageUrl} alt={story.title} loading="lazy" />
                  </div>
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section style={{ backgroundColor: 'var(--surface-sand)', paddingBlock: 'clamp(4rem, 7vw, 6rem)' }}>
        <div className="frame" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1.5rem' }}>
          <div>
            <h2 className="section-headline">Every story began with a single gift.</h2>
            <p className="lead-copy" style={{ marginTop: '0.5rem' }}>
              Your contribution funds the next micro-grant, medical screening, or tuition stipend.
            </p>
          </div>
          <a
            href="/donate"
            className="btn-coral"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('/donate');
            }}
          >
            Donate Now <ArrowRight size={16} className="btn-arrow" aria-hidden="true" />
          </a>
        </div>
      </section>
    </div>
  );
};
