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
    const res = await fetch(`http://localhost:1337/api/${urlSlug}`, {
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

    // console.log('Done fetchFromStrapi'+urlSlug, json.data)

    return json.data
}

export async function fetchHelpArticles(): Promise<StrapiResponseBody<Article>[]> {
    return await fetchFromStrapi('help-articles/')
}

export async function fetchHelpArticleById(id: number): Promise<StrapiResponseBody<Article>> {
    return await fetchFromStrapi(`help-articles/${id}?populate=*`)
}



// export interface ArticleResponse {
//     id: number;
//     attributes: Article
// }

// export interface ArticleResponse extends StrapiResponseBody {}

export interface Media extends StrapiResponseTimestamps  {
    // data: {
    //     id: number;
    //     attributes: {
    //         name: string;
    //         alternativeText: string;
    //         caption: string;
    //         hash: string;
    //         ext: string;
    //         mime: string,
    //         size: number,
    //         url: string,
    //     }
    // }
    name: string;
    alternativeText: string;
    caption: string;
    hash: string;
    ext: string;
    mime: string,
    size: number,
    url: string,
    // name: string;
    // alternativeText: string;
    // caption: string;
    // // width: number || null;
    // // height: number || null;
    // // formats: null,
    // hash: string;
    // ext: string;
    // mime: string,
    // size: number,
    // url: string,
    // previewUrl: null,
    // provider: local,
    // provider_metadata: null,
    // createdAt: 2022-04-28T23:06:39.547Z,
    // updatedAt: 2022-04-28T23:06:39.547Z
}


export interface Article extends StrapiResponseTimestamps {
    Title: string;
    Body: string
    Slug: string,
    // Media: Media
    Media: {
        data: StrapiResponseBody<Media>
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