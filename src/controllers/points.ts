import { Point } from '../interfaces/point'
import { insertPointAndLinkItem, joinPointItems, joinPointsItems } from '../repository/point_item'
import { getPointRepository } from '../repository/point'

export const insertPoint = async (point: Point, items: number[]) => {
    point.image = point.image || 'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80'

    return await insertPointAndLinkItem(point, items)
}

export const getPoint = async (pointId: string) => {
    const point = await getPointRepository(pointId)

    const items = await joinPointItems(pointId)

    return { point, items }
}

export const getPoints = async (city?: string, uf?: string, items?: string) => {
    const itemsArray= items?.split(',')
        .map(item => Number(item.trim()))

    return joinPointsItems(city, uf, itemsArray)
}