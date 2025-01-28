import TVCard from './cards/TVCard'


const TVResultSection = ({tvList}) => {

  return (
    <div className="my-4">
      <h1>TV Results</h1>
      <div className="row">
        {tvList.map(tv => (
          <TVCard key={tv.id} tv={tv} />
        ))}
      </div>
    </div>
  )
}

export default TVResultSection