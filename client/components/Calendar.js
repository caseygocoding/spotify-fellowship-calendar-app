import React, { Component } from 'react';
import dateFns from 'date-fns';
import { connect } from 'react-redux';
import { getAllEvents, updateSelectedDate } from '../store';
import Popupform from './Popupform.js';
import SubHeader from './SubHeader.js';
import AllEvents from './AllEvents.js';
import DailyView from './DailyView.js';
import UpdateForm from './UpdateForm.js';
import { MonthinNum, YearinNum } from './helperFunctions';

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDate: new Date(),
    };
  }

  componentDidMount() {
    let { selectedDate } = this.state;
    let formattedMonth = MonthinNum(selectedDate);
    let formattedYear = YearinNum(selectedDate);
    this.props.getEvents(formattedMonth, formattedYear);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.selectedDate !== prevState.selectedDate) {
      let { selectedDate } = this.state;
      let formattedMonth = MonthinNum(selectedDate);
      let formattedYear = YearinNum(selectedDate);
      this.props.getEvents(formattedMonth, formattedYear);
    }
  }

  renderHeader() {
    const dateFormat = 'MMMM YYYY';
    const { views, selectedDate } = this.props;

    return (
      <div className="header row flex-middle">
        <div className="col col-start">
          <div
            className="icon"
            onClick={views === 'daily' ? this.prevDay : this.prevMonth}
          >
            chevron_left
          </div>
        </div>
        <div className="col col-center">
          <span>
            {dateFns.format(
              selectedDate || this.state.selectedDate,
              dateFormat
            )}
          </span>
        </div>
        <div
          className="col col-end"
          onClick={views === 'daily' ? this.nextDay : this.nextMonth}
        >
          <div className="icon">chevron_right</div>
        </div>
      </div>
    );
  }

  renderDays() {
    const dateFormat = 'dddd';
    const days = [];
    let startDate = dateFns.startOfWeek(this.state.selectedDate);
    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col col-center" key={i + 31}>
          {dateFns.format(dateFns.addDays(startDate, i), dateFormat)}
        </div>
      );
    }
    return <div className="days row">{days}</div>;
  }

  renderCells() {
    const { selectedDate } = this.state;
    const { events } = this.props;
    const monthStart = dateFns.startOfMonth(selectedDate);
    const monthEnd = dateFns.endOfMonth(monthStart);
    const startDate = dateFns.startOfWeek(monthStart);
    const endDate = dateFns.endOfWeek(monthEnd);
    const formattedMonth = MonthinNum(monthStart);

    const dateFormat = 'D';
    const rows = [];

    let days = [];
    let day = startDate;
    let formattedDate = '';

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = dateFns.format(day, dateFormat);
        const cloneDay = day;
        days.push(
          <div
            className={`col cell ${
              !dateFns.isSameMonth(day, monthStart)
                ? 'disabled'
                : dateFns.isSameDay(day, selectedDate)
                  ? 'selected'
                  : ''
            }`}
            key={day}
            onClick={() => this.onDateClick(dateFns.parse(cloneDay))}
          >
            <span className="number">{formattedDate}</span>
            <span className="bg">{formattedDate}</span>
            <Popupform formattedDate={formattedDate} />
            {events.length
              ? events.map(event => {
                  return (event.day === Number(formattedDate) && dateFns.isSameMonth(day, monthStart)) ? (
                    <UpdateForm event={event} key={event.id} />
                  ) : null;
                })
              : null}
          </div>
        );
        day = dateFns.addDays(day, 1);
      }
      rows.push(
        <div className="row" key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="body">{rows}</div>;
  }

  onDateClick = day => {
    this.setState({ selectedDate: day });
    this.props.currentSelectedDate(day);
  };

  nextMonth = () => {
    this.setState(
      { selectedDate: dateFns.addMonths(this.state.selectedDate, 1) },
      () => {
        this.props.currentSelectedDate(this.state.selectedDate);
      }
    );
  };

  prevMonth = () => {
    this.setState(
      { selectedDate: dateFns.subMonths(this.state.selectedDate, 1) },
      () => {
        this.props.currentSelectedDate(this.state.selectedDate);
      }
    );
  };

  nextDay = () => {
    this.setState(
      { selectedDate: dateFns.addDays(this.state.selectedDate, 1) },
      () => {
        this.props.currentSelectedDate(this.state.selectedDate);
      }
    );
  };

  prevDay = () => {
    this.setState(
      { selectedDate: dateFns.subDays(this.state.selectedDate, 1) },
      () => {
        this.props.currentSelectedDate(this.state.selectedDate);
      }
    );
  };

  render() {
    const { views } = this.props;
    return (
      <div className="calendar">
        {this.renderHeader()}
        <SubHeader />
        {views === 'allEvents' ? (
          <AllEvents events={this.props.events} />
        ) : null}
        {views === 'monthly' ? this.renderDays() : null}
        {views === 'monthly' ? this.renderCells() : null}
        {views === 'daily' ? <DailyView /> : null}
      </div>
    );
  }
}

const mapState = state => {
  return {
    events: state.events,
    views: state.views,
    date: state.date,
  };
};

const mapDispatch = dispatch => {
  return {
    getEvents: (month, year) => {
      dispatch(getAllEvents(month, year));
    },
    currentSelectedDate: selectedDate => {
      dispatch(updateSelectedDate(selectedDate));
    },
  };
};

export default connect(
  mapState,
  mapDispatch
)(Calendar);
