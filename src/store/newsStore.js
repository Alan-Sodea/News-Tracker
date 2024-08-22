// src/store/newsStore.js
import { hookstate } from '@hookstate/core';

export const newsState = hookstate({
    articles: [],
    loading: false,
    error: null,
});
