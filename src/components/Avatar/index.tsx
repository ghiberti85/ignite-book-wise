import Image, { ImageProps } from "next/image";
import { AvatarContainer } from "./styles";

interface AvatarProps extends ImageProps {
    size: 'sm' | 'md' | 'lg'
}

export function Avatar({
    size,
    src,
    width,
    height,
    alt,
    ...props
}: AvatarProps) {
    return (
        <AvatarContainer size={size}>
            <Image height={height} width={width} alt={alt} src={src} {...props} />
        </AvatarContainer>
    )
}