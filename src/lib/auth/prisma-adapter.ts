export function PrismaAdapter(
    req: NextApiRequest | NextPageContext['req'],
    res: NextApiResponse | NextPageContext['res']
): Adapter {
    return {
        async createUser(user) {
            const createdUser = await prisma.user.create({
                data: {
                    name: user.name,
                    avatar_url: user.avatar_url,
                    email: user.email,
                },
            })

            return {
                ...createdUser,
                avatar_url: createdUser.avatar_url!,
                emailVerified: null,
            }
        },

        async getUser(id) {
            const user = await prisma.user.findUnique({
                where: {
                    id, 
                },
            })

            if(!user) return null
            
            return {
                ...user,
                avatar_url: user.avatar_url!,
                emailVerified: null,
            }
        },

        
    }
}