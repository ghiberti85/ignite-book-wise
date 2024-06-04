import React from 'react';
import Link from 'next/link';
import Image from 'next/image'
import { CaretRight } from '@phosphor-icons/react';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import { Book, PopularBooksContainer } from './styles';

interface PopularBooksData {
    books: {
        id: string
        cover_url: string
        name: string
        author: string
        avg_rating: number
        total_page: number
    }[]
}

export function PopularBooks() {
    const { data } = useQuery(['popular-books'], async () => {
        const response = await api.get('/books/popular')

        return (response.data as PopularBooksData) ?? []
    })
    return (
        <PopularBooksContainer>
            <h2>
                Livros Populares
                <Link href={'/explorer'}>
                    Ver todos <CaretRight size={16} />
                </Link>
            </h2>

            <div>
                {data?.books.map((book) => (
                    <DialogBook>
                        <Book>
                            <Image 
                                src={book.cover_url} 
                                alt={book.name}
                                height={94}
                                width={64}
                            />
                            <div>
                                <h3>{book.name}</h3>
                                <h4>{book.author}</h4>
    
                                <Rating rate={book.avg_rating} disabled={true}/>
                            </div>
                        </Book>
                    </DialogBook>
                ))}
            </div>
        </PopularBooksContainer>
    )
}