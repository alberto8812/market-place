import { titleFont } from "@/app/config/fonts";
import { FC } from "react";



interface Props{
    title:string;
    subtitle?:string;
    className?:string
}

export const Title:FC <Props> = ({title,subtitle,className}) => {
  return (
    <div className={`${className} mt-3`}>
        <h1 className={`${titleFont.className} antialiased text-4xl font-semibold my-1`}>{title}</h1>
        {
            subtitle && (

                <h3 className="text-xl mb-5">{subtitle}</h3>
            )
  
        }
    </div>
  )
}
