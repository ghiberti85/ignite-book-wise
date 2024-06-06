import Image from "next/image";
import { Book, BookCard, BookCardRating, BookCardUser, LatestBookReviewContainer } from "./styles";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { Avatar } from "../Avatar";
import Link from "next/link";
import { formatDate } from "date-fns";
import { DialogBook } from "../DialogBook";
import { Rating } from "../Rating";
import { LastReadBook } from "../LastReadBook";
import { LimitedText } from "../LimitedText";

interface User {
    id: string
    name: string
    avatar_url: string
}

interface Book {
    id: string
    name: string
    author: string
    summary: string
    cover_url: string
    total_pages: number
}

interface RatingData {
    ratings: {
        id: string
        rate: number
        description: string
        created_at: string
        book: Book
        user: User
    }[]
    lastRead: {
        rate: 4
        create_at: string
        book: {
            name: string
            author: string
            cover_url: string
            summary: string
        }
    }
}

export function LatestBookReviews() {
    const session = useSession()
    
    const { data } = useQuery(['latest-ratings'], async() => {
        const response = await api.get('/ratings')

        return (response.data as RatingData) || []
    })

    return (
        <LatestBookReviewContainer>
            { session.status === 'authenticated' && data?.lastRead && (
                <LastReadBook lastRead={data?.lastRead} />
            )}
            <h2>Avaliações mais recentes</h2>
`                                                                   Q§Z`
            <div>
                {data?.ratings.map((rating) => (
                    <DialogBook bookId={rating.book.id} key={rating.id}>
                        <BookCard>
                            <BookCardRating>
                                <Link href={`/profile/${rating.user.id}`}>
                                    <Avatar 
                                        size="md" 
                                        src={rating.user.avatar_url}
                                        width={40}
                                        height={40}
                                        alt={rating.user.name} 
                                    />
    
                                    <BookCardUser>
                                        <strong>{rating.user.name}</strong>
                                        <span>{formatDate(new Date(rating.created_at))}</span>
                                    </BookCardUser>
                                </Link>
    
                                <Rating rate={rating.rate} disabled={true} />
                            </BookCardRating>
    
                            <Book>
                                <Image 
                                    src={rating.book.cover_url} 
                                    alt={rating.book.name}
                                    width={108}
                                    height={152}
                                />
                                <div>
                                    <h3>{rating.book.name}</h3>
                                    <h4>{rating.book.author}</h4>
                                    <LimitedText text={rating.description} />
                                </div>
                            </Book>
                        </BookCard>
                    </DialogBook>
                ))}
            </div>
        </LatestBookReviewContainer>
    )
}