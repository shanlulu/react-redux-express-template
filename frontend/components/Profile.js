import React from 'react';
import PropTypes from 'prop-types';
// import axios from 'axios';
// import FridgeContent from './FridgeContent';
// import Template from './Template';
// import {connect} from 'react-redux';
// import { Route } from 'react-router-dom';
import Content from './Content';

class Profile extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
          <div>
            <Content />
          </div>
        );
    }
}

// const mapStateToProps = (state) => ({
//    foodItems: state.fridgeItem
// });
//
// const mapDispatchToProps = (dispatch) => ({
//    fetch: (foodItemsObj)=> dispatch(fetch(foodItemsObj)),
//    removeItem: ()=>dispatch(removeItem(id))
// });

// FoodItem.propTypes = {
//
// };


export default Profile;
