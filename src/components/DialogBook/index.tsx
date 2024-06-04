import { api } from "@/lib/axios"
import { useQuery } from "@tanstack/react-query"
import { useSession } from "next-auth/react"
import { ReactNode, useState } from "react"

interface Ratings {
    id: string
    rate: 4
    description: string
    created_at: string
    book_id: string
    user_id: string
    user: {
        id: string
        email: string
        name: string
        avatar_url: string
        created_at: string
    }
}

interface Categories {
    book_id: string
    categoryId: string
    category: {
        id: string
        name: string
    }
}

interface Book {
    id: string
    name: string
    author: string
    summary: string
    cover_url: string
    total_pages: number
    created_at: string
    avgRating: number
    categories: Categories[]
    ratings: Ratings[]
}

interface BookData {
    book: Book
}

interface DialogBookProps {
    bookId: string
    children: ReactNode
}

export function DialogBook({ bookId, children }: DialogBookProps) {
    const [open, setOpen] = useState(false)
    const[storedBookId, setStoredBookId] = useState<string | null>(null)
    const [isOpenAddNewRating, setIsOpenAddNewRating] = useState(false)
    const [isOpenUpdateRating, setIsOpenUpdateRating] = useState(false)
    
    const session = useSession()
    const isAuthenticated = session.status

    const { data } = useQuery(
        ['rating-book', bookId],
        async () => {
            const response = await api.get(`/books/${storedBookId ?? bookId}`)

            return (response.data as BookData) || []
        },
        {
            enabled: !!open,
        }
    )

    return()
}