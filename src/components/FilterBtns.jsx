function FilterBtns() {
    return (
         <form className="filter" action="#">
    <p>
      <label>
        <input name="type" type="radio" datatype="All"/>
        <span>Все</span>
      </label>
    </p>
    <p>
      <label>
        <input name="type" type="radio" datatype="creactors"/>
        <span>Создатели</span>
      </label>
    </p>
    <p>
      <label>
        <input name="type" type="radio"  />
        <span>Green</span>
      </label>
    </p>

      </form>
    )
}

export default FilterBtns