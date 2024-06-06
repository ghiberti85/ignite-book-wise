import { CaretRight } from "@phosphor-icons/react"
import { useSession } from "next-auth/react"
import { BookCard, BookDescription, LastReadBookContainer } from "./styles"
import Image from 'next/image'
import Link from "next/link"
import { formatDate } from "@/utils/format-date"
import { Rating } from "../Rating"
import { LimitedText } from "../LimitedText"

interface LastReadBookProps {
    lastRead?: {
        rate: 4
        created_at: string
        book: {
            name: string
            author: string
            cover_url: string
            summary: string
        }
    }
}

export function LastReadBook({ lastRead }: LastReadBookProps) {
    const session = useSession()

    return (
        <LastReadBookContainer>
            <h2>
                Sua última leitura
                <Link href={`/profile/${session.data?.user.id}`}>
                    Ver todas <CaretRight size={16} />
                </Link>
            </h2>

            <BookCard>
                <Image 
                    alt={lastRead?.book.name ?? ''}
                    src={lastRead?.book.cover_url ?? ''}
                    width={108}
                    height={152}
                />

                <BookDescription>
                    <div>
                        <span>
                            {lastRead?.created_at &&
                                formatDate(new Date(lastRead?.created_at))}
                        </span>
                        <Rating disabled rate={lastRead?.rate} />
                    </div>

                    <h3>{lastRead?.book.name}</h3>
                    <h4>{lastRead?.book.author}</h4>
                    <LimitedText text={lastRead?.book.summary} />
                </BookDescription>
            </BookCard>
        </LastReadBookContainer>
    )
}