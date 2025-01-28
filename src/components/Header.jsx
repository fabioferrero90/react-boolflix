import { useEffect, useState } from 'react';
import { useDataContext } from '../context/DataContext';

const Header = () => {

  const defaultFormData = {
    category: 'all',
    search: 'blair'
  }

  

  const { fetchData, fetchGenres, genres } = useDataContext();
  const [formData, setFormData] = useState(defaultFormData);
  const [filters, setFilters] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData(e.target[0].value)
  }

  return (
    <>
    {filters >= 1 ? (
      <nav className="navbar bg-body-tertiary" data-bs-theme="dark">
        <div className="d-flex justify-content-between container">
          <a className="navbar-brand w-25">
            <img className="ml-5 h-20"src="/public/BOOLFLIX.png" alt="logo" />
          </a>
          <form className="d-flex w-50" role="search" onSubmit={handleSubmit}>
            <select className="form-select mx-2" name="category" id="category" onChange={handleInputChange}
            >
              <option value="all">Tutte le categorie</option>
              {filters.map(genre => (
                <option key={genre.id} value={genre.id}>{genre.name}</option>
              ))}
            </select>
            <input className="form-control w-100 me-2" type="search" placeholder="Cerca per film, serie o attore preferito" aria-label="Search" onChange={handleInputChange} />
            <button className="btn btn-outline-light" type="submit">Cerca</button>
          </form>
        </div>
      </nav>
    ) : (
      <nav className="navbar bg-body-tertiary" data-bs-theme="dark">
      <div className="d-flex justify-content-between container">
        <a className="navbar-brand w-25">
          <img className="ml-5 h-20"src="/BOOLFLIX.png" alt="logo" />
        </a>
        <form className="d-flex w-50" role="search" onSubmit={handleSubmit}>
          <input className="form-control w-100 me-2" type="search" placeholder="Cerca per film, serie o attore preferito" aria-label="Search" onChange={handleInputChange} />
          <button className="btn btn-danger px-5" type="submit"><strong>CERCA</strong></button>
        </form>
      </div>
    </nav>
    )}
    </>
  );
}

export default Header