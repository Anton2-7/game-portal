import React from "react";

class Search extends React.Component {
    state = {
        search: ''
    }
    render (props) {
        const {search} = this.state
        return (
            <>
               <div className="row r-search">
                 <div className="input-field col s5">
                     <input 
                     className="validate"
                     placeholder="Поиск" 
                     type="Поиск"
                     value={search} 
                     onChange={(e)=> this.setState({search: e.target.value})}
                     />
                </div>
                </div>
                </>
        )
    }
}

export {Search};