// src/api/newsApi.js
import axios from 'axios';
import { newsState } from './newsStore';

const API_KEY = 'fe97b47b7673407e9d623e7527eb4d75';
const URL = `https://newsapi.org/v2/everything`;

export const fetchNews = async () => {
    try {
        newsState.loading.set(true);
        const response = await axios.get(URL, {
            params: {
                q: "food",
                apiKey: API_KEY,
            }
        });
        newsState.articles.set(response.data.articles);
    } catch (error) {
        newsState.error.set(error.message);
    } finally {
        newsState.loading.set(false);
    }
};
