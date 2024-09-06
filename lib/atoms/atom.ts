import { atom } from "recoil"
const today = new Date().toISOString().split('T')[0]
export const fromState = atom<string>({
    key:'fromState',
    default:"Banglore"
})
export const toState = atom<string>({
    key:"toState",
    default:"Shimoga"
})
export const datestate = atom<string>({
    key:"dateState",
    default:today
})