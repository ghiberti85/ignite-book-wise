import Link from 'next/link';
import Image from 'next/image'
import { Book, PopularBooksContainer } from './styles';
import { CaretRight } from '@phosphor-icons/react';

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
    return (
        <PopularBooksContainer>
            <h2>
                Livros Populares
                <Link href={'/explorer'}>
                    Ver todos <CaretRight size={16} />
                </Link>
            </h2>

            <div>
                <DialogBook>
                    <Book>
                        <Image 
                            src={''} 
                            alt={''}
                            height={94}
                            width={64}
                        />
                        <div>
                            <h3></h3>
                            <h4></h4>

                            <Rating />
                        </div>
                    </Book>
                </DialogBook>
            </div>
        </PopularBooksContainer>
    )
}