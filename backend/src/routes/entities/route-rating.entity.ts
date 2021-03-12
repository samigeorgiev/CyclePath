import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity()
export class RouteRating {
    @PrimaryColumn()
    nodeOneId: number

    @PrimaryColumn()
    nodeTwoId: number

    @PrimaryColumn()
    userId: number

    @Column()
    rating: number
}
