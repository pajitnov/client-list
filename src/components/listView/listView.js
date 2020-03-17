import React, { Component } from 'react';
import _ from 'lodash';
import dataList from '../../data';
import Pagination from '../pagination/pagination';

class listView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataList,
            data: [],
            mode: 'detail',
            searchInput: '',
            pageNumber: 1,
            perPage: 3,
            sortIndex: 0,
            sorting: [
                {
                    columnEN: 'Sorting',
                    field: 'client.name',
                    direction: 'asc'
                }
            ],
            orderBy: ['moduleEN']
        }
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        const {
            dataList
        } = prevState;
        const sorting = prevState.sorting;
        const pageNumber = prevState.pageNumber;
        const searchInput = prevState.searchInput;

        let data = dataList.results.map(docItem => {
            return {
                ...docItem
            };
        });

        if  ( searchInput !==  '' ) {
            _.remove(data, item =>
                !item.client.name.toLowerCase().includes(searchInput.toLowerCase())
            )
        }
        data = _.orderBy(data, prevState.orderBy, prevState.sorting[prevState.sortIndex].direction);

        return {
            data: data,
            sorting };
    }

    searchInput = event => this.setState({ searchInput: event.target.value });

    sort(column,direction,index){
        this.state.sortIndex = index;
        const {sorting} = this.state;
        this.setState({ orderBy: column } );
        sorting[this.state.sortIndex].direction = direction;
        this.setState({direction: direction});
        return
    }

    perPage(perPage){
        this.setState( { perPage: perPage } )
    }

    render() {
        const {
            data,
            pageNumber,
        } = this.state;
        return (
            <div id="catalog" style={{ padding: '1rem' }}>
                <div className="filter">
                    <div style={{ display: 'flex' }}>
                        <div className="search-key-container">
                            <input className="search-key" placeholder="Enter Keywords?" onChange={this.searchInput}/>
                        </div>
                        <div className="btn search-btn">
                            <i className="fa fa-search" />
                        </div>
                    </div>
                </div>

                <div className="searchCatalog">
                    <div className="mainTable" style={{ height: '100%' }}>
                        <div className="main-table-container-header table-header-wrapper">
                            <table className="table">

                                <colgroup>
                                    <col style={{ width: '15%', minWidth: '60%' }} />
                                </colgroup>

                                <thead>
                                <tr>
                                    <th className="sort-column pointer" title="Topic" data-field="moduleEN" style={{ textAlign: 'left' }} >
                                        {
                                            this.state.sorting[0].direction == 'asc' ?
                                                <div onClick={() => this.sort(this.state.sorting[0].field,'desc',0)}>
                                                    {this.state.sorting[0].columnEN}<span className="fa fa-sort-desc" style={{}}></span></div>:
                                                <div onClick={() => this.sort(this.state.sorting[0].field,'asc',0)} >
                                                    {this.state.sorting[0].columnEN}<span className="fa fa-sort-asc" style={{}} ></span></div>
                                        }
                                    </th>
                                </tr>
                                </thead>
                            </table>
                        </div>
                        <div className="main-table-container-body" style={{ height: '100%' }}>
                            <table className="table table-striped table-bordered table-hover main-table ">
                                <colgroup>
                                    <col style={{ width: '15%', minWidth: '15%' }} />
                                    <col style={{ width: '150px', minWidth: '150px' }} />

                                </colgroup>
                                <tbody>

                                {data.slice((pageNumber - 1) * this.state.perPage, pageNumber * this.state.perPage).map((item, index) => (
                                    <tr key={index} >
                                        <td tabIndex="1" style={{ textAlign: 'left' }}>
                                            <div className="info-indicator  pointer" style={{ display: 'flex', alignItems: 'center', whiteSpace: 'pre-wrap' }}>
                                                {item.client.name}
                                            </div>
                                            <div>
                                                {item.client.id}
                                            </div>
                                            <div>
                                                {item.client.products.map( el => {
                                                    return <div class="statContainer"> <div class="status">{el.state}</div> <div className="handler">{ el.product_handle.replace("_", " ")}</div></div>
                                                    }
                                                )}
                                            </div>
                                        </td>
                                    </tr>)
                                )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className='nav-container'>
                        <Pagination
                            data={data}
                            pageNumber={pageNumber}
                            updatePageNumber={(value) => this.setState({ pageNumber: value })}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default listView;
