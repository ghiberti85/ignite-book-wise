import Image from "next/image";
import { Book, BookCardRating, LatestBookReviewContainer } from "./styles";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";

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
            <LastReadBook />
            <h2>Avaliações mais recentes</h2>

            <div>
                <DialogBook>
                    <BookdCard>
                        <BookCardRating>
                            <Link>
                                <Avatar />

                                <BookCardUser>
                                    <strong></strong>
                                    <span></span>
                                </BookCardUser>
                            </Link>

                            <Rating />
                        </BookCardRating>

                        <Book>
                            <Image />
                            <div>
                                <h3></h3>
                                <h4></h4>
                                <LimitedText />
                            </div>
                        </Book>
                    </BookdCard>
                </DialogBook>
            </div>
        </LatestBookReviewContainer>
    )
}