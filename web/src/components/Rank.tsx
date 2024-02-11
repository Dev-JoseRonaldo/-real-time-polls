interface Pros{
  items: never[]
}
export const Rank = ({ items }: Pros) => {
  return (
    <div>{items}</div>
  )
}

