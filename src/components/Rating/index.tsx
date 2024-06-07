
interface FormInputValues {
    rate: number
    description: string
}

interface RatingProps {
    rate?: number
    disabled?: boolean
    handleRating?: (rate: number) => void
    register?: UseFormRegister<FormInputValues>
    size?: number
}

export function Rating({ register, disabled, rate=0, handleRating, size= 16 }: RatingProps) {
    return()
}