// Article model: { title, slug, excerpt, body[], category, section:'stories'|'ideas', date, author, featured, demo }
// Add real articles here. Entries with demo:true are labelled as demonstration content on the site.
export const storyCategories = ['Short Stories','Essays & Opinion','People & Communities','Reflections & Personal Notes']
export const ideaCategories = ['Business & Entrepreneurship','Marketing & Communication','Logistics, Customs & Cross-Border Trade','Leadership & Society','Learning & Personal Development']
export const articles = [
  { title:'Demonstration Article: How a Story Page Reads', slug:'demonstration-article', section:'stories', category:'Reflections & Personal Notes',
    excerpt:'Placeholder content that shows the article layout. It is not a published work by Andreya Mouratek.',
    body:['This is demonstration content used only to show the reading layout: comfortable line length, generous spacing, and clear typography.','Replace this entry in src/data/articles.js with real writing. Each paragraph is one string in the body array.','Once real articles are added, remove the demo flag and the demonstration labels disappear.'],
    date:null, author:'Demonstration content', featured:true, demo:true }
]
export const readingTime = (a) => Math.max(1, Math.ceil(a.body.join(' ').split(/\s+/).length / 200))
