// async function fetchAPI(query:, { variables } = {}) {
//     const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/graphql`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         query,
//         variables,
//       }),
//     })
  
//     const json = await res.json()
//     if (json.errors) {
//       console.error(json.errors)
//       throw new Error('Failed to fetch API')
//     }
  
//     return json.data
//   }


async function fetchFromStrapi( urlSlug: string ){
    // TODO make query string an argument input
    // const res = await fetch(`http://localhost:1337/api/${urlSlug}`, {
    const res = await fetch(`${process.env.STRAPI_API_URL}/api/${urlSlug}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `bearer ${process.env.STRAPI_READ_TOKEN}`
        }
    })

    const json = await res.json()
    if (json.errors || res.status !== 200) {
        console.error({'json.errors': json.errors, res, body: json.data})
        throw new Error('Failed to fetch from Strapi API with response')
    }

    // console.log('Done fetchFromStrapi'+urlSlug, json.data)

    return json.data
}

export async function fetchHelpArticles(): Promise<StrapiResponseBody<Article>[]> {
    return await fetchFromStrapi(`help-articles`)
}

export async function fetchHelpArticleById(id: number): Promise<StrapiResponseBody<Article>> {
    return await fetchFromStrapi(`help-articles/${id}?populate=*`)
}

export async function fetchHelpArticleBySlug(slug: string): Promise<StrapiResponseBody<Article>> {
    return (await fetchFromStrapi(`help-articles?filters[Slug][$eq]=${slug}&populate=*`))[0]
}

export async function fetchHelpArticlesByTag(tag: string): Promise<StrapiResponseBody<Article>[]> {
    const tagsWithArticles = await fetchFromStrapi(`help-tags?filters[Name][$eq]=${tag}&populate=*`)
    return tagsWithArticles[0].attributes.help_articles.data;
}



export interface Media extends StrapiResponseTimestamps  {
    name: string;
    alternativeText: string;
    caption: string;
    hash: string;
    ext: string;
    mime: string,
    size: number,
    url: string,
}

export interface HelpTags extends StrapiResponseTimestamps {
    Name: string;
}

export interface Article extends StrapiResponseTimestamps {
    Title: string;
    Body: string
    Slug: string,
    Media: {
        data: StrapiResponseBody<Media>
    },
    help_tags?: {
        data: StrapiResponseBody<HelpTags>[]
    }
}

export interface StrapiResponseBody<T> {
    id: number;
    attributes: T   
}

interface StrapiResponseTimestamps {
    createdAt: string;
    updatedAt: string;
    publishedAt?: string;
}
