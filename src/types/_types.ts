export type TodoTypes = {
   title?: string
   id: string
   completed?: boolean
   defaultPosition: Position
   color: string
}

type Position = {
   x: number
   y: number
}
