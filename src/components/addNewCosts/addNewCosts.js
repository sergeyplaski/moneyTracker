import React, {Component} from 'react';
import DatePicker from 'react-date-picker';
import addCosts from '../../actions/addNewCostsAction';
import {connect} from 'react-redux';
import moment from 'moment';
import Modale from '../Modale/Modale';
import {click} from '../../selectors/CostListSelector';
import toggleShowWindow from '../../actions/clickAction';
import v4 from 'uuid/v4';
import './style.css';


let category = [
    {
        id: 'health',
        value: 'здоровье'
    },
    {
        id: 'food',
        value: 'еда'
    },
    {
        id: 'hygiene',
        value: 'гигиена'
    },
    {
        id: 'home',
        value: 'жилье'
    },
    {
        id: 'clothes',
        value: 'одежда'
    },
    {
        id: 'sport',
        value: 'спорт'
    },
    {
        id: 'relax',
        value: 'отдых'
    },
    {
        id: 'communication',
        value: 'связь'
    },
    {
        id: 'transport',
        value: 'транспорт'
    },
    {
        id: 'nursling',
        value: 'питомцы'
    },
    {
        id: 'present',
        value: 'подарки'
    },
    {
        id: 'other',
        value: 'другое'
    },
];

class AddNewCosts extends Component {
    sumInput = '';
    commentInput = '';
    categories = null;
    id = v4();

    state = {
        date: new Date(),

    };

    handleChange = date => this.setState({date});

    render() {
        return (
            <Modale toggleShowWindow={this.props.toggleShowWindow} click={this.props.click}>

                <form action='#' method="POST"  onSubmit ={(event) => {
                    event.preventDefault();
                    let category = Array.from(this.categories.children);
                    category.some(el => el.children[0].checked === true)
                        ? this.props.addCosts(
                        {
                            cost: +this.sumInput.value,
                            date: moment(this.state.date).valueOf(),
                            category: category.find(el => el.children[0].checked === true).children[0].value,
                            comments: this.commentInput.value,

                        })
                        : alert('fill in the category and price');
                    this.props.toggleShowWindow()
                }} className='category-container'>
                    <input type='number' placeholder='сумма' className='category--sum' required
                           ref={(inputTag) => this.sumInput = inputTag}/>
                    <div className='icons-category' ref={(input) => this.categories = input}>
                        {category.map(el => <div key={v4()} className='icon-category'>
                            <input type="radio" className='radio' id={el.id} name="contact" value={el.value}/>
                            <label htmlFor={el.id} className={el.id}> </label>
                            <p className='category--text'>{el.value}</p>
                        </div>)}
                    </div>
                    <div className='category__date'>
                        <DatePicker value={this.state.date} className='category__calendar' onChange={this.handleChange}
                                    locale={'ru'}/>
                    </div>
                    <input type='text' placeholder='комментарий' className='category--comment'
                           ref={(inputTag) => this.commentInput = inputTag}/>
                    <button className='category--save' onClick={() => {
                        let category = Array.from(this.categories.children);
                        category.some(el => el.children[0].checked === true) && this.state.date !== null && +this.sumInput.value > 0
                            ? this.props.addCosts(
                            {
                                cost: +this.sumInput.value,
                                date: moment(this.state.date).valueOf(),
                                category: category.find(el => el.children[0].checked === true).children[0].value,
                                comments: this.commentInput.value,
                            })
                            : alert('fill in the category or date');
                        this.props.toggleShowWindow()
                    }}>coxpанить
                    </button>
                </form>
            </Modale>
        )
    }
}


function MSTP(state) {
    return {
        click: click(state)
    }
}

function MDTP(dispatch) {
    return {
        addCosts: function (data) {
            dispatch(addCosts(data))
        },
        toggleShowWindow: function () {
            dispatch(toggleShowWindow())
        }
    }
}

export default connect(MSTP, MDTP)(AddNewCosts)
