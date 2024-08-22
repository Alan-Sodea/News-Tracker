import { hookstate } from "@hookstate/core";
import axios from "axios";

export const globalState = hookstate({
    id: "",
    news: [{
        // title: "MyTitle",
        // author: "MyAuthor",
        // content: "MyContent",
        // imageurl: "../public/images/image-1.jpg",
        // date: "14/02/2008"
    }],
    isLoading: true,
    error: null,
})

export let searchNews = (search: string) => {

    const state = globalState;

    (async () => {
        try {
            globalState.isLoading.set(true);

            const response = await axios.get('https://newsapi.org/v2/everything', {
                params: {
                    q: search,
                    apiKey: 'fe97b47b7673407e9d623e7527eb4d75',
                },
            });
            console.log({ globalState })
            state.news.set(response.data.articles);
        } catch (error) {
            state.error.set(error);
        }
        finally {
            state.isLoading.set(false);
        }
    })()

}

// export let fakesearchNews = (search: string) => {
//     // const state = useHookstate(globalState)
//     // Call API to search news
//     console.log(search)

//     let result = [{
//         title: "MyTitle",
//         author: "MyAuthor",
//         content: "MyContent",
//         imageurl: "./images/image-1.jpg",
//         date: "14/02/2008"
//     },
//     {
//         title: "MyTitle",
//         author: "MyAuthor",
//         content: "MyContent",
//         imageurl: "../public/images/image-1.jpg",
//         date: "14/02/2008"
//     },
//     {
//         title: "MyTitle",
//         author: "MyAuthor",
//         content: "MyContent",
//         imageurl: "../public/images/image-1.jpg",
//         date: "14/02/2008"
//     }]

//     globalState.news.set(result)

//     setTimeout(() => {
//         globalState.isLoading.set(false);
//     }, 3000)
// }

