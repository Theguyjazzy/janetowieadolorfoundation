import { ConvexHttpClient } from 'convex/browser';
import type { StoryItem } from '../data/foundationData';

const CONVEX_URL = 'https://dazzling-cheetah-893.eu-west-1.convex.cloud';

const client = new ConvexHttpClient(CONVEX_URL);

export interface CmsPost {
  _id?: string;
  slug: string;
  title: string;
  category?: string;
  excerpt: string;
  imageUrl?: string;
  body?: string;
  galleryUrls?: string[];
  authorName?: string;
  authorMeta?: string;
  publishedAt?: number;
}

export async function fetchPublishedPosts(): Promise<CmsPost[]> {
  try {
    const result = await client.query('posts:list' as never, {} as never);
    if (Array.isArray(result)) {
      return result as CmsPost[];
    }
    return [];
  } catch {
    return [];
  }
}

export async function fetchPostBySlug(slug: string): Promise<CmsPost | null> {
  try {
    const result = await client.query('posts:getBySlug' as never, { slug } as never);
    return (result as CmsPost) ?? null;
  } catch {
    return null;
  }
}

export async function verifyAdminPassword(password: string): Promise<void> {
  await client.mutation('posts:verifyPassword' as never, { password } as never);
}

export async function generateUploadUrl(password: string): Promise<string> {
  const url = await client.mutation('posts:generateUploadUrl' as never, { password } as never);
  return url as string;
}

export async function createCmsPost(payload: {
  password: string;
  title: string;
  excerpt: string;
  content: string;
  imageId?: string;
  category?: string;
  galleryImageIds?: string[];
}) {
  return client.mutation('posts:create' as never, payload as never);
}

export async function removeCmsPost(password: string, postId: string) {
  return client.mutation('posts:remove' as never, { password, postId } as never);
}

export function mapConvexPostToStory(post: CmsPost, fallbackImageUrl: string): StoryItem {
  return {
    slug: post.slug,
    title: post.title,
    category: post.category || 'Field Dispatch',
    excerpt: post.excerpt,
    imageUrl: post.imageUrl || fallbackImageUrl,
    beneficiaryName: post.authorName || 'Janet Owieadolor Foundation',
    beneficiaryMeta: post.authorMeta || 'JOF Community Outreach',
    pullquote: post.excerpt,
    paragraphs: post.body ? post.body.split(/\n\n+/).filter(Boolean) : [post.excerpt],
    stats: [],
    tags: [],
    gallery: post.galleryUrls,
  };
}

export function mergeStoriesWithBaseline(
  remotePosts: CmsPost[],
  baselineStories: StoryItem[],
): StoryItem[] {
  if (!remotePosts.length) return baselineStories;
  const mappedRemote = remotePosts.map((post, idx) =>
    mapConvexPostToStory(post, baselineStories[idx % baselineStories.length]?.imageUrl || '/assets/logo/jof-icon-512.png'),
  );
  const remoteSlugs = new Set(mappedRemote.map((s) => s.slug));
  return [...mappedRemote, ...baselineStories.filter((s) => !remoteSlugs.has(s.slug))];
}

export async function submitContact(payload: {
  name: string;
  email: string;
  inquiryType: string;
  message: string;
}) {
  return client.mutation('contact:submit' as never, payload as never);
}

export async function submitNewsletter(email: string) {
  return client.mutation('newsletter:subscribe' as never, { email } as never);
}

export async function submitVolunteer(payload: {
  name: string;
  email: string;
  areaOfInterest: string;
}) {
  return client.mutation('volunteers:submit' as never, payload as never);
}

export async function submitPartner(payload: {
  organization: string;
  email: string;
  message: string;
}) {
  return client.mutation('partners:submit' as never, payload as never);
}
