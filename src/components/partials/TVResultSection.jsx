import TVCard from './cards/TVCard'


const TVResultSection = ({tvList}) => {

  return (
    <div className="my-4">
      <h1>Serie TV trovate: {tvList.length}</h1>
      <div className="row">
        {tvList.map(tv => (
          <TVCard key={tv.id} tv={tv} />
        ))}
      </div>
      {/* <button type="button" class="btn btn-danger my-3">Mostra altro</button> */}
    </div>
  )
}

export default TVResultSection