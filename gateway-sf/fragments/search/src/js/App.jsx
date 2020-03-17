import React from "react";

export default class Search extends React.Component {

    state = {
        search: ""
    };

    render() {
        return <div className="search">
            <form>
                <div className="form-row">

                    <div className="col">
                        <input type="text" value={this.state.search} onChange={({target}) => {
                            this.setState({search: target.value})
                        }} className="form-control" placeholder="City"/>
                    </div>
                    <div className="col-auto">
                        <button type="submit" className="btn btn-primary mb-2" disabled={!this.state.search}>Submit</button>
                    </div>
                </div>
            </form>
        </div>
    }
}


