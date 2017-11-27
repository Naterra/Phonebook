import React, { Component } from 'react';

//Redux
import { connect } from 'react-redux';
import {  set_filter_page } from '../actions';

import _ from 'lodash';



class Paging extends Component{
    constructor(props) {
        super(props);

        this.state = {
            pages: [],
            total_pages:0
        };
        this.goToFirst  = this.goToFirst.bind(this);
        this.goToLast   = this.goToLast.bind(this);
    }

    componentWillReceiveProps(nextProps){
        console.log( nextProps, 'PAGING: componentWillReceiveProps');
        this.getPager(nextProps);
    }

    goToFirst(e){
        this.props.set_filter_page(1);
    }

    goToLast(e){
        this.props.set_filter_page(this.state.total_pages);
    }


    getPager(param){
        console.log(param, 'PAGING/getPager PARAM');
        let currentPage = parseInt(param.currentPage);
        let visiblePages = parseInt(param.visiblePages) || 10;

        // calculate total pages
        let totalPages = Math.ceil(param.total  / param.records_perPage);
        this.setState({total_pages:totalPages });

        let page_offset = parseInt(Math.ceil(visiblePages/2));


        let startPage, endPage;

        //if on begining
        if(currentPage+page_offset<=visiblePages){
            startPage = 1;
            endPage   = visiblePages>totalPages? totalPages: visiblePages ;
        }
        //if close to end
        else if(currentPage+page_offset>=totalPages){
            startPage = totalPages-visiblePages<1 ? 1 :totalPages-visiblePages ; //9 -10 +1 =0
            endPage   = totalPages;
        }
        else{
            startPage = currentPage-page_offset+1;
            endPage = currentPage+page_offset;
        }

        console.warn("Total rec:"+param.total+" Pages:"+totalPages+" Current:"+currentPage +" Offset:"+ page_offset+" startPage:"+startPage+"  End:"+ endPage+" visiblePages:"+visiblePages );

        let pages = _.range(parseInt(startPage), parseInt(endPage)+ 1);
        // console.log(pages, 'pages');

           this.setState({
               pages:pages
           });

    }
    getList(){
       return this.state.pages.map(page => {
            return <li
                key={page}
                onClick={(e) => this.props.pagingOnClick(page, e)}
                className={page == this.props.currentPage ? "active" : "waves-effect"}><a>{page}</a>
            </li>
        });
    }

    render() {
        console.log(this.props, 'PAGING: render');
        return (
                <ul className="pagination center">
                    {this.state.pages.length>0 ? <li className="disabled"><a onClick={(e) =>this.goToFirst(e)}><i className="material-icons">chevron_left</i></a></li> : ''}
                         { this.getList()  }
                    {this.state.pages.length>0 ? <li className="waves-effect"><a onClick={(e) =>this.goToLast(e)}><i className="material-icons">chevron_right</i></a></li> : ''}
                </ul>
        )
    }
}

function mapStateToProps(state){
    return {
        filter:   state.filter
    }
}

export default connect(mapStateToProps, {set_filter_page})(Paging);