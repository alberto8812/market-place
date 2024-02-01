'use client'
import Image from 'next/image'

interface Props {
    src?:string;
    alt:string;
    className:React.StyleHTMLAttributes<HTMLImageElement>['className'];
    style?:React.StyleHTMLAttributes<HTMLImageElement>['style'];
    width:number,
    height:number,
    imagesfind?:string[]
    setImageMouseHover?: React.Dispatch<React.SetStateAction<string>>;
  }
  


export const ProductImage = ({
    src,
    alt,
    className,
    width,
    height,
    style,
    imagesfind=[],
    setImageMouseHover
}:Props) => {

    const localSrc=(src) 
    ? src.startsWith('http')
        ?src
        :`/products/${src}`
    :'/imgs/placeholder.jpg'

  return (
    <Image 
    src={localSrc} 
    width={width} 
    height={height} 
    alt={alt}
    className={className}
    style={style}
    onMouseLeave={() => setImageMouseHover && setImageMouseHover(imagesfind[0])}
    onMouseEnter={() => setImageMouseHover && setImageMouseHover(imagesfind[1])}
    />
  )
}
