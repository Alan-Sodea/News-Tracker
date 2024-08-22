// src/components/Card.js

interface CardProps {
    title: string;
    author: string
    publishedAt: string;
    content: string;
    urlToImg: string;
}

function Card({ title, author, publishedAt, content, urlToImg }: CardProps) {
    return (
        <div className="card">
            <img src={urlToImg} alt={title} />
            <div className="card-content">
                <h2>{title}</h2>
                <p><strong>Author:</strong> {author}</p>
                <p><strong>Published At:</strong> {new Date(publishedAt).toLocaleString()}</p>
                <p>{content}</p>
            </div>
        </div>
    );
}

export default Card;
