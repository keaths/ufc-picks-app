import { FightCard } from "./FightCard"

export interface EventDetails{
    eventId: number,
    eventName: string,
    fights: FightCard[]
}