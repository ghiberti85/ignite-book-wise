import { signOut, useSession } from "next-auth/react";
import { Aside, SignOutLink, StyledLink, UserLogged } from "./styles";


import { usePathname } from 'next/navigation'
import { Binoculars, ChartLineUp, SignIn, SignOut, User } from "@phosphor-icons/react";
import logo from '@/assets/logo.png'
import Image from 'next/image'
import { Avatar } from "../Avatar";

export function Sidebar() {
    const { data: session, status } = useSession()

    const pathname = usePathname()

    const navLinks = [
        {
            name: 'Início',
            href: '/',
            icon: <ChartLineUp size={24} />,
        },
        {
            name: 'Explorar',
            href: '/explorer',
            icon: <Binoculars size={24} />,
        },
    ]

    const isSignedIn = status === 'authenticated'
    
    return (
        <Aside>
            <Image src={logo} width={128} height={32} alt="BookWise Logo" />

            <ul>
                {navLinks.map(({ href, name, icon }) => (
                    <li key={name}>
                        <StyledLink href={href} active={pathname === href}>
                            {icon}
                            {name}
                        </StyledLink>
                    </li>
                ))}

                {isSignedIn && (
                    <li>
                        <StyledLink
                            href={`/profile/${session?.user.id}`}
                            active={pathname.includes('/profile')}
                        >
                            <User size={24} />
                            Perfil
                        </StyledLink>
                    </li>
                )}
            </ul>

            {isSignedIn ? (
                <UserLogged>
                    <Avatar
                        size="sm"
                        src={session?.user?.avatar_url ?? ''}
                        height={32}
                        width={32}
                        alt={String(session?.user?.name)}
                    />
                    <span>{session?.user?.name.split(' ').slice(0, 1).join('')}</span>
                    <SignOut size={24} onClick={() => signOut()} />
                </UserLogged>
            ) : (
                <SignOutLink href='/sign-in'>
                    <span>Fazer Login</span>
                    <SignIn size={24} />
                </SignOutLink>
            )}
        </Aside>
    )
}