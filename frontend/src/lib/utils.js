// import { clsx } from "clsx";
// import { twMerge } from "tailwind-merge"
// import {formatDistanceToNow, parseISO} from 'date-fns'
// export function cn(...inputs) {
//   return twMerge(clsx(inputs));
// }
// // export const formateDate  =(date) =>{
// //   return formatDistanceToNow(parseISO(date),{addSuffix:true})
// // }


// // export const  formatDateInDDMMYYY = (date) =>{
// //   return new Date(date).toLocaleDateString('en-GB')
// // }

// export const formateDate = (date) => {
//   if (!date) return "Invalid Date"; // Handle undefined or null cases safely

//   try {
//     return formatDistanceToNow(parseISO(date), { addSuffix: true });
//   } catch (error) {
//     console.error("Invalid date format:", date);
//     return "Invalid Date";
//   }
// };




import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"
import {formatDistanceToNow, parseISO} from 'date-fns'

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const formateDate  =(date) =>{
  return formatDistanceToNow(parseISO(date),{addSuffix:true})
}


export const  formatDateInDDMMYYY = (date) =>{
  return new Date(date).toLocaleDateString('en-GB')
}