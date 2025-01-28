import PeopleCard from './cards/PeopleCard'


const PeopleResultSection = ({peopleList}) => {
  return (
    <div className="my-4">
      <h1>People Results: </h1>
      <div className="row">
        {peopleList.map((people, index) => (
          <PeopleCard key={index} people={people} />
        ))}
      </div>
    </div>
  )
}

export default PeopleResultSection