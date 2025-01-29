import PeopleCard from './cards/PeopleCard'


const PeopleResultSection = ({peopleList}) => {
  return (
    <div className="my-4">
      <h1>Persone trovate: {peopleList.length} </h1>
      <div className="row">
        {peopleList.map((people, index) => (
          <PeopleCard key={index} people={people} />
        ))}
      </div>
      {/* <button type="button" class="btn btn-danger my-3">Mostra altro</button> */}
    </div>
  )
}

export default PeopleResultSection