// src/App.js
import { useEffect } from 'react';
import { useHookstate } from '@hookstate/core';
import { newsState } from './store/newsStore';
import { fetchNews } from './store/newsApi';
import Card from './Components/Card';
import './App.css';

function App() {
    const news = useHookstate(newsState);
    console.log(news);

    // useEffect(() => {
    //     fetchNews();
    // }, []);

    if (news.loading.get()) {
        return <div>Loading...</div>;
    }

    // if (news.error.get()) {
    //     return <div>Error: {news.error.get()}</div>;
    // }

    return (
        <div className="App">
            <h1>Top Headlines</h1>
            <button onClick={fetchNews}>Fetch Latest News</button>
            <div className="articles">
                {news.articles.get().map((article: any, index: any) => (
                    <Card
                        key={index}
                        title={article.title}
                        author={article.author}
                        publishedAt={article.publishedAt}
                        content={article.content}
                        urlToImg={article.urlToImage}
                    />
                ))}
            </div>
        </div>
    );
}

export default App;
