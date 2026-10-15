// Article data for the site. Dates use YYYY-MM-DD, or YYYY-MM-DDTHH:mm (24-hour) to include a time; leave them null when unknown.
// { title, slug, excerpt, body[], category, section:'stories'|'ideas', publishedAt, updatedAt, author, featured, demo, coverImage: { src, alt } }

export const storyCategories = ['Short Stories','Essays & Opinion','People & Communities','Reflections & Personal Notes']
export const ideaCategories = ['Business & Entrepreneurship','Marketing & Communication','Logistics, Customs & Cross-Border Trade','Leadership & Society','Learning & Personal Development']


// Stories and Publications Page
export const articles = [
  { title:'Demonstration Article: How a Story Page Reads', slug:'demonstration-article', section:'stories', category:'Reflections & Personal Notes',
    excerpt:'Placeholder content that shows the article layout. It is not a published work by Andreya Mouratek.',
    coverImage: {
      src: '/images/writing/W-3.jpeg',
      alt: 'Open book on a wooden desk with natural lighting'
    },
    body:['This is demonstration content used only to show the reading layout: comfortable line length, generous spacing, and clear typography.','Replace this entry in src/data/articles.js with real writing. Each paragraph is one string in the body array.','Once real articles are added, remove the demo flag and the demonstration labels disappear.'],
    date:'2026-10-15', publishedAt:'2026-10-15T03:58', updatedAt:'2026-10-15T15:58', author:'Deng Andrea', featured:true, demo:true },

  { title:'Demonstration Article: A Second Story Entry', slug:'demonstration-article-2', section:'stories', category:'Short Stories',
    excerpt:'Placeholder content showing how an additional story appears in the grid. It is not a published work by Andreya Mouratek.',
    coverImage: {
      src: '/images/writing/W-3.jpeg',
      alt: 'Open book on a wooden desk with natural lighting'
    },
    body:['This is a second demonstration entry used only to show how multiple stories appear on the listing page.','Replace this entry in src/data/articles.js with real writing. Each paragraph is one string in the body array.'],
    date:'2026-10-15', publishedAt:'2026-10-15T03:58', updatedAt:'2026-10-15T15:58', author:'Deng Andrea', featured:false, demo:true },

  { title:'Demonstration Article: A Third Story Entry', slug:'demonstration-article-3', section:'stories', category:'Short Stories',
    excerpt:'Placeholder content showing how an additional story appears in the grid. It is not a published work by Andreya Mouratek.',
    coverImage: {
      src: '/images/writing/W-3.jpeg',
      alt: 'Open book on a wooden desk with natural lighting'
    },
    body:['This is a third demonstration entry used only to show how multiple stories appear on the listing page.','Replace this entry in src/data/articles.js with real writing. Each paragraph is one string in the body array.'],
    date:'2026-10-15', publishedAt:'2026-10-15T03:58', updatedAt:'2026-10-15T15:58', author:'Deng Andrea', featured:false, demo:true }
]
export const readingTime = (a) => Math.max(1, Math.ceil(a.body.join(' ').split(/\s+/).length / 200))