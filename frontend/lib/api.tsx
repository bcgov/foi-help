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
    const res = await fetch(`http://localhost:1337/api/${urlSlug}/`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `bearer ${process.env.STRAPI_READ_TOKEN}`
        }
    })

    const json = await res.json()
    if (json.errors || res.status !== 200) {
        console.error({'json.errors': json.errors, res})
        throw new Error('Failed to fetch from Strapi API with response')
    }

    console.log('Done fetchFromStrapi', json.data)

    return json.data
}

export async function fetchHelpArticles(): Promise<ArticleResponse> {
    return await fetchFromStrapi('help-articles')
}


export interface ArticleResponse {
    id: number;
    attributes: Article
}

export interface Article extends StrapiJSONResponse {
    Title: string;
    Body: string
}

interface StrapiJSONResponse {
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
}