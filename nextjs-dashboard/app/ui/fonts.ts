import {Montserrat, Lusitana} from "next/font/google"

export const montserrat = Montserrat({ subsets: ["latin"]}) // Mejor importarlos asi

export const lusitana = Lusitana({
    weight: ["400", "700"],
    subsets: ["latin"]
})