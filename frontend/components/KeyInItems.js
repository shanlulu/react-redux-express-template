import React from 'react';
import TemplateItem from './TemplateItem';
import axios from 'axios';
import {connect} from 'react-redux';
import { fetch } from '../actions/index';
const dbUrl = "https://aqueous-peak-57156.herokuapp.com";
import { Link } from 'react-router-dom';

class KeyInItems extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
          name:'',
          date: '',
          submit: false
        }
    }

    onSubmit(e){
      const fridge = this;
      e.preventDefault();
      console.log("the state !",this.state,'type of date is',typeof(this.state.date))
      axios.post(dbUrl+'/save', {
        name: this.state.name,
        date: this.state.date
      })
      .then(function(res){
        console.log('res from key in is',res.data.id)
        axios.post(dbUrl+'/saveToShop',{id: res.data.id})
        axios.get(dbUrl + '/fetch')
         .then(
           (response) =>
             {console.log("updated by key in");
             fridge.props.fetch(response.data); })
         .then(response =>
           {
             fridge.setState({
               name:'',
               date:'',
               submit: true
             })
           }
         )
         .then(res=> {
           setTimeout(function(){fridge.setState({submit:false})},300)
         })
      })
      .catch((err) =>
          console.log('something',err)
      );

    }
    updateName(name){
      this.setState({
        name: name.target.value
      })
    }
    updateDate(date){
      this.setState({date: date.target.value})
    }
    render() {
        let backgroundColor = this.state.submit? 'yellow': '#FAEBD7';
        return (
          <div>
          <Link to='/login'><button className="btn btn-danger" style={{margin: "15px"}}>Log Out</button></Link>
            <form className="main main-login main-center" style={{backgroundColor: backgroundColor, borderRadius: 20, marginTop: 50}}>
              <h3 style={{textAlign: 'center', color: '#D2691E'}}>Add to My Fridge</h3>
              <label htmlFor="email" style={{color: '#D2691E'}} className="cols-sm-2 control-label">Food: </label>
              <input className="form-control" onChange={(name)=>this.updateName(name)} type='text' value={this.state.name} required/>
              <br/>
              <label htmlFor="email" style={{color: '#D2691E'}} className="cols-sm-2 control-label">Expiration Date: </label>
              <input className="form-control" onChange={(date)=>this.updateDate(date)} type='date' value={this.state.date} required/>
              <br/>
              <input style={{"marginBottom":20, backgroundColor: '#FFE68B', color:'#D2691E', border: "none"}} className="form-control" onClick={(e)=>this.onSubmit(e)} type='submit' value='Submit'/>
            </form>
          </div>
        );
    }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
   fetch: (foodObj)=>dispatch(fetch(foodObj))
});


export default connect(mapStateToProps, mapDispatchToProps)(KeyInItems);
