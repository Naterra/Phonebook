import React, { Component } from 'react';
import { Link } from 'react-router-dom';


const alpha = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
//style={{fontSize:'13px'}}

class AlphabetMenue extends Component{
    render(){
        return(
            <div className="alphabet card teal lighten-2" >
            <div className="   " >
                <div className="btn-group center">
                    {alpha.map(elem=><button className="btn white-text teal lighten-2" key={elem}><a className="" >{elem}</a></button>)}
                </div>
            </div>
            </div>

        )
    }
}

export default AlphabetMenue;