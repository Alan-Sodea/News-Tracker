import { useEffect, useState } from 'react'
import './App.css'
import { useHookstate } from '@hookstate/core'
import { globalState, searchNews } from './hookstate/states'


interface CardProp {
  title: string,
  content: string,
  imageurl: string,
  date: string,
  author: string,
  url: string,
}

function Card({ title, content, imageurl, date, author, url }: CardProp) {
  return <>

    <div className="h-fit max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <a href={url} target="_blank">
        <img className="rounded-t-lg" src={imageurl} />
      </a>
      <div className="p-5 flex flex-col justify-start">
        <a href={url} target="_blank">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 h-20 overflow-hidden pt-1">{content}</p>

        <div className='flex flex-row-reverse justify-between items-center'>
          <a href={url} target="_blank" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Read more
            <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
            </svg>
          </a>
          <div className='max-w-56 overflow-hidden'>
            <p className='text-gray-400 font-bold'>{author}</p>
            <div className='flex flex-row text-gray-400 font-normal'>{date}</div>
          </div>
        </div>

      </div>
    </div>
  </>
}

function App() {

  const news = useHookstate(globalState);

  useEffect(() => {
    searchNews("technology");
  }, []);

  const [search, setSearch] = useState("");

  const handleSearch = (evt: any) => {
    evt.preventDefault();
    setSearch(evt.target.value);
  }

  return (
    <>
      <a className='fixed bottom-0 hover:cursor-pointer p-2 rounded-full aspect-square w-10 m-4 right-0 bg-blue-700 hover:bg-blue-800 rotate-90' href="#">
        <div className='bg-contain bg-no-repeat bg-center w-full h-full -rotate-90' style={{ backgroundImage: 'url("./src/assets/arrow.svg")' }}></div>
      </a>

      <div className="main w-full items-center flex flex-col gap-8 p-5">
        <div className='w-full'>
          <div className="w-full flex flex-col gap-3">
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
              </div>
              <input type="search" id="default-search" value={search} onChange={handleSearch} className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Something..." />

              <button className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => searchNews(search)}>Search</button>
            </div>
          </div >
        </div>

        <div className='w-full p-3 flex flex-wrap gap-5 justify-center'>

          {

            news.news.get().map((article: any, index: number) => <>
              {(article.urlToImage != null) && (article.title != null) && (article.content != null) && < Card
                key={index}
                title={article.title}
                author={article.author}
                date={article.publishedAt.split("T")[0]}
                content={article.content}
                imageurl={article.urlToImage}
                url={article.url}
              />}
            </>


            )
          }

        </div>

      </div >
    </>
  )
}

export default App
